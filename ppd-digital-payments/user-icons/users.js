// const icons = [
//   {
//     id: 'cash',
//     format: "Cash",
//     howWhereToReceive: "Post office, Agents, Bank",
//   },
//   {
//     id: 'money-order',
//     format: "Money Order",
//     howWhereToReceive: "Post office, Agents, Bank",
//   },
//   {
//     id: 'cash-card',
//     format: "Cash Card",
//     howWhereToReceive: "Post office, Agents, Bank",
//   }
// ]
const icons = []

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

  const addDataArraysToIconArrray = () => {
    icons.push(columnNames)
    icons.push(rowNames)
    
  }
  addDataArraysToIconArrray()

  
// const result = {}
// icons.forEach((key, i) => result[key] = [columnNames[i]])
// console.log(result)


  const obj = icons[0].reduce((accumulator, value) => {
    return {...accumulator, [value]: ''}
  }, {})
  console.log(obj)
  console.log("icons", icons)

  function matchIds() {
    iconId.forEach((id) => {
      tippy("#" + id, {
         content: "<p> " + columnNames + "</p>",
         allowHTML: true,
         arrow: "false",
         interactive: "true",
         animation: 'fade',
         placement: "auto",
         
       })
     
     
    
    });
  }

  matchIds();

  // console.log("spreadsheet data (our original data.values): ", spreadsheetData);
  // console.log("column names: ", columnNames);
  // console.log("row names: ", rowNames);
  // console.log("icon IDs: ", iconId);

  return data;
}

getData();

addTippy()

function addTippy() {
  icons.forEach( icon => {
    tippy( "#" + icon.id, {
      content: "<h1>" + icon.format + "</h1>",
      allowHTML: true,
      arrow: "false",
      interactive: "true",
      placement: "auto",
      trigger: "click",
    })
  })
}