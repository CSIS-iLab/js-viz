var clicked = false,
  series = [];

var dataObj = { data: [], labels: [] };

var geoData, currentSeries, currentPoint, currentYear, currentIndex, chart, max;

var apikey = "rALBgvFj5slsDlhhw4Vjfw",
  table = "gadm36_zaf_1";
fetch(
  "https://csis.carto.com/api/v2/sql?api_key=" +
    apikey +
    "&format=geojson&q=SELECT%20*%20FROM%20" +
    table
)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    geoData = json;

    Highcharts.data({
      googleSpreadsheetKey: "19oi9wuSR4O9Blr7p6LArWLCVcxAGBUyld0HtGNVqqyU",
      googleSpreadsheetWorksheet: 1,
      switchRowsAndColumns: true,
      parsed: function parsed(columns) {
        columns.forEach(function(a, i) {
          if (i === 0) {
            dataObj.labels = a.filter(c => parseInt(c, 10));
            return;
          }

          dataObj.labels.forEach(function(year, index) {
            var tileData = geoData.features.find(function(province) {
              return province.properties.name_1.indexOf(a[0]) > -1;
            });

            if (!tileData) return;

            var countryData = dataObj.data.find(function(d) {
              return d.name_1 === a[0];
            });

            if (countryData) {
              console.log(45);
              mapFragilityYearsToSequence(countryData, a, index, year);
            } else {
              var country = Object.assign({}, tileData);

              country.name_1 = a[0];

              mapFragilityYearsToSequence(country, a, index, year);
              dataObj.data.push(country);
            }
          });
        });
        console.log(dataObj);
        renderMap(dataObj);
      }
    });
  });

function mapFragilityYearsToSequence(country, a, index, year) {
  var value = parseInt(a[index + 1], 10) > -1 ? a[index + 1] : null;

  country.sequence = country.sequence || [];
  if (parseInt(year, 10)) {
    country.sequence.push({ year: year, value: value });
  }
  country[a[1]] = country[a[1]] || [];

  country[a[1]].push(value);
}

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
        mapData: geoData,
        joinBy: ["name_1", "name_1"],
        borderWidth: 1,
        showInLegend: false,
        states: {
          hover: {
            brightness: 0
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function() {
            return this.point.properties.name_1;
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
    tooltip: {
      headerFormat: "",
      useHTML: true,
      pointFormatter: function pointFormatter() {
        currentYear = document.querySelector(".label.active").dataset.id;

        currentYear = parseInt(currentYear, 10);
        return (
          '<div><span style="font-size:18px;color:' +
          this.color +
          '">\u25CF </span><b>' +
          this.name_1 +
          "</b><br/>\n      " +
          currentYear +
          " Prevalence:\n       " +
          this.value +
          " (units)</div>"
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
              height: "50%"
            },

            credits: {
              align: "right",
              text: ""
            }
          }
        },
        {
          condition: {
            minWidth: 701
          },
          chartOptions: {
            credits: {
              text: ""
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
