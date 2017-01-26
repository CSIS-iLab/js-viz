$(function() {
  Highcharts.setOptions({
    lang: {
        decimalPoint: '.',
        thousandsSep: ','
    }
});
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1xtUO5EOvcM2LI_MWggy1VokGpAy00PTJH2EvUiW7h-Y',
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
      text: "CSIS China Power Project | UNDP, World Bank",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    title: {
      text: "Lines 1",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    subtitle: {
      text: "2005-2014",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color};font-family:\'Lucida Grande\', sans-serif;">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },
    legend: {
      title: {
        text: 'Income Level<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
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
        text: "Education Index",
        style: {
          fontFamily: 'Roboto Slab'
        }
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
