Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s1_6",
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
    text: "Chinese citizens should be allowed to simultaneously hold foreign citizenship."
  },
  subtitle: {
    text: "% of respondents that believe ___"
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
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: ""
    },
    max:100,
    // reversedStacks: false,
    // labels: {
    //   formatter: function(){
    //     return `${(this.value / 1000000000).toFixed(0)}`
    //   }
    // },
    // max: 500000000000
  },
  // Tooltip
  tooltip: {
    shared: true,
    // pointFormatter: function() {
    //   return `<span style="color:${this.color}">\u25CF </span>${this.series.name}
    //   $${(this.y / 1000000000).toFixed(1)} billion<br />`;
    // }
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      stacking: 'normal'
    }
  }
});
