

Highcharts.data({
  googleSpreadsheetKey: "1XbH8PkA4L8WlBoY-cLH4bLRO-a_L48YsHn9huKq2dHY",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {}


    // columns.forEach((row, i)) {
    for (let i = 1; i < columns.length; i++) {
      const country = columns[i][0]
      const date = columns[i][1]
      const cases = columns[i][2]
      const employment = columns[i][3]
      const benchmark1 = columns[i][4]
      const benchmark2 = columns[i][5]
      const benchmark3 = columns[i][6]
      const text = columns[i][7]

      if (!dataset[country]) {
        dataset[country] = {
          name: country,
          data: [],
          categories: []
        }
      }
    

      dataset[country].data.push({'name': date, 'y': cases, 'unemployment_rate': employment, 'benchmark_text': text})
      
      dataset[country].categories.push([benchmark1, benchmark2, benchmark3])
    }

    console.log(dataset)

    const data = Object.values(dataset)

    // // dropdown
    // for (let country in dataset) {
    //   countryNames.push({
    //     country,
    //   })
    // }

  console.log(data)

  

    renderChart(data[0])
    return
  }
})

// function populateSelect() {
//   const select = document.getElementById("datasets")
//   dataset.forEach((option, i) => {
//     const optionEl = document.createElement("option")
//     if (i === 0) {
//       option.selected = " selected"
//     }
//     optionEl.value = i
//     optionEl.text = option.name
//     select.appendChild(optionEl)
//   })
// }

function renderChart(data) {
  Highcharts.chart('hcContainer', {
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'column'
    },
    // Chart Title and Subtitle
    title: {
      text: "SEA-ASEAN-COVID19-CASES"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Project Name | Source: NAME"
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
    },
    // Additional Plot Options
    plotOptions:
    {
      column: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
        dataLabels: {
            enabled: false,
        }
      }
    },

  series:[data]

  })
}
