let timer=null;

function start(speed=30){
  stop();
  timer = setInterval(()=>{ window.scrollBy(0,1); }, 1000/speed);
}

function stop(){
  if (timer){ clearInterval(timer); timer=null; }
}

module.exports = { start, stop };
