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

var chart2 = void 0,
  series = [];

Highcharts.data({
  googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    var endemic = columns.filter(c => c[9] === "x");
    var notEndemic = columns.filter(c => c[9] !== "x");

    endemic.forEach(c => {
      var row = {};
      row.type = "line";
      row.name = c[0];
      row.data = c.slice(1, c.length - 1).map((c, i) => {
        return { y: c, x: i + 2010 };
      });
      row.showInLegend = true;
      row.visible = true;
      row.color = "#edcb66";
      series.push(row);
    });

    notEndemic.forEach(c => {
      var row = {};
      row.type = "line";
      row.name = c[0];
      row.data = c.slice(1, c.length - 1).map((c, i) => {
        return { y: c, x: i + 2010 };
      });
      row.showInLegend = false;
      row.visible = false;
      row.color = "#edcb66";
      series.push(row);
    });

    return renderLine(series);
  }
});

function renderLine(data) {
  chart2 = Highcharts.chart(
    "container2",
    _defineProperty({
      chart: {
        zoomType: false,
        type: "line",
        marginBottom: 50
      },
      title: {
        align: "left",
        x: 50,
        text: "Surveillance Scores by year and country"
      },
      subtitle: {
        floating: false,
        align: "left",
        x: 50,
        text:
          "A States Parties Questionnaire  is sent annually to National IHR Focal Points for data collection. It contains a checklist of 20 indicators specifically developed for monitoring each core capacity, including its status of implementation."
      },

      credits: {
        enabled: false
      },
      yAxis: {
        title: { text: "Score" },
        endOnTick: false,
        max: 104,
        min: 0
      },
      xAxis: {
        categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
      },
      legend: {
        // title: {
        //   text: '<span style="margin:0 10px">Polio Endemic Countries</span>'
        // },
        useHTML: true,
        y: -75,

        align: "right",
        layout: "verticle"
      },
      plotOptions: {
        column: {
          groupPadding: 0.5,
          pointWidth: 150,
          borderWidth: 0
        }
      },
      series: data,
      tooltip: {
        headerFormat: `<b>{point.series.name}</b><br/>`,
        pointFormatter: function() {
          return `Score: ${this.y}`;
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
                height: "60%"
              },
              subtitle: {
                widthAdjust: -180,
                text: ""
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
                height: "40%"
              },
              subtitle: {
                widthAdjust: -180,
                text: ""
              }
            }
          },
          {
            condition: {
              minWidth: 701
            },
            chartOptions: {
              chart: {
                height: "30%"
              },
              subtitle: {
                widthAdjust: -180
              }
            }
          }
        ]
      }
    })
  );
}

var dataObj = { data: [], labels: [] };

var geoData = void 0,
  chart = void 0;

fetch(
  "https://raw.githubusercontent.com/mustafasaifee42/Tile-Grid-Map/master/Tile-Grid-Map-Cleaned.json"
)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    geoData = json;

    Highcharts.data({
      googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
      googleSpreadsheetWorksheet: 2,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(code, i) {
          if ([0, 1, 2].includes(i)) {
            return;
          }

          if (i === 3) {
            dataObj.labels = code.filter(c => parseInt(c, 10));
            return;
          }

          dataObj.labels.forEach(function(year, index) {
            if (index === 0) return;
            if (index !== 0) {
              var tileData = geoData.find(function(country) {
                return country.name === code[0];
              });

              if (!tileData) return;

              var countryData = dataObj.data.find(function(d) {
                return d.name === code[0];
              });

              if (countryData) {
                var value = parseInt(code[index], 10) ? code[index] : null;
                if (parseInt(year, 10)) {
                  countryData.sequence.push({
                    year: year,
                    value: value
                  });
                }
                countryData.value =
                  countryData.sequence[countryData.sequence.length - 1].value;

                countryData.x = countryData.coordinates[0];
                countryData.y = countryData.coordinates[1];
                countryData.y = Math.abs(countryData.y - 20);
              } else {
                var value = parseInt(code[index], 10) ? code[index] : null;

                var country = Object.assign({}, tileData);
                country.sequence = country.sequence || [];
                country.sequence.push({ year: year, value: value });
                dataObj.data.push(country);
              }
            }
          });
        });

        dataObj.labels = dataObj.labels.slice(1);
        renderMap(dataObj);
        let resizeEvent = window.document.createEvent("UIEvents");
        resizeEvent.initUIEvent("resize", true, false, window, 0);
        window.dispatchEvent(resizeEvent);
      }
    });
  });
function renderMap(data) {
  chart = Highcharts.chart(
    "container",
    _defineProperty({
      chart: {
        type: "tilemap",
        height: "80%",
        marginBottom: 40,
        marginTop: -20
      },

      title: {
        align: "left",
        x: 50,
        text: ""
      },

      xAxis: {
        visible: false
      },

      yAxis: {
        visible: false
      },
      credits: {
        enabled: true,
        href: true
      },
      legend: {
        enabled: true,
        layout: "horizontal",
        align: "bottom",
        y: 10,
        floating: false
      },

      colorAxis: {
        dataClasses: [
          {
            to: 24,
            color: "#8f2a4f",
            name: "< 25"
          },
          {
            from: 25,
            to: 50,
            color: "#db6337",
            name: "> 25"
          },
          {
            from: 51,
            to: 75,
            color: "#8ba854",
            name: "> 50"
          },
          {
            from: 76,
            color: "#52a6d2",
            name: "> 75"
          }
        ]
      },

      plotOptions: {
        series: {
          pointPadding: 0.2,
          tileShape: "square",
          dataLabels: {
            enabled: true,
            overflow: false,

            color: "#000000",
            style: {
              textOutline: false
            }
          },
          point: {
            events: {
              mouseOver: function mouseOver() {
                var series = chart2.series.find(s => s.name === this.name);
                series.setState("hover");
                series.setVisible(true);
                series.setOptions({ showInLegend: true });
                chart2.legend.update();
                chart2.update();
                chart2.redraw();
                console.log(chart2);
              },
              mouseOut: function mouseOut() {
                var series = chart2.series.find(s => s.name === this.name);
                if (!["Afghanistan", "Nigeria", "Pakistan"].includes(this.name))
                  series.setVisible(false);

                // this.chart.redraw();

                chart2.tooltip.hide("fast");
              }
            }
          }
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
                height: "100%"
              },
              credits: {
                align: "left",
                position: {
                  y: -14,
                  x: -18
                },
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
              },

              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .5rem;color:' +
                        color +
                        '">' +
                        this.point["alpha-2"] +
                        "</span>"
                      );
                    }
                  }
                }
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
                height: "80%"
              },
              credits: {
                align: "right",
                position: { y: -10 },
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
              },

              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .7rem;color:' +
                        color +
                        '">' +
                        this.point["alpha-2"] +
                        "</span>"
                      );
                    }
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
              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .9rem;color:' +
                        color +
                        '">' +
                        this.point["alpha-2"] +
                        "</span>"
                      );
                    }
                  }
                }
              }
            }
          }
        ]
      },

      series: [
        {
          data: data.data,
          states: {
            hover: {
              brightness: 0.125
            }
          }
        }
      ],
      mapNavigation: {
        enabled: true,
        enableMouseWheelZoom: false,
        buttonOptions: {
          verticalAlign: "top",
          align: "right",
          theme: {
            fill: "#edcb66",
            "stroke-width": 0
          }
        },
        buttons: {
          zoomIn: {
            y: 25
          },
          zoomOut: {
            y: 60
          }
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        headerFormat: "",
        pointFormatter: function pointFormatter() {
          var year = document.querySelector("#play-output").innerText;
          var score = this.value;

          return (
            '<div><span style="font-size:18px;color:' +
            this.color +
            '">\u25CF </span><b>' +
            this.name +
            "</b><br/>\n      " +
            year +
            " Score:\n       " +
            score +
            "</div>"
          );
        }
      },

      motion: {
        enabled: true,
        labels: data.labels,
        series: 0,
        updateInterval: 750,
        axisLabel: "year",
        magnet: {
          round: "floor", // ceil / floor / round
          step: 1
        }
      }
    })
  );
  chart.motion.reset();
}
