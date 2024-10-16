const countries = [
  { id: "brun", name: "Brunei", sheet: "Brunei" },
  { id: "cam", name: "Cambodia", sheet: "Cambodia" },
  { id: "indo", name: "Indonesia", sheet: "Indonesia" },
  { id: "laos", name: "Laos", sheet: "Laos" },
  { id: "malay", name: "Malaysia", sheet: "Malaysia" },
  { id: "myan", name: "Myanmar", sheet: "Myanmar" },
  { id: "phil", name: "Philippines", sheet: "Philippines" },
  { id: "sing", name: "Singapore", sheet: "Singapore" },
  { id: "thai", name: "Thailand", sheet: "Thailand" },
  { id: "viet", name: "Vietnam", sheet: "Vietnam" },
  { id: "timor", name: "Timor-Leste", sheet: "TimorLeste" }
];

for (let i = 0; i < countries.length; i++) {
  const { id, name, sheet } = countries[i];

  drawChart(i, id, name, sheet);
}

function drawChart(index, id, name, sheet) {
  Highcharts.chart(`hc-${id}`, {
    // Load Data in from Google Sheets
    data: {
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
      googleSpreadsheetKey: "1JFh3wyAtvmWmglO-wGaRhlJm6iM9z6f88r-7nrzoSXg",
      googleSpreadsheetRange: sheet,
      dateFormat: "mm/dd/YYYY",
    },

    // General Chart Options
    chart: {
      type: "line"
    },

    // Colors
    colors: ["#7FA8D9", "#49719b"],
    // Chart Title and Subtitle
    title: {
      text: name,
      align: "center",
      x: 20,
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
      enabled: false,
    },
    // Y Axis
    yAxis: {
      gridLineColor: "transparent",
      startOnTick: true,
      tickPositions: [-20, -9, 0, 9, 20],
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
    },
    xAxis: {
      tickPositions: [2019, 2020, 2021, 2022],
      offset: 0,
      labels: {
        enabled: true,
        formatter: function (params) {
          if (params.value === 2019) {
            return "'19";
          } else if (params.value === 2020) {
            return "'20";
          } else if (params.value === 2021) {
            return "'21";
          } else {
            return "'22";
          }
        },
      },
    },
    exporting: {
      enabled: false,
    },
    // Tooltip
    tooltip: {
      shared: true,
      useHTML: false,
      valueDecimals: 1,
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
}
