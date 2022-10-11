let columnsLength = 0
let keys = []
let data = []
let colors = []
Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    decimalPoint: '.',
  },
})

Highcharts.data({
  googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
  googleSpreadsheetKey: '12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c',
  googleSpreadsheetRange: 'Migration-Corridors-for-Venezuelan-Migrants',
  switchRowsAndColumns: true,
  parsed: function (columns) {
    keys = columns.shift()
    columnsLength = columns.length
    for (let i = 0; i < columnsLength; i++) {
      data.push(columns[i])
      colors.push(columns[i][0])
    }
    renderChart(keys, data, colors)
  },
})

function renderChart(keys, data, colors) {
  Highcharts.chart('hcContainer', {
    series: [
      {
        keys: keys,
        data: data,
        colors: ['#D92F5D', ...colors], //black color for Venezuela
        type: 'sankey',
      },
    ],
    // General Chart Options
    chart: {
      spacingBottom: 60,
      style: {
        fontFamily: ['Source Sans Pro', 'sans-serif'],
      },
      backgroundColor: '#080808',
      height: 600
    },
    exporting: {
      enabled: false
    },
    // Chart Title and Subtitle
    accessibility: {
      description: 'Migration Corridors for Venezuelans (2021)',
    },
    title: {
      text: 'Migration Corridors for Venezuelans (2021)',
      align: 'left',
      style: {
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    subtitle: {
      text: 'As of 2021, more than 5.5 million refugees, asylum seekers, and Venezuelans displaced abroad had left for other countries, with nearly 4.5 million settling in Colombia, Peru, Ecuador, Chile, United States. Hover over the color ribbons to see how many Venezuelans settled in each of the countries below.',
      align: 'left',
      style: {
        color: 'white',
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
    // Tooltip
    tooltip: {
      nodeFormat: '{point.name} <b>{point.sum:,.0f}</b>',
      headerFormat: '',
      pointFormatter: function () {
        console.log('tooltip formatter', this)
        point = this
        from = point.from
        to = point.to
        weight = new Intl.NumberFormat().format(point.weight)
        return '<b>' + from + ' → ' + to + '</b><br/>' + weight + ' Venezuelans'
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

        dataLabels: {
          align: 'left',
          enabled: true,
          style: {
            textOutline: 'none',
            fontWeight: 'bold',
            fontSize: '13px',
            color: '#fff',
          },
        },
      },
    },
  })
}
