const ICONS = []
const CATEGORIES = []
const ICONS_BY_CATEGORY = []
const INFO = []
const URL = `https://content-sheets.googleapis.com/v4/spreadsheets/1YZ0D6cqMnk0kDCbtXcq2kp4hgUlGFCeUBnpjhbkgXAQ/values/Sheet1?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`

async function getData() {
  const RESPONSE = await fetch(URL)
  const DATA = await RESPONSE.json()

  if (DATA) {
    const columnNames = DATA.values.shift()
    DATA.values.forEach((element) => {
      ICONS.push({
        date: new Date(element[0]).toLocaleDateString("en-US"),
        category: element[1],
        id: element[2],
        name: element[3],
      });
      CATEGORIES.push(element[1])
    })
    const categories = getCategories(CATEGORIES)
    const dataFormatted = formatCategories('category')
    console.log(dataFormatted)
  }

  const wrapper = document.querySelector(".wrapper")

  function addTippy() {
    // console.log(ICONS)
    ICONS.forEach((icon) => {
      tippy('#' + icon.id , {
        // append to an Element
        appendTo: wrapper,
        content: `
          <div class="icon-container">
              <div class="tip-header">
                <h3 class="header">${icon.name}</h3>
              </div>
              <h3 class="title">Date launched:</h3>
              <p class="info"> ${icon.date}</p>
            </div>
        `,
        allowHTML: true,
        // trigger: "mouseenter",
        arrow: true,
        interactive: true,
        placement: "auto",
        followCursor: "initial",
      })
    })
  }
  addTippy();
}

function getCategories(categories) {
  return [...new Set(categories)]
}

function formatCategories(columnName) {
  const iconsLength =  ICONS.length
  const categoriesLength = columnName.length;
  var sortedData = {};

  for (var i = 0; i < iconsLength; i++) {
    var object = ICONS[i]

    if (Object.keys(sortedData).indexOf(object[columnName]) === -1) {
      console.log(object.date)
      sortedData[object[columnName]] = []
    }

    sortedData[object[columnName]].push(object)
  }

  return sortedData
}

document.addEventListener("DOMContentLoaded", (event) => {
  getData()
});
