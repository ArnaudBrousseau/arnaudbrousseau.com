var errors = KeysDeconstructed.runTests();

var DOM = {
  pageInput: document.getElementById("page"),
  pageLink: document.getElementById("page-link"),
  offsetInput: document.getElementById("offset"),
  seedInput: document.getElementById("seed"),
  privateKeyInput: document.getElementById("private-key"),
  compressedPublicKeyInput: document.getElementById("public-key-compressed"),
  compressedPublicKeyLink: document.getElementById("pubkey-compressed-link"),
  publicKeyInput: document.getElementById("public-key"),
  publicKeyLink: document.getElementById("pubkey-uncompressed-link"),
  generateSeedRun: document.getElementById("generate-seed-run"),
  generateSeedRev: document.getElementById("generate-seed-rev"),
  encodeToPrivateKeyRun: document.getElementById("encode-to-private-key-run"),
  encodeToPrivateKeyRev: document.getElementById("encode-to-private-key-rev"),
  derivePubkeyRun: document.getElementById("derive-pubkey-run"),
  derivePubkeyRev: document.getElementById("derive-pubkey-rev"),
}

DOM.generateSeedRun.addEventListener('click', function() {
  var page = BigInt(DOM.pageInput.value);
  var offset = BigInt(DOM.offsetInput.value);

  var seed = KeysDeconstructed.pageAndOffsetToSeed(page, offset);
  var oldValue = DOM.seedInput.value;
  DOM.seedInput.value = seed;
  removeHighlight(DOM.generateSeedRun);

  if (seed != oldValue) {
    highlight(DOM.encodeToPrivateKeyRun);
    highlight(DOM.derivePubkeyRun);
  }
})

DOM.generateSeedRev.addEventListener('click', function() {
  res = KeysDeconstructed.seedToPageAndOffset(DOM.seedInput.value);
  setPageInput(res['page']);
  DOM.offsetInput.value = res['offset'];
  removeHighlight(DOM.generateSeedRev);
});

DOM.encodeToPrivateKeyRun.addEventListener('click', function() {
  var seed = DOM.seedInput.value;
  KeysDeconstructed.seedToPrivateKey(seed).then(function(privateKey) {
    DOM.privateKeyInput.value = privateKey;
    removeHighlight(DOM.encodeToPrivateKeyRun);
  });
});

DOM.encodeToPrivateKeyRev.addEventListener('click', function() {
  var privateKey = DOM.privateKeyInput.value;
  var seed = KeysDeconstructed.privateKeyToSeed(privateKey);
  
  var oldValue = DOM.seedInput.value;
  DOM.seedInput.value = seed;
  removeHighlight(DOM.encodeToPrivateKeyRev);

  if (seed != oldValue) {
    highlight(DOM.generateSeedRev);
    highlight(DOM.derivePubkeyRun);
  }
});

DOM.derivePubkeyRun.addEventListener('click', function() {
  var seed = DOM.seedInput.value;
  KeysDeconstructed.seedToPubkey(seed).then(function(pubkey) {
    setPubkey(pubkey);
    removeHighlight(DOM.derivePubkeyRun);
  })
  KeysDeconstructed.seedToPubkey(seed, true).then(function(pubkey) {
    setCompressedPubkey(pubkey);
    removeHighlight(DOM.derivePubkeyRun);
  })
});

DOM.pageInput.addEventListener('input', function() {
  resetActions();
  highlight(DOM.generateSeedRun);
  setPageInput(DOM.pageInput.value);
})

DOM.offsetInput.addEventListener('input', function() {
  resetActions();
  highlight(DOM.generateSeedRun);
})

DOM.seedInput.addEventListener('input', function() {
  resetActions();
  highlight(DOM.encodeToPrivateKeyRun);
  highlight(DOM.derivePubkeyRun);
  highlight(DOM.generateSeedRev);
})

DOM.privateKeyInput.addEventListener('input', function() {
  resetActions();
  highlight(DOM.encodeToPrivateKeyRev);
})

var resetInputs = function() {
  setPageInput('');
  DOM.offsetInput.value = '';
  DOM.seedInput.value = '';
  DOM.privateKeyInput.value = '';
  DOM.publicKeyInput.value = '';
  DOM.compressedPublicKeyInput.value = '';
}

var resetActions = function() {
  DOM.generateSeedRun.classList.remove('highlight');
  DOM.generateSeedRev.classList.remove('highlight');
  DOM.derivePubkeyRun.classList.remove('highlight');
  DOM.derivePubkeyRev.classList.remove('highlight');
  DOM.encodeToPrivateKeyRun.classList.remove('highlight');
  DOM.encodeToPrivateKeyRev.classList.remove('highlight');
}

var highlight = function(elt) {
  elt.classList.add('highlight');
}

var removeHighlight = function(elt) {
  elt.classList.remove('highlight');
}

var setPageInput = function(pageNumber) {
  DOM.pageInput.value = pageNumber;
  DOM.pageLink.href = "https://keys.lol/bitcoin/" + pageNumber;
  if (pageNumber) {
    DOM.pageLink.classList.remove('hidden');
  } else {
    DOM.pageLink.classList.add('hidden')
  }
}

var setPubkey = function(val) {
  DOM.publicKeyInput.value = val;
  DOM.publicKeyLink.href = 'https://www.blockchain.com/btc/address/' + val; 
  if (val) {
    DOM.publicKeyLink.classList.remove('hidden');
  } else {
    DOM.publicKeyLink.classList.add('hidden')
  }
}

var setCompressedPubkey = function(val) {
  DOM.compressedPublicKeyInput.value = val;
  DOM.compressedPublicKeyLink.href = 'https://www.blockchain.com/btc/address/' + val;
  if (val) {
    DOM.compressedPublicKeyLink.classList.remove('hidden');
  } else {
    DOM.compressedPublicKeyLink.classList.add('hidden')
  }
}

var connectPoints = function(x1, y1, x2, y2, bezierOffset) {
  var c = document.getElementById("canvas");
  var ctx=c.getContext("2d");

  ctx.beginPath(); 
  ctx.lineWidth="1";
  ctx.strokeStyle="#2b3746";
  ctx.moveTo(x1,y1);
  ctx.bezierCurveTo(x1+bezierOffset, y1, x2-bezierOffset, y2, x2, y2);
  ctx.stroke();
}

var writeTitle = function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '32px monospace';
  ctx.fillText('keys.lol', 50, 215);

  ctx.font = '12px monospace';
  ctx.fillText('deconstructed', 105, 227);

  ctx.font = '8px monospace';
  ctx.fillStyle = '#9a9b9c'
  ctx.fillText('© Copyright 2019 Arnaud Brousseau', 50, 253);
}

var drawBackground = function() {
  connectPoints(126, 95, 180, 120, 40);
  connectPoints(126, 145, 180, 120, 40);

  connectPoints(300, 120, 327, 120, 0);

  connectPoints(417, 120, 470, 65, 50);
  connectPoints(417, 120, 470, 175, 50);

  connectPoints(590, 65, 627, 65, 0);

  connectPoints(590, 175, 627, 147, 30);
  connectPoints(590, 175, 627, 205, 30);

  writeTitle();
}

/** LET'S GO **/
if (errors.length > 0) {
  alert('errors found while running tests: ' + errors);
} else {
  resetInputs();
  drawBackground();

  // TODO: random values?
  setPageInput(42);
  DOM.offsetInput.value = '13';
  highlight(DOM.generateSeedRun)
}