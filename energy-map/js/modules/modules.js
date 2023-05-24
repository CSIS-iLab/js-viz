export const meow = () => {
  console.log("meow");
};

export const test = (value) => {
  console.log(value);
};
/* -------------------------------------------------------------------------- */
/*                              make commodityIds                             */
/* -------------------------------------------------------------------------- */
export const makeCommodityIds = (commodityColumnHeadings) => {
  let commodityIds = [];

  commodityColumnHeadings.forEach((element) => {
    // add heading name as-is to IDs
    commodityIds.push(element.slice(0, -7));
  });

  return commodityIds;
};

export const makeCommodityNames = (commodityColumnHeadings) => {
  let commodityNames = [];

  commodityColumnHeadings.forEach((element) => {
    // process ID to get formatted name for Names list
    let processedCommodity = element.slice(0, -7).split(/(?=[A-Z])/);
    let word =
      processedCommodity[0].charAt(0).toUpperCase() +
      processedCommodity[0].slice(1);
    processedCommodity[0] = word;

    let final = processedCommodity.join(" ");
    commodityNames.push(final);
  });

  return commodityNames;
};

/* -------------------------------------------------------------------------- */
/*                        find setExtremes max for zoom                       */
/* -------------------------------------------------------------------------- */
const roundOffTo = (num, factor) => {
  const quotient = num / 100000;
  const res = Math.round(quotient) * factor;
  return res;
};
export const setExtremeMax = (arr) => {
  var i = arr.length;
  while (i--) {
    if (arr[i] === 0) {
      arr.splice(i, 1);
    }
  }

  arr.sort(function (a, b) {
    return a - b;
  });

  // add 100k to arr[0] in case it's small
  let increasedMax = arr[0] + 100000;
  let roundedMax = roundOffTo(increasedMax, 100000);
  return roundedMax;
};

/* -------------------------------------------------------------------------- */
/*             make objects for finding import and export rankings            */
/* -------------------------------------------------------------------------- */

export const makeObj1 = (stateName, row) => {
  // create what we need to get export rankings later
  const obj1 = {
    name: stateName,
    data: row.slice(2, 9),
  };

  return obj1;
};

// create what we need to get import rankings later
export const makeObj2 = (stateName, row) => {
  const obj2 = {
    name: stateName,
    data: row.slice(9, 16),
  };

  return obj2;
};

/* -------------------------------------------------------------------------- */
/*                       make object to push to allData                       */
/* -------------------------------------------------------------------------- */
export const makeObj3 = (
  stateName,
  row,
  importExtremeMax,
  exportExtremeMax
) => {
  let coalExports = row[2];
  let crudeOilExports = row[3];
  let electricityExports = row[4];
  let fuelEthanolExports = row[5];
  let naturalGasExports = row[6];
  let rppExports = row[7];
  let uraniumExports = row[8];
  let coalImports = row[9];
  let crudeOilImports = row[10];
  let electricityImports = row[11];
  let fuelEthanolImports = row[12];
  let naturalGasImports = row[13];
  let rppImports = row[14];
  let uraniumImports = row[15];

  const obj3 = {
    name: stateName,
    imports: {
      name: stateName,
      extremeMax: importExtremeMax,
      data: [
        {
          name: "Coal",
          drilldown: "Coal Imports",
          isDrilldown: "False",
          y: coalImports,
        },
        {
          name: "Crude Oil",
          drilldown: "Crude Oil Imports",
          isDrilldown: "False",
          y: crudeOilImports,
        },
        {
          name: "Electricity",
          drilldown: "Electricity Imports",
          isDrilldown: "False",
          y: electricityImports,
        },
        {
          name: "Fuel Ethanol",
          drilldown: "Fuel Ethanol Imports",
          isDrilldown: "False",
          y: fuelEthanolImports,
        },
        {
          name: "Natural Gas",
          drilldown: "Natural Gas Imports",
          isDrilldown: "False",
          y: naturalGasImports,
        },
        {
          name: "RPP",
          drilldown: "RPP Imports",
          isDrilldown: "False",
          y: rppImports,
        },
        {
          name: "Uranium",
          drilldown: "Uranium Imports",
          isDrilldown: "False",
          y: uraniumImports,
        },
      ],
    },
    exports: {
      name: stateName,
      extremeMax: exportExtremeMax,
      data: [
        {
          name: "Coal",
          drilldown: "coal",
          isDrilldown: "False",
          y: coalExports,
        },
        {
          name: "Crude Oil",
          drilldown: "crudeOil",
          isDrilldown: "False",
          y: crudeOilExports,
        },
        {
          name: "Electricity",
          drilldown: "electricity",
          isDrilldown: "False",
          y: electricityExports,
        },
        {
          name: "Fuel Ethanol",
          drilldown: "fuelEthanol",
          isDrilldown: "False",
          y: fuelEthanolExports,
        },
        {
          name: "Natural Gas",
          drilldown: "naturalGas",
          isDrilldown: "False",
          y: naturalGasExports,
        },
        {
          name: "RPP",
          drilldown: "rpp",
          isDrilldown: "False",
          y: rppExports,
        },
        {
          name: "Uranium",
          drilldown: "uranium",
          isDrilldown: "False",
          y: uraniumExports,
        },
      ],
    },
    importDrilldown: [],
    exportDrilldown: [],
  };

  return obj3;
};

/* -------------------------------------------------------------------------- */
/*                    sort exports and imports by commodity                   */
/* -------------------------------------------------------------------------- */

export const makeExportRankingValues = (exportStateRankings, stateName) => {
  // Add state's rank in each category to an array, add array to state's data
  let exportRankingValues = [
    exportStateRankings.coal.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.crudeOil.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.electricity.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.fuelEthanol.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.naturalGas.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.rpp.findIndex((x) => x.name === stateName) + 1,
    exportStateRankings.uranium.findIndex((x) => x.name === stateName) + 1,
  ];

  return exportRankingValues;
};

export const makeImportRankingvalues = (importStateRankings, stateName) => {
  let importRankingValues = [
    importStateRankings.coal.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.crudeOil.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.electricity.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.fuelEthanol.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.naturalGas.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.rpp.findIndex((x) => x.name === stateName) + 1,
    importStateRankings.uranium.findIndex((x) => x.name === stateName) + 1,
  ];

  return importRankingValues;
};

/* -------------------------------------------------------------------------- */
/*                            make drilldown series                           */
/* -------------------------------------------------------------------------- */

export const makeExportDrilldownSeries = (
  top10Exports,
  commodityNames,
  commodityIds
) => {
  let exportDrilldownSeries = [];

  for (let i = 0; i < top10Exports.length; i++) {
    let exportData = [];

    for (let j = 0; j < top10Exports[i].length; j++) {
      let obj2 = {
        name: top10Exports[i][j].name,
        y: top10Exports[i][j].data[i],
        color: "#6a041d",
      };
      exportData.push(obj2);
    }

    let obj = {
      name: commodityNames[i],
      id: commodityIds[i],
      data: exportData,
    };
    exportDrilldownSeries.push(obj);
  }

  return exportDrilldownSeries;
};

export const makeImportDrilldownSeries = (
  top10Imports,
  commodityNames,
  commodityIds
) => {
  let importDrilldownSeries = [];

  for (let i = 0; i < top10Imports.length; i++) {
    let importData = [];

    for (let j = 0; j < top10Imports[i].length; j++) {
      let obj2 = {
        name: top10Imports[i][j].name,
        y: top10Imports[i][j].data[i],
        color: "#6a041d",
      };
      importData.push(obj2);
    }

    let obj = {
      name: commodityNames[i],
      id: commodityIds[i],
      data: importData,
    };
    importDrilldownSeries.push(obj);
  }

  return importDrilldownSeries;
};

export const addExportDrilldownSeriesToAllData = (
  allData,
  commodityIds,
  commodityNames,
  exportDrilldownSeries
) => {
  var obj = {};
  // i -> go through each state
  for (let i = 0; i < allData.length; i++) {
    // j -> go through each commodity
    for (let j = 0; j < 7; j++) {
      commodityIds;
      // grab the commodity y value for the state
      obj = {
        name: allData[i].name,
        y: allData[i].exports.data[j].y,
        color: "#F5B841",
      };

      // the array of the top10 states for that commodity
      let top10 = structuredClone(exportDrilldownSeries[j].data);

      // go through each value of the commodity array
      for (let k = 0; k < top10.length; k++) {
        // if that value is for the state you're on
        if (top10[k].name == allData[i].name) {
          top10[k].color = "#F5B841";
        }
      }

      // if the array includes the state we're looking at
      if (top10.some((value) => value.name == allData[i].name)) {
        // add that array to the drilldown as is

        let temp = {
          name: commodityNames[j],
          id: commodityIds[j],
          data: top10,
        };

        allData[i].exportDrilldown.push(temp);
      } else {
        let array = [...top10, obj];

        let temp = {
          name: commodityNames[j],
          id: commodityIds[j],
          data: array,
        };

        allData[i].exportDrilldown.push(temp);
      }
    }
  }

  return allData;
};

export const addImportDrilldownSeriesToAllData = (
  allData,
  commodityIds,
  commodityNames,
  importDrilldownSeries
) => {
  var obj = {};
  // i -> go through each state
  for (let i = 0; i < allData.length; i++) {
    // j -> go through each commodity
    for (let j = 0; j < 7; j++) {
      commodityIds;
      // grab the commodity y value for the state
      obj = {
        name: allData[i].name,
        y: allData[i].imports.data[j].y,
        color: "#F5B841",
      };

      // the array of the top10 states for that commodity
      let top10 = structuredClone(importDrilldownSeries[j].data);

      // go through each value of the commodity array
      for (let k = 0; k < top10.length; k++) {
        // if that value is for the state you're on
        if (top10[k].name == allData[i].name) {
          top10[k].color = "#F5B841";
        }
      }

      // if the array includes the state we're looking at
      if (top10.some((value) => value.name == allData[i].name)) {
        // add that array to the drilldown as is

        let temp = {
          name: commodityNames[j],
          id: commodityIds[j],
          data: top10,
        };

        allData[i].importDrilldown.push(temp);
      } else {
        let array = [...top10, obj];

        let temp = {
          name: commodityNames[j],
          id: commodityIds[j],
          data: array,
        };

        allData[i].importDrilldown.push(temp);
      }
    }
  }

  return allData;
};

/* -------------------------------------------------------------------------- */
/*                               label formatter                              */
/* -------------------------------------------------------------------------- */

export const labelMaker = (value) => {
  if (value >= 1000000000) {
    return "$" + value / 1000000000 + "B";
  } else if (value >= 1000000) {
    return "$" + value / 1000000 + "M";
  } else if (value >= 1000) {
    return "$" + value / 1000 + "K";
  } else {
    return "$" + value;
  }
};

/* -------------------------------------------------------------------------- */
/*                              tooltipFormatters                             */
/* -------------------------------------------------------------------------- */

/* ------------------------------- yFormatter ------------------------------- */
export const formatY = (yValue) => {
  let y = "";
  if (yValue >= 1000000000) {
    y = "$" + parseFloat((yValue / 1000000000).toFixed(2)) + "B";
    return y;
  } else if (yValue >= 1000000) {
    y = "$" + parseFloat((yValue / 1000000).toFixed(2)) + "M";
    return y;
  } else if (yValue >= 1000) {
    y = "$" + parseFloat((yValue / 1000).toFixed(2)) + "K";
    return y;
  } else {
    y = "$" + yValue;
    return y;
  }
};

export const drilldownTooltipTableRow = (rank, color, name, yValue) => {
  return `<tr><td>${rank}</td><td style="color:${color}; font-weight: bold;">${name}</td><td>${yValue}</td></tr>`;
};

export const drilldownTooltipTable = (drilldownData) => {
  let output = "";

  for (let i = 0; i < drilldownData.length; i++) {
    let yFormatted = formatY(drilldownData[i].y);

    output += drilldownTooltipTableRow(
      i + 1,
      drilldownData[i].color,
      drilldownData[i].name,
      yFormatted
    );
  }

  return `<table><tr><th>Rank</th><th>State</th><th>Total</th></tr>${output}</table>`;
};

export const tooltipTableRow = (color, commodity, yValue, rank) => {
  return `<tr><td style="color:${color}; font-weight: bold;">${commodity}</td><td>${rank}</td><td>${yValue}</td></tr>`;
};

export const tooltipTable = (
  exportImport,
  colors,
  exportTooltipData,
  importTooltipData,
  rankingValues
) => {
  let output = "";

  if (exportImport == "export") {
    for (let i = 0; i < exportTooltipData.length; i++) {
      let yFormatted = formatY(exportTooltipData[i].y);
      output += tooltipTableRow(
        colors[i],
        exportTooltipData[i].name,
        yFormatted,
        rankingValues[i]
      );
    }
  } else {
    for (let i = 0; i < importTooltipData.length; i++) {
      let yFormatted = formatY(importTooltipData[i].y);
      output += tooltipTableRow(
        colors[i],
        importTooltipData[i].name,
        yFormatted,
        rankingValues[i]
      );
    }
  }

  return `<table><tr><th>Commodity</th><th>Rank</th><th>Total</th><tr><td colspan="3" height="1px" style="border-bottom: 1px solid; border-bottom-color: #808080"></td></tr></tr>${output}</table>`;
};
