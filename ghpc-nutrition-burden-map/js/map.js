var chart,
  geoData,
  dataObj = {
    Overweight: {
      data: [],
      percent: "35%",
      label: "Overweight"
    },
    Stunting: {
      data: [],
      percent: "20%",
      label: "Stunted"
    },
    Anemia: {
      data: [],
      percent: "20%",
      label: "Anemic"
    },
    all: {
      data: []
    }
  };

fetch("https://code.highcharts.com/mapdata/custom/world-eckert3.geo.json")
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    geoData = json;
    Highcharts.data({
      googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
      googleSpreadsheetWorksheet: 2,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(code, i) {
          if (i === 0) return;
          var tileData = geoData.features.find(function(country) {
            return country.properties["iso-a3"] === code[1];
          });

          if (!tileData) return;

          var country = Object.assign({}, tileData);
          country.name = code[0];
          country["hc-key"] = country.properties["hc-key"];
          dataObj.all.data.push(country);

          Object.keys(dataObj).forEach(function(key) {
            if (code[2].toLowerCase().indexOf(key.toLowerCase()) > -1) {
              dataObj[key].data.push(country);
            }
          });
        });

        var patternArray = [
          "M 0 0 L 10 0 M 0 1 L 10 1 M 0 2 L 10 2 M 0 3 L 10 3 M 0 4 L 10 4 M 0 5 L 10 5 M 0 6 L 10 6 M 0 7 L 10 7 M 0 8 L 10 8 M 0 9 L 10 9 M 0 10 L 10 10",
          "M 0 3.75 L 5 3.75 M 0 3 L 5 3",
          "M 3 0 L 3 5 M 4.5 0 L 4.5 5",
          // "M 0 3 L 10 3 M 0 8 L 10 8",
          // "M 0 2.5 L 5 2.5 M 0 3 L 5 3",
          "M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9",
          "M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11",
          "M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7",
          "M 3 3 L 8 3 L 8 8 L 3 8 Z",
          "M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0",
          "M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7",
          "M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0"
        ];

        var colorArray = ["#A3DEF9", "#115175", "#df4652"];

        var disabledSvg =
          '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" stroke="#bcbcbc" fill="#bcbcbc"/></svg>';

        var series = Object.keys(dataObj).map(function(key, index) {
          if (index === 3) {
            return Object.assign(dataObj[key], {
              name: key,
              mapData: Highcharts.maps["custom/world-eckert3"],
              joinBy: ["hc-key", "hc-key"],
              dataLabels: {
                enabled: false
              },
              color: "transparent",
              borderColor: "#8D8D8D",
              borderWidth: 1,
              nullColor: "transparent",
              states: {
                hover: {
                  borderColor: "black",
                  borderWidth: 2
                }
              }
            });
          }

          var legendItems = Array.from(
            document.querySelectorAll(".legend li")
          ).slice(1);

          var enabledSvg =
            '<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg"> <path d="' +
            patternArray[index] +
            '" stroke="' +
            colorArray[index] +
            '" fill="transparent" stroke-width="2" /></svg>';

          var icon = legendItems[index].querySelector("span");
          icon.style.backgroundImage =
            "url('" +
            "data:image/svg+xml;base64," +
            window.btoa(enabledSvg) +
            "')";

          legendItems[index].addEventListener("click", function(item) {
            var series = chart.series.find(function(s) {
              return s.name === item.target.innerText;
            });

            if (series.visible) {
              legendItems[index].style.color = "#bcbcbc";
              icon.style.backgroundSize = "cover";
              icon.style.backgroundColor = "#bcbcbc";
              icon.style.backgroundImage = "none";
            } else {
              legendItems[index].style.color = "black";
              icon.style.backgroundColor = "transparent";
              icon.style.backgroundImage =
                "url('" +
                "data:image/svg+xml;base64," +
                window.btoa(enabledSvg) +
                "')";
            }

            series.update(
              {
                visible: !series.visible
              },
              true
            );
          });

          var plotOptions = {
            name: key,
            mapData: Highcharts.maps["custom/world-eckert3"],
            joinBy: ["hc-key", "hc-key"],
            dataLabels: {
              enabled: false
            },
            color: {
              pattern: {
                color: colorArray[index],
                path: {
                  d: patternArray[index]
                },
                width: 2.5,
                height: 2.5,
                opacity: 1
              }
            },
            borderColor: "#bcbcbc",
            borderWidth: 1,
            nullColor: "transparent",
            states: {
              hover: {
                borderColor: "black",
                borderWidth: 2
              }
            }
          };

          return Object.assign(dataObj[key], plotOptions);
        });

        renderMap(series);
      }
    });
  });

function renderMap(series) {
  chart = Highcharts.mapChart("container", {
    chart: {
      padding: [0, 0, 0, 0],
      marginTop: 0,
      marginBottom: 25
    },
    title: {
      text: ""
    },
    credits: {
      enabled: true,
      href: false
    },
    legend: {
      enabled: false,
      layout: "horizontal",
      verticalAlign: "top",
      floating: false,
      x: -133
    },
    series: series,
    tooltip: {
      headerFormat: "",
      useHTML: true,
      pointFormatter: function pointFormatter() {
        var point = this;
        var burdens = [];
        Object.keys(dataObj).forEach(function(key, index) {
          if (index === 3) return;
          var found = dataObj[key].data.find(function(data) {
            return data["hc-key"] === point["hc-key"];
          });
          if (found.geometry)
            burdens.push(
              `&nbsp;\u25CF Over ${dataObj[key].percent} are ${
                dataObj[key].label
              }`
            );
        });

        return (
          '<strong style="font-size: 14px;">' +
          this.name +
          '</strong><br><span style="font-size: 14px;">' +
          burdens.join("<br/> ") +
          "</span>"
        );
      }
    },
    mapNavigation: {
      enabled: true,
      enableMouseWheelZoom: false,
      buttonOptions: {
        verticalAlign: "top",
        align: "right",
        theme: {
          fill: "#115175",
          "stroke-width": 0,
          style: {
            color: "white"
          }
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
  // var resizeEvent = window.document.createEvent("UIEvents");
  // resizeEvent.initUIEvent("resize", true, false, window, 0);
  // window.dispatchEvent(resizeEvent);
}
