var allSeries = {},
  legend = {
    funding: "Funding",
    vitamin: "Children provided with vitamin A supplements",
    combined:
      "Children reached by nutrition programs or nutrition-specific interventions",
    anemia: " of children have anemia",
    women: " of women have anemia",
    stunting: function stunting(country) {
      return window.innerWidth < 768
        ? " of children are stunted"
        : " of children in ".concat(country, " are stunted");
    }
  },
  report = {
    Bangladesh: " (2014)",
    Ethiopia: " (2016)",
    Ghana: " (2014)",
    Mali: " (2012–2013)",
    Malawi: " (2015–2016)",
    Mozambique: " (2011)",
    Nepal: " (2016)",
    Senegal: " (2017)",
    Tanzania: " (2015–2016)",
    Uganda: " (2016)"
  },
  colors = ["#df4652", "#67bce2", "#115175", "#3491C3"]; // webshims.setOptions("forms", {
//   customDatalist: true
// });
// webshims.polyfill("forms");

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
  googleSpreadsheetRange: "Return on Investment Final",
  complete: function complete(data) {
    var fundingSeries;
    var countrySeries = data.series.find(function(series) {
      return series.name === "country";
    });
    countrySeries.data.forEach(function(country, x) {
      allSeries[country[1]] = allSeries[country[1]] || {};
      fundingSeries = data.series.find(function(series) {
        return series.name === "funding";
      });
      ["stunting"].forEach(function(metric) {
        var programsSeries = data.series.find(function(series) {
          return series.name === metric;
        });
        allSeries[country[1]][metric] = allSeries[country[1]][metric] || {};
        allSeries[country[1]][metric].series =
          allSeries[country[1]][metric].series || [];
        allSeries[country[1]][metric] = allSeries[country[1]][metric] || {};
        allSeries[country[1]][metric].series[0] =
          allSeries[country[1]][metric].series[0] || {};
        allSeries[country[1]][metric].series[0].data =
          allSeries[country[1]][metric].series[0].data || [];
        allSeries[country[1]][metric].series[0].data.push(
          programsSeries.data[x]
        );
      });
      allSeries[country[1]]["splinebar"] =
        allSeries[country[1]]["splinebar"] || {};
      allSeries[country[1]]["splinebar"].series =
        allSeries[country[1]]["splinebar"].series || [];
      allSeries[country[1]]["splinebar"].series[2] =
        allSeries[country[1]]["splinebar"].series[2] || {};
      allSeries[country[1]]["splinebar"].series[2].name = "Funding";
      allSeries[country[1]]["splinebar"].series[2].color = colors[0];
      allSeries[country[1]]["splinebar"].series[2].dataLabels = {
        enabled: true,
        format: "${y}M",
        borderRadius: 2,
        verticalAlign: "middle",
        y: -25,
        shape: "callout",
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "rgba(255, 255, 255, 1)",
        style: {
          textOutline: "none",
          fontSize: "14px"
        }
      };
      allSeries[country[1]]["splinebar"].series[2].yAxis = 0;
      allSeries[country[1]]["splinebar"].series[2].data =
        allSeries[country[1]]["splinebar"].series[2].data || [];
      allSeries[country[1]]["splinebar"].series[2].data.push(
        fundingSeries.data[x]
      );
      var patternArray = [
        "M 0 0 L 7.5 7.5 M 6.5 -1 L 8.5 1 M -1 6.5 L 1 8.5",
        "M 0 7.5 L 7.5 0 M -1 1 L 1 -1 M 6.5 8.5 L 8.5 6.5"
      ];
      var selectedSeries = ["vitamin", "combined"].map(function(metric, y) {
        var color = colors[y + 1]; //  {
        //   pattern: {
        //     color: colors[y + 1],
        //     path: {
        //       d: patternArray[y],
        //       strokeWidth: 2
        //     },
        //     width: 7.5,
        //     height: 7.5
        //   }
        // };

        allSeries[country[1]]["splinebar"].series[y] =
          allSeries[country[1]]["splinebar"].series[y] || {};
        allSeries[country[1]]["splinebar"].series[y].name = legend[metric];
        allSeries[country[1]]["splinebar"].series[y].type = "column";
        allSeries[country[1]]["splinebar"].series[y].color = color;
        allSeries[country[1]]["splinebar"].series[y].plotOptions = {
          column: {
            stacking: "normal"
          }
        };
        allSeries[country[1]]["splinebar"].series[y].yAxis = 1;
        allSeries[country[1]]["splinebar"].series[y].data =
          allSeries[country[1]]["splinebar"].series[y].data || [];
        var metricData = data.series.find(function(series) {
          return series.name === metric;
        });
        allSeries[country[1]]["splinebar"].series[y].data.push(
          metricData.data[x]
        );
      });
    });
    init("Bangladesh");
  }
}); // $("input").on("input", function() {

document.querySelector("select").addEventListener("input", function(event) {
  var container = document.querySelector("#container");
  container.dataset.country = event.target.value;

  if (Object.keys(report).indexOf(event.target.value) > -1) {
    event.target.blur();
    init(event.target.value);
  }
});

function init(country) {
  var container = document.querySelector("#container");
  makeSparkline(
    container.querySelector(".chart"),
    allSeries[country]["splinebar"].series,
    3
  );
  var statistics = Array.from(container.querySelectorAll(".statistic figure"));
  statistics.forEach(function(figure, figureIndex) {
    var metric = figure.dataset.metric;
    var stat = allSeries[country][metric].series[0].data[1][1];
    figure.innerHTML = stat
      ? '<h5><span class="stat">' +
        stat +
        "%</span><span>" +
        legend[metric](country) +
        report[country] +
        "</span></h5>"
      : "";
  });
}

function makeSparkline(figure, series, index) {
  var chart = Highcharts.chart(figure, {
    title: {
      text: ""
    },
    chart: {
      type: "spline",
      marginBottom: 150,
      marginTop: 25,
      spacing: [0, 0, 0, 0],
      height: "50%"
    },
    xAxis: {
      tickInterval: 1,
      labels: {
        overflow: "allow",
        distance: 0,
        padding: 0
      }
    },
    yAxis: [
      {
        min: 0,
        max: 12,
        title: {
          text: "Funding (USD)",
          style: {
            color: colors[0]
          }
        },
        labels: {
          format: "${value}M",
          style: {
            // color: colors[0]
          }
        },
        gridLineColor: "transparent",
        endOnTick: false,
        reversedStacks: true,
        opposite: true
      },
      {
        tickInterval: 500000,
        title: {
          text: "Children under 5",
          style: {
            color: colors[3]
          }
        },
        labels: {
          formatter: function formatter() {
            var value = Math.round((this.value / 1000000) * 10) / 10;
            return "".concat(value, "M");
          },
          endOnTick: false,
          reversedStacks: true
        }
      }
    ],
    plotOptions: {
      column: {
        groupPadding: 0.25,
        pointWidth: 50,
        borderWidth: 0 // borderColor: colors[1]
      }
    },
    series: series,
    tooltip: {
      borderColor: "black",
      style: {
        whiteSpace: "normal",
        zIndex: 999
      },
      useHTML: true,
      headerFormat:
        "<span style=\"font-size: 18px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\">{point.key}</span>",
      pointFormatter: function pointFormatter() {
        var activeSeries = this.series.name;
        var index = this.index;
        var year = this.x;
        var series = this.series.chart.series;
        var names = [legend["funding"], legend["vitamin"], legend["combined"]];
        var infos = names.map(function(name) {
          var s = series.find(function(s) {
            return s.name === name;
          });
          return {
            name: name,
            color: s.color.pattern ? s.color.pattern.color : s.color,
            y: s.data[index].y,
            formatter: function formatter(point) {
              return s.name === "Funding"
                ? "$".concat(point.y, "M")
                : !point.y
                  ? "Data Unavailable for ".concat(year)
                  : "<br>".concat(
                      Math.round((point.y / 1000000) * 10) / 10,
                      "M children under 5"
                    );
            }
          };
        });
        var textContent = infos
          .filter(function(info) {
            return info.name === activeSeries;
          })
          .map(function(info) {
            return '<strong><span style="color:'
              .concat(info.color, '">\u25CF </span> ')
              .concat(info.name, '</strong>: <span style="font-size: 14px;">')
              .concat(info.formatter(info), "</span>");
          })
          .join("");
        return '<div style="width:200px;white-space:normal !important;">'.concat(
          textContent,
          "</div>"
        );
      }
    },
    legend: {
      reversed: true,
      symbolWidth: 20,
      symbolHeight: 20,
      title: {
        text:
          '<span style="font-size: 12px; color: #808080; font-weight: normal">Click to hide</span>'
      },
      itemMarginBottom: 12,
      itemStyle: {
        fontSize: "1.1em",
        fontWeight: "normal"
        // textTransform: "uppercase"
      },
      layout: "vertical",
      y: 12,
      x: 0,
      align: "left",
      floating: true
    },
    credits: {
      enabled: true,
      href: false
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 400
          },
          chartOptions: {
            chart: {
              height: "75%",
              marginBottom: 200
            },
            plotOptions: {
              column: {
                pointWidth: 25,
                groupPadding: 1
              }
            },
            xAxis: {
              labels: {
                formatter: function formatter(e) {
                  return "'".concat(e.value.toString().replace(20, ""));
                }
              }
            },
            legend: {
              labelFormatter: function labelFormatter() {
                return '<div style="width:calc(100vw - 100px) !important;white-space:normal !important;margin-top:-18px;">'.concat(
                  this.name,
                  "</div>"
                );
              },
              itemMarginBottom: 12,
              itemStyle: {
                padding: "18px 0 6px",
                fontSize: "16px",
                fontWeight: "normal"
              },
              useHTML: true,
              y: 25
            },
            credits: {
              text: "CSIS"
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
              height: "70%",
              marginBottom: 200
            },
            plotOptions: {
              column: {
                pointWidth: 33,
                groupPadding: 0.75
              }
            },
            legend: {
              labelFormatter: function labelFormatter() {
                return '<div style="width:calc(100vw - 100px) !important;white-space:normal !important;margin-top:-12px;">'.concat(
                  this.name,
                  "</div>"
                );
              },
              itemMarginBottom: 12,
              itemStyle: {
                padding: "12px 0 6px",
                fontSize: "16px",
                fontWeight: "normal"
              },
              useHTML: true,
              y: 0
            },
            credits: {
              text: "CSIS"
            }
          }
        },
        {
          condition: {
            minWidth: 701,
            maxWidth: 1080
          },
          chartOptions: {
            chart: {
              height: "50%"
            },
            plotOptions: {
              column: {
                pointWidth: 50,
                groupPadding: 0.1875
              }
            },
            credits: {
              text: "CSIS Global Health Policy Center"
            }
          }
        },
        {
          condition: {
            minWidth: 1081
          },
          chartOptions: {
            chart: {
              height: "40%"
            },
            plotOptions: {
              column: {
                pointWidth: 100,
                groupPadding: 0.0625
              }
            },
            credits: {
              text: "CSIS Global Health Policy Center"
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
