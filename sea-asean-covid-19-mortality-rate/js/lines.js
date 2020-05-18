Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});


Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1hvUG-GDb9fWX1GO-xm26R5lsWnLTmWPKoFY-0Y6BAWA',
    googleSpreadsheetWorksheet: 2
  },
  // General Chart Options
  chart: {
    zoomType: 'xy',
    type: 'line'
  },
  // Colors
  colors: [
  // Brunei
  '#4E79A7',

  // Cambodia
  '#F28E2C',
  
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

  // Vietnam
  '#AF7AA1'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Cumulative Number of Reported Covid-19 Cases in Southeast Asia"
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
      text: "Number of Cumulative Cases Per Million"
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
    xDateFormat: '%B %e, %Y',
    valueDecimals: 2
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
