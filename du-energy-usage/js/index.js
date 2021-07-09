// - X axis – Column J
// - Y axis – Column I
// - Radius – Column G
// - Color – Column C same colors by regions
// - World Average lines should be calculated in your code by
//   taking the average value of columns I & J
// - For countries with a “1” in the “is_highlighted” column,
//   can you please show the country label for only those 2 ?
//   All other country labels should not be shown.

var datasets = [];
var seriesData = [];
var years = {};
var data = [];
var series = [];
let regionsTest = [];
let sumSolarTotalElectricity = 0
let sumWindTotalElectricity = 0

Highcharts.data({
  googleSpreadsheetKey: "1BjZa0EDc9hDeAvcbW3JPA7owR3RHS-Uz171zPPh_Az4",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};

    for (let i = 1; i < columns.length; i++) {
      const iso = columns[i][0];
      const country = columns[i][1];
      const region = columns[i][2]; // color
      const year = columns[i][3];
      const solarTWh = columns[i][4];
      const windTWh = columns[i][5]; 
      const solarWindTotal = columns[i][6]; // Radius
      const totalElectricity = columns[i][7];
      const solarTotalElectricity = columns[i][8] != null ? columns[i][8] : 0; // yAxis
      sumSolarTotalElectricity += solarTotalElectricity
      const windTotalElectricity = columns[i][9] != null ? columns[i][9] : 0; // xAxis
      sumWindTotalElectricity += windTotalElectricity
      const isHighlighted = columns[i][10]; 


      if (!dataset[year]) {
        dataset[year] = {
          name: year,
          regions: [],
        };
      }

      // regions
      dataset[year].regions[region] = dataset[year].regions[region] || {
        name: region,
        data: []
      }

      dataset[year].regions[region].data.push({
        name: isHighlighted == 1 ? country : '', // show only highligthed countries
        z: solarWindTotal,
        y: solarTotalElectricity,
        x: windTotalElectricity
      })
    }

    let windTotalAverage = sumWindTotalElectricity / columns.length
    let solarTotalAverage = sumSolarTotalElectricity / columns.length

    // Create array of selection options
    series = Object.keys(dataset)

    // Create selection options objects
    for (let year in dataset) {
      datasets.push({
        year,
      });
    }

    // Convert object to array - we no longer need the keys
    let regions = Object.values(dataset)
    
    // Create array of countries objects for each year
    regions.forEach((year) => {
      seriesData.push(Object.values(year.regions))
    });

    populateSelect();
    renderChart(seriesData[0], windTotalAverage, solarTotalAverage)
  },
});

function renderChart(data, windTotalAverage, solarTotalAverage) {
  console.log('wind:', windTotalAverage);
  console.log('solar:', solarTotalAverage);
  Highcharts.chart("container", {
    // General Chart Options
    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy',
      // height: 600,
      // marginTop: 180,
      // marginBottom: 160,
      // spacingBottom: 60,
      // backgroundColor: "transparent",
    },

    // Chart Title and Subtitle
    title: {
      text: "Electricity Generation from Wind & Solar (2019)",
    },

    // subtitle: {
    //   text: "Chart is under construction!",
    // },

    // Credits
    credits: {
      enabled: true,
      href: false,
      position: {
        y: -20,
      },
      text:
        "CSIS <br/>Source: BP Statical Review of World Energy (June 2020).",
    },

    accessibility: {
      point: {
        valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
      }
    },
    // Chart Legend
    legend: {
      enabled: false,
      // enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
    },
    // Colors
    colors: [
      "#47bbed", // Asia Pacific
      "#47ed9f", // Americas
      "#edd747", // Europe
      "#fc7b0a", // CSIS
      "#32228e", // Middle East
      "#0a3054", // Africa
    ],

    // tooltip
    // tooltip: {
    //   enabled: false,
    //   useHTML: true,
    //   headerFormat: '<table>',
    //   pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
    //     '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
    //     '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
    //     '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
    //   footerFormat: '</table>',
    //   followPointer: true
    // },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    },

    xAxis: {
      tickInterval: 10,
      gridLineWidth: 1,
      title: {
        text: 'Wind share of total generation'
      },
      labels: {
        format: '{value}'
      },
      plotLines: [{
        color: 'black',
        dashStyle: 'line',
        width: 2,
        value: windTotalAverage,
        label: {
          rotation: 270,
          y: 100,
          x: -5,
          style: {
            fontStyle: 'italic'
          },
          text: 'World average'
        },
        zIndex: 3
      }],
      accessibility: {
        rangeDescription: 'Range: 60 to 100 grams.'
      }
    },

    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Solar share of total generation'
      },
      labels: {
        format: '{value}'
      },
      maxPadding: 0.2,
      plotLines: [{
        color: 'black',
        dashStyle: 'line',
        width: 2,
        value: solarTotalAverage,
        label: {
          align: 'right',
          style: {
            fontStyle: 'italic'
          },
          text: 'World average',
          x: -10
        },
        zIndex: 3
      }],
      accessibility: {
        rangeDescription: 'Range: 0 to 160 grams.'
      }
    },

    series: data,
  });
}

// select
function populateSelect() {
  const select = document.getElementById("datasets");
  datasets.reverse()
  datasets.forEach((option, i) => {
    const optionEl = document.createElement("option");
    if (i === 0) {
      optionEl.selected = " selected";
    }
    optionEl.value = i;
    optionEl.text = option.year;
    select.appendChild(optionEl);
  });

  select.addEventListener("change", function () {
    let chart = Highcharts.chart("container", {});
    chart.destroy();
    renderChart(seriesData[this.value], series);
  });
}