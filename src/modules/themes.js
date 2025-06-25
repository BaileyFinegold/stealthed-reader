function applyTheme(name){
  const root = document.documentElement;
  if (name === 'night'){
    root.classList.add('night');
  }else{
    root.classList.remove('night');
  }
}

function setOpacity(val){
  window.electronAPI.storeSet('opacity', val);
  window.electronAPI.hover(true); // refresh
}

module.exports = { applyTheme, setOpacity };
