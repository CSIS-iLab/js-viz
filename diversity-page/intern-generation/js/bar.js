Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs',
    googleSpreadsheetWorksheet: 6,
  },
  // General Chart Options
  chart: {
    type: 'column'
  },
  // Colors
  colors: [
    '#0065A4'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Generation, December 2020"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Center for Strategic and International Studies"
  },
  // Chart Legend
  legend: {
    enabled: false
  },

  // X Axis
  xAxis: {

  },
  // Y Axis
  yAxis: {
    title: {
      text: "Number of Interns"
    },
  },
  // Additional Plot Options
  plotOptions:
  {
    column: {
      stacking: null, // Normal bar graph
      dataLabels: {
        enabled: false,
      }
    }
  }
})
