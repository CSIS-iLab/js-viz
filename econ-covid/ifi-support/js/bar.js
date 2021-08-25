Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 4,
  },
  // General Chart Options
  chart: {
    type: "column",
    spacingBottom: 25,
  },
  // Chart Title and Subtitle
  title: {
    text: "Approved Support by Country Income Group",
  },
  // Legend
  legend: {
    enabled: false,
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Economics Program | Source: IFI press releases",
  },
  // Colors
  colors: ["#004165", "#0065A6"],
  // Y Axis
  yAxis: {
    title: {
      text: "USD Billions",
    },
  },
  tooltip: {
    valuePrefix: "$",
    valueSuffix: " billion",
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
