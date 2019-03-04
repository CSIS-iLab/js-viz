var timelineData, textData;
Highcharts.chart(
  "spline",
  _defineProperty(
    {
      data: {
        googleSpreadsheetKey: "1PQSu9p46YSpVFu_8WP3k8JaBzBrgpTvnJcfN3V5-QiQ",
        googleSpreadsheetWorksheet: 1,
        complete: function complete(data) {
          var dataObj = {
            titleData: [],
            descriptionData: []
          };

          data.series.slice(2).forEach(function(d) {
            Object.keys(dataObj).forEach(function(key) {
              if (d.name.toLowerCase().indexOf(key.replace("Data", "")) > -1) {
                dataObj[key].push(d);
              }
            });
          });

          Object.keys(dataObj).forEach(function(key) {
            dataObj[key] = dataObj[key].reduce(function(a, b) {
              a.data = a.data.concat(b.data);
              return Object.assign(b, a);
            });
          });
          dataObj["titleData"] = dataObj["titleData"].data
            .filter(function(d) {
              return d[1];
            })
            .map(function(d) {
              return d[1];
            });
          var textData = dataObj["descriptionData"].data
            .filter(function(d) {
              return d[1];
            })
            .map(function(d, i) {
              return {
                date: d[0] + 18000000,
                description: d[1],
                title: dataObj["titleData"][i]
              };
            })
            .groupBy("description");

          Object.keys(textData).forEach(function(key) {
            textData[key].push(textData[key].slice(-1)[0]);
            var arrayLength = textData[key].length;
            textData[key].splice(1, arrayLength - 2);
          });

          textData = Object.keys(textData)
            .sort(function(a, b) {
              return textData[a][0].date - textData[b][0].date;
            })
            .map(function(d) {
              return textData[d];
            });

          google.charts.load("current", {
            packages: ["timeline"]
          });

          google.charts.setOnLoadCallback(loadTimeline);

          window.onload = loadTimeline;
          window.onresize = loadTimeline;

          function loadTimeline() {
            addTimeline(textData);
            addText(textData);
          }

          data.series = data.series.slice(0, 2);
        }
      },
      chart: {
        defaultSeriesType: "spline",
        backgroundColor: "#131A28",
        style: {
          fontFamily: "museo-sans, sans-serif"
        }
      },
      credits: {
        style: {
          enabled: false
        }
      },
      colors: ["#83d4ef", "#92278f", "#be1e2d", "#ffc624"],
      legend: {
        itemHoverStyle: {
          color: "#ffc726  "
        },
        itemStyle: {
          color: "#fff",
          fontWeight: "light"
        }
      },
      title: {
        text: " "
      },
      subtitle: {
        text:
          "Powered by Predata / Graphics by CSIS iDeas Lab / Analysis by BeyondParallel",
        style: {
          color: "#ffffff"
        }
      },
      yAxis: {
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        min: 1.5,
        title: {
          text: "Signal Strength",
          style: {
            color: "#ffc726",
            fontSize: "15px"
          }
        }
      },
      xAxis: {
        type: "datetime",
        gridLineWidth: 1,
        gridLineColor: "#333333",
        tickWidth: 0,
        labels: {
          formatter: function formatter() {
            return Highcharts.dateFormat("%b %e", this.value);
          }
        },
        title: {
          text: "Last 30 Days",
          style: {
            color: "#ffc726",
            fontSize: "15px"
          }
        }
      },
      // Tooltip
      tooltip: {
        xDateFormat: "%A, %b %e, %Y",
        headerFormat:
          '<span style="font-size: 12px;margin-bottom: 5px;font-weight: bold;">{point.key}</span><br/>'
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false
          }
        }
      }
    },
    "credits",
    {
      text: "CSIS Beyond Parallel | Source: Predata",
      style: {
        display: "none"
      }
    }
  )
);

function addText(textData) {
  var textContent = Object.keys(textData).map(function(d) {
    var title = textData[d][0].title;
    var description = textData[d][0].description;
    var startDate = new Date(textData[d][0].date);
    var endDate = new Date(textData[d][1].date);

    var formattedStartDate = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    var formattedEndDate = endDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    return (
      '<p> <img src="https://beyondparallel.csis.org/wp-content/uploads/2016/04/BP_bookend.png" alt="BP logo"> <strong> ' +
      title +
      " | " +
      formattedStartDate +
      (startDate.getDay() !== endDate.getDay()
        ? " to " + formattedEndDate
        : "") +
      " </strong> <br> " +
      description +
      " </p>"
    );
  });
  document.querySelector(".signals .the-content").innerHTML = textContent.join(
    ""
  );

  var bodyHeight = document.body.scrollHeight + 20;

  window.parent.postMessage(bodyHeight, "*");
}

function addTimeline(textData) {
  var container = document.getElementById("timeline");
  var chart = new google.visualization.Timeline(container);
  var dataTable = new google.visualization.DataTable();

  dataTable.addColumn({
    type: "string",
    id: "description"
  });

  dataTable.addColumn({
    type: "string",
    id: "title"
  });

  dataTable.addColumn({
    type: "date",
    id: "start"
  });

  dataTable.addColumn({
    type: "date",
    id: "end"
  });

  Object.keys(textData).forEach(function(d) {
    var title = textData[d][0].title;
    var description = textData[d][0].description;
    var startDate = new Date(textData[d][0].date);
    var endDate = new Date(textData[d][1].date);
    dataTable.addRow(["Event", title, startDate, endDate]);
  });

  var options = {
    backgroundColor: "#131A28",
    timeline: {
      groupByRowLabel: true,
      showRowLabels: false,
      showBarLabels: false,
      singleColor: "#ffc624"
    }
  };
  chart.draw(dataTable, options);
  google.visualization.events.addListener(chart, "onmouseover", function(e) {
    setTooltipContent(dataTable, e.row);
  });
}

function setTooltipContent(data, row) {
  if (row != null) {
    var startDate = data.getValue(row, 2);

    var endDate = data.getValue(row, 3);

    var formattedStartDate = startDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    var formattedEndDate = endDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    var content =
      '<div class="custom-tooltip" ><strong>' +
      formattedStartDate +
      (startDate.getDay() !== endDate.getDay()
        ? " to " + formattedEndDate
        : "") +
      "</strong><br>" +
      data.getValue(row, 1) +
      "</div>";
    var tooltip = document.querySelector(".google-visualization-tooltip");
    tooltip.innerHTML = content;
  }
}

Array.prototype.groupBy = function(property) {
  return this.reduce(function(groups, item) {
    var val = item[property];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {});
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
