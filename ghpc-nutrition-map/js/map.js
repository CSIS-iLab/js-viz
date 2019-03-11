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

var dataObj = {
  Overweight: { data: [] },
  Anaemia: { data: [] },
  Stunting: { data: [] }
};

var geoData, currentSeries, currentPoint, currentYear, currentIndex, chart, max;

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

            // switch(true){
            //
            //   case code[2].toLowerCase().indexOf( "overweight") > -1:
            //     dataObj["Overweight"].data.push(country)
            //   case code[2].toLowerCase().indexOf( "anaemia") > -1:
            //     dataObj["Anaemia"].data.push(country)
            //   case code[2].toLowerCase().indexOf( "stunting") > -1:
            //     dataObj["Stunting"].data.push(country)
            // }
          }
        });

        console.log(dataObj);

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
      credits: {
        enabled: true,
        href: true
      },
      legend: {
        enabled: true,
        layout: "horizontal",
        verticalAlign: "top",
        floating: false,
        x: -133
      },

      series: [
        {
          data: data.data,
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
          color: "url(#highcharts-default-pattern-0",
          borderColor: "#bcbcbc",
          borderWidth: 1,

          states: {
            hover: {
              borderColor: "white",
              borderWidth: 2
            }
          }
        },
        {
          data: data.data,
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
          color: "url(#highcharts-default-pattern-2",
          borderColor: "#bcbcbc",
          borderWidth: 1,

          states: {
            hover: {
              borderColor: "white",
              borderWidth: 2
            }
          }
        },
        {
          data: data.data,
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
          color: "url(#highcharts-default-pattern-3",
          borderColor: "#bcbcbc",
          borderWidth: 1,

          states: {
            hover: {
              borderColor: "white",
              borderWidth: 2
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
