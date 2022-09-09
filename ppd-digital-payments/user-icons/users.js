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
const icons = [];

let newURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

async function getData() {
  const response = await fetch(newURL);
  const data = await response.json();

  // get our row names (cash, money order)
  let rowNames = [];
  data.values.slice(1).forEach((element) => {
    rowNames.push(element[0]);
  });

  // turn them into HTML Ids
  let iconId = [];
  rowNames.forEach((element) => {
    iconId.push(element.toLowerCase().replaceAll(" ", "-"));
  });

  // create array to hold our objects

  // figure out how tf the nested loop/2D array works
  console.log("[i][j]");
  console.log(data.values[0][0], "0 0");

  console.log(data.values[1][1]);
  console.log(data.values[2][0]);
  console.log(data.values[3][0]);
  console.log("------------");

  for (let i = 1; i < 6; i++) {
    
    for (let j = 0; j < 6; j++) {
      console.log(i, j, data.values[i][j]);
    }
  }

  // build the object
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

  console.log(icons);

  function addTippy() {
    icons.forEach((icon) => {
      tippy("#" + icon.id, {
        // content: `<h1 style="color:black;">${icon.format}</h1>`,
        content: `<div class='tip-header' style="color:black;"><> Format: ${icon.format}</div>`,
        allowHTML: true,
        arrow: "false",
        interactive: "true",
        placement: "auto",
        trigger: "click",
      });
    });
  }
  addTippy();
}

getData();
// const icons = []

// let newURL = `https://content-sheets.googleapis.com/v4/spreadsheets/1H5JH0nsefgXAkGE6VRLUi1H50d0m4IeZBfJNZ-avEaI/values/channels-to-deliver-G2P?key=AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4&majorDimension=ROWS`;

// async function getData() {
//   const response = await fetch(newURL);
//   const data = await response.json();

//   let spreadsheetData = data;
//   let rowData = spreadsheetData.values.slice(1);
//   let columnNames = spreadsheetData.values[0];
//   let formatValues = [];
//   let howWhereValues = []
//   let whereToSave = []
//   let pro = []
//   let cons = []
//   let examples = []
// console.log(spreadsheetData.values)
//   rowData.forEach((element) => {
//     // console.log(element, "element")
    
//     formatValues.push(element[0]);
//   });
//   rowData.forEach((element) => {
//     howWhereValues.push(element[1]);
//   });
//   rowData.forEach((element) => {
//     whereToSave.push(element[2]);
//   });
//   rowData.forEach((element) => {
//     pro.push(element[3]);
//   });
//   rowData.forEach((element) => {
//     cons.push(element[4]);
//   });
//   rowData.forEach((element) => {
//     examples.push(element[5]);
//   });


//   let iconId = [];

//   formatValues.forEach((element) => {
//     iconId.push(element.toLowerCase().replaceAll(" ", "-"));
//   });

// console.log(iconId)


//   const addDataArraysToIconArrray = () => {
//     icons.push(columnNames)
//     icons.push(formatValues)
//     icons.push(howWhereValues)
//     icons.push(whereToSave)
//     icons.push(pro)
//     icons.push(cons)
//     icons.push(examples)
    
//   }
//   addDataArraysToIconArrray()

// // let obj = spreadsheetData.values.map(({id, iconId}) => ({[id]: iconId}))
// // console.log(obj)

// // formatValues.forEach((element, index) => {
// //   obj[columnNames[0] + index] = element

// // })
// // console.log(obj)
// // const firstFormVal = formatValues[0] 
// // let obj = {}
// // for (const key of iconId) {
// //   obj[key] = spreadsheetData.values 
  
// // }
// // console.log(obj)

// //filter out things i don't want!!!!!
// // const obj = Object.fromEntries(
// //   iconId.map(value => [spreadsheetData.values, value])
// // )

// // console.log(obj, "creating obj")



// // console.log(newIcons, "new")

// iconId.forEach(i => {
 
//   spreadsheetData.values.map(j => {
//     icons.push({[i]:  j})
//   })
// })
// // console.log(icons, "icons array")


// // const strings = icons.map((o) => JSON.stringify(o))
// // console.log(strings, "strings")
// // const newArray = strings.map((s) => JSON.parse(s))
// // console.log(newArray, "new Arr")
// // console.log(icons)
  



//   // const obj = iconId.reduce((accumulator, value) => {
//   //   return {...accumulator, [value]: spreadsheetData.values}
//   // }, {})
//   // console.log(obj)
//   // console.log("icons", icons)

//   function matchIds() {
//     iconId.forEach((id) => {
//       tippy("#" + id, {
//          content: "<p> " + columnNames + "</p>",
//          allowHTML: true,
//          arrow: "false",
//          interactive: "true",
//          animation: 'fade',
//          placement: "auto",
         
//        })
     
     
    
//     });
//   }

//   matchIds();

//   // console.log("spreadsheet data (our original data.values): ", spreadsheetData);
//   // console.log("column names: ", columnNames);
//   // console.log("format values: ", formatValues);
//   // console.log("where/ how: ", howWhereValues);
//   // console.log("where to save: ", whereToSave);
//   // console.log("pro: ", pro);
//   // console.log("cons: ", cons);
//   // console.log("examples: ", examples);
//   // console.log("icon IDs: ", iconId);

//   return data;
// }

// getData();

// addTippy()

// function addTippy() {
//   icons.forEach( icon => {
//     tippy( "#" + icon.id, {
//       content: "<h1>" + icon.format + "</h1>",
//       allowHTML: true,
//       arrow: "false",
//       interactive: "true",
//       placement: "auto",
//       trigger: "click",
//     })
//   })
// }