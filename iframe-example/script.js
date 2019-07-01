const SPREADSHEET_ID = '123BpzTEYtesF2LI0VA_0ial9mQx4dlek9hoM3GRjwas'
console.log(window.location.search)
console.log(window.location.href)
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
          range: `'${'KC-46 FYDP History'}'!A:Z`
        })
        .then(function(sheet) {
          let sheetData = {
            rows: sheet.result.values
          }

          Highcharts.chart('container', {
            title: {
              text: 'KC-46 FYDP History'
            },
            data: {
              csv: sheetData.rows.map(r => r.join(',')).join('\n'),
              complete: d => {}
            },

            subtitle: {
              text: 'Source: U.S. Department of Defense'
            },

            yAxis: {
              title: {
                text:
                  'RDT&E and Procurement Funding<br>(in millions of current $)'
              }
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },

            plotOptions: {
              series: {
                label: {
                  connectorAllowed: false
                }
              }
            }
          })
        })
    })
})
