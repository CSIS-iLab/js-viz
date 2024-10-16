Highcharts.setOptions({
  colors: ["#0065A6", "#0A8672"],
});

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetRange: "Region",
  },
  // General Chart Options
  chart: {
    type: "column",
    spacingBottom: 25,
  },
  // Chart Title and Subtitle
  title: {
    text: "Approved Support by Region",
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
