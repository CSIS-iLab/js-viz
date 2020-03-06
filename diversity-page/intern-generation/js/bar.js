Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs',
    googleSpreadsheetWorksheet: 6,
    switchRowsAndColumns: true
  },
  // General Chart Options
  chart: {
    type: 'column'
  },
  // Colors
  colors: [
    '#66C6CB', '#0092A8', '#013446'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Generation, 2019"
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
  },
  //  Tooltip 
  // tooltip: {
  //   shared: true,
  // },
  // X Axis
  xAxis: {
    type: 'category',
    labels: {
      enabled: false
    }
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
      // stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      }
    }
  }
})
