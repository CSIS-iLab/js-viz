Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1bmJkbGwoBJDW2dXkqxrWZNwC6NzwABQM-a1DcUVDkJs',
    googleSpreadsheetWorksheet: 1
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'line'
  },
  // Chart Title and Subtitle
  title: {
    text: "Global Food Prices"
  },
  subtitle: {
    text: "Click and drag to zoom in"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Food Security Program | Source: Food & Agriculture Organization of the United Nations"
  },
  // Chart Legend
  legend: {
    title: {
      text: ''
    },
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Food Price Index (points)"
    }
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
  },
  tooltip: {
    valueDecimals: 1
  }
})