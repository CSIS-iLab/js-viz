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
  let formatValues = [];
  let howWhereValues = []
  let whereToSave = []
  let pro = []
  let cons = []
  let examples = []
console.log(rowData, "row data")
  rowData.forEach((element) => {
    // console.log(element, "element")
    
    formatValues.push(element[0]);
  });
  rowData.forEach((element) => {
    howWhereValues.push(element[1]);
  });
  rowData.forEach((element) => {
    whereToSave.push(element[2]);
  });
  rowData.forEach((element) => {
    pro.push(element[3]);
  });
  rowData.forEach((element) => {
    cons.push(element[4]);
  });
  rowData.forEach((element) => {
    examples.push(element[5]);
  });


  let iconId = [];

  formatValues.forEach((element) => {
    iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  });




  const addDataArraysToIconArrray = () => {
    icons.push(columnNames)
    icons.push(formatValues)
    icons.push(howWhereValues)
    icons.push(whereToSave)
    icons.push(pro)
    icons.push(cons)
    icons.push(examples)
    
  }
  addDataArraysToIconArrray()


let newIcons = [{}]
newIcons.push(columnNames[0])

// console.log(newIcons, "new")

columnNames.forEach(i => {
  formatValues.map(j => {
    icons.push({[i]:  j})
  })
})


// const strings = icons.map((o) => JSON.stringify(o))
// console.log(strings, "strings")
// const newArray = strings.map((s) => JSON.parse(s))
// console.log(newArray, "new Arr")
// console.log(icons)
  
// const result = {}
// icons.forEach((key, i) => result[key] = [columnNames[i]])
// console.log(result)


  // const obj = icons[0].reduce((accumulator, value) => {
  //   return {...accumulator, [value]: ''}
  // }, {})
  // console.log(obj)
  // console.log("icons", icons)

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
  console.log("column names: ", columnNames);
  // console.log("format values: ", formatValues);
  // console.log("where/ how: ", howWhereValues);
  // console.log("where to save: ", whereToSave);
  // console.log("pro: ", pro);
  // console.log("cons: ", cons);
  // console.log("examples: ", examples);
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