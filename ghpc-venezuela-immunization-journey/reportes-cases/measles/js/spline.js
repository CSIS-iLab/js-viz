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
    googleSpreadsheetRange: 'measles-reported-cases-colombia-venezuela',
  },
  // General Chart Options
  chart: {
    type: 'spline',
    spacingBottom: 60,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif'],
    },
    backgroundColor: '#080808',
    height: 500,
  },
  // Colors
  colors: [
    '#D92F5D', // Venezuela
    '#F3C11B', // Colombia
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'Reported Cases of Measles, Venezuela vs. Colombia (2000–2021)',
  },
  title: {
    text: 'Reported Cases of Measles, Venezuela vs. Colombia (2000–2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: 'From 2000 to 2021, gaps in health services for Venezuelans resulted in a major outbreak of measles. Concerns also abound about data collection gaps, especially during the Maduro presidency. Hover over the lines below to see how many reported cases there were of measles in a given year in Venezuela and Colombia. To focus only on one disease, click "Measles Reported Cases - Venezuela" or "Measles Reported Cases - Colombia" in the legend below to hide that data.',
    align: 'left',
    style: {
      color: 'white',
    },
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center</a><br />Source: WHO/UNICEF Joint Reporting Form on Immunization (JRF)',
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
    labelFormatter: function () {
      const legend = this.name
      const legendsWords = legend.split(' ')
      let modifiedLegend = ''
      legendsWords.map((element, index) => {
        if (index === 0) {
          modifiedLegend += '<b>' + element + '</b> '
        } else {
          modifiedLegend += element + ' '
        }
      })
      return modifiedLegend
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: 'Reported Disease Cases',
      style: {
        color: 'white',
      },
    },
    gridLineColor: 'gray',
    max: 6000,
    tickInterval: 1000,
    reversedStacks: false,
    startOnTick: false,
    endOnTick: false,
    labels: {
      style: {
        color: 'white',
      },
    },
  },
  xAxis: {
    // type: 'datetime',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2000 to 2021',
    },
    crosshair: true,
    labels: {
      style: {
        color: 'white',
      },
    },
    // reversedStacks: false,
    // startOnTick: false,
    // endOnTick: false,
    // min: 2000,
    // max: 2021,
    tickInterval: 2,
  },
  // Tooltip
  tooltip: {
    formatter: function () {
      var order = [],
        i,
        j,
        temp = [],
        points = this.points
      for (i = 0; i < points.length; i++) {
        j = 0
        if (order.length) {
          while (points[order[j]] && points[order[j]].y > points[i].y) j++
        }
        temp = order.splice(0, j)
        temp.push(i)
        order = temp.concat(order)
      }
      temp = ''
      temp += '<span>' + points[0].x + '</span><br/>'
      $(order).each(function (i, j) {
        temp +=
          '<span style="font-size: 14px;color:' +
          points[j].series.color +
          '">\u25A0</span> ' +
          points[j].series.name +
          ': <b> ' +
          new Intl.NumberFormat().format(points[j].y) +
          '</b><br/>'
      })
      return temp
    },
    shared: true,
    style: {
      fontSize: '14px',
    },
  },
  navigation: {
    buttonOptions: {
      theme: {
        fill: 'black',
        stroke: 'white',
      },
      symbolStroke: 'white',
    },
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      borderWidth: 0,
      groupPadding: 0.1,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          textOutline: 'none',
          fontWeight: 'normal',
        },
      },
    },
  },
})
