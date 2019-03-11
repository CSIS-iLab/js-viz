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

var dataObj = {
  Overweight: { data: [] },
  Anaemia: { data: [] },
  Stunting: { data: [] }
};

var geoData, chart;

fetch("https://code.highcharts.com/mapdata/custom/world-eckert3.geo.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    geoData = json;

    Highcharts.data({
      googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
      googleSpreadsheetWorksheet: 5,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(code, i) {
          if ([0].includes(i)) {
            return;
          }

          var tileData = geoData.features.find(function(country) {
            return country.properties["iso-a3"] === code[1];
          });
          if (!tileData) return;

          var countryData = null;

          if (countryData) {
          } else {
            var country = Object.assign({}, tileData);

            country.name = code[0];
            country["hc-key"] = country.properties["hc-key"];

            Object.keys(dataObj).forEach(function(key) {
              if (code[2].toLowerCase().indexOf(key.toLowerCase()) > -1) {
                dataObj[key].data.push(country);
              }
            });
          }
        });

        var patternArray = [
          "M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9",
          "M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11",
          "M 3 0 L 3 10 M 8 0 L 8 10",
          "M 0 3 L 10 3 M 0 8 L 10 8",
          "M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7",
          "M 3 3 L 8 3 L 8 8 L 3 8 Z",
          "M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0",
          "M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7",
          "M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0"
        ];

        var colorArray = ["#75baa9", "#eda27c", "#3e86b3"];
        var disabledSvg =
          '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5" stroke="#bcbcbc" fill="#bcbcbc"/></svg>';

        dataObj = Object.keys(dataObj).map(function(key, index) {
          var legendItems = [...document.querySelectorAll(".legend li")].slice(
            1
          );

          var enabledSvg = `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"> <path d="${
            patternArray[index]
          }" stroke="${
            colorArray[index]
          }" fill="transparent" stroke-width="2" /></svg>`;

          var icon = legendItems[index].querySelector("span");

          icon.style.backgroundImage = `url('${"data:image/svg+xml;base64," +
            window.btoa(enabledSvg)}')`;

          legendItems[index].addEventListener("click", function(item) {
            var series = chart.series.find(function(s) {
              return s.name === item.target.innerText;
            });

            if (series.visible) {
              legendItems[index].style.color = "#bcbcbc";
              icon.style.backgroundSize = "cover";
              icon.style.backgroundImage = `url('${"data:image/svg+xml;base64," +
                window.btoa(disabledSvg)}')`;
            } else {
              legendItems[index].style.color = "black";
              icon.style.backgroundSize = "67%";
              icon.style.backgroundImage = `url('${"data:image/svg+xml;base64," +
                window.btoa(enabledSvg)}')`;
            }

            series.update(
              {
                visible: !series.visible
              },
              true
            );
          });

          return {
            ...dataObj[key],

            name: key,
            mapData: Highcharts.maps["custom/world-eckert3"],
            joinBy: ["hc-key", "hc-key"],
            states: {
              hover: {
                brightness: 0.125
              }
            },
            dataLabels: {
              enabled: false
            },
            color: {
              pattern: {
                color: colorArray[index],
                path: {
                  d: patternArray[index]
                },
                width: 10,
                height: 10,
                opacity: 1
              }
            },
            borderColor: "#bcbcbc",
            borderWidth: 1,
            nullColor: "transparent",

            states: {
              hover: {
                borderColor: "white",
                borderWidth: 2
              }
            }
          };
        });

        renderMap(dataObj);
      }
    });
  });

function renderMap(series) {
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

      series: series,
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
                  'CSIS | <a href="http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a> | '
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
                  'CSIS | <a href="http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a> | '
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
                  'CSIS Global Health Policy Center | <a href="http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">World Health Organization</a> | '
              }
            }
          }
        ]
      }
    })
  );

  let resizeEvent = window.document.createEvent("UIEvents");
  resizeEvent.initUIEvent("resize", true, false, window, 0);
  window.dispatchEvent(resizeEvent);
}
