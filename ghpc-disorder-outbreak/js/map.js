var clicked = false,
  series = [];

var dataObj = { base: [], points: [], labels: [] };

var geoData, currentSeries, currentPoint, currentYear, currentIndex, chart, max;

var map = Highcharts.maps["countries/us/us-all"];

fetch("https://code.highcharts.com/mapdata/custom/world-palestine.geo.json")
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

              var countryPointData = dataObj.points.find(function(d) {
                return d["name"] === b[0];
              });

              if (countryPointData) {
                var pointValue = parseInt(b[6], 10) > -1 ? b[6] : null;

                var yearColumn = b[4].toString().split("-");

                yearColumn.forEach(function(y) {
                  var pointIndex = dataObj.labels.indexOf(parseInt(y, 10));

                  countryPointData.sequence[pointIndex] =
                    countryPointData.sequence[pointIndex] || {};

                  if (countryPointData.sequence[pointIndex].value) {
                    countryPointData.sequence[pointIndex].value += pointValue
                      ? pointValue
                      : 0;
                  } else {
                    countryPointData.sequence[pointIndex].value = pointValue
                      ? pointValue
                      : null;
                  }
                  countryPointData.sequence[pointIndex].diseases =
                    countryPointData.sequence[pointIndex].diseases || [];
                  countryPointData.sequence[pointIndex].diseases.push(
                    b[5] + "(" + pointValue + ")"
                  );
                  countryPointData.sequence[pointIndex].year = parseInt(y, 10);
                });
              } else {
                var countryPoint = {};
                countryPoint.sequence = dataObj.labels.map(function(year) {
                  return {
                    value: null,
                    year
                  };
                });

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
                dataObj.points.push(countryPoint);
              }
            });
            console.log(dataObj.points);
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
          color: "#22415e",
          name: "Surveillance Score:"
        },
        {
          from: 72,
          to: 84,
          color: "#2B6178",
          name: window.innerWidth > 768 ? "Less than 25" : "< 25"
        },
        {
          from: 84,
          to: 96,
          color: "#326D83",
          name: window.innerWidth > 768 ? "Greater than 25" : "> 25"
        },
        {
          from: 96,
          to: 108,
          color: "#3A7A8D",
          name: window.innerWidth > 768 ? "Greater than 50" : "> 50"
        },
        {
          from: 108,
          color: "#418698",
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
        borderWidth: 1,
        showInLegend: false,
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
        color: "#c89a49",
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
          fill: "#b89e69",
          "stroke-width": 0,
          style: { color: "white", stroke: "#b89e69" }
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
      // pointFormat: "Lat: {point.lat}<br>" + "Lon: {point.lon}<br>"
      pointFormatter: pointFormatter,
      nullFormatter: pointFormatter
    },

    motion: {
      enabled: true,
      labels: data.labels,
      series: [0, 1],
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
function pointFormatter() {
  var point = this;
  currentYear = document.querySelector(".label.active").innerText;
  currentYear = parseInt(currentYear, 10);
  var index = currentYear - 2006;

  var fragilityData = this.series.chart.series.find(function(s) {
    return s.name === "choropleth";
  }).data;

  var fragilityCountry = fragilityData.find(function(d) {
    return d.id === point.id;
  });

  var fragilityValue = fragilityCountry
    ? fragilityCountry.sequence[index].value
    : null;

  var outbreakData = this.series.chart.series.find(function(s) {
    return s.name === "bubbles";
  }).data;

  var outbreakCountry = outbreakData.find(function(d) {
    return d.name === point.name;
  });

  var outbreakValue = outbreakCountry
    ? outbreakCountry.sequence[index].value
    : null;
  var outbreakDiseases = outbreakCountry
    ? "<div>" +
      outbreakCountry.sequence[index].diseases
        .map(function(d) {
          return "\u25CF " + d;
        })
        .join("") +
      "</div>"
    : null;

  return (
    '<div><span style="font-size:24px;color:' +
    this.color +
    '">\u25CF </span><b>' +
    this.name +
    " (" +
    currentYear +
    ")" +
    "</b>" +
    (fragilityValue ? " <br/><br/>Fragility Index: " + fragilityValue : "") +
    " " +
    (outbreakValue
      ? " <br/><br/>Outbreaks: " + outbreakValue + "<br/>" + outbreakDiseases
      : "") +
    "<br/><br/>" +
    "</div>"
  );
}
