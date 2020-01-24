Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs',
    googleSpreadsheetWorksheet: 2
  },
  // General Chart Options
  chart: {
    type: 'column'
  },
  // Chart Title and Subtitle
  title: {
    text: "CSIS Staff Breakdown by Race/Ethnicity"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS"
  },
  // Chart Legend
  legend: {
    title: {
      text: '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
    },
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  //  Tooltip 
  tooltip: {
    shared: true,
  },
  // X Axis
  xAxis: {
    type: 'category',
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
