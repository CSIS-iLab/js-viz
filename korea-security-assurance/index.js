tippy('.statement-container', {
    // trigger: 'click', // mouseenter, click, focus; manual.
	  content(reference) {
    const id = reference.querySelector(".tooltip").id;
    const template = document.getElementById(id);
    return template.textContent;
  },
  allowHTML: true,
  theme: 'light',
  arrow: true,
    // showOnInit: true // to ease styling
  });

/*   const lineG = document.getElementsByClassName('statement-text')
  for(let i = 0; i < lineG.length; i++)
  {
    let lineArray = lineG[i].querySelectorAll("path");
    
    let lineCombined = []
    for(let p = 0; p < lineArray.length; p++)
    {
      let linepath = lineArray[p].getAttribute('d')
      lineCombined.push(linepath)
      if ( p != 0){
      lineArray[p].remove()
      }
    }
    console.log(lineArray)
    let lineFirst = lineG[i].querySelector("path").getAttribute('d');
    lineFirst = lineArray.toString();
    console.log(lineFirst)
  } */


