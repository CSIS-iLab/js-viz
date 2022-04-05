let data = [];

Highcharts.data({
  googleAPIKey: 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4',
  googleSpreadsheetKey: "13_uDHtgIt1k_3DFz67tXgByfkuMKvyOuPVK_TmSvwSs",
  googleSpreadsheetRange: "ghana",
  switchRowsAndColumns: true,
  parsed: function (columns) {
    // console.log(columns)
    datalabels = []
    let preData = []
    let dataset = {}
    let tooltip = []
    // console.log(columns)
    let length = columns.length
    for (let index = 0; index < length; index++) {
      // console.log(columns[index])
      datalabels = columns[0]
      let obj = {}
      // const element = columns[index];
      if (columns[index][0] == 'Tooltip') {
        tooltip = columns[index]
    
        tooltip.shift()
        columns.shift()
        // break
      }
      
      if (!dataset[year]) {
        dataset[year] = {
          name: year,

        }
      }
      // // console.log(element[0])
      // // console.log(columns, 'index:', index)
      // obj = {
      //   name: columns[index],
      //   data: element.splice(1)
      // }
      // data.push(obj)
      // preData.push(columns[index])
    }
    preData = [...columns]
    datalabels.shift()
    console.log(preData)
    console.log(datalabels)
    console.log(tooltip)
    // preData.map((element, index) => {
    //   index ==  0 ? element = tooltip : element
    // })
    datalabels = preData.pop()
    console.log(preData)
    let obj = {
      name: datalabels,
      data: preData,
      tooltip: tooltip
    }
    // let test = ['Ghana Overal', 'Lower middle income',' Sub-Saharam']
    // data = [
    //   {
    //     name: 'Pregnant women receiving prenatal care',
    //     data: [{name:'Ghana_Overall_(2019)', x:0, y:97.4}, {name:'Lower', x:1, y:84.061}, {name: 'Sub-Saharan', x:2, y:81.618}]
    //   },
    //   {
    //     name: 'Births attended by skilled health staff',
    //     data: [{name:'Ghana_Overall_(2019)', x:0,y:78.1}, {name:'Lower', x:1, y:75.163}, {name: 'Sub-Saharan', x:2, y:60.995}]
    //   },
    // ]
  
    renderChart(obj, datalabels, tooltip)
  }
})

function renderChart(data, datalabels, tooltip) {
  console.log(data)
  Highcharts.chart("hcContainer", {
    // Load Data in from Google Sheets
    // data: {
    //   googleAPIKey: 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4',
    //   googleSpreadsheetKey: "13_uDHtgIt1k_3DFz67tXgByfkuMKvyOuPVK_TmSvwSs",
    //   googleSpreadsheetRange: "copy_ghana",
    //   parsed: function (columns) {
    //     let dataset = {}
    //     let tooltip = []
    //     console.log(columns)
    //     // let length = columns.length
    //     // for (let index = 0; index < length; index++) {
    //     //   const element = columns[index];
    //     //   if (element[0] == 'Tooltip') {
    //     //     element.shift()
    //     //     tooltip = element
    //     //     columns.splice(index, 1)
    //     //   }
    //     // }
    //     const dataobj = columns.map(element => {
    //       if (element[0] == 'Tooltip') {
    //         element.shift()
    //         tooltip = element
    //       }
    //       let obj = {
    //         data: [...element]
    //       }
    //      return obj
    //     })
    //     // console.log(dataobj)
    //     // console.log(tooltip)
              
  
    //     data = [...dataobj]
    //     console.log(data)
    //     // series = Object
    //   }
  
    // },
    // General Chart Options
    chart: {
      type: "column"
    },
    // Colors
    title: {
      text: "Primary Health Care in Ghana"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS GHPC Progam | Source: Goes Here"
    },
    // Y Axis
    yAxis: {
      title: {
        text: ""
      }
    },
    // xAxis: {
    //   categories: test
    // },
    categories: data.name,
    series: data.data,
    // Tooltip
    tooltip: {
      headerFormat:
        "<span style=\"font-size: 13px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\">{point.key}</span><br/>",
        pointFormatter: function() {
          // console.log(this)
        return `<span style="color:${this.color}">\u25CF </span>
        ${this.y}%`;
      }
    },
    // Additional Plot Options
    plotOptions: {
      column: {
        stacking: null, // Normal bar graph
        dataLabels: {
          enabled: false
        }
      },
      series: {
        showInLegend: true,
      }
    }
  })
}
