Highcharts.chart("container", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1X9GQiF8JBY81xmD8OY58HPyjCXyDNYiRiT6DXH_zJ6Y",
    googleSpreadsheetWorksheet: 1,
    complete: function(data) {
      data.series[0].marker = {
        fillColor: "#49acb2",
        radius: 6
      };

      data.series[0].lineColor = "#d46c44";
      data.series[0].lineWidth = 3;

      data.series[0].color = {
        pattern: {
          color: "#49acb2",
          path: {
            d: "M 0 0 L 3 3",
            strokeWidth: 3
          },
          width: 4.5,
          height: 4.5,
          opacity: 0.5
        }
      };
    }
  },
  chart: {
    type: "area",
    height: "50%",
    spacingBottom: 25,
    backgroundColor: "transparent"
  },

  title: {
    text: ""
  },
  subtitle: {
    text: ""
  },
  credits: {
    enabled: true,
    href: false,
    text:
      "CSIS Gobal Health Policy Center | Source: UNHCR Annual Global Trends Reports"
  },
  legend: {
    enabled: false
  },
  yAxis: {
    title: "",
    gridLineColor: "#455a77",
    tickInterval: 10,
    labels: {
      rotation: -30,
      formatter: function() {
        return this.value > 0 ? this.value + "M" : "";
      },
      style: {
        color: "#b8cbdf"
      }
    }
  },
  xAxis: {
    lineColor: "#455a77",
    tickColor: "#455a77",
    tickInterval: 1,
    labels: {
      rotation: -30,
      x: 16,
      style: {
        color: "#b8cbdf"
      }
    }
  },

  tooltip: {
    headerFormat:
      "<span style=\"font-size: 13px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\">{point.key}</span><br/>",
    pointFormatter: function() {
      return `
      $${this.y.toFixed(1)} Million Displaced`;
    }
  }
});
