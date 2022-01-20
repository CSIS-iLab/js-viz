Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s3_5",
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
    "#FFC270", // Neutral
    "#0FAA94", // Agree
    "#01846C", // Strongly Agree
    "#C5C4C0" // refuse to answer
  ],
  // Chart Title and Subtitle
  title: {
    text: "Private capital should be encouraged to set up private hospitals to provide convenient and high-quality services to those who are willing to pay higher prices.",
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
