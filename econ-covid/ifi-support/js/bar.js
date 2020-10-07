Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 4,
  },
  // General Chart Options
  chart: {
    type: "column",
  },
  // Chart Title and Subtitle
  title: {
    text: "Support by Country Income Group",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Economics Program | Source: IFI press releases",
  },
  // Colors
  // Colors
  colors: ["#004165", "#0065A6"],
  // Chart Legend
  legend: {
    title: {
      text:
        '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Y Axis
  yAxis: {
    title: {
      text: "USD Billions",
    },
  },
  tooltip: {
    valuePrefix: "$",
    valueSuffix: " billion USD",
    valueDecimals: 1,
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: null, // Normal bar graph
      // stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: true,
        formatter: function () {
          return Highcharts.numberFormat(this.y, 1);
        },
      },
    },
  },
});