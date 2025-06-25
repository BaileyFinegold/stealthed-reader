function paginate(text, pageLen=1500){
  const pages = [];
  for(let i=0;i<text.length;i+=pageLen){
    pages.push(text.slice(i, i+pageLen));
  }
  return pages;
}

function buildToc(text){
  const chapterRe = /^(第[\d〇一二三四五六七八九十百千]+[章回节].*)$/gmi;
  const toc = [];
  let match;
  while((match = chapterRe.exec(text)) !== null){
    toc.push({ title: match[1], pos: match.index });
  }
  return toc;
}

module.exports = { paginate, buildToc };
