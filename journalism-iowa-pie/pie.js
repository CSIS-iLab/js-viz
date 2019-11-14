// Build the chart
Highcharts.setOptions({
    colors:['#3c939e', '#c21414', '#576071'],
            });

Highcharts.chart('container', {
   credits: {
    text: 'Uganda Bureau of Statistics',
    href: 'https://www.ubos.org/uganda-profile/'
    },
  caption: {
    text: 'President Yoweri Museveni came to power in 1986.  Ugandans age 0 to 30 make up 78% up the population. This percentage does not include Ugandans aged 30 to 33. Therefore, more than 78% of the Ugandan population have never known another leader.'
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
