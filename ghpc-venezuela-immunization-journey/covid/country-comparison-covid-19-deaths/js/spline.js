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
    backgroundColor: '#F6F6D8'
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
      'Cumulative Covid-19 Deaths per Million (3/27/2020–8/31/2022)',
  },
  title: {
    text: 'Cumulative Covid-19 Deaths per Million (3/27/2020–8/31/2022)',
    align: 'left',
    style: {
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: "Daily country comparison of cumulative Covid-19 deaths per million between Venezuela, Colombia, Ecuador, Brazil, Guyana, and Peru. Hover over the lines below to see the total cumulative Covid-19 deaths per million per country. To hide a country's data, click in the legend below.",
    align: 'left',
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center (GHPC)</a> | Source: Our World in Data',
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
      text: 'Cumulative Covid-19 Deaths<br />(per million)',
    },
  },
  xAxis: {
    type: 'days',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Days: ',
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
})
