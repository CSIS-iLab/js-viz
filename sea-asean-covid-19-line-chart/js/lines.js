Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});


Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1hvUG-GDb9fWX1GO-xm26R5lsWnLTmWPKoFY-0Y6BAWA',
    googleSpreadsheetWorksheet: 1
  },
  // General Chart Options
  chart: {
    zoomType: 'xy',
    type: 'line'
  },
  // Colors
  colors: [
  // World 
  //'#000',
  
  // ASEAN 
  //'#67bce2',
  
  // Brunei
  '#4E79A7',

  // Cambodia
  '#F28E2C',

  // China
  //'#e22129',
  
  // Indonesia
  '#76B7B2',

  // Laos
  '#EDC949',

  // Malaysia
  '#BAD97C',

  // Myanmar
  '#E15759',

  // Philippines
  '#7FA8D9',

  // Singapore
  '#FF9DA7',

  // Thailand
  '#59A14F',

  // United States
  //'#566377',

  // Vietnam
  '#AF7AA1'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Cumulative number of reported Covid-19 cases in Southeast Asia"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Southeast Asia Program | Source: Johns Hopkins University"
  },
  // Chart Legend
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Number of Cumulative Cases"
    },
    labels: {
      formatter: function () {
        if (this.value > 999999) {
          return this.value / 1000000 + "M"
        }
        else if (this.value > 0) {
          return this.value / 1000 + "K"
        }
        else {
          return this.value
        }
      }
    }
  },
  xAxis: {
    dateTimeLabelFormats: {
      day: '%b %e',
      week: '%b %e'
    }
  },
  // Tooltip 
  tooltip: {
    shared: true,
    useHTML: true,
    xDateFormat: '%B %e, %Y'
  },
  // Additional Plot Options
  plotOptions:
  {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 3
    }
  }
})
