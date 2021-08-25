var series = [];
var dataObj = {
  data: [],
  labels: []
};
var geoData, chart, max, isVisible;
Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(col) {
    var endemic = col.filter(function(c) {
      return c[9] === "x";
    });
    var notEndemic = col.filter(function(c) {
      return c[9] !== "x";
    });
    endemic.forEach(function(c) {
      var row = {};
      row.type = "line";
      row.name = c[0];

      switch (row.name) {
        case "Afghanistan":
          row.color = "#004165";
          break;

        case "Nigeria":
          row.color = "#EDA27C";
          break;

        case "Pakistan":
          row.color = "#75baa9";
          break;
      }

      row.data = c.slice(1, c.length - 1).map(function(c, i) {
        return {
          y: c,
          x: i + 2010
        };
      });
      row.showInLegend = true;
      row.visible = true;
      row = {
        ...row,
        marker: {
          symbol: "circle"
        }
      };
      series.push(row);
    });
    notEndemic.forEach(function(c, i) {
      var row = {};
      row.type = "line";
      row.name = c[0];
      row.data = c.slice(1, c.length - 1).map(function(c, i) {
        return {
          y: c,
          x: i + 2010
        };
      });
      row.showInLegend = false;
      row.visible = false;
      row = {
        ...row,
        marker: {
          symbol: "square"
        }
      };
      series.push(row);
    });
    notEndemic.forEach(function(c, i) {
      if ([0, 1, 2, 3].includes(i)) {
        return;
      }

      document.querySelector(
        "datalist#countries"
      ).innerHTML += '<option value="'.concat(c[0], '">');
    });
    return renderLine(series);
  }
});

function renderLine(data) {
  chart2 = Highcharts.chart("container2", {
    chart: {
      zoomType: false,
      type: "line",
      marginBottom: 95
    },
    title: {
      text: ""
    },
    yAxis: {
      title: {
        text: "Surveillance Score"
      },
      endOnTick: false,
      tickInterval: 25,
      max: 104,
      min: 0
    },
    xAxis: {
      tickmarkPlacement: "on"
    },
    credits: {
      text: ""
    },
    legend: {
      title: {
        text:
          '<span style="font-size: 12px; color: #808080; font-weight: normal">Click to hide</span>'
      },
      itemStyle: {
        fontSize: "16px",
        fontWeight: "normal"
      },
      useHTML: true,
      y: 15,
      x: -18,
      align: "bottom",
      layout: "horizontal",
      labelFormatter: function labelFormatter() {
        return "".concat(this.name);
      }
    },
    plotOptions: {
      column: {
        groupPadding: 0.5,
        pointWidth: 150,
        borderWidth: 0
      },
      series: {
        events: {
          legendItemClick: function legendItemClick(e, f) {
            if (
              ["Afghanistan", "Nigeria", "Pakistan"].indexOf(e.target.name) < 0
            ) {
              e.target.update(
                {
                  showInLegend: false,
                  visible: false
                },
                true
              );
              max =
                chart2.series.filter(function(s) {
                  return s.visible;
                }).length > 5;

              if (!max) {
                input.disabled = false;
              }

              return false;
            }

            max =
              chart2.series.filter(function(s) {
                return s.visible;
              }).length > 5;

            if (!max) {
              input.disabled = false;
            }

            return true;
          }
        }
      }
    },
    series: data,
    tooltip: {
      headerFormat: "",
      pointFormatter: function pointFormatter(e) {
        var point = this;
        var name = this.series.name;
        var color = this.color;
        var x = this.x;
        var y = this.y;
        return (
          '<div><span style="font-size:18px;color:' +
          color +
          '">\u25CF </span><b>' +
          name +
          "</b><br/>" +
          x +
          " Score: " +
          y +
          "</div>"
        );
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
              height: "90%",
              marginBottom: 120
            },
            xAxis: {
              categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
              labels: {
                formatter: function formatter(e) {
                  return "'".concat(e.value.toString().replace(20, ""));
                }
              }
            },
            legend: {
              y: 15
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
              height: "60%"
            },
            xAxis: {
              categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
              labels: {
                align: "center",
                formatter: function formatter(e) {
                  return "'".concat(e.value.toString().replace(20, ""));
                }
              }
            }
          }
        },
        {
          condition: {
            minWidth: 701
          },
          chartOptions: {
            chart: {
              height: "45%"
            }
          }
        }
      ]
    }
  });
  var resizeEvent = window.document.createEvent("UIEvents");
  resizeEvent.initUIEvent("resize", true, false, window, 0);
  window.dispatchEvent(resizeEvent);
}

var input = document.querySelector("#countrySearch");
var submit = document.querySelector("#countrySearch ~ input");
submit.setAttribute("disabled", "disabled");
input.addEventListener("change", enable);
input.addEventListener("keyup", enable);
submit.addEventListener("click", search);
var searchSeries, visibleSeries, isVisible;

function enable() {
  submit.setAttribute("disabled", "disabled");
  searchSeries = chart2.series.find(function(s) {
    return s.name.toLowerCase() === input.value.toLowerCase();
  });
  visibleSeries = chart2.series
    .filter(function(s) {
      return s.visible;
    })
    .map(function(s) {
      return s.name;
    });

  if (searchSeries) {
    isVisible = visibleSeries.indexOf(searchSeries.name) > -1;
  }

  max =
    chart2.series.filter(function(s) {
      return s.visible;
    }).length > 5;

  if (!max && searchSeries && !isVisible) {
    input.disabled = false;
    submit.disabled = false;
  }
}

function search() {
  if (!max && searchSeries && !isVisible) {
    searchSeries.update(
      {
        name: searchSeries.name,
        showInLegend: true,
        visible: true
      },
      true
    );
    max =
      chart2.series.filter(function(s) {
        return s.visible;
      }).length > 5;
    input.disabled = false;

    if (max) {
      input.setAttribute("disabled", "disabled");
      submit.setAttribute("disabled", "disabled");
    }

    input.value = "";
    submit.setAttribute("disabled", "disabled");
  } else if (searchSeries && isVisible) {
    input.value = "";
    submit.setAttribute("disabled", "disabled");
  } else if (max) {
    input.setAttribute("disabled", "disabled");
    submit.setAttribute("disabled", "disabled");
  }
}
