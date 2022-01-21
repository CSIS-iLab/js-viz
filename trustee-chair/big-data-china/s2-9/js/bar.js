Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s2_9",
  },
  // General Chart Options
  chart: {
    type: "bar",
    spacingBottom: 60
  },
  // Colors
  colors: [
    "#C52125", // Strongly Disagree
    "#FD8A6D", // Disagree
    "#FFF1B5", // Neutral
    "#93BB84", // Agree
    "#01846C", // Strongly Agree
    "#C5C4C0" // refuse to answer
  ],
  // Chart Title and Subtitle
  title: {
    text: "There should be limitation on people gathering in public places and participating in demonstrations.",
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
    },
    labelFormatter: function () {
      return this.name.slice(0, -2); // to remove the las 2 characters of the string ' %'
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
        format: '{y}%',
        style: {
          textOutline: 'none'
        }
      }
    }
  }
});
