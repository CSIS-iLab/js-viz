Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: '12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c',
    googleSpreadsheetRange: 'mvc1-vax-coverage'
  },
  // General Chart Options
  chart: {
    type: 'spline',
    spacingBottom: 60,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif']
    },
    backgroundColor: '#080808',
    height: 500
  },
  exporting: {
    enabled: false
  },
  // Colors
  colors: [
    '#D92F5D', // Venezuela
    '#F3C11B', // Colombia
    '#4881B5', // Americas
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'MCV1 Coverage in Venezuela, Colombia, and the Americas Region (2000–2021)',
  },
  title: {
    text: 'MCV1 Coverage in Venezuela, Colombia, and the Americas Region (2000–2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  subtitle: {
    text: "Measles vaccination coverage, first dose (MCV1). Hover over the lines below to see the coverage of the MCV1 vaccine in a given year in Venezuela, Colombia, and the Americas region. To hide a region's data, click in the legend below.",
    align: 'left',
    style: {
      color: 'white'
    }
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center</a><br />Source: WHO/UNICEF Estimates of National Immunization Coverage',
    style: {
      fontSize: '11px'
    },
    position: {
      y: -30
    }
  },
  // Chart Legend
  legend: {
    align: 'left',
    x: -10,
    verticalAlign: 'top',
    layout: 'horizontal',
    symbolRadius: 0,
    itemStyle: {
      color: '#fff',
      fontWeight: 'normal'
    },
    itemHoverStyle: {
      color: '#fff'
    },
    labelFormatter: function () {
      return this.name
    }
  },
  // Y Axis
  yAxis: {
    title: {
      text: 'Vaccination Coverage',
      style: {
        color: 'white'
      },
    },
    labels: {
      formatter: function () {
        return this.value + '%'
      },
      style: {
        color: 'white',
      },
    },
    gridLineColor: 'gray',
    max: 100,
    min: 20,
    tickInterval: 20,
    reversedStacks: false
  },
  xAxis: {
    type: 'year',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2000 to 2021'
    },
    crosshair: true,
    labels: {
      step: 3,
      rotation: -45,
      y: 25,
      style: {
        color: 'white'
      }
    }
  },
  // Tooltip
  tooltip: {
    headerFormat: '{point.key}<br/>',
    pointFormatter: function () {
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        this.series.name +
        ': <b> ' +
        this.y +
        '%</b><br/>'
      )
    },
    shared: true,
    style: {
      fontSize: '14px'
    },
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false
          }
        }
      },
      dataLabels: {
        enabled: false,
        style: {
          textOutline: 'none',
          fontWeight: 'normal'
        }
      }
    }
  }
})
