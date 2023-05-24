import * as helpers from "./modules/modules.js";
/* -------------------------------------------------------------------------- */
/*                             Set up data storage                            */
/* -------------------------------------------------------------------------- */
let allData = [];
let exportDataToSort = [];
let importDataToSort = [];
let exportImport = "export";
let year = 2020;

helpers.meow();

/******STATE INDEX needs to come from map/state we're hovering over******/
let stateIndex = 44;
/***********************************************************************/

// font to make it look like Flourish, colors
Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: "Source Sans Pro",
    },
  },
  colors: [
    "#001219",
    "#005f73",
    "#0a9396",
    "#94d2bd",
    "#fdbf45",
    "#ee9b00",
    "#ca6702",
  ],
});

/* -------------------------------------------------------------------------- */
/*                          Parse data for highcharts                         */
/* -------------------------------------------------------------------------- */
Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  googleSpreadsheetKey: "19uN6jYmrvuXwwrcOnwpTlQSJAEYP9gH6TQdq3Jn4z94",
  googleSpreadsheetRange: "Sheet1",
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    /* ------------------ make lists of commodity IDs, names ---------------- */
    let commodityColumnHeadings = columns[0].slice(2, 9);

    let commodityIds = helpers.makeCommodityIds(commodityColumnHeadings);
    let commodityNames = helpers.makeCommodityNames(commodityColumnHeadings);
    let exportExtremeMax;
    let importExtremeMax;

    /* ------------------------- Make allData object ------------------------ */
    // function also creates export and import lists to sort
    function makeAllData(columns) {
      for (let i = 1; i < columns.length; i++) {
        const row = columns[i];
        let stateName = row[0];

        let stateExportsArray = row.slice(2, 9);
        let stateImportsArray = row.slice(9, 16);
        exportExtremeMax = helpers.setExtremeMax(stateExportsArray);
        importExtremeMax = helpers.setExtremeMax(stateImportsArray);

        // create what we need to get export rankings later
        const obj1 = helpers.makeObj1(stateName, row);
        exportDataToSort.push(obj1);

        // create what we need to get import rankings later
        const obj2 = helpers.makeObj2(stateName, row);
        importDataToSort.push(obj2);

        // create item that goes in final allData list
        const obj3 = helpers.makeObj3(
          stateName,
          row,
          importExtremeMax,
          exportExtremeMax
        );
        allData.push(obj3);
      }
    }
    makeAllData(columns);
    /* ---------------------- Sort states by commodity ---------------------- */
    let exportStateRankings = {};
    let importStateRankings = {};

    const sortStatesByCommodity = () => {
      for (let i = 0; i < commodityIds.length; i++) {
        /* process exports*/
        let exportDataToSortCopy = JSON.parse(JSON.stringify(exportDataToSort));
        let exportRankingValues = exportDataToSortCopy.sort(
          (a, b) => a.data[i] - b.data[i]
        );
        let exportReverse = exportRankingValues.reverse();
        Object.assign((exportStateRankings[commodityIds[i]] = exportReverse));

        exportDataToSortCopy = "";
        exportRankingValues = "";
        exportReverse = "";

        /* process imports*/
        let importDataToSortCopy = JSON.parse(JSON.stringify(importDataToSort));

        let importRankingValues = importDataToSortCopy.sort(
          (a, b) => a.data[i] - b.data[i]
        );
        let importReverse = importRankingValues.reverse();
        Object.assign((importStateRankings[commodityIds[i]] = importReverse));

        importDataToSortCopy = "";
        exportRankingValues = "";
        exportReverse = "";
      }
    };
    sortStatesByCommodity();

    /* ------------------------- find state ranking ------------------------- */
    const findStateRanking = () => {
      for (let i = 0; i < allData.length; i++) {
        let stateName = allData[i].name;

        // Add state's rank in each category to an array, add array to state's data
        let exportRankingValues = helpers.makeExportRankingValues(
          exportStateRankings,
          stateName
        );
        let importRankingValues = helpers.makeImportRankingvalues(
          importStateRankings,
          stateName
        );

        Object.assign(
          (allData[i].exports["rankingValues"] = exportRankingValues)
        );
        Object.assign(
          (allData[i].imports["rankingValues"] = importRankingValues)
        );
      }
    };
    findStateRanking();

    /* ---------------------------------------------------------------------- */
    /*                                Drilldown                               */
    /* ---------------------------------------------------------------------- */
    let top10Exports = Object.entries(exportStateRankings)
      .slice(0)
      .map((entry) => entry[1].slice(0, 10));
    let top10Imports = Object.entries(importStateRankings)
      .slice(0)
      .map((entry) => entry[1].slice(0, 10));
    /* ------------------------ make drillown series ------------------------ */
    let exportDrilldownSeries = helpers.makeExportDrilldownSeries(
      top10Exports,
      commodityNames,
      commodityIds
    );

    let importDrilldownSeries = helpers.makeImportDrilldownSeries(
      top10Imports,
      commodityNames,
      commodityIds
    );

    /* ------------------- add drilldown series to states ------------------- */
    helpers.addExportDrilldownSeriesToAllData(
      allData,
      commodityIds,
      commodityNames,
      exportDrilldownSeries
    );

    helpers.addImportDrilldownSeriesToAllData(
      allData,
      commodityIds,
      commodityNames,
      importDrilldownSeries
    );
    /* ---------------------------- Render chart ---------------------------- */
    // going to default to starting with export data for now
    renderChart(allData[stateIndex], exportImport, year, false);
  },
});

//importExport must be capitalized Import or Export
function renderChart(data, exportImport, year, extremeFlag) {
  if (exportImport == "import") {
    var title = data.name + " Commodity Imports from Canada " + year;
    var seriesData = data.imports;
    var seriesDrilldown = data.importDrilldown;
    var importTooltipData = data.imports.data;

    if (extremeFlag == false) {
      var extremeMax = data.imports.extremeMax;
    } else {
      var extremeMax = null;
    }
  } else {
    var title = data.name + " Commodity Exports to Canada " + year;
    var seriesData = data.exports;
    var seriesDrilldown = data.exportDrilldown;
    var exportTooltipData = data.exports.data;

    if (extremeFlag == false) {
      var extremeMax = data.exports.extremeMax;
    } else {
      var extremeMax = null;
    }
  }

  Highcharts.chart("container", {
    chart: {
      type: "bar",
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1,
      },
      zoomType: "y",
      events: {
        load: function (event) {
          this.yAxis[0].setExtremes(0, extremeMax);
        },
        drilldown: function (event) {
          displayZoomAndDropdown("none");
        },
        drillup: function (event) {
          displayZoomAndDropdown("");
        },
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "1.5rem",
      },
    },
    subtitle: {
      text: "Click on a commodity name to view the top 10 states in that category and see how this state compares.",
      align: "left",
      style: {
        fontSize: "1.2rem",
      },
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
      text: "CSIS Energy Security Project",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
      crosshair: false,
      lineColor: "#eeeeee",
      labels: {
        overflow: "justify",
        style: {
          fontSize: "1rem",
          color: "#aaa",
        },
      },
    },
    yAxis: {
      type: "linear",
      lineColor: "#eeeeee",
      title: {
        text: "US Dollars",
        style: {
          fontSize: ".75rem",
          color: "#aaa",
        },
      },
      lineWidth: 1,
      endOnTick: true,
      labels: {
        formatter: function () {
          return helpers.labelMaker(this.value);
        },
        style: {
          fontSize: ".75rem",
          color: "#aaa",
        },
      },
    },
    tooltip: {
      useHTML: true,
      borderColor: "#333",
      backgroundColor: "#fff",
      formatter: function () {
        let colors = Highcharts.defaultOptions.colors;
        let drilldownData = this.series.userOptions.data;
        let rankingValues = this.series.userOptions.rankingValues;
        let isDrilldown = this.point.options.isDrilldown;

        if (isDrilldown === "False") {
          return helpers.tooltipTable(
            exportImport,
            colors,
            exportTooltipData,
            importTooltipData,
            rankingValues
          );
        } else {
          return helpers.drilldownTooltipTable(drilldownData);
        }
      },
    },
    plotOptions: {
      bar: {
        colorByPoint: true,
      },
    },
    series: [seriesData],
    drilldown: {
      activeAxisLabelStyle: {
        color: "#2886b2",
      },
      breadcrumbs: {
        buttonTheme: {
          style: {
            color: "#2886b2",
            fontSize: "1rem",
          },
        },
        style: {
          fontSize: "1rem",
        },
      },
      series: seriesDrilldown,
    },
  });
}

var zoomOutButton = document.getElementById("reset");
var zoomInButton = document.getElementById("zoom");
var dropdown = document.getElementById("dropdown");
var dropdownLabel = document.getElementById("dropdown-label");

zoomOutButton.addEventListener("click", function () {
  let chart = Highcharts.chart("container", {});
  zoomOutButton.classList.remove("inactive");
  zoomOutButton.classList.add("active");
  zoomInButton.classList.remove("active");
  zoomInButton.classList.add("inactive");
  chart.destroy();
  renderChart(allData[stateIndex], exportImport, year, true);
});

zoomInButton.addEventListener("click", function () {
  let chart = Highcharts.chart("container", {});
  zoomInButton.classList.remove("inactive");
  zoomInButton.classList.add("active");
  zoomOutButton.classList.remove("active");
  zoomOutButton.classList.add("inactive");
  chart.destroy();
  renderChart(allData[stateIndex], exportImport, year, false);
});

dropdown.addEventListener("change", function () {
  let chart = Highcharts.chart("container", {});
  exportImport = this.value;
  console.log("dropdown");
  chart.destroy();
  renderChart(allData[stateIndex], exportImport, year, false);
});

const displayZoomAndDropdown = (display) => {
  zoomInButton.style.display = display;
  zoomOutButton.style.display = display;
  dropdown.style.display = display;
  dropdownLabel.style.display = display;
};
