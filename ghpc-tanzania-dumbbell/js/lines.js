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

// yAxis categories is an array of regions

var regionData = []
var dataPoints = []
var regionArray = []

Highcharts.data({

  // Load Data in from Google Sheets
  googleSpreadsheetKey: '1sLlKirSAEv5QYBQa2LJlzWMNmF3HkNFnjBHbUAJ5RFU',
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    // iterate over data
    columns.forEach(function (row, i) {
      // skip first row
      if (i == 0) {
        return
      }
      // name the columns
      var population = row[1]
      var region = row[0]
      var stunting = row[2]
      var anemia = row[3]
      var overweight = row[4]

      // For each row, determine lowest percentage and assign that to x
      // For each row, determine highest percentage and assign that to x2
      // For each row, assign the index to y
      var data = row.slice(2)
      const min = Math.min.apply(Math, data)
      const max = Math.max.apply(Math, data)
      // Push row object into regionData array
      regionData.push({ "x": min, "x2": max, "y": i })
      // For each row, push region to regionArray
      regionArray.push(region)

      // Assign a color to each category

      // For each category in a row assign the percentage to x
      // For each category in a row assign the index to y
      // For each category in a row assign the category color
      // Push category object into dataPoints array
      dataPoints.push({ "x": stunting, "y": i, "color": "red" }, { "x": anemia, "y": i, "color": 'blue' }, { "x": overweight, "y": i, "color": 'green' })
    })
    renderChart(regionData, dataPoints, regionArray)
  }
})

function renderChart(regionData, dataPoints, regionArray) {
  console.log(regionArray)


  Highcharts.chart('hcContainer', {
    // Chart Title and Subtitle
    title: {
      text: "The Triple Burden of Malnutrition in Tanzania"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Global Health Policy Center | Source: Tanzania National Nutrition Survey 2018"
    },
    // Chart Legend
    legend: {
      title: {
        text: 'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Y Axis
    yAxis: {
      title: {
        text: "Y Axis Title"
      },
      categories: regionArray,
      labels: {
        enabled: true,
        step: 1
      },
      showLastLabel: false
    },
    // Additional Plot Options
    plotOptions:
    {
      line: {
        gapSize: 2
      },
      // line: {
      //   marker: {
      //     enabled: false,
      //     symbol: "circle",
      //     radius: 3
      //   },
      //   lineWidth: 3
      // }
    },
    series: [{
      type: 'xrange',
      pointWidth: 5,
      id: 'main',
      data: regionData,
      dataLabels: {
        align: 'center',
        enabled: true
      }
    }, {
      type: 'scatter',
      linkedTo: 'main',
      marker: {
        radius: 5
      },
      data: dataPoints
    }]
  })
}