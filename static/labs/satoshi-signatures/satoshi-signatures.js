/*****************************************************************************
 * This script is an implementation of the attack described here:
 *   https://github.com/RustCrypto/traits/issues/1323#issuecomment-1587803872
 *****************************************************************************/

window.Satoshi = (function() {
  /*****************************************************************************/
  /* Utility functions
  /*****************************************************************************/
  function numberToBuf(bn) {
    var hex = BigInt(bn).toString(16);
    return hexToBuf(hex)
  }

  function hexToBuf(hex) {
    if (hex.length % 2) { hex = '0' + hex; }

    var len = hex.length / 2;
    var u8 = new Uint8Array(len);

    var i = 0;
    var j = 0;
    while (i < len) {
      u8[i] = parseInt(hex.slice(j, j+2), 16);
      i += 1;
      j += 2;
    }

    return u8;
  }

  /**
   * From https://coolaj86.com/articles/convert-js-bigints-to-typedarrays/
   */
  var bufToNumber = function(buf) {
    var hex = [];
    u8 = Uint8Array.from(buf);

    u8.forEach(function (i) {
      var h = i.toString(16);
      if (h.length % 2) { h = '0' + h; }
      hex.push(h);
    });

    return BigInt('0x' + hex.join(''));
  }

  var bufToHex = function(buf) {
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  /**
   * FieldElement represents a finite field element with all arithmetic
   * operations.
   * The field is set to be the Bitcoin field (prime is 2**256-2**32-977)
   */
  var FieldElement = function(num) {
    this.num = BigInt(num);
    this.prime = BigInt(2**256) - BigInt(2**32) - BigInt(977);
    //this.prime = 115792089237316195423570985008687907852837564279074904382605163141518161494337n;
  };
  FieldElement.prototype.eq = function(other) {
    return this.num === other.num;
  }
  FieldElement.prototype.mod = function(m) {
    var num = this.num % m;
    return new FieldElement(num % this.prime);
  }
  FieldElement.prototype.add = function(other) {
    var num = this.num + other.num;
    return new FieldElement(num % this.prime);
  }
  FieldElement.prototype.sub = function(other) {
    res = (this.num - other.num) % this.prime;
    if (res < BigInt(0)) { res += this.prime }
    return new FieldElement(res);
  }
  FieldElement.prototype.mulmod = function(other, m) {
    if (m === undefined) { m = this.prime }
    if (typeof(other) === "bigint") {
      coefficient = other;
    } else if (typeof(other) === "number") {
      coefficient = BigInt(other)
    } else {
      coefficient = other.num;
    }
    var num = (this.num * coefficient) % m
    return new FieldElement(num);
  }
  FieldElement.prototype.divmod = function(other, m) {
    if (m === undefined) { m = this.prime }
    // This uses fermat's little theorem (https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)
    // => if p is prime, then for any integer a: a**(p-1) % p = 1
    // => we can compute inverses for any a: 1/a = a**(p-2) % p
    return new FieldElement(other.num).powmod(m - BigInt(2), m).mulmod(this.num, m)
  }
  // Lame: BigInt isn't big enough to handle Bitcoin exponents
  // This function optimizes raising to a power under a given prime field.
  // To make your browser blow up, try this:
  // >> 79536652430513611336875367390220075225617959202905533989011516344856823524821n
  // ** 115792089237316195423570985008687907853269984665640564039457584007908834671663n
  // >> [surprise!]
  FieldElement.prototype.powmod = function(exponent, m) {
    if (m === undefined) { m = this.prime }
    var exponent = BigInt(exponent);
    var base = this.num % m;
    var result = 1n;

    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2)) {
        result = (result * base) % m;
      }
      exponent = exponent / BigInt(2);
      base = (base * base) % m;
    }
    return new FieldElement(result);
  };
  // Return the hexadecimal representation of the field element
  FieldElement.prototype.toHex = function() {
    return this.num.toString(16).padStart(64, 0);
  }

  /**
   * BitcoinPoint is a point (x, y) on the following elliptic curve:
   *     y**2 = x**3 + 7
   *     (where x and y are both finite field elements on the Bitcoin field)
   *               -- see https://en.bitcoin.it/wiki/Secp256k1 --
   *
   * We only redefine + and * since that's what's needed for public key derivation.
   */
  var BitcoinPoint = function(x, y) {
    this.x = x;
    this.y = y;
    this.b = new FieldElement(7);

    if (this.x === null && this.y === null) {
      // Point at infinity
      return
    }

    var left = this.y.powmod(2).num;
    var right = this.x.powmod(3).add(this.b).num;

    if (left != right){
      // y**2 = x**3 + 7 is the elliptic curve equation
      throw new Error('Not on the Bitcoin curve! y**2 (' + left + ') != x3 + 7 (' + right + ')');
    }
  }
  /**
   * Addition is a complex operation because of the number of cases involved.
   * The point at infinity is represented by (x=null, y=null), and represents the logical "0".
   * So, to compute `A.add(B)`:
   * - Case 1a: if A is 0, return B (0+B=B)
   * - Case 1b: if B is 0, return A (A+0=A)
   * - Case 2: if A and B have the same x but different y coordinates, they're
   *           opposite points: B is "-A". So, A+B=A+(-A)=0 (return point at infinity)
   * - Case 3: if A and B are the same and at y=0, the A->B line is tangent to the y axis
   *           -> return point at infinity
   * - Case 4: if A and B are the same (with y≠0), the formula for the result R (x3, y3):
   *           s = (3*x1**2 + a) / 2*y1
   *           x3 = s**2 - 2*x1
   *           y3 = s*(x1 - x3) - y1
   *           -> return (x3, y3)
   * - Case 5: general case (different x coordinates). To get R (x3, y3) from A and B:
   *           s = (y2 -y1) / (x2 - x1)
   *           x3 = s**2 - x1 - x2
   *           y3 = s*(x1 - x3) - y1
   *           -> return (x3, y3)
   *
   * See https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication#Point_addition for helpful visuals
   */
  BitcoinPoint.prototype.add = function(other) {
    if (this.x === null) { return other; }  /* 1a */
    if (other.x === null) { return this; }  /* 1b */

    /* 2 */
    if (this.x.eq(other.x) === true && this.y.eq(this.y) === false) {
        return new BitcoinPoint(null, null);
    }

    /* 3 */
    if (this.x.eq(other.x) && this.y.eq(other.y) && this.y.eq(new FieldElement(0))) {
        return new BitcoinPoint(null, null);
    }

    /* 4 */
    if (this.x.eq(other.x) && this.y.eq(other.y)) {
        s = (this.x.powmod(2).mulmod(3)).divmod(this.y.mulmod(2))
        x = s.powmod(2).sub(this.x.mulmod(2))
        y = s.mulmod(this.x.sub(x)).sub(this.y)
        return new BitcoinPoint(x, y)
    }

    /* 5 */
    if (this.x.eq(other.x) === false) {
        s = other.y.sub(this.y).divmod(other.x.sub(this.x), this.x.prime);
        x = s.powmod(2).sub(this.x).sub(other.x);
        y = s.mulmod(this.x.sub(x), this.x.prime).sub(this.y);
        return new BitcoinPoint(x, y);
    }

    console.error('cannot handle addition of (' + this.x +  ', ' + this.y + ') with (' + other.x +  ', ' + other.y + ')');
  }
  /**
   * Multiplication uses addition. Nothing crazy here.
   * We start with "0" (point at infinity). Then we add increasing powers of 2.
   * So, to multiply A by e.g. 25 (25 is 11001 in binary), we add 1*A, then compute
   * 2*A, 4*A, 8*A by successive addtions. Then add 8*A, then compute 16*A, then
   * add 16*A.
   */
  BitcoinPoint.prototype.multiply = function(fieldElement) {
      var coef = fieldElement.num;
      var current = this;
      var result = new BitcoinPoint(null, null);
      while(coef) {
          if (coef & BigInt(1)) {
              result = result.add(current);
          }
          current = current.add(current);
          coef >>= BigInt(1);
      }
      return result;
  }

  /**
   * Return a string representing the compressed public key for a given point
   */
  BitcoinPoint.prototype.compressedPublicKey = function() {
    if (this.y.num % BigInt(2) === BigInt(0)) {
      return '02' + bufToHex(numberToBuf(this.x.num)).padStart(64, 0);
    } else {
      return '03' + bufToHex(numberToBuf(this.x.num)).padStart(64, 0);
    }
  }

  // This is the Bitcoin base point.
  // See https://en.bitcoin.it/wiki/Secp256k1
  var G = new BitcoinPoint(
    new FieldElement(BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798')),
    new FieldElement(BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'))
  )

  /*****************************************************************************/
  /* Core library
  /*****************************************************************************/


  // Satoshi public key
  // See https://blockchair.com/bitcoin/transaction/0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098
  var P = new BitcoinPoint(
    new FieldElement(BigInt('0x96b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52')),
    new FieldElement(BigInt('0xda7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858ee'))
  )

  // SEP256K1 curve order
  // See https://en.bitcoin.it/wiki/Secp256k1
  var CURVE_ORDER = 115792089237316195423570985008687907852837564279074904382605163141518161494337n;

  var randomFieldElement = function() {
    var randomBytes = crypto.getRandomValues(new Uint8Array(32));
    return new FieldElement(bufToNumber(randomBytes));
  }

  // This is the meat of it!
  // Refer to https://github.com/RustCrypto/traits/issues/1323#issuecomment-1587803872
  // for an explanation on why this works.
  var makeSignature = function() {
    var a = randomFieldElement();
    var b = randomFieldElement();

    var aG = G.multiply(a);
    var bP = P.multiply(b);
    var R = aG.add(bP); // R = aG + bP

    var r = R.x;
    var s = r.divmod(b, CURVE_ORDER);
    var z = r.mulmod(a, CURVE_ORDER).divmod(b, CURVE_ORDER);


    // Verification for the sake of being complete!
    // See https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Signature_verification_algorithm
    var u1 = z.divmod(s, CURVE_ORDER); // u1 = z/s (mod N)
    var u2 = r.divmod(s, CURVE_ORDER); // u2 = r/s (mod N)
    var u1G = G.multiply(u1);
    var u2P = P.multiply(u2);
    var Rprime = u1G.add(u2P);

    if (Rprime.x.num === R.x.num) {
      console.log("Produced a valid signature ✅");
    } else {
      console.error("Invalid signature!");
    }

    var result = {
      signature: {
        r: r.toHex(),
        s: s.toHex()
      }, 
      hash: z.toHex(),
      pubkey: P.compressedPublicKey()
    };
    console.log("signature", result);
    return result;
  }

  return {
    makeSignature: makeSignature,
  }
})();
