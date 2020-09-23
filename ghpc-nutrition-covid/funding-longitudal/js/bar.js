Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: "16px",
    },
  },
});
Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1YcIOXbY6seINOUcFqlvBDFsQ9iT7TUcmiHiY6u7dTSs",
    googleSpreadsheetWorksheet: 1,
  },
  // General Chart Options
  chart: {
    type: "column",
  },
  // Chart Title and Subtitle
  title: {
    text: "Global Nutrition ODA 2008-2017",
    style: {
      fontWeight: 700,
    },
  },
  subtitle: {
    text: "",
  },
  yAxis: {
    title: {
      text: "Millions USD",
    },
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text:
      "CSIS GHPC | Global Nutrition Report by WHO/UNICEF/World Bank/IHME (2020)",
  },
  // Chart Legend
  legend: {
    enabled: false,
    title: {
      text:
        'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  tooltip: {
    valuePrefix: "$",
    valueSuffix: " million",
  },
  // Colors
  colors: ["#004165", "#E86259", "#75BAA9", "#EDA27C", "#0064A6", "#4C8984"],
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: null, // Normal bar graph
      // stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      },
    },
  },
});
