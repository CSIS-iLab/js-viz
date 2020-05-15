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
    let width = '30'
    let height = '30'
    let containerWidth = (impact.countries.length + 1) * width + 'px'

    let tip = impact.name + '<br/>' + impact.countries

    // Create div for each impact level
    let newDiv = document.createElement("div")
    newDiv.setAttribute('id', impactID)
    newDiv.setAttribute('class', 'impact-container')
    newDiv.setAttribute('data-tippy-content', tip)
    newDiv.style.width = containerWidth
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
      item.setAttribute('class', ' list country')
      item.setAttribute('id', country.toLowerCase())
      item.style.width = width + 'px'
      item.style.height = height + 'px'
      list.appendChild(item)
    })

    // Add total to list
    let total = document.createElement('li')
    total.setAttribute('class', 'list total')
    total.innerHTML = impact.countries.length
    list.appendChild(total)

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