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
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1lss8rBHn7TmYaXbw1S6AAyb0ZOAlaTB1LeeP87D4Zsw",
      googleSpreadsheetRange: "Fragile States Index",
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
              mapFragilityYearsToSequence(countryData, a, index, year);
            } else {
              var country = {};
              country["hc-key"] = tileData.properties["hc-key"];
              country["iso-a3"] = a[0];

              mapFragilityYearsToSequence(country, a, index, year);
              dataObj.base.push(country);
            }
          });
        });

        Highcharts.data({
          googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "144508dI92hTtIm5wp4OcQMeRP5ViuUpPv2ufvOOLaS0",
          googleSpreadsheetRange: "Global Outbreak Data",
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
                var pointValue = parseInt(b[6], 10) > 10 ? b[6] : null;
                mapOutbreakYearsToSequence(countryPointData, b);
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

                mapOutbreakYearsToSequence(countryPoint, b);

                dataObj.points.push(countryPoint);
              }
            });

            renderMap(dataObj);
          }
        });
      }
    });
  });

function mapFragilityYearsToSequence(country, a, index, year) {
  var value = parseInt(a[index + 2], 10) > -1 ? a[index + 2] : null;

  country.sequence = country.sequence || [];
  if (parseInt(year, 10)) {
    country.sequence.push({ year: year, value: value });
  }
  country[a[1]] = country[a[1]] || [];

  country[a[1]].push(value);
}

function mapOutbreakYearsToSequence(country, b) {
  var pointValue = parseInt(b[6], 10) > 10 ? b[6] : null;

  var yearColumn = b[4].toString().split("-");
  var yearOne = yearColumn[0];

  if (yearColumn.length == 2) {
    var length = parseInt(yearColumn[1], 10) - parseInt(yearColumn[0], 10);

    for (var i = 0; i <= length; i++) {
      var pointIndex = dataObj.labels.indexOf(parseInt(yearOne, 10) + i);

      updateSequence(country, pointIndex, b);
    }
  } else {
    var pointIndex = dataObj.labels.indexOf(parseInt(yearOne, 10));

    updateSequence(country, pointIndex, b);
  }
  return country;
}

function updateSequence(country, index, b) {
  var value = parseInt(b[6], 10) > 10 ? b[6] : null;

  country.sequence[index] = country.sequence[index] || {};

  if (country.sequence[index].value) {
    country.sequence[index].value += value ? value : 0;
  } else {
    country.sequence[index].value = value ? value : null;
  }

  country.sequence[index].diseases = country.sequence[index].diseases || [];
  country.sequence[index].diseases.push({ disease: b[5], cases: value });
  country.sequence[index].year = parseInt(dataObj.labels[index], 10);
}

function renderMap(data) {
  data.points.push({
    x: NaN,
    y: NaN,
    lat: NaN,
    lon: NaN,
    name: "",
    sequence: data.labels.map(function(year) {
      return {
        value: 1250000,
        year
      };
    })
  });
  data.points.push({
    x: NaN,
    y: NaN,
    lat: NaN,
    lon: NaN,
    name: "",
    sequence: data.labels.map(function(year) {
      return {
        value: 10,
        year
      };
    })
  });

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
          to: 60,
          color: "#244864"
        },
        {
          from: 60,
          to: 75,
          color: "#2B6178"
        },
        {
          from: 75,
          to: 90,
          color: "#326D83"
        },
        {
          from: 90,
          to: 105,
          color: "#3A7A8D"
        },
        {
          from: 105,
          color: "#418698"
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
        borderColor: "#1e3953",
        showInLegend: false,
        states: {
          hover: {
            brightness: 0
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
        maxSize: "25%",
        minSize: "2px",

        sizeBy: "area",
        color: "#c89a49",
        borderColor: "white",
        states: {
          inactive: {
            opacity: 1
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
              text: "CSIS | WHO | Fund for Peace |  "
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
              text: "CSIS | WHO | Fund for Peace |  "
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
                "CSIS Global Health Policy Center | World Health Organization | Fund for Peace | "
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
  currentYear = document.querySelector(".label.active").dataset.id;

  currentYear = parseInt(currentYear, 10);
  var index = currentYear - 2006;

  var fragilityData = this.series.chart.series.find(function(s) {
    return s.name === "choropleth";
  }).data;

  var fragilityCountry = fragilityData.find(function(d) {
    return d.id === point.id || d.name === point.name;
  });

  var fragilityValue = fragilityCountry
    ? fragilityCountry.sequence[index].value
    : null;

  var color = fragilityCountry ? fragilityCountry.color : null;
  var rgb = hexToRgb(color);

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
    ? outbreakCountry.sequence[index].diseases
    : null;

  var table = "";

  table += "<table>";
  table += "<thead>";
  table += "<tr>";
  table += '<td colspan="2">' + this.name + " (" + currentYear + ")" + "</td>";
  table += "</tr>";
  table += "</thead>";
  table += "<tbody>";

  if (fragilityValue) {
    table += '<tr class="section section-fragility">';
    table += '<td style="background-color:' + color + '">Fragility Score</td>';
    table +=
      '<td style="background-color:rgba(' +
      rgb +
      ',.67)">' +
      fragilityValue +
      "</td>";
    table += "</tr>";
  }

  if (outbreakValue) {
    table += '<tr class="section section-outbreak">';
    table += "<td>Outbreaks</td>";
    table += "<td>Suspected Cases</td>";
    table += "</tr>";

    var outbreakRows = outbreakDiseases
      .map(function(o) {
        return (
          "<tr>" +
          "<td>" +
          o.disease +
          "</td>" +
          "<td>" +
          o.cases.toLocaleString() +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    table += outbreakRows;

    table += "<tr>";
    table += "<td><strong>" + outbreakDiseases.length + " total</strong></td>";
    table +=
      "<td><strong>" + outbreakValue.toLocaleString() + " total</strong></td>";
    table += "</tr>";
  }
  table += "</tbody>";
  table += "</table>";

  return table;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  result = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
  return result.r + "," + result.g + "," + result.b;
}
