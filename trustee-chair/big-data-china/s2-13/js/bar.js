Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s2_13",
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
    text: "The government should allow people to express their positive or negative views toward government policies.",
    align: "left",
    style: {
      color: 'black',
      fontSize: '20px',
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
    style: {
      fontSize: '11px'
    },
    position: {
      y: -30
    }
  },
  // Chart Legend
  legend: {
    align: "left",
    x: -10,
    verticalAlign: "top",
    layout: "horizontal",
    symbolRadius: 0,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
    },
    labelFormatter: function () {
      return this.name.slice(0, -2); // remove the last 2 characters of the string ' %'
    }
  },
  // Y Axis
  yAxis: {
    title: {
      text: ""
    },
    max:100,
    reversedStacks: false,
    visible: false,
  },
  xAxis: {
    type: "category"
  },
  // Tooltip
  tooltip: {
    headerFormat: '{point.key}<br/>',
    pointFormatter: function () {      
      return '<span style="font-size: 14px;color:' + this.color + '">\u25A0</span> ' + this.series.name.slice(0, -2) + ': <b> ' + this.y.toFixed(1) + '%</b><br/>'
    },
    shared: true,
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      stacking: 'normal',
      borderWidth: 0,
      groupPadding: 0.1,
      
      dataLabels: {
        align: 'left',
        enabled: true,
        formatter: function () {
          return this.y.toFixed(1) + '%'
        },
        style: {
          textOutline: 'none',
          fontWeight: 'normal'
        }
      }
    }
  }
});
