$(function () {
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1lp_h8guoJnDOkl7ZSxfGkdP3Ar0W10MOUTKghBGs54I',
    },
    chart: {
      type: 'column',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    colors: ['#DD4760','#EF9365','#85C1A1','#4D6E79','#3b75bb', '#887395'],
    credits: {
      enabled: true,
      href: null,
      text: "CSIS China Power Project | Various Sources",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    title: {
      text: "Number of Humans Launched into Space by Country",
      style: {
        fontFamily: 'Roboto Slab'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      title: {
        style: {
          fontFamily: 'Roboto Slab'
        }
      },
      itemStyle: {
        fontFamily: 'Roboto Slab'
      }
    },
    yAxis: {
      title: {
        text: "Number of Humans",
        style: {
          fontFamily: 'Roboto Slab'
        }
      },
    },
    plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                }
            }
        },
  });
});
