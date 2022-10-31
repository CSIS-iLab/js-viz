const ICONS = [];

const URL = `https://content-sheets.googleapis.com/v4/spreadsheets/1YZ0D6cqMnk0kDCbtXcq2kp4hgUlGFCeUBnpjhbkgXAQ/values/Sheet1?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const RESPONSE = await fetch(URL)
  const DATA = await RESPONSE.json()

  if (DATA) {
    const columnNames = DATA.values.shift()
    DATA.values.forEach((element) => {
      ICONS.push({
        date: element[0],
        category: element[1],
        id: element[2],
        name: element[3]
      })
    })
  }

  const missileChart = document.querySelector('#missileSVG')
  const wrapper = document.querySelector(".wrapper")

  function addTippy() {
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

document.addEventListener("DOMContentLoaded", (event) => {
  getData()
});
