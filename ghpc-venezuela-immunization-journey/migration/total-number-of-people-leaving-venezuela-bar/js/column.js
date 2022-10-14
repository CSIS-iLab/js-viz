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
    googleSpreadsheetRange: 'total-number-of-people-leaving-venezuela-18-21',
  },
  // General Chart Options
  chart: {
    type: 'column',
    spacingBottom: 60,
    height: 500,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif'],
      color: 'white'
    },
    backgroundColor: '#080808',
    height: 500
  },
  exporting: {
    enabled: false
  },
  // Colors
  colors: [
    '#a4a5a5', // Other countrßies
    '#FFC728', // Colombia
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'Proportion of Forcibly Displaced Venezuelans Who Settled in Colombia (2018–2021)',
  },
  title: {
    text: 'Proportion of Forcibly Displaced Venezuelans Who Settled in Colombia (2018–2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Proportion of forcibly displaced people who left Venezuela and settled in Colombia compared to the proportion who settled in other countries. Hover over the bars to see the percentage of people in each category.',
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
      text: 'Forcibly Displaced Venezuelans',
      style: {
        color: 'white'
      }
    },
    stackLabels: {
      enabled: false,
    },
    labels: {
      style: {
        color: 'white'
      }
    },
    min: 0,
  },
  xAxis: {
    type: 'year',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2018 to 2021',
    },
    labels: {
      style: {
        color: 'white'
      }
    },
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
        '</b> (' +
        this.percentage.toFixed(2) +
        '%)' +
        '<br/>'
      )
    },
    shared: true,
    style: {
      fontSize: '14px',
    },
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: 'normal',
    },
    series: {
      borderWidth: 0,
      groupPadding: 0.1,

      dataLabels: {
        enabled: true,
        style: {
          textOutline: 'none',
          fontWeight: 'bold',
          color: 'white'
        }
      }
    }
  }
})
