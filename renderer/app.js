import { paginate, buildToc } from '../src/modules/pager.js';
import { applyTheme } from '../src/modules/themes.js';
import { start as startScroll, stop as stopScroll } from '../src/modules/autoScroll.js';

const reader = document.getElementById('reader');
const openBtn = document.getElementById('openBtn');
const themeSel = document.getElementById('themeSel');
const opacityRange = document.getElementById('opacityRange');
const autoBtn = document.getElementById('autoBtn');

let pages = [], pageIdx = 0, autoScrolling = false;

function renderPage(idx){
  if (pages.length === 0) return;
  pageIdx = (idx + pages.length) % pages.length;
  reader.value = pages[pageIdx];
  window.electronAPI.storeSet('lastPage', pageIdx);
}

async function loadFile(path){
  const res = await window.electronAPI.readFile(path);
  const text = res.text;
  pages = paginate(text);
  renderPage(0);
}

openBtn.addEventListener('click', async ()=>{
  const path = await window.electronAPI.openFileDialog();
  if (path){
    await loadFile(path);
  }
});

document.addEventListener('keydown', (e)=>{
  if (e.key === 'ArrowLeft'){ renderPage(pageIdx-1); }
  else if (e.key === 'ArrowRight'){ renderPage(pageIdx+1); }
  else if (e.key === 'F5'){ location.reload(); }
  else if (e.key === 'Escape'){ window.close(); }
  else if (e.key === 'F3'){ searchNext(); }
});

themeSel.addEventListener('change', ()=>{
  applyTheme(themeSel.value);
  document.getElementById('skin-night').disabled = themeSel.value!=='night';
});

opacityRange.addEventListener('input', ()=>{
  const val = opacityRange.value;
  document.body.style.opacity = val/100;
});

autoBtn.addEventListener('click', ()=>{
  autoScrolling = !autoScrolling;
  if (autoScrolling){
    startScroll();
    autoBtn.textContent='⏸ 暂停滚屏';
  }else{
    stopScroll();
    autoBtn.textContent='▶ 自动滚屏';
  }
});

function searchNext(){
  const sel = window.getSelection().toString() || prompt('输入关键词');
  if (!sel) return;
  const pos = reader.value.indexOf(sel, reader.selectionEnd);
  if (pos !== -1){
    reader.setSelectionRange(pos, pos+sel.length);
  }
}
