Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: '16px'
    },
  },
});

Highcharts.addEvent(
  Highcharts.Series,
  'afterSetOptions',
  function (e) {
      var colors = Highcharts.getOptions().colors,
          i = 0,
          nodes = {};

      if (
          this instanceof Highcharts.seriesTypes.networkgraph &&
          e.options.id === 'covid-tree'
      ) {
          e.options.data.forEach(function (link) {

              if (link[0] === 'Nutrition & COVID-19') {
                  nodes['Nutrition & COVID-19'] = {
                      id: 'Nutrition & COVID-19',
                      marker: {
                          radius: 40
                      }
                  };
                  nodes[link[1]] = {
                      id: link[1],
                      marker: {
                          radius: 30
                      },
                      color: colors[i++]
                  };
              } else if (nodes[link[0]] && nodes[link[0]].color) {
                  nodes[link[1]] = {
                      id: link[1],
                      color: nodes[link[0]].color
                  };
              }
          });

          e.options.nodes = Object.keys(nodes).map(function (id) {
              return nodes[id];
          });
      }
  }
);

$(function () {
  $(`#hcContainer`).highcharts({
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'networkgraph'
    },
    // Chart Title and Subtitle
    title: {
      text: "Food Nutrition and COVID-19"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Project Name | Source: NAME"
    },
    // Y Axis
    yAxis: {
      title: { 
        text: "Y Axis Title"
      },
    },
    // Colors
    colors: ["#004165", "#E86259", "#75BAA9", "#EDA27C", "#0064A6", "#4C8984"],
    // Additional Plot Options
    plotOptions:
    {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: {
            enableSimulation: true,
            friction: -0.9
        }
    }
    },
    // Hard Coded Data
    series: [{
      dataLabels: {
          enabled: true,
          linkFormat: ''
      },
      id: 'covid-tree',
      data: [
      //   from: 'Nutrition & COVID-19',
      //   to: 'Disrupted Supply Chains',
      //   value: 'The pandemic’s disruption of supply chains has led to increased food insecurity and rising prices.'
      // },
      // {
      //   from: 'Nutrition & COVID-19',
      //   to: 'Interrupted Food Markets',
      //   value: 'Agricultural labor and markets have been disrupted due to travel restrictions and social distancing practices.'
      // },
          ['Nutrition & COVID-19', 'Disrupted Supply Chains', 'The pandemic’s disruption of supply chains has led to increased food insecurity and rising prices.'],
          ['Nutrition & COVID-19', 'Interrupted Food Markets', 'Agricultural labor and markets have been disrupted due to travel restrictions and social distancing practices.'],
          ['Nutrition & COVID-19', 'Loss of Income'],
          ['Nutrition & COVID-19', 'Poor Regulation'],
          ['Nutrition & COVID-19', 'Misinformation'],
          
          // Leaves:
          
      ]
  }],
  })
})
