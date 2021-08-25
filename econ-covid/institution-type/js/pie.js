Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 3,
  },
  // General Chart Options
  chart: {
    type: "pie",
  },
  // Colors
  colors: ["#004165", "#0A8672", "#bbbbbb"],
  // Chart Title and Subtitle
  title: {
    text: "Approved Support by Institution Type",
  },
  subtitle: {
    text: "(USD billions)",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Economics Program | Source: IFI press releases",
  },
  // Chart Legend
  legend: {
    title: false,
    align: "right",
    verticalAlign: "middle",
    layout: "vertical",
  },
  tooltip: {
    valueDecimals: 2,
    valuePrefix: "$",
    valueSuffix: " billion",
  },
  // Additional Plot Options
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        formatter: function () {
          return Highcharts.numberFormat(this.percentage, 1) + "%";
        },
      },
      showInLegend: true,
    },
  },
});
