const ICONS = [];

const URL = `https://content-sheets.googleapis.com/v4/spreadsheets/1YZ0D6cqMnk0kDCbtXcq2kp4hgUlGFCeUBnpjhbkgXAQ/values/Sheet1?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const RESPONSE = await fetch(URL)
  const DATA = await RESPONSE.json()

  if (DATA) {
    console.log(DATA)
    let rowNames = []
    const columnNames = DATA.values.shift()
    const columnNamesLength = columnNames.length
    console.log(columnNamesLength)
    // console.log(columnNames)
    console.log(DATA.values[0])
    DATA.values.forEach((element) => {
      ICONS.push({
        date: element[0],
        category: element[1],
        id: element[2],
      })
      // console.log('im outsie now')
    })
    console.log(rowNames)
    console.log(ICONS)
  }

  // let iconId = [];
  // rowNames.forEach((element) => {
  //   iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  // });
  const missileChart = document.querySelector('#missileSVG')
  // const svg = missileChart.contentDocument.querySelector("#Cruise6")
  // console.log(svg)
  

  const MAKE_FINAL_OBJECT = () => {
    for (let i = 1; i < 6; i++) {
      ICONS[i - 1] = {
        id: iconId[i - 1],
        format: DATA.values[i][0],
        howWhereToReceive: DATA.values[i][1],
        whereToSave: DATA.values[i][2],
        pros: DATA.values[i][3],
        cons: DATA.values[i][4],
        examples: DATA.values[i][5],
      };
    }
  };

  if (missileChart) {
    ICONS.forEach( icon => {
      // getMissileByID(icon.id)
      console.log(icon.id);
      tippy("#" + icon.id, {
        content: `
          <div class="icon-container">
              <div class="tip-header">
                <h3 class="header">${icon.id}</h3>
              </div>
              <h3 class="title">Category</h3>
              <p class="info">${icon.category}</p>
              <h3 class="title">Date launched:</h3>
              <p class="info"> ${icon.date}</p>
            </div>
        `,
        allowHTML: true,
        arrow: true,
        interactive: true,
        placement: "auto",
        followCursor: "initial",
      });
    })
  }

  function getMissileByID(id) {
    const missile = missileChart.contentDocument.querySelector('#' + id)
    console.log(missile)
  }

  // MAKE_FINAL_OBJECT()

  function addTippy() {
    console.log('inside addTippy');
    if (missileChart) {
      console.log('inside missileChart');
      
      ICONS.forEach((icon) => {
        // getMissileByID(icon.id)
        console.log('inside icon');
        tippy("#" + icon.id, {
          content: `
            <div class="icon-container">
                <div class="tip-header">
                  <h3 class="header">${icon.id}</h3>
                </div>
                <h3 class="title">Category</h3>
                <p class="info">${icon.category}</p>
                <h3 class="title">Date launched:</h3>
                <p class="info"> ${icon.date}</p>
              </div>
          `,
          allowHTML: true,
          arrow: true,
          interactive: true,
          placement: "auto",
          followCursor: "initial",
        });
      });
    }
    // ICONS.forEach((icon) => {
    //   tippy("#" + icon.id, {
    //     content: `  <div class="icon-container">
    //           <div class="tip-header">
    //             <img src='icons/${icon.id}.png' alt='Icon' class='tip-icon' />
    //             <h3 class="header">${icon.format}</h3>
    //           </div>
    //           <h3 class="title">How/where to receive</h3>
    //           <p class="info">${icon.howWhereToReceive}</p>
    //           <h3 class="title">Where to save</h3>
    //           <p class="info"> ${icon.whereToSave}</p>
    //           <h3 class="title">Examples</h3>
    //           <p class="info"> ${icon.examples}</p>
    //           <h3 class="title">Cons</h3>
    //           <p class="info"> ${icon.cons}</p>
    //           <h3 class="title">Pros</h3>
    //           <p class="info"> ${icon.pros}</p> 
    //         </div>
    //       `,
    //     allowHTML: true,
    //     arrow: true,
    //     interactive: true,
    //     placement: "auto",
    //     followCursor: "initial",
    //   });
    // });
  }
  addTippy();
}

document.addEventListener("DOMContentLoaded", (event) => {
  getData()
});
