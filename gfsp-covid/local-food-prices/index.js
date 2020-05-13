const data_file = '05122020-data.json'
let impactCategories = {}
let impactObjects = {}
let str = '<h2>'


function reqListener() {
  let data = JSON.parse(this.responseText)

  data.forEach((row, i) => {
    let impact = row.impact
    let country = row.country

    impactCategories[impact] = impactCategories[impact] || {
      name: impact,
      countries: []
    }

    impactCategories[impact].countries.push(country)

  });
  impactObjects = Object.values(impactCategories)
  console.log(impactObjects)
  impactObjects.forEach(impact => {
    console.log(impact)
    let newDiv = document.createElement("div")
    let newH2 = document.createElement("h2")
    newH2.innerHTML = impact.name
    newDiv.appendChild(newH2)
    let list = document.createElement("ul")
    impact.countries.forEach(country => {
      let item = document.createElement('li')
      item.innerHTML = country
      list.appendChild(item)
    })
    newDiv.appendChild(list)
    document.body.appendChild(newDiv)
  })
}


document.body.onload = addElement;
function addElement() {
  // create a new div element 
  var newDiv = document.createElement("div");
  // and give it some content 
  var newContent = document.createTextNode(impactObjects[0].name);
  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

function makeUL(array) {
  // Create the list element:
  var list = document.createElement('ul');

  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement('li');

    // Set its contents:
    item.appendChild(document.createTextNode(array[i]));

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}




// impactCategories.forEach((cat, i) => {
//   console.log(cat)
// })


var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", data_file);
oReq.send();