const icons = [];

let newURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const response = await fetch(newURL);
  const data = await response.json();

let rowNames = [];
  data.values.slice(1).forEach((element) => {
    rowNames.push(element[0]);
  });

let iconId = [];
  rowNames.forEach((element) => {
    iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  });

for (let i = 1; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
      console.log(i, j, data.values[i][j]);
    }
  }

const makeFinalObject = () => {
  for (let i = 1; i < 6; i++) {
    icons[i - 1] = {
      id: iconId[i - 1],
      format: data.values[i][0],
      howWhereToReceive: data.values[i][1],
      whereToSave: data.values[i][2],
      pros: data.values[i][3],
      cons: data.values[i][4],
      examples: data.values[i][5],
    };
  }
};

makeFinalObject();

function addTippy() {
  icons.forEach((icon) => {
    tippy("#" + icon.id, {
        content: `  <div class="icon-container">
              <div class="tip-header">
                <img src='icons/${icon.id}.png' alt='Icon' class='tip-icon' />
                <h3 class="header">${icon.format}</h3>
              </div>
              <h3 class="title">How/Where to receive</h3>
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

getData();
