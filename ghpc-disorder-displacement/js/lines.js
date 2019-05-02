Highcharts.chart("container", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1X9GQiF8JBY81xmD8OY58HPyjCXyDNYiRiT6DXH_zJ6Y",
    googleSpreadsheetWorksheet: 1,
    complete: function(data) {
      data.series[0].marker = {
        fillColor: "#1e3953",
        radius: 4.5
      };

      data.series[0].lineColor = "#1e3953";
      data.series[0].lineWidth = 3;

      data.series[0].color = "#49acb2";
      data.series[0].opacity = 0.75;
    }
  },
  chart: {
    type: "area",
    height: "50%",
    spacingBottom: 25,
    marginTop: 75,
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
      rotation: -30,
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
      rotation: -30,
      x: 16,
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
      $${this.y.toFixed(1)} Million Displaced`;
    }
  }
});
