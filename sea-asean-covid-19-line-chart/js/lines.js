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
  '#75c596',

  // Cambodia
  '#000',

  // China
  //'#e22129',
  
  // Indonesia
  '#b24f9d',

  // Laos
  '#ef9a9a',

  // Malaysia
  '#f7890e',

  // Myanmar
  '#e22129',

  // Philippines
  '#67bce2',

  // Singapore
  '#752596',

  // Thailand
  '#51746d',

  // United States
  //'#566377',

  // Vietnam
  '#0065a4'
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
       return this.value
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
