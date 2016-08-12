$(function() {

  $('#hcContainer').highcharts({

data: {
  googleSpreadsheetKey: '17ngggpKYHaFiTvqr0Sx_NYcitECqdO13MVE4lRGjflM',
  seriesMapping: [{
                label: 0 // Labels are pulled from column 2 and picked up in the dataLabels.format below
            }],
            startRow: 1
},

      chart: {
        type: 'scatter',
        backgroundColor: '#FFF',
        border: 'none',
        color: '#000',
        plotShadow: true
      },
      title: {
    text: 'Height Versus Weight of 507 Individuals by Gender'
},
subtitle: {
    text: 'Source: Heinz  2003'
},
xAxis: {
    title: {
        enabled: true,
        text: 'Height (cm)'
    },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true
},
yAxis: {
    title: {
        text: 'Weight (kg)'
    }
},
legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'top',
    x: 100,
    y: 70,
    floating: true,
    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
    borderWidth: 1
},

plotOptions: {
  series: {
    name: '{point.label}',
    dataLabels: {
      enabled: true,
      format: '{point.label}'
    }
  },
    scatter: {
        marker: {
            radius: 5,
            states: {
                hover: {
                    enabled: true,
                    lineColor: 'rgb(100,100,100)'
                }
            }
        },
        states: {
            hover: {
                marker: {
                    enabled: true
                }
            }
        },
        tooltip: {
            pointFormat: '{point.x} CPI Rating, {point.y} Freedom House'
        }
    }
}

});
});
