Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "14m3yFJqWpdo-SecoFTIetBVBnhzTgMf131VbxBFsrxY",
    googleSpreadsheetWorksheet: 2,
    parseDate: function(thisDate) {
      return Date.parse(thisDate.replace('-', '/1/'));
    }
  },
  // General Chart Options
  chart: {
    type: "line"
  },
  // Colors
  colors: [
    '#58a897',
    '#3b75bb',
    '#a483a8',
    '#8cb561',
    '#ef9a9a',
    '#ed392a'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Breakdown of International Payments by Currency"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS China Power Project | Source: SWIFT"
  },
  // Chart Legend
  legend: {
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Share of Total Payments (%)"
    }
  },
  // Tooltip
  tooltip: {
    valueDecimals: 1,
    shared: true,
    useHTML: true,
    valueSuffix: '%',
    xDateFormat: '%B %Y'
  },
  // Additional Plot Options
  plotOptions: {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 3
    }
  }
});