let newURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const response = await fetch(newURL);
  const data = await response.json();

  let spreadsheetData = data;
  let rowData = spreadsheetData.values.slice(1);
  let columnNames = spreadsheetData.values[0];

  let rowNames = [];
  rowData.forEach((element) => {
    rowNames.push(element[0]);
  });

  let iconId = [];
  rowNames.forEach((element) => {
    iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  });

  function matchIds() {
    iconId.forEach((id) => {
      const imgElement = document.querySelector(`#${id}`);

      if (id === imgElement.id) {
        tippy("#" + "imgElement.id", {
          content:
            "<div class='tip-header'><p>" +
            columnNames +
            " </p><p>hiiiiiiiiii </p></div>",
          allowHTML: true,
          arrow: "false",
          interactive: "true",
          placement: "auto",
          trigger: "click",
        });
      }
    });
  }

  matchIds();

  console.log("spreadsheet data (our original data.values): ", spreadsheetData);
  console.log("column names: ", columnNames);
  console.log("row names: ", rowNames);
  console.log("icon IDs: ", iconId);

  return data;
}

getData();
