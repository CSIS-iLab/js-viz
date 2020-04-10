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
  // Chart Title and Subtitle
  title: {
    text: "Chart Tracker COVID19 SEA"
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