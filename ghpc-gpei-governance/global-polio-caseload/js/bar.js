Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetWorksheet: 1
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'spline'
  },

  // Chart Colors
  colors: ['#004165', '#e86259', '#EDA27C', "#0064a6", '#75baa9', '#4C8984'],
  // colors: ['#e86259', "#4C8984", "#004165", "#75baa9", "#0064a6"],

  // Chart Title and Subtitle
  title: {
    text: "Global Polio Caseload"
  },
  subtitle: {
    text: "Click and drag to zoom in"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: World Health Organization"
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
    // headerFormat: '',
    // pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}<br/>{point.x} Cases: {point.y}',
    shared: true
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Polio Cases"
    },
  },
  // Additional Plot Options
  plotOptions:
  {
    column: {
      stacking: 'normal', // Normal bar graph
      // stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: false,
      }
    }
  }
})
