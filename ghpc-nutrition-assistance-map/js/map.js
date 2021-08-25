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
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
      googleSpreadsheetWorksheet: 8,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(code, i) {
          if (i === 0) {
            dataObj.labels = code.filter(c => parseInt(c, 10));
            return;
          }

          dataObj.labels.forEach(function(year, index) {
            var tileData = geoData.features.find(function(country) {
              return country.properties.name.indexOf(code[0]) > -1;
            });

            if (!tileData) return;

            var countryData = dataObj.data.find(function(d) {
              return d.name === code[0];
            });

            if (countryData) {
              var value;

              if (code[1] === "funding" && parseInt(code[index + 1], 10) > -1) {
                value = code[index + 1];
              }

              if (parseInt(year, 10)) {
                countryData.sequence.push({
                  year: year,
                  value: value
                });
              }

              countryData.value = countryData.sequence[0].value;
              countryData[code[1]] = countryData[code[1]] || [];

              var keyValue =
                parseInt(code[index + 2], 10) > -1 ? code[index + 2] : null;

              countryData[code[1]].push(keyValue);
            } else {
              var country = Object.assign({}, tileData);

              var value;

              if (code[1] === "funding" && parseInt(code[index + 1], 10) > -1) {
                value = code[index + 1];
              }

              country.sequence = country.sequence || [];
              country.sequence.push({ year: year, value: value });
              country.name = code[0];
              dataObj.data.push(country);
              country["hc-key"] = country.properties["hc-key"];

              country[code[1]] = country[code[1]] || [];

              var keyValue =
                parseInt(code[index + 2], 10) > -1 ? code[index + 2] : null;

              country[code[1]].push(keyValue);
            }
          });
        });
        renderMap(dataObj);
      }
    });
  });

function renderMap(data) {
  chart = Highcharts.mapChart("container", {
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
    colorAxis: {
      minColor: "#EDA27C",
      maxColor: "#4C8984"
    },
    series: [
      {
        data: data.data,
        mapData: Highcharts.maps["custom/world-eckert3"],
        joinBy: ["hc-key", "hc-key"],
        borderColor: "#8D8D8D",
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
        currentYear = document.querySelector(".label.active").dataset.id;
        currentYear = parseInt(currentYear, 10);

        var index = currentYear - 2014;

        var reached =
          this.programs[currentYear - 2014] ||
          this.interventions[currentYear - 2014];

        reached = Math.round((reached / 1000) * 10) / 10;
        vitamin =
          Math.round((this.vitamin[currentYear - 2014] / 1000) * 10) / 10;

        return (
          '<div><span style="font-size:24px;color:' +
          this.color +
          '">\u25CF </span><b>' +
          this.name +
          " (" +
          currentYear +
          ")" +
          "</b><br/><br/>" +
          " Funding: $" +
          this.funding[index].toFixed(1) / 1000000 +
          " million <br/><br/>" +
          this.women[index] +
          "<br/><br/>" +
          (this.vitamin[index]
            ? "Children under 5:<br/> Provided with Vitamin A supplements: " +
              vitamin +
              " thousand<br/>"
            : "") +
          (reached
            ? "Reached by nutrition programs: " + reached + " thousand<br/>"
            : "") +
          this.anemia[index] +
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
