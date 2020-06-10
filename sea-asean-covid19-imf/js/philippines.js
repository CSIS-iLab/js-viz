Highcharts.chart("hc-phil", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1JFh3wyAtvmWmglO-wGaRhlJm6iM9z6f88r-7nrzoSXg",
    googleSpreadsheetWorksheet: 2,
    parsed: function (data) {
      // console.log(data);
      // console.log(this);
      // return data;
    },
  },

  // General Chart Options
  chart: {
    zoomType: "xy",
    type: "line",
  },

  // Colors
  colors: [
    // // Brunei
    // "#4E79A7",

    // // Cambodia
    // "#F28E2C",

    // // Indonesia
    // "#76B7B2",

    // // Laos
    // "#EDC949",

    // // Malaysia
    // "#BAD97C",

    // // Myanmar
    // "#E15759",

    // Philippines
    "#7FA8D9",

    // // Singapore
    // "#FF9DA7",

    // // Thailand
    // "#59A14F",

    // // Vietnam
    // "#AF7AA1",
  ],
  // Chart Title and Subtitle
  title: false,
  subtitle: false,
  // Credits
  credits: {
    enabled: false,
    href: false,
    text: "CSIS Southeast Asia Program | Source: IMF",
  },
  // Chart Legend
  legend: {
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Y Axis
  yAxis: {
    gridLineColor: "transparent",
    startOnTick: true,
    // tickPositions: [-8, -6, -4, -2, 0, 2, 4, 6, 8],
    tickPositions: [-8, -4, 0, 4, 8],
    plotLines: [
      {
        dashStyle: "longdash",
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 0,
        zIndex: -5,
      },
    ],
    title: {
      text: "",
    },
    labels: {
      formatter: function () {
        return this.value;
      },
    },
  },
  xAxis: {
    opposite: true,
    offset: 0,
    lineColor: "transparent",
    gridLineColor: "transparent",
    labels: {
      enabled: true,
      formatter: function (params) {
        if (params.value === "Pre-Covid (09/19)") {
          return "Pre-Covid";
        } else {
          return "Post-Covid";
        }
      },
    },
    plotLines: [
      {
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 0,
        zIndex: -5,
      },
      {
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 1,
        zIndex: -5,
      },
    ],
  },
  exporting: {
    enabled: false,
  },
  // Tooltip
  tooltip: {
    shared: true,
    useHTML: true,
    xDateFormat: "%B %e, %Y",
  },
  // Additional Plot Options
  plotOptions: {
    line: {
      marker: {
        enabled: true,
        fillColor: "#FFFFFF",
        lineWidth: 2,
        lineColor: null,
        radius: 5,
      },
    },
  },
});
