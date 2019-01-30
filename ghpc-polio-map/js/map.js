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
        marginTop: 0,
        marginBottom: 25
      },
      title: {
        text: ""
      },
      subtitle: {
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
        enabled: false,
        layout: "horizontal",
        verticalAlign: "top",
        floating: false,
        x: -133
      },

      colorAxis: {
        dataClasses: [
          {
            to: -1,
            color: "transparent",
            name: "Surveillance Score:"
          },
          {
            to: 24,
            color: "#1a1f26",
            name: window.innerWidth > 768 ? "Less than 25" : "< 25"
          },
          {
            from: 25,
            to: 50,
            color: "#44576d",
            name: window.innerWidth > 768 ? "Greater than 25" : "> 25"
          },
          {
            from: 51,
            to: 75,
            color: "#3e86b3",
            name: window.innerWidth > 768 ? "Greater than 50" : "> 50"
          },
          {
            from: 76,
            color: "#73c1ec",
            name: window.innerWidth > 768 ? "Greater than 75" : "> 75"
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
            y: 0
          },
          zoomOut: {
            y: 33
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
        updateInterval: 1250,
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
              chart: {
                height: "33%"
              },

              credits: {
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
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
                height: "50%"
              },

              credits: {
                align: "right",
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
              credits: {
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
