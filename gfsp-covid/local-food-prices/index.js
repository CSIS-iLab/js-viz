const data_file = '05122020-data.json'
let impactCategories = {}
let impactObjects = {}
let str = '<h2>'


function reqListener() {
  let data = JSON.parse(this.responseText)

  data.forEach((row, i) => {
    let impact = row.impact
    let country = row.country

    // Create object for each impact level
    impactCategories[impact] = impactCategories[impact] || {
      name: impact,
      countries: []
    }

    // Add countries to array in impact object
    impactCategories[impact].countries.push(country)

  });

  // Remove object keys
  impactObjects = Object.values(impactCategories)


  impactObjects.forEach(impact => {
    let impactID = impact.name.split(" ")[0].toLowerCase()

    console.log(impact)
    let tip = impact.name + '<br/>' + impact.countries

    // Create div for each impact level
    let newDiv = document.createElement("div")
    newDiv.setAttribute('id', impactID)
    newDiv.setAttribute('class', 'impact-div')
    newDiv.setAttribute('data-tippy-content', tip)
    // newDiv.setAttribute('data-tippy-content', impact.countries)

    // Add impact level as header to div
    let newH2 = document.createElement("h2")
    newH2.innerHTML = impact.name
    newDiv.appendChild(newH2)

    // Create ul for countries
    let list = document.createElement("ul")

    // Add li/div for each country in this impact level
    impact.countries.forEach(country => {
      let item = document.createElement('li')
      item.setAttribute('class', 'country')
      item.setAttribute('id', country.toLowerCase())
      list.appendChild(item)
    })
    // Add list to impact div
    newDiv.appendChild(list)
    // Add impact divs to body
    document.body.appendChild(newDiv)
  })
  tippy('[data-tippy-content]', {
    delay: [100, 200],
  })
}





var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", data_file);
oReq.send();