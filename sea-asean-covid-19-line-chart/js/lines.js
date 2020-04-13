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
    zoomType: 'x',
    type: 'line'
  },
  // Colors
  colors: [
    '#752596',
    '#67bce2',
    '#788ca8',
    '#b24f9d',
    '#e22129',
    '#75986a',
    '#607a81',
    '#004165',
    '#0095AB',
    '#66c6cb',
    '#252d3a',
    '#51746d',
    '#566377',
    '#0065a4',
    '#0faa91'
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
    layout: 'horizontal'
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Number of Cumulative Cases"
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