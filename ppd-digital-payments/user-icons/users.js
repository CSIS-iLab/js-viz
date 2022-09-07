var test 
const icons = []
let columnTitles = []
let rowTitles = []
let iconId = []
let data = []
const URL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`

async function getData() {
  // function getPromise() {
  const response = await fetch(URL)
  if (!response.ok)
    throw new Error(`HTTP error: ${response.status}`)
  const data = await response.json()
  // console.log(data.values)
  return data.values
  // fetch(URL)
  //   .then((response) => {
  //     // res.json()
  //     // Our handler throws an error if the request did not succeed.
  //     if (!response.ok) {
  //       throw new Error(`HTTP error: ${response.status}`);
  //     }
  //     // Otherwise (if the response succeeded), our handler fetches the response
  //     // as text by calling response.text(), and immediately returns the promise
  //     // returned by `response.text()`.
  //     return response.json();
  //   })
  //   .then( ( data ) => getRowTitles( data.values ) )
  //   .catch( ( error ) => console.log( `Could not fetch the data. Error: ${error}`) )
  // We need to find the cash icon and add the content for the cash icon into the box when we click on the icon 
}

function createKeys(data, columnTitles) {
  let dataLength = data.length
  for (let index = 0; index < dataLength; index++) {
    console.log(index);
    let test = 0
    columnTitles.forEach( ( element ) => {
      console.log('test: ', test++)
      console.log(element)
      icons.push({[`${transformToLowerCaseRemoveSpaces(element)}`]: ""})
    })
  }
}

function getRowTitles( data ) {
  // console.log( data )
  columnTitles = data.shift()
  console.log(columnTitles)
  // insert keys into each element of the array
  createKeys(data, columnTitles)
  // console.log(data.length)
  // data.forEach( (element, index) => {
  //   // rowTitles.push( element[0] )
  //   icons[`${transformToLowerCaseRemoveSpaces(element[0])}`] = element[1]
  //   icons.push({
  //     // group: element[1],
  //     // title: matchingRowTitlesToId(element[0]),
  //     // subtitle:,
  //     allowHTML: true,
  //     arrow: "false",
  //     interactive: "true",
  //     placement: "auto",
  //     trigger: "click",
  //   })
  // //   matchingRowTitlesToId(element[0])
  // } )
  console.log(icons)
  //console.log("row titles array", rowTitles)
}

function transformToLowerCaseRemoveSpaces(string) {
  return string.toLowerCase().replaceAll( ' ', '-' )
}
  
function matchingRowTitlesToId(rowTitle) {
  iconId.push(rowTitle.toLowerCase().replaceAll(' ', '-'))
  // console.log("Icon id: ", iconId)
  return rowTitle.toLowerCase().replaceAll(' ', '-')
  // matchIds(columnTitles)
}
  
async function init() {
  try {
    data = await getData()
  } catch (error) {
    console.error("Error: ", error)
  }
  getRowTitles(data)
}

// console.log("row titles: ", rowTitles)
// console.log("column titles: ", columnTitles)

function matchIds() {
  // iconID is an array with IDs that we need to check on our HTML
  // console.log(columnTitles)
  iconId.forEach( id => {
  })
  
}
  

window.addEventListener("DOMContentLoaded", init);
