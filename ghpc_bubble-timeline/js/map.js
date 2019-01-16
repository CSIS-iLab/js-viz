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

var geoData,
  currentSeries,
  currentPoint,
  currentYear,
  currentIndex,
  chart,
  chart2,
  max;

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

        dataObj.labels = dataObj.labels;
        renderMap(dataObj);

        Highcharts.data({
          googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
          googleSpreadsheetWorksheet: 2,
          switchRowsAndColumns: true,
          parsed: function parsed(columns) {
            var endemic = columns.filter(c => c[9] === "x");
            var notEndemic = columns.filter(c => c[9] !== "x");

            endemic.forEach(c => {
              var mapSeries = chart.series[0].data.find(
                s => s.name.toLowerCase() === c[0].toLowerCase()
              );
              if (mapSeries) {
                var row = {};
                row.type = "line";
                row.name = c[0];
                row.lineWidth = 1;
                row.data = c.slice(1, c.length - 1).map((c, i) => {
                  return { y: c, x: i + 2010 };
                });
                row.showInLegend = true;
                row.visible = true;
                row.color = mapSeries.color;
                series.push(row);
              }
            });

            notEndemic.forEach(c => {
              var mapSeries = chart.series[0].data.find(
                s => s.name.toLowerCase() === c[0].toLowerCase()
              );

              if (mapSeries) {
                var row = {};
                row.type = "line";
                row.name = c[0];
                row.lineWidth = 4;
                row.data = c.slice(1, c.length - 1).map((c, i) => {
                  return { y: c, x: i + 2010 };
                });
                row.showInLegend = false;
                row.visible = false;
                row.color = mapSeries.color;
                series.push(row);
              }
            });

            return renderLine(series);
          }
        });
      }
    });
  });

function renderMap(data) {
  chart = Highcharts.chart(
    "container",
    _defineProperty({
      chart: {
        type: "tilemap",
        height: "80%",
        marginBottom: 40,
        marginTop: -20
      },

      title: {
        align: "left",
        x: 50,
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
              click: function click() {
                currentYear = document.querySelector(".label.active").innerText;

                currentIndex = dataObj.labels.indexOf(
                  parseInt(currentYear, 10)
                );

                currentSeries = chart2.series.find(s => s.name === this.name);

                max = chart2.series.filter(s => s.visible).length > 5;

                if (
                  currentSeries &&
                  clicked.name !== currentSeries.name &&
                  !max
                ) {
                  clicked = clicked ? false : currentSeries.name;

                  currentPoint = currentSeries.data[currentIndex];

                  if (currentPoint && parseInt(currentPoint.y, 10)) {
                    currentPoint.setState("hover");
                  }

                  if (
                    !["Afghanistan", "Nigeria", "Pakistan"].includes(this.name)
                  ) {
                    currentSeries.update(
                      {
                        name: this.name,
                        showInLegend: true,
                        visible: true
                      },
                      true
                    );
                  }
                }
              },
              mouseOver: function mouseOver() {
                currentYear = document.querySelector(".label.active").innerText;

                currentIndex = dataObj.labels.indexOf(
                  parseInt(currentYear, 10)
                );

                currentSeries = chart2.series.find(s => s.name === this.name);

                if (currentSeries) {
                  currentPoint = currentSeries.data[currentIndex];

                  if (currentPoint) {
                    currentPoint.setState("hover");

                    if (currentPoint.y) {
                      chart2.tooltip.refresh(currentPoint);
                    }
                  }

                  if (
                    !["Afghanistan", "Nigeria", "Pakistan"].includes(this.name)
                  ) {
                    currentSeries.chart.update({ legend: { y: -50 } }, true);
                    currentSeries.update(
                      {
                        name: this.name,
                        showInLegend: true,
                        visible: true
                      },
                      true
                    );
                  }
                }
              },
              mouseOut: function mouseOut() {
                if (currentSeries && currentSeries.name !== clicked) {
                  if (
                    !["Afghanistan", "Nigeria", "Pakistan"].includes(this.name)
                  ) {
                    currentSeries.update(
                      {
                        name: this.name,
                        showInLegend: false,
                        visible: false
                      },
                      true
                    );
                  }

                  if (currentPoint && currentPoint.y) {
                    currentPoint.setState("");

                    chart2.tooltip.refresh(currentPoint);
                  }
                }
                chart2.tooltip.hide("fast");
              }
            }
          }
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
                height: "100%"
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
              minWidth: 401,
              maxWidth: 700
            },
            chartOptions: {
              chart: {
                height: "80%"
              },
              credits: {
                align: "right",
                position: { y: -10 },
                text:
                  'CSIS | <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">WHO</a>'
              },

              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .7rem;color:' +
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
              minWidth: 701
            },
            chartOptions: {
              plotOptions: {
                series: {
                  dataLabels: {
                    formatter: function formatter(point) {
                      var color = "#ffffff";

                      return (
                        '<span style="font-size: .9rem;color:' +
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
          verticalAlign: "top",
          align: "right",
          theme: {
            fill: "#0065a4",
            "stroke-width": 0,
            style: { color: "white" }
          }
        },
        buttons: {
          zoomIn: {
            y: 25
          },
          zoomOut: {
            y: 60
          }
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        headerFormat: "",
        pointFormatter: function pointFormatter() {
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
      }
    })
  );
  chart.motion.reset();
}

function renderLine(data) {
  chart2 = Highcharts.chart(
    "container2",
    _defineProperty({
      chart: {
        zoomType: false,
        type: "line",
        marginBottom: 50
      },
      title: {
        align: "left",
        x: 50,
        text: ""
      },
      subtitle: {
        floating: false,
        align: "left",
        x: 50,
        text: ""
      },

      credits: {
        enabled: false
      },
      yAxis: {
        title: { text: "Score" },
        endOnTick: false,
        tickInterval: 25,
        max: 104,
        min: 0
      },
      xAxis: {
        tickmarkPlacement: "on"
      },

      legend: {
        // title: {
        //   text: '<span style="margin:0 10px">Polio Endemic Countries</span>'
        // },
        useHTML: true,
        y: -75,

        align: "right",
        layout: "verticle"
      },
      plotOptions: {
        column: {
          groupPadding: 0.5,
          pointWidth: 150,
          borderWidth: 0
        }
      },
      series: data,
      tooltip: {
        headerFormat: "",
        pointFormatter: function pointFormatter(e) {
          var point = currentPoint || this;
          var name = this.series.name || currentPoint.name;
          var color = this.color || currentPoint.color;
          var x = this.x || currentPoint.x;
          var y = this.y || currentPoint.y;

          return (
            '<div><span style="font-size:18px;color:' +
            color +
            '">\u25CF </span><b>' +
            name +
            "</b><br/>\n      " +
            x +
            " Score:\n       " +
            y +
            "</div>"
          );
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
                height: "60%"
              },
              xAxis: {
                categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
                labels: {
                  formatter: e => {
                    return `'${e.value.toString().replace(20, "")}`;
                  }
                }
              },
              subtitle: {
                widthAdjust: -180,
                text: ""
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
                height: "40%"
              },
              xAxis: {
                categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
                labels: {
                  align: "center",
                  formatter: e => {
                    return `'${e.value.toString().replace(20, "")}`;
                  }
                }
              },
              subtitle: {
                widthAdjust: -180,
                text: ""
              }
            }
          },
          {
            condition: {
              minWidth: 701
            },
            chartOptions: {
              chart: {
                height: "30%"
              },
              subtitle: {
                widthAdjust: -20
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

document
  .querySelector("#countrySearch")
  .addEventListener("change", function(e) {
    var searchSeries = chart2.series.find(
      s => s.name.toLowerCase() === e.target.value.toLowerCase()
    );

    var searchColor = chart.series[0].data.find(
      s => s.name.toLowerCase() === e.target.value.toLowerCase()
    ).color;

    max = chart2.series.filter(s => s.visible).length > 5;

    if (searchSeries && clicked.name !== searchSeries.name && !max) {
      clicked = clicked ? false : searchSeries.name;

      var searchPoint = searchSeries.data[currentIndex];

      if (searchPoint && parseInt(searchPoint.y, 10)) {
        searchPoint.setState("hover");
      }

      if (!["Afghanistan", "Nigeria", "Pakistan"].includes(searchSeries.name)) {
        searchSeries.update(
          {
            name: searchSeries.name,
            showInLegend: true,
            visible: true,
            color: searchColor
          },
          true
        );

        e.target.value = "";
      }
    }
  });
