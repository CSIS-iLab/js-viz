//regionData
let yearData = []

// regionArray
let yearArray = []
// used to calculate yearArray
let allYears = []

let electionYearAndDays = {}
let mins = []
let maxes = []

Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: '11nBD55d0t4QE1h-OeymUg897azDIC6CHME2UenQ8WSw',
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    columns.shift();
    columns.forEach((row, i) => {
      const electionDate = row[0];
      let electionYear = electionDate.slice(0, 4);
      const electionType = row[1];
      const provocationDescription = row[2];
      const numberOfDays = row[3];
      const provocationDate = row[5];
      const y = i;

      if (electionYear >= "1990") {
        if (!yearArray.includes(electionYear)) {
          yearArray.push(electionYear)
        }
        if (!electionYearAndDays[electionYear]) {
          electionYearAndDays[electionYear] = []
        }
        electionYearAndDays[electionYear].push(numberOfDays)
      }
    });

    yearArray.forEach((year) => {
      let min = Math.min(...electionYearAndDays[year])
      if (!mins.includes(min)) {
        mins.push(min)
      }
    })
    console.log(mins)

    yearArray.forEach((year) => {
      let max = Math.max(...electionYearAndDays[year])
      if (!maxes.includes(max)) {
        maxes.push(max)
      }
    })
    console.log(maxes)

    for (i = 0; i < yearArray.length; i++) {
      yearData.push({
        x: mins[i],
        x2: maxes[i],
        y: i,
        year: yearArray[i],
        color: 'lightGray',
        points: electionYearAndDays[yearArray[i]]
      })
    }
  }
})

function renderChart(yearData, yearArray) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  })

  Highcharts.chart('hcContainer', {
    chart: {
      type: 'scatter',
      height: '80%'
    },
    exporting: {
      sourceWidth: 723,
      sourceHeight: 775,
      chartOptions: {
        title: {
          text: "The Triple Burden of Malnutrition in Tanzania"
        },
        subtitle: {
          text: "This chart shows the co-occurrence of three major types of malnutrition—overweight or obese, stunting, and anemia. The key population for stunting, or below average height for age, is children under 5. Women of reproductive age (15 to 49 years) are the key population for anemia and overweight or obese."
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
      text: "CSIS Beyond Parallel | Source: ",
      position: {
        y: 0
      }
    },
    // Chart Legend
    legend: {
      align: 'left',
      verticalAlign: 'top',
      useHTML: true
      },
      // remove default formatting
      symbolHeight: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      itemStyle: {
        cursor: 'default'
    },
    // X Axis
    xAxis: {
      title: {
        enabled: true,
        text: 'Days before or after an Election',
      },
      maxPadding: 0.15, // extend axis to 60%
      minPadding: 0.3, // extend axis to 0%
      offset: 15, // move axis down to give final region more space
      startOnTick: true,
      tickInterval: 10,
    },
    // Y Axis
    yAxis: {
      title: {
        enabled: 'Election Year'
      },
      categories: yearArray,
      gridLineColor: 'transparent',
    },
    // Additional Plot Options
    plotOptions:
    {
      series: {
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
        events: {
          legendItemClick: function () {
            return false
          }
        }
      },
      xrange: {
        enableMouseTracking: false
      },
      scatter: {
        showInLegend: true
      }
    },
    tooltip: {
      useHTML: true,
      backgroundColor: 'rgb(255, 255, 255)'
    },
    series: [{
      type: 'xrange',
      pointWidth: 2,
      id: 'main',
      name: "Election Year",
      data: yearData,
      showInLegend: false
    }, {
      type: 'scatter',
      linkedTo: 'main',
      marker: {
        radius: 3.5
      },
      data: dataPoints
    }]
  })
}