var textData

var chart = Highcharts.chart(
  'spline',

  {
    data: {
      googleSpreadsheetKey: '1PQSu9p46YSpVFu_8WP3k8JaBzBrgpTvnJcfN3V5-QiQ',
      googleSpreadsheetWorksheet: 1,
      complete: parseData,
      dateFormat: 'mm/dd/YYYY'
    },
    chart: {
      defaultSeriesType: 'spline',
      backgroundColor: '#131A28',
      style: {
        fontFamily: 'museo-sans, sans-serif'
      }
    },
    credits: {
      style: {
        enabled: false
      }
    },
    colors: ['#83d4ef', '#92278f', '#be1e2d', '#ffc624'],
    legend: {
      itemHoverStyle: {
        color: '#ffc726  '
      },
      itemStyle: {
        color: '#fff',
        fontWeight: 'light'
      }
    },
    title: {
      text: ' '
    },
    subtitle: {
      text:
        'Powered by Predata / Graphics by CSIS iDeas Lab / Analysis by BeyondParallel',
      style: {
        color: '#ffffff'
      }
    },
    yAxis: {
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      min: 1.5,
      title: {
        text: 'Signal Strength',
        style: {
          color: '#ffc726',
          fontSize: '15px'
        }
      }
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: '#333333',
      tickWidth: 0,
      labels: {
        formatter: function formatter() {
          return Highcharts.dateFormat('%b %e', this.value)
        }
      },
      title: {
        text: 'Last 30 Days',
        style: {
          color: '#ffc726',
          fontSize: '15px'
        }
      }
    },
    // Tooltip
    tooltip: {
      xDateFormat: '%B %e, %Y',
      headerFormat:
        '<span style="font-size: 12px;margin-bottom: 5px;font-weight: bold;">{point.key}</span><br/>'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    credits: {
      text: 'CSIS Beyond Parallel | Source: Predata',
      style: {
        display: 'none'
      }
    }
  }
)

function parseData(data) {
  var dataObj = {
    titleData: [],
    descriptionData: [],
    'display dateData': []
  }

  // columns beyond 1, 2, and 3 are used on the timeline and text
  data.series.slice(2).forEach(function(d) {
    Object.keys(dataObj).forEach(function(key) {
      // associate columns with key in dataObj
      if (d.name.toLowerCase().indexOf(key.replace('Data', '')) > -1) {
        dataObj[key].push(d)
      }
    })
  })

  // merge Title columns and merge Description columns
  Object.keys(dataObj).forEach(function(key) {
    dataObj[key] = dataObj[key].reduce(function(a, b) {
      a.data = a.data.concat(b.data)
      return Object.assign(b, a)
    })
  })

  var tempDates = []

  dataObj['titleData'] = dataObj['titleData'].data
    .filter(function(title, x) {
      // associate display dates with events
      if (title[1]) {
        var linkedDate = dataObj['display dateData'].data.find(function(date) {
          return date[0] === title[0]
        })

        tempDates.push(linkedDate[1])
      }

      // only return dates where there are events
      return title[1]
    })
    .map(function(title) {
      return title[1]
    })

  dataObj['display dateData'] = tempDates

  // use descriptions to map unique events
  textData = dataObj['descriptionData'].data
    .filter(function(description) {
      return description[1]
    })
    .map(function(d, i) {
      return {
        date: d[0] + 18000000,
        displayDate: dataObj['display dateData'][i],
        title: dataObj['titleData'][i],
        description: d[1]
      }
    })
    .groupBy('description')

  // reduce array to start date and end date
  Object.keys(textData).forEach(function(key) {
    textData[key].push(textData[key].slice(-1)[0])
    var arrayLength = textData[key].length
    textData[key].splice(1, arrayLength - 2)
  })

  // sort events by date
  textData = Object.keys(textData)
    .sort(function(a, b) {
      return textData[a][0].date - textData[b][0].date
    })
    .map(function(d) {
      return textData[d]
    })

  google.charts.load('current', {
    packages: ['timeline']
  })

  google.charts.setOnLoadCallback(loadTimeline)

  window.onload = loadTimeline
  window.onresize = loadTimeline

  function loadTimeline() {
    addTimeline()
    addText()
  }

  // return columns 1, 2, and 3 for higcharts spline graph
  data.series = data.series.slice(0, 2)
}

function addText() {
  var textContent = Object.keys(textData)
    .sort(function(a, b) {
      return textData[b][0].date - textData[a][0].date
    })
    .map(function(d) {
      var title = textData[d][0].title
      var description = textData[d][0].description
      var startDate = new Date(textData[d][0].date)
      var endDate = new Date(textData[d][1].date)

      var formattedStartDate = startDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })

      var formattedEndDate = endDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })

      var date = textData[d][0].displayDate
        ? textData[d][0].displayDate
        : formattedStartDate +
          (startDate.getDay() !== endDate.getDay()
            ? ' – ' + formattedEndDate
            : '')

      return (
        '<p> <img src="https://beyondparallel.csis.org/wp-content/uploads/2016/04/BP_bookend.png" alt="BP logo"> <strong> ' +
        title +
        ' | ' +
        date +
        ' </strong> <br> ' +
        description.replace(/<a href=/gi, '<a target="_blank" href=') +
        ' </p>'
      )
    })
  document.querySelector('.signals .the-content').innerHTML = textContent.join(
    ''
  )

  var bodyHeight = document.body.scrollHeight + 20

  window.parent.postMessage(bodyHeight, '*')
}

function addTimeline() {
  var container = document.getElementById('timeline')
  var timeline = new google.visualization.Timeline(container)
  var dataTable = new google.visualization.DataTable()

  dataTable.addColumn({
    type: 'string',
    id: 'description'
  })

  dataTable.addColumn({
    type: 'string',
    id: 'title'
  })

  dataTable.addColumn({
    type: 'date',
    id: 'start'
  })

  dataTable.addColumn({
    type: 'date',
    id: 'end'
  })

  Object.keys(textData).forEach(function(d) {
    var title = textData[d][0].title
    var description = textData[d][0].description
    var startDate = new Date(textData[d][0].date)
    var endDate = new Date(textData[d][1].date)
    dataTable.addRow(['Event', title, startDate, endDate])
  })

  var options = {
    backgroundColor: '#131A28',
    height: 125,
    timeline: {
      groupByRowLabel: true,
      showRowLabels: false,
      showBarLabels: false,
      singleColor: '#ffc624'
    },
    hAxis: {
      minValue: new Date(chart.xAxis[0].min),
      maxValue: new Date(chart.xAxis[0].max)
    }
  }
  timeline.draw(dataTable, options)
  google.visualization.events.addListener(timeline, 'onmouseover', function(e) {
    setTooltipContent(dataTable, e.row)
  })
}

function setTooltipContent(data, row) {
  if (row != null) {
    var startDate = data.getValue(row, 2)

    var endDate = data.getValue(row, 3)

    var formattedStartDate = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    var formattedEndDate = endDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })

    var index = data.getUnderlyingTableRowIndex(row, 2)

    var date = textData[index][0].displayDate
      ? textData[index][0].displayDate
      : formattedStartDate +
        (startDate.getDay() !== endDate.getDay()
          ? ' – ' + formattedEndDate
          : '')

    var content =
      '<div class="custom-tooltip" ><strong>' +
      date +
      '</strong><br>' +
      data.getValue(row, 1) +
      '</div>'
    var tooltip = document.querySelector('.google-visualization-tooltip')
    tooltip.innerHTML = content
  }
}

Array.prototype.groupBy = function(property) {
  return this.reduce(function(groups, item) {
    var val = item[property]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}
