// Data gathered from http://populationpyramid.net/germany/2015/

// Age categories
var categories = [
  '0-4', '5-9', '10-14', '15-19',
  '20-24', '25-29', '30-34', '35-39', '40-44',
  '45-49', '50-54', '55-59', '60-64', '65-69',
  '70-74', '75-79', '80-84', '85-89', '90-94',
  '95-99', '100 + '
];

Highcharts.chart('hcContainer', {
  chart: {
      type: 'bar'
  },
  title: {
      text: "Japan's Ratings of China"
  },
  subtitle: {
      text: ''
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS [Project] | Source: PEW"
  },
  xAxis: [{
      categories: categories,
      reversed: false,
      labels: {
          step: 1
      },
      accessibility: {
          description: 'Age (male)'
      }
  }, { // mirror axis on right side
      opposite: true,
      reversed: false,
      categories: categories,
      linkedTo: 0,
      labels: {
          step: 1
      },
      accessibility: {
          description: 'Age (female)'
      }
  }],
  yAxis: {
      title: {
          text: null
      },
      labels: {
          formatter: function () {
              return Math.abs(this.value) + '%';
          }
      },
      accessibility: {
          description: 'Percentage population',
          rangeDescription: 'Range: 0 to 5%'
      }
  },

  plotOptions: {
      series: {
          stacking: 'normal'
      }
  },

  tooltip: {
      formatter: function () {
          return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
              'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
      }
  },

  series: [{
      name: 'Male',
      data: [
          -2.2, -2.1, -2.2, -2.4,
          -2.7, -3.0, -3.3, -3.2,
          -2.9, -3.5, -4.4, -4.1,
          -3.4, -2.7, -2.3, -2.2,
          -1.6, -0.6, -0.3, -0.0,
          -0.0
      ]
  }, {
      name: 'Female',
      data: [
          2.1, 2.0, 2.1, 2.3, 2.6,
          2.9, 3.2, 3.1, 2.9, 3.4,
          4.3, 4.0, 3.5, 2.9, 2.5,
          2.7, 2.2, 1.1, 0.6, 0.2,
          0.0
      ]
  }]
});