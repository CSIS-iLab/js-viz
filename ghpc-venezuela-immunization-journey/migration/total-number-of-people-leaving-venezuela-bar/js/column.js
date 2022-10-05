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
    },
  },
  // Colors
  colors: [
    '#a4a5a5', // Other countrßies
    '#FFC728', // Colombia
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'People Who Left Venezuela and Settled in Colombia vs. People Who Left Venezuela and Settled in Other Countries (2018–2021)',
  },
  title: {
    text: 'People Who Left Venezuela and Settled in Colombia vs. People Who Left Venezuela and Settled in Other Countries (2018–2021)',
    align: 'left',
    style: {
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'Comparison between the number of people who left Venezuela and settled in Colombia vs. the number of people who left Venezuela and settled in other countries. Hover over different percentages to see the total number of people in each category.',
    align: 'left',
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center (GHPC)</a> | Source: UNHCR Refugee Statistics',
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
      color: '#333',
      fontWeight: 'normal',
    },
    labelFormatter: function () {
      return this.name
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: 'Number of Venezuelans',
    },
    stackLabels: {
      enabled: true,
    },
    min: 0,
  },
  xAxis: {
    type: 'year',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2018 to 2021',
    },
    crosshair: true,
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
        },
      },
    },
  },
})
