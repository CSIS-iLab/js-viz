const ICONS = []
const CATEGORIES = []
let windowWidthSize = 0;
const sortedData = {}
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
      })
      CATEGORIES.push(element[1])
    })
    const categories = getCategories(CATEGORIES)
    const dataFormatted = formatCategories('category')
    // console.log(dataFormatted)
  }

  const wrapper = document.querySelector(".wrapper")
  const interactive = document.querySelector(".interactive")
  const interactiveMobile = document.querySelector(".interactive-mobile")

  function addTippy() {
    console.log(interactive.classList)
    // const interactiveClassList = [...interactive.classList]
    // const interaactiveMobileClassList = [...interactiveMobile.classList]
    console.log(interactiveMobile.classList)
    if (windowWidthSize < 800) {
      console.log(window.innerWidth)
      // interactiveMobile.classList.add("hide");
      // interactive.classList.remove("hide");
      // if (!interactiveMobile.includes("hide")) {
      //   console.log(sortedData);
      // }
      // useData()
    } else {

      console.log("it's to big")
      interactiveMobile.classList.remove("hide");
      interactive.classList.add("hide");
      // if (!interactiveClassList.includes("hide")) {
        ICONS.forEach((icon) => {
          tippy("#" + icon.id, {
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
      // }
    }
  }
  addTippy()
}

function getCategories(categories) {
  return [...new Set(categories)]
}



function formatCategories(columnName) {
  const iconsLength =  ICONS.length
  const categoriesLength = columnName.length;

  for (var i = 0; i < iconsLength; i++) {
    var object = ICONS[i]

    if (Object.keys(sortedData).indexOf(object[columnName]) === -1) {
      sortedData[object[columnName]] = []
    }

    sortedData[object[columnName]].push(object)
  }
  for (let key in sortedData) {
    sortedData[key].sort( ( a, b ) => new Date( b.date ) - new Date( a.date ) )
  }
  return sortedData
}

document.addEventListener("DOMContentLoaded", (event) => {
  getData()
});

window.addEventListener('resize', function(e) {
  windowWidthSize = window.innerWidth
}) 
