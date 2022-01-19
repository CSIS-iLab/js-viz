Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s3_7",
  },
  // General Chart Options
  chart: {
    type: "bar",
    spacingBottom: 60
  },
  // Colors
  colors: [
    "#004165", // Strongly Disagree
    "#0064A3", // Disagree
    "#BCBCBC", // Neutral
    "#0FAA91", // Agree
    "#0A8672", // Strongly Agree
    "#eaeae6" // refuse to answer
  ],
  // Chart Title and Subtitle
  title: {
    text: "Individuals should be allowed to own, buy and sell land.",
    align: "left",
    style: {
      fontWeight: 'bold'
    }
  },
  subtitle: {
    text: "% of respondents that believe ___",
    align: "left",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Big Data China",
    position: {
      y: -30
    }
  },
  // Chart Legend
  legend: {
    align: "left",
    verticalAlign: "top",
    layout: "horizontal",
    itemStyle: {
      color: '#000000',
      fontWeight: 'normal'
    }
  },
  // Y Axis
  yAxis: {
    title: {
      text: ""
    },
    max:100,
    reversedStacks: false,
  },
  xAxis: {
    type: "category"
  },
  // Tooltip
  tooltip: {
    shared: true,
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      stacking: 'normal',
      dataLabels: {
        align: 'left',
        enabled: true,
        style: {
          textOutline: 'none'
        },
      }
    }
  }
});
