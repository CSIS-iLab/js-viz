// Use the one in the Venezuela folder
Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    decimalPoint: '.'
  }
})

Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: '12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c',
    googleSpreadsheetRange: 'diphtheria-reported-cases-colombia-venezuela'
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
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'Reported Cases of Diphtheria, Venezuela and Colombia (2000–2021)'
  },
  title: {
    text: 'Reported Cases of Diphtheria, Venezuela and Colombia (2000–2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold'
    },
  },
  subtitle: {
    text: "Low immunization coverage rates in Venezuela contributed to an outbreak of diphtheria between 2016 and 2019, with a small number of infections reported Colombia, as well. Hover over the lines below to see how many reported cases there were of diphtheria in a given year in Venezuela and Colombia. To hide a country's data, click in the legend below.",
    align: 'left',
    style: {
      color: 'white'
    },
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center</a><br />Source: WHO/UNICEF Joint Reporting Form on Immunization',
    style: {
      fontSize: '11px'
    },
    position: {
      y: -30
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
      fontWeight: 'normal'
    },
    itemHoverStyle: {
      color: '#fff'
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
        color: 'white'
      },
    },
    gridLineColor: 'gray',
    max: 800,
    labels: {
      style: {
        color: 'white'
      }
    }
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
      fontSize: '14px'
    }
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
