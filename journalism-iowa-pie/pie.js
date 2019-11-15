// Build the chart
Highcharts.setOptions({
    colors:['#3c939e', '#c21414', '#576071'],
            });

Highcharts.chart('container', {
   credits: {
    text: 'Uganda Bureau of Statistics',
    href: 'https://www.ubos.org/uganda-profile/'
    },

  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Ugandan Population by Age'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Percent of Population',
    colorByPoint: true,
    data: [{
      name: 'Under 18',
      y: 55
    }, {
      name: '18-30',
      y: 23
    }, {
      name: 'Over 30',
      y: 22
    },
    ]
  }]
});
