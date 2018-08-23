$(function() {
  var chart, newOffset;
  var data = [];

  Highcharts.data({
    googleSpreadsheetKey: "1fdRF457KDaedi5pTe852vJD1RCEfWJryhOfz8HAa4ww",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: false,
    parsed: function(columns) {
      columns[0].slice(1).forEach((column, i) => {
        nation = {};
        nation[column] = {};
        nation[column].offender = columns[1].slice(1)[i];
        nation[column].victim = columns[2].slice(1)[i];
        nation[column].incidents =
          nation[column].offender + nation[column].victim;
        data.push(nation);
      });

      data = data.sort((b, a) => {
        let nationA = Object.keys(a)[0];
        let nationB = Object.keys(b)[0];
        return a[nationA].incidents - b[nationB].incidents;
      });

      data.nations = columns[0].slice(1);
      data.offender = columns[1].slice(1);
      data.victim = columns[2].slice(1);
      data.max = Math.max(...data.victim.concat(data.offender));
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
        text: "Significant Cyber Incidents",
        floating: false
      },
      subtitle: {
        useHTML: true,
        text:
          "<div style='margin:0 15px'>Based on publicly available information on cyber espionage and cyber warfare, excluding cybercrime. Long-running espionage campaigns were treated as single events for the purposes of incident totals. Tallies are partial as some states conceal incidents while others fail to detect them.</div>"
      },
      credits: {
        enabled: true,
        href: false,
        text: "CSIS Technology Policy Program | Source: Hackmageddon",
        position: {
          y: 15
        }
      },
      tooltip: {
        crosshairs: true,
        borderColor: Highcharts.getOptions().colors[2],

        valueSuffix: " incidents"
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
          max: data.max,
          left: "60%",
          width: "40%"
        },
        {
          title: {
            text: "Number of Incidents",
            align: "middle",
            y: -15,
            style: { fontWeight: "bold" }
          }
        }
      ],
      series: [
        {
          name: "Offender",
          yAxis: 0,
          data: data.offender
        },
        {
          name: "Victim",
          yAxis: 1,
          data: data.victim
        }
      ]
    });
  }
});
