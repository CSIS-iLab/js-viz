Highcharts.chart('container', {
  chart: {
    height: 600,
    inverted: true,
    style: {
      fontFamily: "utopia-std",
    },
  },
  title: {
    text: ''
  },
  accessibility: {
    point: {
      descriptionFormatter: function (point) {
        var nodeName = point.toNode.name,
          nodeId = point.toNode.id,
          nodeDesc = nodeName === nodeId ? nodeName : nodeName + ', ' + nodeId,
          parentDesc = point.fromNode.id;
        return point.index + '. ' + nodeDesc + ', reports to ' + parentDesc + '.';
      }
    }
  },
  series: [{
    type: 'organization',
    name: 'Highsoft',
    keys: ['from', 'to'],
    data: [
      ['Ukrainian Private Sector', 'Small and Medium Sized Enterprises (SMEs)'],
      ['Ukrainian Private Sector', 'Local Financial Institutions'],
      ['Local Financial Institutions', 'Investment Funds'],
      ['Local Financial Institutions', 'Banks'],
      ['Local Financial Institutions', 'Insurance Companies'],
    ],
    levels: [{
      level: 0,
      color: '#FDF482',
      dataLabels: {
        color: 'black'
      },
      height: 25
    }, {
      level: 1,
      color: '#32425C',
      dataLabels: {
        color: 'white'
      },
      height: 25
  }, {
      level: 2,
      color: '#8FB5EA',
      dataLabels: {
        color: 'black'
      }
    }],
    nodes: [{
      id: 'Ukrainian Private Sector'
    }, {
      id: 'Small and Medium Sized Enterprises (SMEs)'
    }, {
      id: 'Ukrainian Private Sector',
    }, {
      id: 'Local Financial Institutions',
    }, {
      id: 'Investment Funds',
    }, {
      id: 'Banks',
    }, {
      id: 'Insurance Companies',
    }],
    colorByPoint: false,
    color: '#007ad0',
    dataLabels: {
      color: 'white'
    },
    borderColor: 'white',
    nodeWidth: 65
  }],
  tooltip: {
    enabled: false,
    outside: true
  },
  exporting: {
    allowHTML: true,
    sourceWidth: 800,
    sourceHeight: 600
  }
});