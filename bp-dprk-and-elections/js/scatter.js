
let electionData = []

// Columns below are actual places (0,1,2,...) in sheet
// Only below in .data is data transposed for parsing
let election = {
  electionType: {
    name: "General/Presidential",
    col: 1
  },
  provocationType: {
    name: "Provocation Description",
    col: 2
  },
  numberOfDays: {
    name: "Number of Days before or After",
    col: 3
  },
  provocationDate: {
    name: "Provocation Date",
    col: 4
  }
}

const electionList = Object.keys(electionData)


Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: '1sLlKirSAEv5QYBQa2LJlzWMNmF3HkNFnjBHbUAJ5RFU',
  googleSpreadsheetWorksheet: 1,

  // Switching transposes the data
  switchRowsAndColumns: true,


  parsed: function parsed(columns) {
    // Remove header first element in columns array 
    // This is the header row in the unswitched sheet
    columns.shift()

    // iterate over data
    columns.forEach((row, i) => {
      // name the rows (original sheet: columns)
      const electionYear = row[0]
      const electionType = row[1]
      const provocationDescription = row[2]
      const numberOfDays = row[3]
      const provocationDate = row[4]
 
      const y = i

      // Push row object into regionData array
      electionData.push({
        x: numberOfDays,
        y,
        electionYear,
        electionType,
        provocationDescription,
        provocationDate
      })
  })
  renderChart(electionData)
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
      type: scatter,
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