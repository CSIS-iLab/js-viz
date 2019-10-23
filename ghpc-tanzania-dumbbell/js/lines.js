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


var regionData = []
var dataPoints = []
var regionArray = []
var population = []
var dataset = {}
var sColor = "#f68a41"
var aColor = "#842037"
var oColor = "#52a091"

Highcharts.data({

  // Load Data in from Google Sheets
  googleSpreadsheetKey: '1sLlKirSAEv5QYBQa2LJlzWMNmF3HkNFnjBHbUAJ5RFU',
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    // default data sort
    columns.sort((a, b) => {
      // exclude header row
      if (a[3] == b[3]) return 0
      if (a[3] == 'Region') return -1
      if (b[3] == 'Region') return 1
      // sort alphabetically
      if (a[3] < b[3]) return 1
      if (a[3] > b[3]) return -1
      return 0
    })
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

      var data = row.slice(2)
      // For each row, determine lowest percentage and assign that to x
      const min = Math.min.apply(Math, data)
      // For each row, determine highest percentage and assign that to x2
      const max = Math.max.apply(Math, data)
      // Push row object into regionData array
      regionData.push({
        "x": min,
        "x2": max,
        "y": i - 1,
        "region": region,
        "color": 'lightGray',
        "anemia": anemia,
        "stunting": stunting,
        "overweight": overweight,
        "population": population
      })
      // For each row, push region to regionArray
      regionArray.push(region)

      var tipGroup = {
        "Stunting": {
          "name": "Stunting",
          'val': stunting,
          'color': sColor
        },
        "Anemia": {
          "name": "Anemia",
          "val": anemia,
          'color': aColor
        },
        "Overweight": {
          "name": "Overweight",
          "val": overweight,
          'color': oColor
        }
      }
      // For each category in a row assign the percentage to x, index to y and the category color then push to dataPoints array
      dataPoints.push({
        "x": stunting,
        "y": i - 1,
        "color": sColor,
        "name": 'Stunting',
        "population": population,
        "region": region,
        "tipGroup": tipGroup
      }, {
        "x": anemia,
        "y": i - 1,
        "color": aColor,
        "name": "Anemia",
        "population": population,
        "region": region,
        "tipGroup": tipGroup
      }, {
        "x": overweight,
        "y": i - 1,
        "color": oColor,
        "name": "Overweight",
        "population": population,
        "region": region,
        "tipGroup": tipGroup
      })
    })
    dataset = columns
    populateSelect()
    renderChart(regionData, dataPoints, regionArray, sColor, aColor, oColor)
  }
})

function populateSelect() {
  var datasets = document.getElementById('datasets')
  dataset[0].forEach(function (column, i) {
    var option = document.createElement("option")
    option.value = column
    option.text = column
    datasets.appendChild(option)
  })
  datasets.onchange = function () {
    var chart = Highcharts.chart('hcContainer', {})
    chart.destroy()
    regionArray = []
    regionData.sort((a, b) => {
      var words = this.value.toLowerCase().split(" ")
      var key = words[0]
      // return b[key] - a[key]
      if (a[key] < b[key]) return 1
      if (a[key] > b[key]) return -1
      return 0
    })
    console.log(regionData)
    regionData.forEach(function (row, i) {
      row.y = i
      // if the row region matches the dataPoints region, update y to i value
      dataPoints.forEach(function (dataRow, j) {
        if (row.region.toLowerCase() === dataRow.region.toLowerCase()) {
          dataRow.y = i
        }
      })
      // Push region to regionArray
      regionArray.push(row.region)
    })
    renderChart(regionData, dataPoints, regionArray, sColor, aColor, oColor)
  }
}

function renderChart(regionData, dataPoints, regionArray, sColor, aColor, oColor) {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ","
    }
  })

  Highcharts.chart('hcContainer', {
    chart: {
      height: '80%'
    },
    // Chart Title and Subtitle
    title: {
      text: undefined,
      // text: "The Triple Burden of Malnutrition in Tanzania"
    },
    subtitle: {
      text: undefined,
      // text: "This chart shows the co-occurrence of three major types of malnutrition—overweight or obese, stunting, and anemia. The key population for stunting, or below average height for age, is children under 5. Women of reproductive age (15 to 49 years) are the key population for anemia and overweight or obese. Data is unavailable for Zanzibar."
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Global Health Policy Center | Source: Tanzania National Nutrition Survey 2018"
    },
    // Chart Legend
    legend: {
      align: 'left',
      verticalAlign: 'top',
      labelFormatter: function () {
        return '<span style="color:' + aColor + '">\u25CF</span> Anemia   ' + '<span style="color:' + sColor + '">\u25CF</span> Stunting   ' + '<span style="color:' + oColor + '">\u25CF</span> Overweight'
      },
      // remove default formatting
      symbolHeight: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      itemStyle: {
        'cursor': 'default'
      }
    },
    // X Axis
    xAxis: {
      labels: {
        format: '{value}%'
      },
      title: {
        enabled: true,
        text: 'Percent of Population'
      },
      maxPadding: 0.15, // increase axis to 60%
      minPadding: 0.3, // decrease axis to 0%
      offset: 15, // move down to give bottom region more space
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
        anemiaArr = this.point.tipGroup['Anemia']
        stuntingArr = this.point.tipGroup['Stunting']
        overweightArr = this.point.tipGroup['Overweight']
        return 'Region: <b>' + this.point.region + '</b><br/>' + 'Population: <b>' + this.point.population + '</b><br/>' + '<span style="color:' + anemiaArr.color + '">\u25CF </span>' + anemiaArr.name + ': ' + anemiaArr.val + '%<br/>' + '<span style="color:' + stuntingArr.color + '">\u25CF </span>' + stuntingArr.name + ': ' + stuntingArr.val + '%<br/>' + '<span style="color:' + overweightArr.color + '">\u25CF </span>' + overweightArr.name + ': ' + overweightArr.val + '%'
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