Highcharts.chart("hc-myan", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "1JFh3wyAtvmWmglO-wGaRhlJm6iM9z6f88r-7nrzoSXg",
    googleSpreadsheetWorksheet: 7,
  },

  // General Chart Options
  chart: {
    zoomType: "xy",
    type: "line",
    // inverted: true,
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

    // Myanmar
    "#E15759",

    // // Philippines
    // "#7FA8D9",

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
    enabled: true,
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
    startOnTick: true,
    tickPositions: [-8, -4, 0, 4, 8],
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
    formatter: {},
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
        enabled: false,
        symbol: "circle",
        radius: 3,
      },
      lineWidth: 3,
    },
  },
});
