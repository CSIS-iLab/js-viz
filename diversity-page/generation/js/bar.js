Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: '1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs',
    googleSpreadsheetRange: "Generation",
  },
  // General Chart Options
  chart: {
    type: 'column'
  },
  // Colors
  colors: [
    '#247877', // senior research staff
    '#0FAA91', // junior research staff
    '#004165', // senior admin staff
    '#4CC7E6', // junior admin staff
  ],
  // Chart Title and Subtitle
  title: {
    text: "Generation, December 2021"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Center for Strategic and International Studies"
  },
  // Chart Legend
  legend: {
    title: {
      text: '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
    },
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
    reversed: true
  },
  //  Tooltip 
  tooltip: {
    shared: true,
  },
  // X Axis
  xAxis: {
    type: 'category',
    labels: {
      formatter: function () {
        let splitStr = this.value.split('(')
        return splitStr[0] + '<br/>(' + splitStr[1]
      }
    }
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Number of Employees"
    },
  },
  // Additional Plot Options
  plotOptions:
  {
    column: {
      // stacking: null, // Normal bar graph
      stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      }
    }
  }
})
