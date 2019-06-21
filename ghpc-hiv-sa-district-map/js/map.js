var dataObj = { data: [], pepfar: [], not: [] }

var geoData = {}
var chart

var apikey = 'vXc19iyIcMbZYF_io-g4nw',
  table = 'simplified_za_level_'

fetch(
  'https://csis.carto.com/api/v2/sql?api_key=' +
    apikey +
    '&format=geojson&q=SELECT%20*%20FROM%20' +
    table +
    1
)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {
    geoData.province = json

    fetch(
      'https://csis.carto.com/api/v2/sql?api_key=' +
        apikey +
        '&format=geojson&q=SELECT%20*%20FROM%20' +
        table +
        2
    )
      .then(function(resp) {
        return resp.json()
      })
      .then(function(json) {
        geoData.district = json

        Highcharts.data({
          googleSpreadsheetKey: '19oi9wuSR4O9Blr7p6LArWLCVcxAGBUyld0HtGNVqqyU',
          googleSpreadsheetWorksheet: 2,
          switchRowsAndColumns: true,
          parsed: function parsed(columns) {
            columns.forEach(function(a, i) {
              if (i === 0) {
                return
              }

              var tileData = geoData.district.features.find(function(district) {
                return (
                  a[0]
                    .toLowerCase()
                    .indexOf(district.properties.name_2.toLowerCase()) > -1
                )
              })

              if (!tileData) return
              var district = {}

              district.name_2 = tileData.properties.name_2
              district.value = parseInt(a[3], 10) > -1 ? a[3] : null
              district.pepfar = a[2].toLowerCase() === 'yes' ? true : false

              a[2].toLowerCase() === 'yes'
                ? dataObj.pepfar.push(district)
                : dataObj.not.push(district)
              dataObj.data.push(district)
            })
            renderMap(dataObj)
          }
        })
      })
  })

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
        text: 'Prevalance',
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
          to: -1,
          color: {
            pattern: {
              color: 'black',
              path: {
                d:
                  'M 0 0 L 6 6' +
                  //
                  'M 5.5 -1 L 5.5 1 ' +
                  //
                  'M -1 5.5 L 1 5.5'
              },
              width: 5,
              height: 5,
              opacity: 0.5
            }
          },
          name: 'PEPFAR Focus District'
        },
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
        mapData: geoData.province,
        // mapData: Highcharts.maps["za-all"],
        borderWidth: 2,
        borderColor: 'black',
        nullColor: 'white',
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
      },
      {
        data: data.pepfar,
        mapData: geoData.district,
        joinBy: ['name_2', 'name_2'],
        borderWidth: 0.125,
        borderColor: '#444',
        nullColor: 'transparent',
        colorAxis: false,
        color: {
          pattern: {
            color: 'black',
            path: {
              d:
                'M 0 0 L 6 6' +
                //
                'M 5.5 -1 L 5.5 1 ' +
                //
                'M -1 5.5 L 1 5.5'
            },
            width: 5,
            height: 5,
            opacity: 0.5
          }
        },

        showInLegend: false,
        states: {
          hover: {
            brightness: 0.1,
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      {
        data: data.data,
        mapData: geoData.district,
        joinBy: ['name_2', 'name_2'],
        borderWidth: 1,
        borderColor: '#444',
        nullColor: 'transparent',
        showInLegend: false,

        states: {
          hover: {
            brightness: 0.1,
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
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
        return (
          '<div><span style="font-size:18px;color:' +
          this.color +
          '">\u25CF </span><b>' +
          this.name_2 +
          ' District</b><br/>' +
          (this.pepfar ? '<em>PEPFAR Focus District</em><br/>' : '') +
          ' HIV Prevalence: ' +
          this.value +
          '%</div>'
        )
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

  // chart.motion.reset();

  let resizeEvent = window.document.createEvent('UIEvents')
  resizeEvent.initUIEvent('resize', true, false, window, 0)
  window.dispatchEvent(resizeEvent)
}
