/*****************************************************************************
 * The following file reproduces keys.lol's functionality, and some more. Some
 * tests are included at the end of the file. Note that this has 0
 * dependencies. This is by design. I wanted to double-check, "by hand" what
 * was computed. This includes
 * - elliptic curve crypto to go from a seed to a public key
 * - basic hash algorithms (ripe160, hash160 -- this excludes sha256 since it's
 *   available straight from browsers nowadays)
 * - code to convert keys.lol pages/offsets to seeds and vice versa
 *****************************************************************************/
window.KeysDeconstructed = (function() {
  /**
   * BitcoinFieldElement represents a finite field element with all arithmetic
   * operations.
   * The field is set to be the Bitcoin field (prime is 2**256-2**32-977)
   */
  var BitcoinFieldElement = function(num) {
    this.num = BigInt(num);
    this.prime = BigInt(2**256) - BigInt(2**32) - BigInt(977);
  };
  BitcoinFieldElement.prototype.eq = function(other) {
    return this.num === other.num;
  }
  BitcoinFieldElement.prototype.add = function(other) {
    num = this.num + other.num;
    return new BitcoinFieldElement(num % this.prime);
  }
  BitcoinFieldElement.prototype.sub = function(other) {
    res = (this.num - other.num) % this.prime;
    if (res < BigInt(0)) { res += this.prime }
    return new BitcoinFieldElement(res);
  }
  BitcoinFieldElement.prototype.mul = function(other) {
    if (typeof(other) === "bigint") {
      coefficient = other;
    } else if (typeof(other) === "number") {
      coefficient = BigInt(other)
    } else {
      coefficient = other.num;
    }
    num = (this.num * coefficient) % this.prime
    return new BitcoinFieldElement(num);
  }
  BitcoinFieldElement.prototype.div = function(other) {
    // This uses fermat's little theorem (https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)
    // => if p is prime, then for any integer a: a**(p-1) % p = 1
    // => we can compute inverses for any a: 1/a = a**(p-2) % p
    return new BitcoinFieldElement(other.num).pow(this.prime - BigInt(2)).mul(this.num)
  }
  // Lame: BigInt isn't big enough to handle Bitcoin exponents
  // This function optimizes raising to a power under a given prime field.
  // To make your browser blow up, try this:
  // >> 79536652430513611336875367390220075225617959202905533989011516344856823524821n
  // ** 115792089237316195423570985008687907853269984665640564039457584007908834671663n
  // >> [surprise!]
  BitcoinFieldElement.prototype.pow = function(exponent) {
    var exponent = BigInt(exponent);
    var base = this.num % this.prime;
    var result = 1n;

    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2)) {
        result = (result * base) % this.prime;
      }
      exponent = exponent / BigInt(2);
      base = (base * base) % this.prime;
    }
    return new BitcoinFieldElement(result);
  };

  /**
   * BitcoinPoint is a point (x, y) on the following elliptic curve:
   *     y**2 = x**3 + 7
   *     (where x and y are both finite field elements on the Bitcoin field)
   *               -- see https://en.bitcoin.it/wiki/Secp256k1 --
   *
   * We only redefine + and * since that's what's needed for public key derivation.
   */
  BitcoinPoint = function(x, y) {
    this.x = x;
    this.y = y;
    this.b = new BitcoinFieldElement(7);

    if (this.x === null && this.y === null) {
      // Point at infinity
      return
    }

    var left = this.y.pow(2).num;
    var right = this.x.pow(3).add(this.b).num;

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
    if (this.x.eq(other.x) && this.y.eq(other.y) && this.y.eq(new BitcoinFieldElement(0))) {
        return new BitcoinPoint(null, null);
    }

    /* 4 */
    if (this.x.eq(other.x) && this.y.eq(other.y)) {
        s = (this.x.pow(2).mul(3)).div(this.y.mul(2))
        x = s.pow(2).sub(this.x.mul(2))
        y = s.mul(this.x.sub(x)).sub(this.y)
        return new BitcoinPoint(x, y)
    }

    /* 5 */
    if (this.x.eq(other.x) === false) {
        s = other.y.sub(this.y).div(other.x.sub(this.x));
        x = s.pow(2).sub(this.x).sub(other.x);
        y = s.mul(this.x.sub(x)).sub(this.y);
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
  BitcoinPoint.prototype.multiply = function(coefficient) {
      var coef = BigInt(coefficient);
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

  // This is the Bitcoin base point.
  // See https://en.bitcoin.it/wiki/Secp256k1
  var G = new BitcoinPoint(
    new BitcoinFieldElement(BigInt('0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798')),
    new BitcoinFieldElement(BigInt('0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'))
  )

  /*****************************************************************************/
  /* Hash functions
  /*****************************************************************************/

  /**
   * Uses the browser Crypto API to compute SHA-256 digest
   * TODO: make sha256 synchronous to avoid async tests.
   * let's use https://gist.github.com/bellbind/1cfcc96514099fcebd455259b7249525
   */
  var sha256 = async function(buf) {
    var digest = await crypto.subtle.digest('SHA-256', buf);
    return digest;
  }

  /**
   * Ripemd...unfortunately not implemented in browser crypto modules yet.
   * Taken from https://gist.github.com/bellbind/4bfb093115a08817194bed1bfe7239d2
   * (neatest, most compact implementation I could find)
   */
  const hs = Array.from(Array(16), (_, i) => i.toString(16));
  const hsr = hs.slice().reverse();
  const h2s =  hs.join("").match(/../g), h2sr = hsr.join("").match(/../g);
  const h2mix = hs.map((h, i) => `${hsr[i]}${h}`);
  const hseq = h2s.concat(h2sr, h2mix).map(hex => parseInt(hex, 16));
  const H = new Uint32Array(Uint8Array.from(hseq.slice(0, 20)).buffer);
  const KL = Uint32Array.from(
      [0, 2, 3, 5, 7], v => Math.floor(Math.sqrt(v) * (2 ** 30)));
  const KR = Uint32Array.from(
      [2, 3, 5, 7, 0], v => Math.floor(Math.cbrt(v) * (2 ** 30)));
  const IL = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
      3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
      1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
      4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13];
  const IR = [
      5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
      6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
      15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
      8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
      12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11];
  const SL = [
      11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
      7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
      11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
      11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
      9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6];
  const SR = [
      8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
      9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
      9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
      15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
      8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
  const FL = [
      (b, c, d) => (b ^ c ^ d) >>> 0,
      (b, c, d) => ((b & c) | ((~b >>> 0) & d)) >>> 0,
      (b, c, d) => ((b | (~c >>> 0)) ^ d) >>> 0,
      (b, c, d) => ((b & d) | (c & (~d >>> 0))) >>> 0,
      (b, c, d) => (b ^ (c | (~d >>> 0))) >>> 0,
  ];
  const FR = FL.slice().reverse();
  function rotl(v, n) {
      return ((v << n) | (v >>> (32 - n))) >>> 0;
  }

  function ripemd160(buffer) {
      const u8a = ArrayBuffer.isView(buffer) ?
            new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
            new Uint8Array(buffer);
      const total = Math.ceil((u8a.length + 9) / 64) * 64;
      const chunks = new Uint8Array(total);
      chunks.set(u8a);
      chunks.fill(0, u8a.length);
      chunks[u8a.length] = 0x80;
      const lenbuf = new Uint32Array(chunks.buffer, total - 8);
      const low = u8a.length % (1 << 29);
      const high = (u8a.length - low) / (1 << 29);
      lenbuf[0] = low << 3;
      lenbuf[1] = high;

      const hash = H.slice();
      for (let offs = 0; offs < total; offs += 64) {
          const w = new Uint32Array(chunks.buffer, offs, 16);
          let [al, bl, cl, dl, el] = hash, [ar, br, cr, dr, er] = hash;
          for (let s = 0; s < 5; s++) {
              for (let i = s * 16, end = i + 16; i < end; i++) {
                  const tl = al + FL[s](bl, cl, dl) + w[IL[i]] + KL[s];
                  const nal = (rotl(tl >>> 0, SL[i]) + el) >>> 0;
                  [al, bl, cl, dl, el] = [el, nal, bl, rotl(cl, 10), dl];
                  const tr = ar + FR[s](br, cr, dr) + w[IR[i]] + KR[s];
                  const nar = (rotl(tr >>> 0, SR[i]) + er) >>> 0;
                  [ar, br, cr, dr, er] = [er, nar, br, rotl(cr, 10), dr];
              }
          }
          hash.set([hash[1] + cl + dr, hash[2] + dl + er, hash[3] + el + ar,
                    hash[4] + al + br, hash[0] + bl + cr]);
      }
      return hash.buffer;
  }

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

  var base58Encode = function(buf) {
    var BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    prefix = ''
    for (var i=0; i<buf.length; i++) {
      var c = buf[i];
      if (c == 0) {
        prefix += '1';
      } else {
        break
      }
    }

    num = bufToNumber(buf);

    result = ''
    while (num > 0) {
      var mod = num % BigInt(58)
      var num = num / BigInt(58)
      result = BASE58_CHARS[mod] + result
    }

    return prefix + result;
  }

  var base58Decode = function(str) {
    var BASE58_CHARS = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    var l = str.length;
    var decoded = BigInt(0);
    var multiplier = BigInt(1);
   
    for (var i = l - 1; i >= 0; i--) {
      decoded += multiplier * BigInt(BASE58_CHARS.indexOf(str[i]));
      multiplier = multiplier * BigInt(BASE58_CHARS.length);
    }
   
    return decoded;
  }

  var base58EncodeWithChecksum = async function(buf) {
    var sha = await sha256(buf);
    var shaSquared = await sha256(sha);
    var checksum = shaSquared.slice(0, 4);
    // Simplest way to concat Uint8Array and ArrayBuffer afaict...
    var checksumedBuf = hexToBuf(bufToHex(buf) + bufToHex(checksum));
    return base58Encode(checksumedBuf);
  }

  /*****************************************************************************/
  /* Core library
  /*****************************************************************************/

  /**
   * page,offset -> seed
   */
  var pageAndOffsetToSeed = function(page, offset) {
    var page = BigInt(page);
    var offset = BigInt(offset);
    return (page - BigInt(1)) * BigInt(128) + offset;
  }
  var seedToPageAndOffset = function(seed) {
    var seed = BigInt(seed);
    var page = seed/BigInt(128) + BigInt(1);
    var offset = seed - BigInt(128) * (page - BigInt(1));
    return {'page': page, 'offset': offset};
  }

  /**
   * Take a `seed` (BigInt) and returns a WIF representation
   */
  var seedToPrivateKey = async function(seed) {
    var toEncode = hexToBuf('80' + bufToHex(numberToBuf(seed)).padStart(64, 0));
    return await base58EncodeWithChecksum(toEncode);
  }
  var seedToCompressedPrivateKey = async function(seed) {
    var toEncode = hexToBuf('80' + bufToHex(numberToBuf(seed)).padStart(64, 0) + '01');
    return await base58EncodeWithChecksum(toEncode);
  }
  var privateKeyToSeed = function(privateKey) {
    var decodedPrivateKey = base58Decode(privateKey);
    var hex = bufToHex(numberToBuf(decodedPrivateKey));
    // slice out [0,2] because of 0x80 prefix
    // slice out [-8,] because of checksum
    return bufToNumber(hexToBuf(hex.slice(2, -8)));
  }

  /**
   * Takes seed and derives a pubkey (optionally compressed if `compressed` is truthy)
   */
  var seedToPubkey = async function(seed, compressed) {
    var point = G.multiply(seed);

    if (compressed) {
      if (point.y.num % BigInt(2) === BigInt(0)) {
        var secHexBuf = hexToBuf('02' + bufToHex(numberToBuf(point.x.num)).padStart(64, 0));
      } else {
        var secHexBuf = hexToBuf('03' + bufToHex(numberToBuf(point.x.num)).padStart(64, 0));
      }
    } else {
      var secHexBuf = hexToBuf('04' + bufToHex(numberToBuf(point.x.num)).padStart(64, 0) + bufToHex(numberToBuf(point.y.num)).padStart(64, 0));
    }
    var sha = await sha256(secHexBuf);
    var ripeSha = ripemd160(sha);

    var toEncode = hexToBuf('00' + bufToHex(ripeSha));
    return await base58EncodeWithChecksum(toEncode)
  }

  /*****************************************************************************/
  /* Tests (!)
  /*****************************************************************************/

  var runTests = function() {
    var errors = []
    var assert = function(bool, message) {
      if (bool) {
        console.info(`${message} √`);
      } else {
        errors.push(`${message}: failed!`);
      }
    }

    console.log('Environment checks...');
    assert(document.getElementById !== undefined, 'getElementById available');
    assert(window.BigInt !== undefined, 'BigInt supported');
    assert(window.ArrayBuffer !== undefined, 'ArrayBuffer supported');
    assert(window.Uint8Array !== undefined, 'Uint8Array supported');
    assert(window.Uint16Array !== undefined, 'Uint16Array supported');
    assert(window.crypto !== undefined, 'CryptoAPI supported');
    assert(window.crypto.subtle !== undefined, 'SubtleCryptoAPI supported');

    function checkEndian() {
        var arrayBuffer = new ArrayBuffer(2);
        var uint8Array = new Uint8Array(arrayBuffer);
        var uint16array = new Uint16Array(arrayBuffer);
        uint8Array[0] = 0xAA; // set first byte
        uint8Array[1] = 0xBB; // set second byte
        if(uint16array[0] === 0xBBAA) return 'little';
        if(uint16array[0] === 0xAABB) return 'big';
        else throw new Error('Something crazy just happened');
    }
    assert(true, `System endianness: ${checkEndian()}`);

    console.log('Crypto tests...');
    assert(
      base58Encode(hexToBuf('003c176e659bea0f29a3e9bf7880c112b1b31b4dc826268187')) === '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS',
      'base58Encode'
    );
    assert(
      bufToHex(ripemd160(hexToBuf('61'))) === '0bdc9d2d256b3ee9daae347be6f4dc835a467ffe',
      'ripemd160'
    )
    sha256(hexToBuf('61')).then(function(digest) {
      assert(
        bufToHex(digest) === 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
        'sha256'
      );
    });
    seedToPrivateKey(BigInt(500)).then(function(wif) {
      assert(
        wif === '5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsrf95yNJcm',
        'uncompressed WIF'
      )
    });
    seedToCompressedPrivateKey(BigInt(500)).then(function(wif) {
      assert(
        wif === 'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFUBLMmoxxeY',
        'compressed WIF'
      )
    });
    assert(
       privateKeyToSeed('5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ip4nEB3kEsrf95yNJcm') == BigInt(500),
       'private key to seed'
    )
    seedToPubkey(BigInt(500), true).then(function(pubkey) {
      assert(pubkey === '1NYWcc2ZNN5pLE84NgWvrH42jCM4nT31JD', 'compressed pubkey')
    })
    seedToPubkey(BigInt(500), false).then(function(pubkey) {
      assert(pubkey === '1AArU5UU3aPn2FB2LW4CyoyvJuACLN96oP', 'uncompressed pubkey')
    })

    return errors;
  }

  return {
    runTests: runTests,
    pageAndOffsetToSeed: pageAndOffsetToSeed,
    seedToPageAndOffset: seedToPageAndOffset,
    seedToPrivateKey: seedToPrivateKey,
    privateKeyToSeed: privateKeyToSeed,
    seedToPubkey: seedToPubkey,
  }
})();
