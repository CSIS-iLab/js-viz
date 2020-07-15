
let electionData = []

Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: '11nBD55d0t4QE1h-OeymUg897azDIC6CHME2UenQ8WSw',
  googleSpreadsheetWorksheet: 2,

  // Switching transposes the data
  switchRowsAndColumns: true,


  parsed: function parsed(columns) {

    // Remove header first element in columns array
    // This is the header row in the unswitched sheet
    columns.shift();
    // iterate over data
    columns.forEach((row) => {
      // name the rows (original sheet: columns)
      const electionDate = row[0];
      let electionYear = electionDate.slice(0, 4);

      const electionType = row[1];
      const provocationDescription = row[2];
      const numberOfDays = row[3];
      const provocationDate = row[5];

      const y = electionYear;

      // Push row object into regionData array
      electionData.push({
        x: numberOfDays,
        y,
        electionType,
        provocationDescription,
        numberOfDays,
        provocationDate,
      });
    });
    renderChart(electionData)
    console.log(electionData);
  }
})

function renderChart(electionData) {
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
  })
}