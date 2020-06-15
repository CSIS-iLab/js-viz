Highcharts.chart("hc-laos", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1JFh3wyAtvmWmglO-wGaRhlJm6iM9z6f88r-7nrzoSXg",
    googleSpreadsheetWorksheet: 5,
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
    "#4E79A7",

    // // Singapore
    // "#FF9DA7",

    // // Thailand
    // "#59A14F",

    // // Vietnam
    // "#AF7AA1",
  ],
  // Chart Title and Subtitle
  title: {
    text: "Laos",
  },
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
    tickPositions: [-14, -7, 0, 7, 14],
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
    tickPositions: [2019, 2020, 2021],
    offset: 0,
    lineColor: "transparent",
    gridLineColor: "transparent",
    labels: {
      enabled: true,
    },
    plotLines: [
      {
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 2019,
        zIndex: -5,
      },
      {
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 2020,
        zIndex: -5,
      },
      {
        color: "rgb(230, 230, 230)",
        width: 2,
        value: 2021,
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
