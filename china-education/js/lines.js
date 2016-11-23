$(function() {
  Highcharts.setOptions({
    lang: {
        decimalPoint: '.',
        thousandsSep: ','
    }
});
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1pcZc3PGAOmN4cCVAmKuUmh3zP2GNACXv6uvaJQLiUrw',
    },
    chart: {
      type: 'line',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS China Power Project | UNDP, World Bank"
    },
    title: {
      text: "Education Index by Income Level"
    },
    subtitle: {
      text: "2005-2014"
    },
    legend: {
      title: {
        text: 'Income Level<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic'
        }
      },
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    colors: ['#7ea5b2', '#303D43', '#907561', '#781F30', '#EC382A', '#61884D', '#d1e056'],
    xAxis: {
      tickInterval: 1,
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: "Education Index"
      },
    },
  plotOptions:
  {
    line: {
      marker: {
        enabled: false,
        symbol: "circle"
      }
    }
  },
  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
      }]
  }
});
});
