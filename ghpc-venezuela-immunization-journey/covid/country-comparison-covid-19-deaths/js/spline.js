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
    googleSpreadsheetRange: 'country-comparison-cumulative-covid-deaths',
  },

  // General Chart Options
  chart: {
    type: 'spline',
    spacingBottom: 60,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif'],
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
    '#7D4391', // Ecuador
    '#428A7A', // Brazil
    '#0054A4', // Guyana
    '#8B7B5A', // Peru
  ],

  // Chart Title and Subtitle
  accessibility: {
    description:
      'Cumulative Covid-19 Deaths per Million (3/27/2020–9/30/22)',
  },
  title: {
    text: 'Cumulative Covid-19 Deaths per Million (3/27/2020–9/30/22)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: "Daily country comparison of cumulative Covid-19 deaths per million between Venezuela, Colombia, Ecuador, Brazil, Guyana, and Peru. Hover over the lines below to see the total cumulative Covid-19 deaths per million per country. To hide a country's data, click in the legend below.",
    align: 'left',
    style: {
      color: 'white'
    }
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center</a><br />Source: Our World in Data',
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
      text: 'Cumulative Covid-19<br />Deaths (per million)',
      style: {
        color: 'white'
      }
    },
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  xAxis: {
    type: "datetime",
    tickInterval: 30 * 24 * 3600 * 1000,
    accessibility: {
      rangeDescription: 'Days: ',
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
      borderWidth: 0,
      groupPadding: 0.1,
      pointWidth: 130,
      dataLabels: {
        enabled: false,
        style: {
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
    },
  },
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        }
      }
    }]
  }
})
