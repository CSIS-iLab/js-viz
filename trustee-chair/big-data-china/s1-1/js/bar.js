Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: "1rPblPBVo7zD0u65uEGnaFCkVCBLt5t-ejEqh3q6xTWg",
    googleSpreadsheetRange: "s1_1",
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
    text: "The government should safeguard national sovereignty and territorial integrity as much as possible through diplomatic and economic means to avoid military conflicts.",
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
    verticalAlign: "top",
    layout: "horizontal",
    symbolRadius: 0,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
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
    visible: false,
  },
  xAxis: {
    type: "category"
  },
  // Tooltip
  tooltip: {
    headerFormat: '',
    pointFormatter: function pointFormatter(e) {
      return '<div><span style="font-size:18px;color:' +
        this.color +
        '">\u25A0 </span><b>' +
        this.y +'%'+
        "</b><br/>" +
        this.y +
        "</div>"
      
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
        // format: '{y}%',
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
