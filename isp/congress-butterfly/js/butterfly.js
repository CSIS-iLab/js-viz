$(function() {
  var chart, newOffset;
  var data = [];

  Highcharts.data({
    googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: false,
    parsed: function(columns) {
      columns[0].slice(1).forEach((column, i) => {
        nation = {};
        nation[column] = {};
        nation[column].democrat = columns[1].slice(1)[i];
        nation[column].republican = columns[2].slice(1)[i];
        nation[column].incidents =
          nation[column].democrat + nation[column].republican;
        data.push(nation);
      });

      data = data.sort((b, a) => {
        let nationA = Object.keys(a)[0];
        let nationB = Object.keys(b)[0];
        return a[nationA].incidents - b[nationB].incidents;
      });

      data.nations = columns[0].slice(1);
      data.democrat = columns[1].slice(1);
      data.republican = columns[2].slice(1);
      data.max = Math.max(...data.republican.concat(data.democrat));
      renderChart(data);
      offsetYAxis();
    }
  });

  window.addEventListener("resize", () => {
    offsetYAxis();
  });

  function offsetYAxis() {
    let containerWidth = document.getElementById("hcContainer").offsetWidth;
    let adjustedOffset = 0 - containerWidth / 2;
    chart.update({
      xAxis: {
        offset: adjustedOffset
      }
    });
  }

  function renderChart(data) {
    chart = Highcharts.chart("hcContainer", {
      exporting: { enabled: false },
      chart: {
        margin: [100, 50, 100, 50],
        type: "bar",
        style: {
          paddingBottom: "50px",
          overflow: "visible"
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
              minWidth: 250
            },
            chartOptions: {
              chart: {
                marginTop: 225,
                height: 900
              },

              xAxis: {
                reversed: true,
                labels: {
                  style: {
                    fontSize: "11px"
                  }
                }
              }
            }
          },
          {
            condition: {
              maxWidth: 768,
              minWidth: 400
            },
            chartOptions: {
              chart: {
                marginTop: 125,
                height: 700
              }
            }
          },
          {
            condition: {
              maxWidth: 768
            },
            chartOptions: {
              yAxis: [
                {
                  width: "30%"
                },
                {
                  left: "70%",
                  width: "30%"
                },
                {}
              ]
            }
          }
        ]
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        y: 15,
        itemStyle: {
          fontWeight: "normal"
        }
      },
      title: {
        text: "Alliance Ratings by Party",
        floating: false
      },
      subtitle: {
        useHTML: true,
        text: ""
      },
      credits: {
        enabled: true,
        href: false,
        text: "CSIS International Security PRogram | Source: CSIS",
        position: {
          y: 15
        }
      },
      tooltip: {
        crosshairs: true,
        borderColor: Highcharts.getOptions().colors[2],

        valueSuffix: " "
      },
      xAxis: {
        title: {
          text: null
        },
        categories: data.nations,
        labels: {
          align: "center",
          style: {
            width: "100%",
            color: "black"
          },
          formatter: function() {
            return this.value === 1
              ? "Oppose"
              : this.value === 7
                ? "Support"
                : this.value === 2
                  ? "⬆"
                  : this.value === 6
                    ? "⬇"
                    : "▮";
          }
        },
        lineWidth: 0,
        tickWidth: 0
      },
      yAxis: [
        {
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          max: data.max,
          width: "40%",
          reversed: true,
          opposite: false
        },
        {
          offset: 0,
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          max: data.max,
          left: "60%",
          width: "40%"
        },
        {
          title: {
            text: "",
            align: "middle",
            y: -15,
            style: { fontWeight: "bold" }
          }
        }
      ],
      series: [
        {
          name: "Democrat",
          yAxis: 0,
          data: data.democrat
        },
        {
          name: "Republican",
          yAxis: 1,
          data: data.republican
        }
      ]
    });
  }
});
