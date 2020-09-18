Highcharts.setOptions({
  colors: ["#0065A6", "#0A8672"],
});

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 1,
  },
  // General Chart Options
  chart: {
    type: "column",
  },
  // Chart Title and Subtitle
  title: {
    text: "Support by Region",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Economics Program | Source: IFI press releases",
  },
  // Chart Legend
  legend: {
    // enabled: false,
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
    valueDecimals: 2,
    valuePrefix: "$",
    valueSuffix: " billion",
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
    // series: {
    //   colorByPoint: true,
    //   colors: ["#004165", "#0065A6", "#0A8672", "#7b7d7c", "#E5EFF6"],
    // },
  },
});
