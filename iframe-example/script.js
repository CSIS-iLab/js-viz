const SPREADSHEET_ID = '123BpzTEYtesF2LI0VA_0ial9mQx4dlek9hoM3GRjwas'
let chart = window.location.search.replace('?id=', '')

let chartColors = [
  '#6cd0da',
  '#26a3a7',
  '#f6cd37',
  '#fc9603',
  '#ff7058',
  '#e13c2b',
  '#618096',
  '#374961',
  '#85bb32'
]
gapi.load('client', function() {
  gapi.client
    .init({
      apiKey: 'AIzaSyA1ol27C1FVv-F6940xNXY-VImb5ZCE3JE',
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      discoveryDocs: [
        'https://sheets.googleapis.com/$discovery/rest?version=v4'
      ]
    })
    .then(function() {
      gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: SPREADSHEET_ID,
          range: `'${chart}'!A:Z`
        })
        .then(function(sheet) {
          let sheetData = {
            title: sheet.result.values[0],
            subtitle: sheet.result.values[1],
            credits: sheet.result.values[2],
            yAxis: sheet.result.values[3],
            rows: sheet.result.values.slice(4)
          }

          Highcharts.chart('container1', {
            chart: {
              type: 'column'
              // type: 'area'
              // type: 'line'
            },
            title: {
              text: sheetData.title
            },
            data: {
              switchRowsAndColumns: true,
              csv: sheetData.rows.map(r => r.join(',')).join('\n'),
              complete: d => {
                let newSeries = d.series
                  .filter(s => s.name.toLowerCase().indexOf('actual') < 0)
                  .reduce(function(total, obj) {
                    let name = obj.name.split(' ')[1]

                    let series = total.find(s => s.name === name)

                    if (!series) {
                      total.push({
                        name: name ? name : 'Actual',
                        data: obj.data.map(d => [d[0], d[1] ? 0 : undefined])
                      })
                      series = total.find(s => s.name === name)
                    }

                    series.data = series.data.map((d, i) => [
                      d[0],
                      (d[1] += obj.data[i][1])
                    ])

                    return total
                  }, [])

                let actualSeries = d.series.find(
                  s => s.name.toLowerCase().indexOf('actual') > -1
                )

                newSeries.push({ ...actualSeries })
                newSeries.forEach((s, i) => {
                  s.name = i === 8 ? s.name : 'PB ' + s.name
                  s.color = i === 8 ? 'black' : chartColors[i]
                  s.type = i === 8 ? 'line' : 'area'
                })

                d.series = newSeries
              }
            },

            credits: {
              href: false,
              position: { align: 'center' },
              text: sheetData.credits
            },
            xAxis: {
              allowDecimals: false
            },
            yAxis: {
              allowDecimals: false,
              title: {
                text: sheetData.yAxis,
                margin: 10,
                x: -15
              }
            },
            tooltip: {
              shared: true
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
              itemStyle: {
                textOverflow: null
              }
            },
            plotOptions: {
              area: {
                marker: {
                  enabled: false,
                  symbol: 'circle'
                }
              },
              column: {
                stacking: 'normal',
                maxPointWidth: 150
              },

              line: {
                dashStyle: 'LongDash',
                marker: {
                  enabled: false,
                  symbol: 'circle'
                }
              }
            }
          })

          Highcharts.chart('container2', {
            chart: {
              type: 'column'
              // type: 'area'
              // type: 'line'
            },
            title: {
              text: sheetData.title
            },
            data: {
              switchRowsAndColumns: true,
              csv: sheetData.rows.map(r => r.join(',')).join('\n'),
              complete: d => {
                let newSeries = d.series
                  .filter(s => s.name.toLowerCase().indexOf('actual') < 0)
                  .reduce(function(total, obj) {
                    let name = obj.name.split(' ')[1]

                    let series = total.find(s => s.name === name)

                    if (!series) {
                      total.push({
                        name: name ? name : 'Actual',
                        data: obj.data.map(d => [d[0], d[1] ? 0 : undefined])
                      })
                      series = total.find(s => s.name === name)
                    }

                    series.data = series.data.map((d, i) => [
                      d[0],
                      (d[1] += obj.data[i][1])
                    ])

                    return total
                  }, [])

                let actualSeries = d.series.find(
                  s => s.name.toLowerCase().indexOf('actual') > -1
                )

                newSeries.push({ ...actualSeries })
                newSeries.forEach((s, i) => {
                  s.name = i === 8 ? s.name : 'PB ' + s.name
                  s.color = i === 8 ? 'black' : chartColors[i]
                  s.type = i === 8 ? 'line' : 'line'
                })

                d.series = newSeries
              }
            },

            credits: {
              href: false,
              position: { align: 'center' },
              text: sheetData.credits
            },
            xAxis: {
              allowDecimals: false
            },
            yAxis: {
              allowDecimals: false,
              title: {
                text: sheetData.yAxis,
                margin: 10,
                x: -15
              }
            },
            tooltip: {
              shared: true
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
              itemStyle: {
                textOverflow: null
              }
            },
            plotOptions: {
              area: {
                marker: {
                  enabled: false,
                  symbol: 'circle'
                }
              },
              column: {
                stacking: 'normal',
                maxPointWidth: 150
              },

              line: {
                dashStyle: 'LongDash',
                marker: {
                  enabled: false,
                  symbol: 'circle'
                }
              }
            }
          })
        })
    })
})
