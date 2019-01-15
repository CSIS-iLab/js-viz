"use strict";

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
        renderChart(dataObj);
        let resizeEvent = window.document.createEvent("UIEvents");
        resizeEvent.initUIEvent("resize", true, false, window, 0);
        window.dispatchEvent(resizeEvent);
      }
    });
  });
function renderChart(data) {
  chart = Highcharts.chart(
    "container",
    _defineProperty({
      chart: {
        type: "tilemap",
        height: "80%",
        marginBottom: 40,
        marginTop:
          25 +
          document.querySelector(".highcharts-subtitle").getBoundingClientRect()
            .height
      },

      title: {
        align: "left",
        x: 50,
        text: "Surveillance Scores by year and country"
      },

      subtitle: {
        floating: true,
        align: "left",
        x: 50,
        text:
          "A States Parties Questionnaire  is sent annually to National IHR Focal Points for data collection. It contains a checklist of 20 indicators specifically developed for monitoring each core capacity, including its status of implementation."
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
            color: "#c12429",
            name: "< 25"
          },
          {
            from: 25,
            to: 50,
            color: "#FF7259",
            name: "> 25"
          },
          {
            from: 51,
            to: 75,
            color: "#67bce2",
            name: "> 50"
          },
          {
            from: 76,
            color: "#0065a4",
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
                var _this = this;

                // this.series.points
                //   .filter(function(p) {
                //     return p.region === _this.region;
                //   })
                //   .forEach(function(p) {
                //     return p.setState("hover");
                //   });
              },
              mouseOut: function mouseOut() {
                var _this2 = this;

                // this.series.points
                //   .filter(function(p) {
                //     return p.region === _this2.region;
                //   })
                //   .forEach(function(p) {
                //     return p.setState("");
                //   });
              }
            }
          }
        }
      },

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 600
            },
            chartOptions: {
              chart: {
                height: "110%",
                marginTop: document
                  .querySelector(".highcharts-subtitle")
                  .getBoundingClientRect().height
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
              subtitle: {
                widthAdjust: 0
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
              minWidth: 600
            },
            chartOptions: {
              chart: {
                height: "80%"
              },
              credits: {
                align: "right",
                position: { y: -10 },
                text:
                  'CSIS Global Health Policy Center | Source: <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">World Health Organization</a>'
              },
              subtitle: {
                widthAdjust: -150
              },
              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .8rem;color:' +
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
          verticalAlign: "top"
        },
        buttons: {
          zoomIn: {
            y:
              25 -
              document
                .querySelector(".highcharts-subtitle")
                .getBoundingClientRect().height
          },
          zoomOut: {
            y:
              55 -
              document
                .querySelector(".highcharts-subtitle")
                .getBoundingClientRect().height
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
