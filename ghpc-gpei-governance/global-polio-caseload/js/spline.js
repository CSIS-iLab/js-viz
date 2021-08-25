Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  },
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: '16px'
    }
  }
});

Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetRange: "Global Polio Caseload",
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'spline',
  },

  // Chart Colors
  colors: ['#004165', '#e86259', '#75baa9', '#EDA27C', "#0064a6", '#4C8984'],


  // Chart Title and Subtitle
  title: {
    text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">Global Polio Caseload 2000-2019</span>'
  },
  subtitle: {
    text: '<span style="font-size: 16px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">Hover over a point to see the number of cases per country. Click and drag to zoom in.</span>'
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
      text: '<br><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    margin: 20,
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal'
  },
  //  Tooltip 
  tooltip: {
    shared: true,
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
