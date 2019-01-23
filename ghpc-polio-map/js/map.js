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

var clicked = false,
  series = [];

var dataObj = { data: [], labels: [] };

var geoData, currentSeries, currentPoint, currentYear, currentIndex, chart, max;

fetch("https://code.highcharts.com/mapdata/custom/world-eckert3.geo.json")
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
            var tileData = geoData.features.find(function(country) {
              return country.properties.name === code[0];
            });

            if (!tileData) return;

            var countryData = dataObj.data.find(function(d) {
              return d.name === code[0];
            });

            if (countryData) {
              var value =
                parseInt(code[index + 1], 10) > -1 ? code[index + 1] : null;

              if (parseInt(year, 10)) {
                countryData.sequence.push({
                  year: year,
                  value: value
                });
              }
              countryData.value = countryData.sequence[0].value;
            } else {
              var country = Object.assign({}, tileData);
              var value =
                parseInt(code[index + 1], 10) > -1 ? code[index + 1] : null;

              country.sequence = country.sequence || [];
              country.sequence.push({ year: year, value: value });
              country.name = code[0];
              dataObj.data.push(country);
              country["hc-key"] = country.properties["hc-key"];
            }
          });
        });

        renderMap(dataObj);
      }
    });
  });

function renderMap(data) {
  chart = Highcharts.mapChart(
    "container",
    _defineProperty({
      chart: {
        marginTop: 25
      },
      title: {
        align: "left",
        x: 50,
        text: "Surveillance Scores by year and country"
      },
      subtitle: {
        align: "left",
        x: 50,
        text:
          "A States Parties Questionnaire is sent annually to National IHR Focal Points for data collection. It contains a checklist of 20 indicators specifically developed for monitoring each core capacity, including its status of implementation."
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
        floating: false
      },

      colorAxis: {
        dataClasses: [
          {
            to: 24,
            color: "#db6337",
            name: "< 25"
          },
          {
            from: 25,
            to: 50,
            color: "#edcb66",
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

      series: [
        {
          data: data.data,
          mapData: Highcharts.maps["custom/world-eckert3"],
          joinBy: ["hc-key", "hc-key"],
          nullColor: "#bcbcbc",
          states: {
            hover: {
              brightness: 0.125
            }
          },

          dataLabels: {
            enabled: false
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
            fill: "#0faa91",
            "stroke-width": 0,
            style: { color: "white" }
          }
        },
        buttons: {
          zoomIn: {
            y: 100
          },
          zoomOut: {
            y: 135
          }
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        headerFormat: "",
        pointFormatter: function pointFormatter() {
          currentYear = document.querySelector(".label.active").innerText;
          return (
            '<div><span style="font-size:18px;color:' +
            this.color +
            '">\u25CF </span><b>' +
            this.name +
            "</b><br/>\n      " +
            currentYear +
            " Score:\n       " +
            this.value +
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
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400
            },
            chartOptions: {
              // subtitle: {
              //   text: ""
              // },
              legend: {
                y: -60
              },
              credits: {
                align: "left",
                position: {
                  y: -50,
                  x: -18
                },
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
              },

              plotOptions: {
                series: {}
              }
            }
          },
          {
            condition: {
              minWidth: 401,
              maxWidth: 700
            },
            chartOptions: {
              // subtitle: {
              //   widthAdjust: -150
              // },
              legend: {
                y: -35
              },
              credits: {
                align: "right",
                position: { y: -60 },
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
              }
            }
          },
          {
            condition: {
              minWidth: 701
            },
            chartOptions: {
              // subtitle: {
              //   widthAdjust: -20
              // },
              credits: {
                align: "right",
                position: { y: -35 },
                text:
                  'CSIS Global Health Policy Center | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">World Health Organization</a>'
              }
            }
          }
        ]
      }
    })
  );
  chart.motion.reset();

  let resizeEvent = window.document.createEvent("UIEvents");
  resizeEvent.initUIEvent("resize", true, false, window, 0);
  window.dispatchEvent(resizeEvent);
}
