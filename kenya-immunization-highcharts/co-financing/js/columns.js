Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    numericSymbols: null
  },
  chart: {
    style: {
      fontFamily: "Roboto"
    }
  }
});

Highcharts.chart('hcContainer', {
  data: {
    googleSpreadsheetKey: "10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg",
    googleSpreadsheetWorksheet: 2,
    switchRowsAndColumns: true
  },
  chart: {
      type: 'column'
  },
  colors: [
    // HPV national
    '#F26522',
    
    // YF routine 
    '#F5A623',
    
    // Rota
    '#8E6C89',
  
    // PCV
    '#A7D49B',

    // Penta
    '#47ACB1'
  ],
  title: {
      text: 'Co-financing projections 2020-2024'
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Millions'
      },
      stackLabels: {
          enabled: true,
      }
  },
  legend: {
    align: "right",
    verticalAlign: "middle",
    layout: "vertical"
  },
  tooltip: {
      useHTML: true,
      shared: true,
  },
  plotOptions: {
      column: {
          stacking: 'normal',
      }
  },
});