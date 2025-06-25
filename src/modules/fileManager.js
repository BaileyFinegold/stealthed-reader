const fs = require('fs');
const chardet = require('chardet');
const iconv = require('iconv-lite');
const path = require('path');

function pushRecent(store, filePath){
  const arr = store.get('recent', []);
  arr.unshift(filePath);
  store.set('recent', [...new Set(arr)].slice(0,20));
}

async function readTxt(filePath, store){
  const buf = fs.readFileSync(filePath);
  const enc = chardet.detect(buf) || 'UTF-8';
  const text = iconv.decode(buf, enc);
  pushRecent(store, filePath);
  return { text, encoding: enc };
}

module.exports = { readTxt };
