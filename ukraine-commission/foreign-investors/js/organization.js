Highcharts.chart('container', {
  chart: {
    height: 450,
    inverted: true,
    style: {
      fontFamily: "utopia-std",
    },
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false,
    },
  accessibility: {
    point: {
      descriptionFormatter: function(point) {
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
      ['Foreign Investors', 'Multinational Corporations'],
      ['Foreign Investors', 'Financial Institutions'],
      ['Financial Institutions', 'Commercial Banks'],
      ['Financial Institutions', 'Institutional Investors'],
      ['Financial Institutions', 'Investment Funds'],
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
      id: 'Foreign Investors'
    }, {
      id: 'Multinational Corporations'
    }, {
      id: 'Financial Institutions',
    }, {
      id: 'Commercial Banks',
    }, {
      id: 'Institutional Investors',
    }, {
      id: 'Investment Funds',
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
    enabled: false,
    allowHTML: true,
    sourceWidth: 800,
    sourceHeight: 600
  }
});