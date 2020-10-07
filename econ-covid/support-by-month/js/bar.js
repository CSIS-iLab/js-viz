Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 6,
  },
  // General Chart Options
  chart: {
    type: "column",
  },
  // Chart Title and Subtitle
  title: {
    text: "Approved Support by Month",
  },
  subtitle: {
    text: "",
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
  colors: ["#004165"],
  // Y Axis
  yAxis: {
    title: {
      text: "USD Billions",
    },
  },
  // X Axis
  xAxis: {
    type: "datetime",
    labels: {
      format: "{value:%B %Y}",
    },
  },
  // Tooltip
  tooltip: {
    valueDecimals: 1,
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
  },
});
