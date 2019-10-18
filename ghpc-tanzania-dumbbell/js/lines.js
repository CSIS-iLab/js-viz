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
var population = []
var sColor = "red"
var aColor = "blue"
var oColor = "green"
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
      regionData.push({ "x": min, "x2": max, "y": i - 1, name: region, "color": 'lightGray' })
      // For each row, push region to regionArray
      regionArray.push(region)

      var tipGroup = { "Stunting": stunting, "Anemia": anemia, "Overweight": overweight }
      // For each category in a row assign the percentage to x
      // For each category in a row assign the index to y
      // For each category in a row assign the category color
      // Push category object into dataPoints array
      dataPoints.push({ "x": stunting, "y": i - 1, "color": sColor, "name": 'Stunting', "population": population, "region": region, "tipGroup": tipGroup }, { "x": anemia, "y": i - 1, "color": aColor, "name": "Anemia", "population": population, "region": region, "tipGroup": tipGroup }, { "x": overweight, "y": i - 1, "color": oColor, "name": "Overweight", "population": population, "region": region, "tipGroup": tipGroup })
    })
    renderChart(regionData, dataPoints, regionArray)
  }
})

function renderChart(regionData, dataPoints, regionArray, sColor, aColor, oColor) {

  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  })


  Highcharts.chart('hcContainer', {
    chart: {
      height: '50%'
    },
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
        enabled: false
      },
      categories: regionArray,
      gridLineColor: 'transparent',
    },
    // Additional Plot Options
    plotOptions:
    {
      line: {
        gapSize: 2
      },
      series: {
        borderWidth: 0,
        pointPadding: 0,
        groupPadding: 0,
      },
      // xrange: {
      //   enableMouseTracking: false
      // }
    },
    tooltip: {
      useHTML: true,
      // pointFormat: 'Region: {point.region} Population: {point.population}<br/>{point.name}: {point.x}',
      formatter: function () {
        console.log(this.point)
        catName = Object.keys(this.point.tipGroup)
        catNum = Object.values(this.point.tipGroup)
        return 'Region: ' + this.point.region + '<br/>' + 'Population: ' + this.point.population + '<br/>' + catName[0] + ': ' + catNum[0] + '<br/>' + catName[1] + ': ' + catNum[1] + '<br/>' + catName[2] + ': ' + catNum[2]
      },
      shared: true,
    },
    series: [{
      type: 'xrange',
      pointWidth: 2,
      id: 'main',
      name: "Region",
      data: regionData,
    }, {
      type: 'scatter',
      linkedTo: 'main',
      marker: {
        radius: 5
      },
      // tooltip: {
      //   pointFormat: 'Region: {point.region} Population: {point.population}<br/>{point.name}: {point.x} ',
      //   shared: true,
      //   useHTML: true
      // },
      data: dataPoints
    }]
  })
}