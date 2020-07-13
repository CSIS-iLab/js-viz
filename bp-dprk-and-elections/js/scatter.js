// Series is an array of two objects
//  Object 1/region
//    Type - xrange
//    pointWidth: ?
//    id: 'main'
//    data is an array of objects
//      x: smallest number in region
//      x2: largest number in region
//      y: id
//  Object 2/data points
//    Type - scatter
//    linkedTo: 'main'
//    marker: {radius: #}
//    data is an array of objects
//      (for each data type eg stunting)
//      x: #
//      y: match id from this region
//      color: each data type will have a corresponding color


let regionData = []
let dataPoints = []
let regionArray = []
let population = []


// Columns below are actual places (0,1,2,...) in sheet
// Only below in .data is data transposed for parsing
let electionData = {
  electionType: {
    name: "General/Presidential",
    col: 1
  },
  provocationType: {
    name: "Provocation Description",
    col: 2
  },
  numberofDays: {
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
      const numberofDays = row[3]
      const provocationDate = row[4]


      //We don't need to calculate percentage for this chart
      //Since the days are already calculated - positive, after
      // negative, before 
      /*const percentages = [stunting, anemia, overweight]
      // For each row, determine lowest percentage and assign that to x
      const min = Math.min(...percentages)
      // For each row, determine highest percentage and assign that to x2
      const max = Math.max(...percentages)*/

      const y = i

      // Push row object into regionData array
      regionData.push({
        x: min,
        x2: max,
        y,
        region,
        color: 'lightGray',
        anemia,
        stunting,
        overweight,
        population
      })
      // For each row, push region to regionArray
      regionArray.push(region)

      const tipGroup = {
        "stunting": {
          "name": "Stunting",
          'val': stunting,
          'color': sColor
        },
        "anemia": {
          "name": "Anemia",
          "val": anemia,
          'color': aColor
        },
        "overweight": {
          "name": "Overweight",
          "val": overweight,
          'color': oColor
        }
      }

      malnutritionList.forEach(item => {
        const { color, name, col } = malnutrition[item]

        let value = row[col]

        dataPoints.push({
          x: value,
          y,
          color,
          name,
          population,
          region,
          tipGroup
        })
      })
    })
    populateSelect()
    renderChart(regionData, dataPoints, regionArray)
  }
})

function renderChart(regionData, dataPoints, regionArray) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  })

  Highcharts.chart('hcContainer', {
    chart: {
      height: '80%'
    },
    exporting: {
      sourceWidth: 723,
      sourceHeight: 775,
      chartOptions: {
        title: {
          text: "North Korean Provocations and U.S. Elections (1990-2016)"
        },
        subtitle: {
          text: "Beyond Parallel created a dataset of U.S. election events, incorporating both presidential and congressional midterm election years, and cross-tabulated this information with our original dataset on North Korean provocations over the same period. The graph below illustrates how close (in number of days) North Korean provocations have occurred in relation to U.S. elections. This is one of the first studies to look at whether there are patterns to North Korean behavior around U.S. elections."
        }
      }
    },
    // Chart Title and Subtitle
    title: {
      text: undefined,
    },
    subtitle: {
      text: undefined,
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
      labels: {
        format: '{value}%'
      },
      title: {
        enabled: true,
        text: 'Percent of Population',
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
        enabled: false
      },
      categories: regionArray,
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
      formatter: function () {
        anemiaArr = this.point.tipGroup['anemia']
        stuntingArr = this.point.tipGroup['stunting']
        overweightArr = this.point.tipGroup['overweight']
        return (
          'Region: <b>' +
          this.point.region +
          '</b><br/>' +
          'Population: <b>' +
          this.point.population.toLocaleString() +
          '</b><br/>' +
          '<span style="color:' +
          anemiaArr.color +
          '">\u25CF </span>' +
          anemiaArr.name +
          ': ' +
          anemiaArr.val +
          '%<br/>' +
          '<span style="color:' +
          stuntingArr.color +
          '">\u25CF </span>' +
          stuntingArr.name +
          ': ' +
          stuntingArr.val +
          '%<br/>' +
          '<span style="color:' +
          overweightArr.color +
          '">\u25CF </span>' +
          overweightArr.name +
          ': ' +
          overweightArr.val +
          '%'
        )
      },
      backgroundColor: 'rgb(255, 255, 255)'
    },
    series: [{
      type: 'xrange',
      pointWidth: 2,
      id: 'main',
      name: "Region",
      data: regionData,
      showInLegend: false
    }, {
      type: 'scatter',
      linkedTo: 'main',
      marker: {
        radius: 3.5
      },
      data: dataPoints,
    }]
  })
}