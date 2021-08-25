Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "16poMVWLNa7B8oTs6zcM1pj4Pmr6Smbmwxt7dg4Xwz-o",
    googleSpreadsheetWorksheet: 3,
  },
  // General Chart Options
  chart: {
    type: "column",
  },
  // Colors
  colors: ["#66C6CB", "#0092A8", "#013446"],
  // Chart Title and Subtitle
  title: {
    text: "Gender*, July 2020",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Center for Strategic and International Studies",
  },
  // Chart Legend
  legend: {
    title: {
      text:
        '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
    reversed: true,
  },
  //  Tooltip
  tooltip: {
    shared: true,
  },
  // X Axis
  xAxis: {
    type: "category",
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Number of Employees",
    },
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      // stacking: null, // Normal bar graph
      stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      },
    },
  },
});
