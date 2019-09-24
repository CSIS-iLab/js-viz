Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  }
});

Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetWorksheet: 1
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'spline',
    height: "40%"
  },

  // Chart Colors
  colors: ['#004165', '#e86259', '#75baa9', '#EDA27C', "#0064a6", '#4C8984'],


  // Chart Title and Subtitle
  title: {
    text: "Global Polio Caseload"
  },
  subtitle: {
    text: "Hover over a point to see the number of cases in that country. Click and drag to zoom in."
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
    shared: true
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Polio Cases"
    },
  },
  // plotOptions: {
  //   spline: {
  //     marker: {
  //       symbol: "circle"
  //     }
  //   }
  // }
})
