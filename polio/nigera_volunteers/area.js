$(function () {

  var categories = ['April 2017', 'July 2017', 'October 2017', 'November 2017', 'January 2018', 'March 2018'];

Highcharts.chart('container', {
    chart: {
        type: 'area',
        style: {
            fontFamily: 'Montserrat, sans-serif'
        },
    },
    title: {
        text: 'Nigeria Volunteer Community Mobilizers Fill Polio Vaccination Campaign Gaps'
    },
    subtitle: {
        text: 'Hover over the chart to compare how many missed children were vaccinated. '
    },
    xAxis: {
        // categories: ['April 2017', 'July 2017', 'October 2017', 'November 2017', 'January 2018', 'March 2018'],
        labels: {
            enabled: true,
            formatter: function () {
                return categories[this.value];
            }
        },
        tickInterval: 1,
        minPadding: 0,
        maxPadding: 0,
        startOnTick: true,
        endOnTick: true
    },
    yAxis: {
        title: {
            text: 'Number of Children'
        },
    },
    tooltip: {
      split: true
    },
    plotOptions: {
        area: {
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666',
                symbol: 'circle',
                 radius: 2
            }
        }
    },
   series: [{
        name: 'Missed children during polio vaccination campaign',
        data: [55806, 46454, 64376, 40704, 44939, 17761]
    }, {
        name: 'Missed children recovered by Volunteer Community Mobilizers',
        data: [48591, 41983, 47858, 34574, 30943, 13269]
      }],

colors: ['#788ca8', '#66c6cb'],
        // Credits
        credits: {
          enabled: true,
          href: "http://polioeradication.org/wp-content/uploads/2018/01/ppg-hlm-presentation-who-unicef-20171208.pdf",
          text: "CSIS Global Health | Source: UNICEF"
        },
});
});
