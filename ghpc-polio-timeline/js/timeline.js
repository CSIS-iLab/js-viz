var additionalOptions = {
  timenav_position: 'top',
  timenav_height_min: 200,
  height: 800,
  initial_zoom: '1'
}

var spreadsheetID = '19sxEkRD-EjkLflP-bJEEZYRA-nn4v99fwRKK0fo0e2k'

var timelineURL =
  'https://spreadsheets.google.com/feeds/list/' +
  spreadsheetID +
  '/1/public/values?alt=json'

fetch(timelineURL)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {
    var timeline_json = parseJson(json.feed.entry)
    window.timeline = new TL.Timeline(
      'timeline-embed',
      timeline_json,
      additionalOptions
    )
  })

function parseJson(json) {
  var data = json.map(function(r) {
    var row = r
    var rowData = {}

    Object.keys(row).forEach(function(c, i) {
      var column = c
      if (column.indexOf('gsx$') > -1) {
        var columnName = column.replace('gsx$', '')
        rowData[columnName] = row[column]['$t']
      }
    })

    var eventData = {
      start_date: {
        year: rowData.year
      },
      end_date: {
        year: rowData.year
      },
      text: {
        headline: rowData.headline,
        text: rowData.text
      },
      group: rowData.group,
      background: {
        // caption: rowData.caption,
        // credit: rowData.media_2,
        url: rowData.background
      },
      unique_id: rowData.group
    }

    return eventData
  })
  return { events: data }
}
