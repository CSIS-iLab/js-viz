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
const sColor = "#f68a41"
const aColor = "#842037"
const oColor = "#52a091"
let defaultSort = 'anemia'

let malnutrition = {
  stunting: {
    name: "Stunting",
    color: sColor,
    col: 2
  },
  anemia: {
    name: "Anemia",
    color: aColor,
    col: 3
  },
  overweight: {
    name: "Overweight or Obese",
    color: oColor,
    col: 4
  }
}

const malnutritionList = Object.keys(malnutrition)

const dropdownOptions = [
  { name: "Population (2018 Estimated)", value: "population" },
  { name: "Region", value: "region" }
]


Highcharts.data({
  // Load Data in from Google Sheets
  googleSpreadsheetKey: '1sLlKirSAEv5QYBQa2LJlzWMNmF3HkNFnjBHbUAJ5RFU',
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    // Remove header row (first element in columns array)
    columns.shift()

    // default data sort
    const defaultSortValue = malnutrition[defaultSort].col
    columns.sort((a, b) => b[defaultSortValue] - a[defaultSortValue])

    // iterate over data
    columns.forEach((row, i) => {
      // name the columns
      const population = row[1]
      const region = row[0]
      const stunting = row[2]
      const anemia = row[3]
      const overweight = row[4]

      const percentages = [stunting, anemia, overweight]
      // For each row, determine lowest percentage and assign that to x
      const min = Math.min(...percentages)
      // For each row, determine highest percentage and assign that to x2
      const max = Math.max(...percentages)

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

function populateSelect() {
  // Target the sort element
  const datasets = document.getElementById('datasets')

  // Add malnutritions to dropdownOptions array
  for (let value in malnutrition) {
    dropdownOptions.push({
      name: malnutrition[value].name,
      value
    })
  }

  // Sort dropdown options
  dropdownOptions.sort((a, b) => a.name.localeCompare(b.name))

  // Create option elements for dropdown
  dropdownOptions.forEach((option, i) => {
    const optionEl = document.createElement("option")
    if (option.value === defaultSort) {
      optionEl.selected = 'selected'
    }
    optionEl.value = option.value
    optionEl.text = option.name
    datasets.appendChild(optionEl)
  })
  datasets.onchange = function () {
    regionArray = []

    // Sort the region data based on the selection
    regionData = sortRegions(regionData, this.value)

    // Update y value based on sort
    regionData.forEach((row, i) => {
      row.y = i

      // Push region to RegionArray
      regionArray.push(row.region)

      // if the row region matches the dataPoints region, update y to i value
      dataPoints.forEach((dataRow, j) => {
        if (row.region === dataRow.region) {
          dataRow.y = i
        }
      })
    })
    const chart = Highcharts.chart('hcContainer', {})
    chart.destroy()
    renderChart(regionData, dataPoints, regionArray)
  }
}

function sortRegions(dataToSort, sortBy) {
  if (sortBy === "region") {
    return dataToSort.sort((a, b) => b[sortBy].localeCompare(a[sortBy]))
  }
  return dataToSort.sort((a, b) => b[sortBy] - a[sortBy])
}

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
      useHTML: true,
      labelFormatter: function () {
        return (
          '<span style="color:' +
          aColor +
          '">\u25CF</span> Anemia <span style="font-size:16px; color:#ffffff">.</span>' +
          '<span style="color:' +
          sColor +
          '">\u25CF</span> Stunting <span style="font-size:16px; color:#ffffff">.</span>' +
          '<span style="color:' +
          oColor +
          '">\u25CF</span> Overweight or Obese'
        )
      },
      // remove default formatting
      symbolHeight: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      itemStyle: {
        cursor: 'default'
      }
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