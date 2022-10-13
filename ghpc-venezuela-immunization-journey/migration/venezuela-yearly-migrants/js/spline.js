Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    decimalPoint: '.',
  },
})

Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: '12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c',
    googleSpreadsheetRange: 'breakdown-people-leaving-venezuela-2021',
  },
  // General Chart Options
  chart: {
    type: 'spline',
    spacingBottom: 60,
    height: 500,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif'],
    },
    backgroundColor: '#080808'
  },
  exporting: {
    enabled: false
  },
  // Colors
  colors: ['#9f0023'],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'Forcibly Displaced Venezuelans (2014-2021)',
  },
  title: {
    text: 'Forcibly Displaced Venezuelans (2014-2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Hover over the line to see the total number of forcibly displaced Venezuelans each year.',
    align: 'left',
    style: {
      color: 'white'
    }
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center</a><br />Source: UNHCR Refugee Statistics',
    style: {
      fontSize: '11px',
    },
    position: {
      y: -30,
    },
  },
  // Chart Legend
  legend: {
    enabled: false,
    align: 'left',
    x: -10,
    verticalAlign: 'top',
    layout: 'horizontal',
    symbolRadius: 0,
    itemStyle: {
      color: '#fff',
      fontWeight: 'normal',
    },
    itemHoverStyle: {
      color: '#fff'
    },
    labelFormatter: function () {
      return this.name
    },
  },
  // Y Axis
  yAxis: {
    gridLineColor: 'gray',
    title: {
      text: 'Number of Venezuelans',
      style: {
        color: 'white'
      }
    },
    max: 6000000,
    tickInterval: 1000000,
    startOnTick: false,
    endOnTick: false,
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  xAxis: {
    min: 2014,
    type: 'year',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2000 to 2021',
    },
    crosshair: true,
    labels: {
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
        new Intl.NumberFormat().format(this.y) +
        '</b><br/>'
      )
    },
    shared: true,
    style: {
      fontSize: '14px',
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
          fontWeight: 'normal',
        },
        formatter: function () {
          if (this.x > 2017) return new Intl.NumberFormat().format(this.y)

          if (this.series.index === 3)
            return new Intl.NumberFormat().format(this.y)
        },
      },
    },
  },
})
