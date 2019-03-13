var allSeries = {},
  legend = {
    funding: "Funding",
    vitamin: "Children provided with vitamin A supplements",
    combined:
      "Children reached by nutrition programs or nutrition-specific-interventions",
    anemia: " of children have anemia",
    women: " of women with anemia"
  },
  report = {
    Bangladesh: " ",
    Uganda: " (2016)",
    Tanzania: " (2015–2016)",
    Senegal: " (2017)",
    Nepal: " (2016)",
    Mozambique: " (2011)",
    Malawi: " (2015–2016)",
    Mali: " (2012–2013)",
    Ghana: " (2014)",
    Ethiopia: " (2016)"
  };
Highcharts.data({
  googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
  googleSpreadsheetWorksheet: 1,
  complete: function(data) {
    var fundingSeries;

    var countrySeries = data.series.find(function(series) {
      return series.name === "country";
    });

    countrySeries.data.forEach(function(country, x) {
      allSeries[country[1]] = allSeries[country[1]] || {};

      fundingSeries = data.series.find(function(series) {
        return series.name === "funding";
      });

      ["anemia", "women"].forEach(function(metric) {
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
      allSeries[country[1]]["splinebar"].series[2].color = "#4E4154";
      allSeries[country[1]]["splinebar"].series[2].dataLabels = {
        enabled: true,
        format: "${y}M",
        borderRadius: 2,
        verticalAlign: "middle",
        y: -25,
        shape: "callout",
        borderColor: "#4E4154",
        borderWidth: 2,
        // backgroundColor: "rgba(78, 65, 84, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        style: {
          color: "#4E4154",
          textOutline: "none",
          // color: "#FFFFFF",
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
        var color = {
          pattern: {
            color: "#7DA8D1",
            path: {
              d: patternArray[y],
              strokeWidth: 2
            },
            width: 7.5,
            height: 7.5
          }
        };

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

    var container = document.querySelector("#container");
    container.dataset.country = "Tanzania"; ////////////////////////

    makeSparkline(
      container.querySelector(".chart"),
      allSeries["Tanzania"]["splinebar"].series,
      3
    );

    var country = container.dataset.country;

    container.querySelector("h2").innerText = country;

    var statistics = Array.from(
      container.querySelectorAll(".statistic figure")
    );

    statistics.forEach(function(figure, figureIndex) {
      var metric = figure.dataset.metric;

      var stat = allSeries[country][metric].series[0].data[1][1];

      if (stat) {
        figure.innerHTML +=
          '<h5><span class="stat">' +
          stat +
          "%</span><span>" +
          legend[metric] +
          report[country] +
          "</span><h5>";
      }
    });
  }
});

function makeSparkline(figure, series, index) {
  Highcharts.chart(figure, {
    title: {
      text: ""
    },
    chart: {
      type: "spline",
      marginBottom: 100,
      height: "40%"
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
        title: {
          text: "Funding (USD)",
          style: {
            color: "#4E4154"
          }
        },
        labels: {
          format: "${value}",
          style: {
            color: "#4E4154"
          }
        },
        gridLineColor: "#4E4154",
        endOnTick: false,
        reversedStacks: true,
        opposite: true
      },
      {
        title: {
          text: "Children < 5",
          style: {
            color: "#7DA8D1"
          }
        },
        labels: {
          formatter: function() {
            var value = Math.round((this.value / 1000000) * 10) / 10;
            return `${value}M`;
          },
          style: {
            color: "#7DA8D1"
          }
        },
        gridLineColor: "#7DA8D1",
        endOnTick: false,
        reversedStacks: true
      }
    ],
    plotOptions: {
      column: {
        groupPadding: 0.25,
        pointWidth: 100,
        borderWidth: 2,
        borderColor: "#7DA8D1"
      }
    },
    series: series,

    tooltip: {
      useHTML: true,
      headerFormat:
        "<span style=\"font-size: 18px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\">{point.key}</span><br/>",
      pointFormatter: function() {
        var index = this.index;
        var year = this.x;
        var series = this.series.chart.series;

        var names = [legend["funding"], legend["vitamin"], legend["combined"]];

        var infos = names.map(function(name) {
          var s = series.find(function(s) {
            return s.name === name;
          });
          return {
            color: s.color.pattern ? s.color.pattern.color : s.color,
            y: s.data[index].y,
            formatter: function(point) {
              return s.name === "Funding"
                ? `$${point.y}M`
                : !point.y
                  ? `Data Unavailable for ${year}`
                  : `${Math.round((point.y / 1000000) * 10) /
                      10} ${name.toLowerCase()}`;
            }
          };
        });

        var textContent = infos
          .map(function(info) {
            return `<span style="color:${
              info.color
            }">\u25CF </span> <span style="line-height:1.5;font-size: 16px">${info.formatter(info)}</span>`;
          })
          .join("<br>");

        return `${textContent}`;
      }
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
      align: "center"
    },
    credits: {
      text: ""
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
            plotOptions: {
              column: {
                pointWidth: 33
              }
            },
            xAxis: {
              labels: {
                formatter: e => {
                  return `'${e.value.toString().replace(20, "")}`;
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
            plotOptions: {
              column: {
                pointWidth: 67
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
              height: "40%"
            },
            plotOptions: {
              column: {
                pointWidth: 100
              }
            }
          }
        }
      ]
    }
  });
}
