Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "14m3yFJqWpdo-SecoFTIetBVBnhzTgMf131VbxBFsrxY"
    /*googleSpreadsheetWorksheet: 2,
    parseDate: function(thisDate) {
      return Date.parse(thisDate.replace('-', '/1/'));
    }*/
  },
  // General Chart Options
  chart: {
    type: "line"
  },
  // Colors
  colors: [
    '#4F72BE',
    '#DE8244',
    '#A5A5A5',
    '#F5C243',
    '#6A9AD0',
    '#0A8672',
    '#0FAA94'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Global Polio Cases by Region, 1980-2019"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: WHO, GPEI"
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