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
  annotations: [{
    labelOptions: {
      backgroundColor: 'rgba(255,255,255, 0)',
      verticalAlign: 'top',
      borderColor: 'rgba(255,255,255,0)'
    },
    labels: [{
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 2.5,
        y: 12000000
      },
      style: {
        fontSize: '14px'
      },
      text: 'Accelerated Transition Phase'
    }, {
      point: {
        xAxis: 0,
        yAxis: 0,
        x: 2, 
        y: 7000000
      },
      style: {
        fontSize: '14px',
        color: 'red'
      },
      text: 'Grace year'
    }]
  }],
  colors: [
    // HPV national
    '#b5dddf',
    
    // YF routine 
    '#90cdd0',
    
    // Rota
    '#6bbcc0',
  
    // PCV
    '#47acb1',

    // Penta
    '#347d81'
  ],
  title: {
      text: 'Co-financing projections 2020-2024'
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center"
  },
  xAxis: {
    plotBands: {
      to: 5,
      from: 1.5,
      color: 'rgb(216,217,220,0.5)'
    }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Millions'
      },
      labels: {
        formatter: function() {
          return '$' + (this.value / 1000000) + 'M';
        },
      },
      stackLabels: {
          enabled: true,
          formatter: function() {
            return 'Total: $' + (this.total/1000000).toFixed(2) + 'M';
          }
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
      borderColor: 'gray',
      headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>',
      valuePrefix: '$'
  },
  plotOptions: {
      column: {
          stacking: 'normal',
          borderColor: 'rgba(255,255,255,0)'
      }
  },
});