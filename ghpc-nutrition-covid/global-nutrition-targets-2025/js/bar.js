Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: "15px",
    },
  },
});
Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1YcIOXbY6seINOUcFqlvBDFsQ9iT7TUcmiHiY6u7dTSs",
    googleSpreadsheetWorksheet: 2,
  },
  // General Chart Options
  chart: {
    type: "bar",
  },
  // Chart Title and Subtitle
  title: {
    text: "2025 Global Nutrition Targets",
    style: {
      fontWeight: 700,
    },
  },
  subtitle: {
    text:
      "In 2012, the World Health Assembly endorsed a <i>Comprehensive implementation plan on maternal, infant, and young child nutrition</i> to be achieved by 2025. In 2020, most of the 194 countries tracked by the Global Nutrition Report have either not been assessed or are not on track to meet these targets.",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS GHPC | Source: WHO (2014); Global Nutrition Report (2020)",
  },
  // Chart Legend
  legend: {
    reversed: true,
    title: {
      text:
        '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Colors
  colors: [
    "#E86259",
    "#968f80",
    "#75BAA9",
    "#004165",
    "#EDA27C",
    "#0064A6",
    "#4C8984",
  ],
  yAxis: {
    title: {
      text: "",
    },
    visible: false,
  },
  xAxis: {
    labels: {
      style: {
        fontSize: "12px",
      },
    },
  },
  // Tooltip
  tooltip: {
    useHTML: true,
    shared: true,
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      // stacking: null, // Normal bar graph
      stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      },
    },
  },
});
