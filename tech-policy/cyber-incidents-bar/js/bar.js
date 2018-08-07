$(function() {
  var chart, dataArray, newOffset;
  var max,
    data = {};

  Highcharts.data({
    googleSpreadsheetKey: "1fdRF457KDaedi5pTe852vJD1RCEfWJryhOfz8HAa4ww",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: false,
    parsed: function(columns) {
      data.nations = columns[0].slice(1);
      data.offender = columns[1].slice(1);
      data.victim = columns[2].slice(1);
      renderChart(data);

      let containerWidth = document.getElementById("hcContainer").offsetWidth;
      let adjustedOffset = 0 - containerWidth / 2;
      chart.update({
        xAxis: {
          offset: adjustedOffset
        }
      });
    }
  });

  window.addEventListener("resize", () => {
    let containerWidth = document.getElementById("hcContainer").offsetWidth;
    let adjustedOffset = 0 - containerWidth / 2;
    chart.update({
      xAxis: {
        offset: adjustedOffset
      }
    });
  });

  function renderChart(data) {
    chart = Highcharts.chart("hcContainer", {
      chart: {
        margin: [100, 50, 100, 50],
        type: "bar"
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        y: 5,
        itemHoverStyle: {
          color: "#000",
          cursor: "default"
        }
      },
      title: {
        text: "Significant Cyber Incidents"
      },
      // Credits
      credits: {
        enabled: true,
        href: false,
        text: "CSIS Technology Policy | Cybersecurity & Governance"
      },
      tooltip: {
        // shared: true,
        crosshairs: true,
        borderColor: Highcharts.getOptions().colors[2]
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function() {
              return false;
            }
          }
        }
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
            fontWeight: "bold"
          }
        },
        lineWidth: 0,
        tickWidth: 0,
        offset: -600
      },
      yAxis: [
        {
          title: {
            text: null
          },
          width: "40%",
          reversed: true,
          opposite: false
        },
        {
          offset: 0,
          title: {
            text: null
          },
          left: "60%",
          width: "40%"
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
