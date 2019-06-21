var dataObj = { data: [], labels: [] }

var geoData, currentYear, chart

var apikey = 'vXc19iyIcMbZYF_io-g4nw',
  table = 'simplified_za_level_1'
fetch(
  'https://csis.carto.com/api/v2/sql?api_key=' +
    apikey +
    '&format=geojson&q=SELECT%20*%20FROM%20' +
    table
)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {
    geoData = json

    Highcharts.data({
      googleSpreadsheetKey: '19oi9wuSR4O9Blr7p6LArWLCVcxAGBUyld0HtGNVqqyU',
      googleSpreadsheetWorksheet: 1,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(a, i) {
          if (i === 0) {
            dataObj.labels = a.filter(c => parseInt(c, 10))
            return
          }

          dataObj.labels.forEach(function(year, index) {
            var tileData = geoData.features.find(function(province) {
              return province.properties.name_1.indexOf(a[0]) > -1
            })

            if (!tileData) return

            var countryData = dataObj.data.find(function(d) {
              return d.name_1 === a[0]
            })

            if (countryData) {
              mapFragilityYearsToSequence(countryData, a, index, year)
            } else {
              var country = {}

              country.name_1 = a[0]

              mapFragilityYearsToSequence(country, a, index, year)
              dataObj.data.push(country)
            }
          })
        })
        console.log(dataObj)
        renderMap(dataObj)
      }
    })
  })

function mapFragilityYearsToSequence(country, a, index, year) {
  var value = parseInt(a[index + 1], 10) > -1 ? a[index + 1] : null

  country.sequence = country.sequence || []
  if (parseInt(year, 10)) {
    country.sequence.push({ year: year, value: value })
  }
  country[a[1]] = country[a[1]] || []

  country[a[1]].push(value)
}

function renderMap(data) {
  chart = Highcharts.mapChart('container', {
    chart: {
      marginTop: 0,
      marginBottom: 25
    },
    title: {
      text: ''
    },

    credits: {
      enabled: true,
      href: true
    },
    legend: {
      title: {
        text: 'Prevalence',
        style: {
          fontSize: '16px'
        }
      },
      enabled: true,
      align: 'left',
      layout: 'vertical',
      verticalAlign: 'top',
      floating: true,
      x: window.innerWidth / 15,
      itemStyle: {
        fontSize: '14px',
        fontWeight: 'normal'
      }
    },
    colorAxis: {
      dataClasses: [
        {
          from: 0,
          to: 10,
          color: '#4C8984',
          name: window.innerWidth > 768 ? 'Less than 10%' : '< 10%'
        },
        {
          from: 10,
          to: 15,
          color: '#75baa9',
          name: window.innerWidth > 768 ? 'Less than 15%' : '< 15%'
        },
        {
          from: 15,
          to: 20,
          color: '#EDA27C',
          name: window.innerWidth > 768 ? 'Less than 20%' : '< 20%'
        },
        {
          from: 20,
          to: 25,
          color: '#e86259',
          name: window.innerWidth > 768 ? 'Less than 25%' : '< 25%'
        },
        {
          from: 25,
          color: '#8b0000',
          name: window.innerWidth > 768 ? 'Less than 30%' : '< 30%'
        }
      ]
    },
    series: [
      {
        data: data.data,
        mapData: geoData,
        joinBy: ['name_1', 'name_1'],
        borderWidth: 2,
        borderColor: 'black',
        showInLegend: false,
        states: {
          hover: {
            brightness: 0
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function() {
            return this.point.properties.name_1
          }
        }
      }
    ],
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: false,
      buttonOptions: {
        verticalAlign: 'top',
        align: 'right',
        theme: {
          fill: '#0faa91',
          'stroke-width': 0,
          style: { color: 'white' }
        }
      },
      buttons: {
        zoomIn: {
          y: 0
        },
        zoomOut: {
          y: 33
        }
      }
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      headerFormat: '',
      useHTML: true,
      backgroundColor: 'rgba(255,255,255,.9)',
      pointFormatter: function pointFormatter() {
        currentYear = document.querySelector('.label.active').dataset.id

        currentYear = parseInt(currentYear, 10)
        return (
          '<div><span style="font-size:18px;color:' +
          this.color +
          '">\u25CF </span><b>' +
          this.name_1 +
          '</b><br/>' +
          currentYear +
          ' HIV Prevalence: ' +
          this.value +
          '%</div>'
        )
      }
    },

    motion: {
      enabled: true,
      labels: data.labels,
      series: 0,
      updateInterval: 1250,
      axisLabel: 'year',
      magnet: {
        round: 'floor', // ceil / floor / round
        step: 1
      }
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            chart: {
              height: '66%'
            },

            credits: {
              text: ''
            }
          }
        },
        {
          condition: {
            minWidth: 401,
            maxWidth: 700
          },
          chartOptions: {
            chart: {
              height: '100%'
            },

            credits: {
              align: 'right',
              text: ''
            }
          }
        },
        {
          condition: {
            minWidth: 701
          },
          chartOptions: {
            chart: {
              height: '50%'
            },
            credits: {
              text: ''
            }
          }
        }
      ]
    }
  })

  chart.motion.reset()

  let resizeEvent = window.document.createEvent('UIEvents')
  resizeEvent.initUIEvent('resize', true, false, window, 0)
  window.dispatchEvent(resizeEvent)
}
