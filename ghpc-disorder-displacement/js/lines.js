Highcharts.chart("container", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1X9GQiF8JBY81xmD8OY58HPyjCXyDNYiRiT6DXH_zJ6Y",
    googleSpreadsheetWorksheet: 1,
    complete: function(data) {
      data.series[0].marker = {
        fillColor: "#e45527",
        radius: 4.5
      };

      data.series[0].lineColor = "#155c6c";
      data.series[0].lineWidth = 3;

      data.series[0].color = "#155c6c";
      data.series[0].color = {
        pattern: {
          color: "#155c6c",
          path: {
            d: "M 0 0 L 3 3",
            strokeWidth: 3
          },
          width: 3,
          height: 3,
          opacity: 0.5
        }
      };
      data.series[0].fillOpacity = 0.5;
    }
  },
  chart: {
    type: "area",
    backgroundColor: "transparent"
  },

  title: {
    text: "GLOBAL FORCED DISPLACEMENT",
    align: "left",
    style: {
      fontSize: "24px"
    }
  },
  subtitle: {
    text: "Lorem ipsum dolor",
    align: "left",
    style: {
      fontSize: "18px",
      fontStyle: "italic"
    }
  },
  credits: {
    enabled: true,
    position: { x: 10, align: "left" },
    href: false,
    text:
      "CSIS Gobal Health Policy Center | Source: UNHCR Annual Global Trends Reports"
  },
  legend: {
    enabled: false
  },
  yAxis: {
    title: "",
    gridLineColor: "#b8cbdf",
    tickInterval: 10,
    labels: {
      formatter: function() {
        return this.value > 0 ? this.value + "M" : "";
      },
      style: {
        // color: "#1e3953"
      }
    }
  },
  xAxis: {
    lineColor: "#b8cbdf",
    tickColor: "#b8cbdf",
    tickInterval: 1,
    labels: {
      style: {
        // color: "#1e3953"
      }
    }
  },

  tooltip: {
    headerFormat:
      "<span style=\"font-size: 13px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\">{point.key}</span><br/>",
    pointFormatter: function() {
      return `
      ${this.y.toFixed(1)} Million Displaced`;
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
            height: "100%",
            spacingBottom: 25,
            marginTop: 100
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
            height: "80%",
            spacingBottom: 25,
            marginTop: 75
          }
        }
      },
      {
        condition: {
          minWidth: 701,
          spacingBottom: 25,
          marginTop: 100
        },
        chartOptions: {
          chart: {
            height: "50%",
            marginTop: 100
          }
        }
      }
    ]
  }
});
var resizeEvent = window.document.createEvent("UIEvents");
resizeEvent.initUIEvent("resize", true, false, window, 0);
window.dispatchEvent(resizeEvent);
