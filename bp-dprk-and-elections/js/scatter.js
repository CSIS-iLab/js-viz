let yearData = [];

let yearArray = [];
let allYears = [];

let dataPoints = [];

let electionYearAndDays = {};
let mins = [];
let maxes = [];

Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: "11nBD55d0t4QE1h-OeymUg897azDIC6CHME2UenQ8WSw",
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    columns.shift();
    columns.forEach((row, i) => {
      const electionDate = row[0];
      let electionYear = electionDate.slice(0, 4);
      let electionYearNumber = parseFloat(electionYear);
      const electionType = row[1];
      const provocationDescription = row[2];
      const numberOfDays = row[3];
      let numberOfDaysNumber = parseFloat(numberOfDays)
      const provocationDate = row[5];

      if (electionYear >= "1990") {

        dataPoints.push({
          x: numberOfDaysNumber,
          y: electionYearNumber,
          electionType: electionType,
          provocationDescription: provocationDescription,
          provocationDate: provocationDate
        })

        if (!yearArray.includes(electionYearNumber)) {
          yearArray.push(electionYearNumber);
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
      yearData.push({
        x: mins[i],
        x2: maxes[i],
        y: yearArray[i],
        year: yearArray[i],
        color: "lightGray",
      });
    }
    renderChart(yearData, yearArray, dataPoints);
  },
});

function renderChart(yearData, yearArray, dataPoints) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: "",
    },
  });
  Highcharts.chart("hcContainer", {
    chart: {
      // type: "xrange",
      height: "80%",
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
      text: "CSIS Beyond Parallel | Source: ",
      position: {
        y: 0,
      },
    },
    // Chart Legend
    legend: {
      align: "left",
      verticalAlign: "top",
      useHTML: true,
    },
    // remove default formatting
    symbolHeight: 0,
    symbolWidth: 0,
    symbolRadius: 0,
    itemStyle: {
      cursor: "default",
    },
    // X Axis
    xAxis: {
      title: {
        enabled: true,
        text: 'Days before or after an Election <br> (election day = 0)',
      },
      maxPadding: 0.15, // extend axis to 60%
      minPadding: 0.3, // extend axis to 0%
      offset: 15, // move axis down to give final region more space
      startOnTick: true,
      tickInterval: 50,
      min: -400,
      max: 400,
      plotLines: [{
        color: '#FFC726',
        width: 1,
        value: 0
      }]
    },
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
      tickInterval: 2
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
        },
      },
      xrange: {
        enableMouseTracking: false,
      },
      scatter: {
        showInLegend: true,
      },
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "rgb(255, 255, 255)",
      formatter: function() {
        let point = this.point 
        let daysBeforeOrAfter = ""
        if (point.x < 0) {
          daysBeforeOrAfter = `<b>Days before election:</b> ${(point.x)*-1}`
        } else {
          daysBeforeOrAfter = `<b>Days after election:</b> ${(point.x)}`
        }

        return `<b>Provocation Date:</b> ${point.provocationDate}<br>
                <b>Provocation Type:</b> ${point.provocationDescription}<br>
                <b>Election Type:</b> ${point.electionType}<br>
                ` + daysBeforeOrAfter
      }
    },
    series: [
      {
        type: "xrange",
        pointWidth: 2,
        id: "main",
        name: "Election Year",
        data: yearData,
        showInLegend: false,
      },
      {
        type: "scatter",
        color: "#10355F",
        linkedTo: "main",
        marker: {
          radius: 3.5,
        },
        data: dataPoints,
        name: "Provocation"
      },
    ],
  });
}