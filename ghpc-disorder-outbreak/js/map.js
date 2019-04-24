var clicked = false,
  series = [];

var dataObj = { base: [], points: [], labels: [] };

var geoData, currentSeries, currentPoint, currentYear, currentIndex, chart, max;

var map = Highcharts.maps["countries/us/us-all"];

fetch("http://code.highcharts.com/mapdata/custom/world-palestine.geo.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    geoData = json;

    Highcharts.data({
      googleSpreadsheetKey: "1lss8rBHn7TmYaXbw1S6AAyb0ZOAlaTB1LeeP87D4Zsw",
      googleSpreadsheetWorksheet: 1,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(a, i) {
          if (i === 0) {
            dataObj.labels = a.filter(c => parseInt(c, 10));
            return;
          }

          dataObj.labels.forEach(function(year, index) {
            var tileData = geoData.features.find(function(country) {
              return country.properties["iso-a3"].indexOf(a[0]) > -1;
            });

            if (!tileData) return;

            var countryData = dataObj.base.find(function(d) {
              return d["iso-a3"] === a[0];
            });

            if (countryData) {
              var value;

              if (parseInt(a[index + 1], 10) > -1) {
                value = a[index + 1];
              }

              if (parseInt(year, 10)) {
                countryData.sequence.push({
                  year: year,
                  value: value
                });
              }

              countryData.value = countryData.sequence[0].value;
              countryData[a[1]] = countryData[a[1]] || [];

              var keyValue =
                parseInt(a[index + 2], 10) > -1 ? a[index + 2] : null;

              countryData[a[1]].push(keyValue);
            } else {
              var country = Object.assign({}, tileData);

              var value;

              if (parseInt(a[index + 1], 10) > -1) {
                value = a[index + 1];
              }

              country.sequence = country.sequence || [];
              country.sequence.push({ year: year, value: value });
              country["iso-a3"] = a[0];
              dataObj.base.push(country);
              country["hc-key"] = country.properties["hc-key"];

              country[a[1]] = country[a[1]] || [];

              var keyValue =
                parseInt(a[index + 2], 10) > -1 ? a[index + 2] : null;

              country[a[1]].push(keyValue);
            }
          });
        });

        Highcharts.data({
          googleSpreadsheetKey: "144508dI92hTtIm5wp4OcQMeRP5ViuUpPv2ufvOOLaS0",
          googleSpreadsheetWorksheet: 1,
          switchRowsAndColumns: true,
          parsed: function parsed(columns) {
            columns.forEach(function(b, i) {
              if (i === 0) {
                return;
              }

              var countryPointData = dataObj.base.find(function(d) {
                return d[name] === b[0];
              });

              if (countryPointData) {
                var pointValue = parseInt(b[6], 10) > -1 ? b[6] : null;

                var yearColumn = b[4].toString().split("-");

                yearColumn.forEach(function(y) {
                  var pointIndex = dataObj.labels.indexOf(parseInt(y, 10));

                  countryPointData.sequence[pointIndex] =
                    countryPointData.sequence[pointIndex] || {};

                  countryPointData.sequence[pointIndex].value += pointValue;
                  countryPointData.sequence[pointIndex].diseases.push(
                    b[5] + "(" + pointValue + ")"
                  );
                  countryPointData.sequence[pointIndex].year = parseInt(y, 10);
                });

                dataObj.points.push(countryPointData);
                countryPointData.value = pointValue;
              } else {
                var countryPoint = {};
                countryPoint.sequence = Array(dataObj.labels.length);
                countryPoint["name"] = b[0];
                countryPoint["lat"] = b[1];
                countryPoint["lon"] = b[2];

                var pointValue = parseInt(b[6], 10) > -1 ? b[6] : null;

                var yearColumn = b[4].toString().split("-");

                yearColumn.forEach(function(y) {
                  var pointIndex = dataObj.labels.indexOf(parseInt(y, 10));

                  countryPoint.sequence[pointIndex] =
                    countryPoint.sequence[pointIndex] || {};

                  countryPoint.sequence[pointIndex].value = pointValue;
                  countryPoint.sequence[pointIndex].diseases = [
                    b[5] + " (" + pointValue + ")"
                  ];
                  countryPoint.sequence[pointIndex].year = parseInt(y, 10);
                });
                countryPoint.value = pointValue;
                dataObj.points.push(countryPoint);
              }
            });

            renderMap(dataObj);
          }
        });
      }
    });
  });

function renderMap(data) {
  chart = Highcharts.mapChart("container", {
    chart: {
      marginTop: 0,
      marginBottom: 25,
      height: 600
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
    colorAxis: {
      dataClasses: [
        {
          to: 72,
          color: "#efefef",
          name: "Surveillance Score:"
        },
        {
          from: 72,
          to: 84,
          color: "#EDA27C",
          name: window.innerWidth > 768 ? "Less than 25" : "< 25"
        },
        {
          from: 84,
          to: 96,
          color: "#D79E7D",
          name: window.innerWidth > 768 ? "Greater than 25" : "> 25"
        },
        {
          from: 96,
          to: 108,
          color: "#C19B7F",
          name: window.innerWidth > 768 ? "Greater than 50" : "> 50"
        },
        {
          from: 108,
          color: "#AB9780",
          name: window.innerWidth > 768 ? "Greater than 75" : "> 75"
        }
      ]
    },

    xAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: "dot",
        snap: false,
        color: "gray"
      }
    },

    yAxis: {
      crosshair: {
        zIndex: 5,
        dashStyle: "dot",
        snap: false,
        color: "gray"
      }
    },
    series: [
      {
        data: data.base,
        name: "choropleth",
        mapData: Highcharts.maps["custom/world-palestine"],
        joinBy: ["hc-key", "hc-key"],
        borderColor: "#bcbcbc",
        borderWidth: 1,
        nullColor: "transparent",
        states: {
          hover: {
            borderColor: "black",
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      {
        // data: data.base,
        mapData: Highcharts.maps["custom/world-palestine"],
        joinBy: ["hc-key", "hc-key"],
        borderColor: "#bcbcbc",
        borderWidth: 1,
        nullColor: "transparent",
        states: {
          hover: {
            borderColor: "black",
            borderWidth: 2
          }
        },
        dataLabels: {
          enabled: false
        }
      },
      {
        data: data.points,
        name: "bubbles",
        type: "mapbubble",
        maxSize: "12%",
        color: "#4C8984",
        borderColor: "white"
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
      useHTML: true,
      pointFormatter: function pointFormatter() {
        return "";
      }
    },

    motion: {
      enabled: true,
      labels: data.labels,
      series: [0, 2],
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
              text: "CSIS | "
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
              text: "CSIS | "
            }
          }
        },
        {
          condition: {
            minWidth: 701
          },
          chartOptions: {
            credits: {
              text: "CSIS Global Health Policy Center | "
            }
          }
        }
      ]
    }
  });

  chart.motion.reset();

  let resizeEvent = window.document.createEvent("UIEvents");
  resizeEvent.initUIEvent("resize", true, false, window, 0);
  window.dispatchEvent(resizeEvent);
}
