$(function() {
  Highcharts.setOptions({
    lang: {
        decimalPoint: '.',
        thousandsSep: ','
    }
});
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1mqIPQLtlUQyvjgzn7W-XoIXGO1_i8WEYlUNNjH64abU',
    },
    chart: {
      type: 'line',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true,
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    credits: {
      enabled: true,
      href: "https://apps.fas.usda.gov/psdonline/app/index.html#/app/advQuery",
      text: "CSIS China Power Project | USDA",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    title: {
      text: "Meat Consumption in China, USA, and EU",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color};font-family:\'Lucida Grande\', sans-serif;">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },
    legend: {
      title: {
        text: 'Key<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic',
          fontFamily: 'Roboto Slab'
        }
      },
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
  colors: ['#ffd160', '#aa142d', '#ef9365', '#303d43', '#9864b6', '#5aa993', '#ed392a'],
    xAxis: {
      tickInterval: 1,
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: "Millions of Tons",
        style: {
          fontFamily: 'Roboto Slab'
        }
      },
      labels: {
        format: '{value}'
      }
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