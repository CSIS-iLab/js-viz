let optionSelect = []

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

    const data = Object.values(dataset)
    

    // populating dropdown
    for (let value in data) {
      optionSelect.push({
        name: data[value].name,
        data: data[value].data,
        categories: data[value].categories
      })
    }

  console.log(data)

    populateSelect()
    renderChart(data[0])
    return
  }
})

function populateSelect() {
  const select = document.getElementById("optionSelect")
  optionSelect.forEach((option, i) => {
    const optionEl = document.createElement("option");
    if (i === 0) {
      optionEl.selected = " selected";
    }
    optionEl.value = i;
    optionEl.text = option.name;
    select.appendChild(optionEl);
});

  // Destroy & redraw chart
  select.addEventListener("change", function () {
    let chart = Highcharts.chart("hcContainer", {});
    chart.destroy();
    renderChart(optionSelect[this.value]);
  });
}

function renderChart(data) {
  Highcharts.chart('hcContainer', {
    // General Chart Options
    chart: {
      type: 'column'
    },
    // Chart Title and Subtitle
    title: {
      text: "SEA ASEAN COVID19 CASES"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Southeast Asia Program | Source: SEA"
    },
    // Chart Legend
    legend: {
      title: {
        text: '<br/><span style="font-size: 12px; font-weight: normal"></span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Y Axis
    yAxis: {
      title: { 
        text: "Number of New Cases"
      },
    },
    // x Axis
    xAxis: {
      type: "category",
      },
    // Tooltip
    tooltip: {
      useHTML: true,
      formatter: function () {
        // console.log(this)
          return '<b>' + this.series.userOptions.name + '</b><br>Date: ' + this.key + '<br>New Cases: ' + this.y + '<br>';
      }
  },

    // Additional Plot Options
    plotOptions:
    {
      column: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
        dataLabels: {
            enabled: false,
        },
        // Disable hide on click
        events: {
          legendItemClick: function(e) {
              e.preventDefault()
          }
        }
        
      }
    },

  series:[data],

  })
}
