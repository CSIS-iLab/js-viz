const ICONS = [];

const URL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const RESPONSE = await fetch(URL);
  const DATA = await RESPONSE.json();

  let rowNames = [];
  DATA.values.slice(1).forEach((element) => {
    rowNames.push(element[0]);
  });

  let iconId = [];
  rowNames.forEach((element) => {
    iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  });

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

  MAKE_FINAL_OBJECT();

  function addTippy() {
    ICONS.forEach((icon) => {
      tippy("#" + icon.id, {
        content: `  <div class="icon-container">
              <div class="tip-header">
                <img src='icons/${icon.id}.png' alt='Icon' class='tip-icon' />
                <h3 class="header">${icon.format}</h3>
              </div>
              <h3 class="title">How/where to receive</h3>
              <p class="info">${icon.howWhereToReceive}</p>
              <h3 class="title">Where to save</h3>
              <p class="info"> ${icon.whereToSave}</p>
              <h3 class="title">Examples</h3>
              <p class="info"> ${icon.examples}</p>
              <h3 class="title">Cons</h3>
              <p class="info"> ${icon.cons}</p>
              <h3 class="title">Pros</h3>
              <p class="info"> ${icon.pros}</p> 
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
  addTippy();
}

document.addEventListener("DOMContentLoaded", (event) => {
  getData();
});
