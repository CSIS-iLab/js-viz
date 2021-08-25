let yearData = [];

let yearArray = [];
let allYears = [];

let dataPoints = [];
let dataMarkers = [];

let electionYearAndDays = {};
let mins = [];
let maxes = [];

Highcharts.data({
  // Load Data in from Google Sheets
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "11nBD55d0t4QE1h-OeymUg897azDIC6CHME2UenQ8WSw",
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    columns.shift();
    columns.forEach((row) => {
      const electionDate = row[0];
      let electionYear = electionDate.slice(0, 4);
      let electionYearNumber = parseFloat(electionYear);
      const electionType = row[1];
      const provocationDescription = row[2];
      const numberOfDays = row[3];
      let numberOfDaysNumber = parseFloat(numberOfDays);
      const provocationDate = row[5];

      if (electionYear >= "1990") {
        let color = "";

        if (electionType == "General / Presidential") {
          color = "#FFC726";
        } else {
          color = "#10355F";
        }

        dataPoints.push({
          x: numberOfDaysNumber,
          y: electionYearNumber,
          electionType,
          provocationDescription,
          provocationDate,
          electionDate,
          color,
        });

        if (!yearArray.includes(electionYearNumber)) {
          yearArray.push(electionYearNumber);

          dataMarkers.push({
            x: 0,
            y: electionYearNumber,
            electionDate,
            color: "#F55536",
            marker: { symbol: "triangle" },
          });
        }
        if (!electionYearAndDays[electionYearNumber]) {
          electionYearAndDays[electionYearNumber] = [];
        }
        electionYearAndDays[electionYearNumber].push(numberOfDays);
      }
    });

    yearArray.forEach((year) => {
      let min = Math.min(...electionYearAndDays[year]);
      if (!mins.includes(min)) {
        mins.push(min);
      }
    });

    yearArray.forEach((year) => {
      let max = Math.max(...electionYearAndDays[year]);
      if (!maxes.includes(max)) {
        maxes.push(max);
      }
    });

    for (i = 0; i < yearArray.length; i++) {
      if (mins[i] && maxes[i] < 0) {
        yearData.push({
          x: mins[i],
          x2: 0,
          y: yearArray[i],
          year: yearArray[i],
          color: "lightGray",
        });
      } else if (mins[i] > 0) {
        yearData.push({
          x: 0,
          x2: maxes[i],
          y: yearArray[i],
          year: yearArray[i],
          color: "lightGray",
        });
      } else {
        yearData.push({
          x: mins[i],
          x2: maxes[i],
          y: yearArray[i],
          year: yearArray[i],
          color: "lightGray",
        });
      }
    }

    renderChart(yearData, yearArray);
  },
});

function renderChart(yearData, yearArray) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: "",
    },
  });
  Highcharts.chart("hcContainer", {
    chart: {
      height: "80%",
      zoomType: "xy",
    },
    exporting: {
      buttons: {
        contextButton: {
          y: -15
        }
      }
    },
    // Chart Title and Subtitle
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS | Source: Beyond Parallel Database on North Korean Provocations",
      position: {
        y: 0,
      },
    },
    // Chart Legend
    legend: {
      enabled: false,
    },
    // remove default formatting
    symbolHeight: 0,
    symbolWidth: 0,
    symbolRadius: 0,
    itemStyle: {
      cursor: "default",
    },
    // X Axis
    xAxis: [
      {
        reversed: true,
        title: {
          enabled: false,
          text: "Days After Election",
        },
        maxPadding: 0.15, // extend axis to 60%
        minPadding: 0.3, // extend axis to 0%
        offset: 15, // move axis down to give final region more space
        tickInterval: 50,
        min: -365,
        max: 365,
        labels: {
          formatter: function () {
            if (this.value < 0) {
              return this.value * -1;
            } else {
              return this.value;
            }
          },
        },
      },
      {
        categories: ["Days Before Election", "Days After Election"],
        lineWidth: 0,
      },
    ],
    // Y Axis
    yAxis: {
      title: {
        enabled: true,
        text: "Election Year",
      },
      categories: yearArray,
      gridLineColor: "transparent",
      min: yearArray[0],
      max: parseFloat(yearArray[yearArray.length - 1]),
      tickInterval: 2,
      reversed: true,
    },
    // Additional Plot Options
    plotOptions: {
      series: {
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
        events: {
          legendItemClick: function () {
            return false;
          },
          states: {
            inactive: { opacity: 1 },
          },
        },
      },
      xrange: {
        enableMouseTracking: false,
      },
      column: {
        animation: false,
        opacity: 0,
        states: {
          inactive: { opacity: 0 },
          active: { opacity: 0 },
        },
      },
    },
    tooltip: {
      useHTML: true,
      borderColor: "#333",
      backgroundColor: "rgb(255, 255, 255)",
      formatter: function () {
        let point = this.point;
        let daysBeforeOrAfter = `<b>Provocation Date:</b> ${point.provocationDate}<br>
        <b>Provocation Type:</b> ${point.provocationDescription}<br>
        <b>Election Type:</b> ${point.electionType}<br>`;
        if (point.series.name == "empty") {
          return false;
        } else if (point.x < 0) {
          daysBeforeOrAfter += `
            <b>Days after election:</b> ${point.x * -1}`;
        } else if (point.x > 0) {
          daysBeforeOrAfter += `
            <b>Days before election:</b> ${point.x}`;
        } else if (point.provocationDate == point.electionDate) {
          daysBeforeOrAfter += `
            <b>Days before election:</b> ${point.x}<br/>
          <b>Election Date:</b> ${point.electionDate}<br>`;
        } else {
          daysBeforeOrAfter = `
            <b>Election Date:</b> ${point.electionDate}
          `;
        }

        return daysBeforeOrAfter;
      },
    },
    series: [
      {
        type: "xrange",
        pointWidth: 2,
        id: "main",
        name: "Election Year",
        data: yearData,
        showInLegend: false,
        states: { inactive: { opacity: 1 } },
      },
      {
        type: "scatter",
        linkedTo: "main",
        marker: {
          radius: 5,
        },
        data: dataPoints,
        name: "Provocation",
        states: { inactive: { opacity: 1 } },
        zIndex: 2,
      },
      {
        type: "scatter",
        linkedTo: "main",
        marker: {
          radius: 5,
        },
        data: dataMarkers,
        name: "Elections",
        states: { inactive: { opacity: 1 } },
        zIndex: 1,
      },
      {
        type: "column",
        name: "empty",
        data: [0, 0],
        showInLegend: false,
        color: "rgb(255, 255, 255)",
        xAxis: 1,
      },
    ],
  });
}
