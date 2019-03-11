Highcharts.chart("container", {
  data: {
    googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
    googleSpreadsheetWorksheet: 1,
    complete: function(data) {
      data.series[0].yAxis = 0;
      data.series[1].yAxis = 1;
    }
  },
  title: {
    text: ""
  },
  chart: {
    type: "spline",
    height: "10%"
  },
  xAxis: { tickInterval: 1 },
  yAxis: [
    {
      // Primary yAxis
      labels: {
        format: "${value}",
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: "Funding",
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      reversedStacks: true
    },
    {
      // Secondary yAxis
      title: {
        text: "children under 5",
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        format: "{value}",
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      reversedStacks: true,
      opposite: true
    }
  ],

  legend: {
    layout: "vertical",
    align: "left",
    x: 120,
    verticalAlign: "top",
    y: 100,
    floating: true,
    backgroundColor:
      (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
      "rgba(255,255,255,0.25)"
  }
});
