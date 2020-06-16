const countries = [
  { id: "phil", name: "Philippines", sheet: 2 },
  { id: "indo", name: "Indonesia", sheet: 3 },
  { id: "thai", name: "Thailand", sheet: 4 },
  { id: "laos", name: "Laos", sheet: 5 },
  { id: "cam", name: "Cambodia", sheet: 6 },
  { id: "myan", name: "Myanmar", sheet: 7 },
  { id: "viet", name: "Vietnam", sheet: 8 },
  { id: "malay", name: "Malaysia", sheet: 9 },
  { id: "sing", name: "Singapore", sheet: 10 },
  { id: "brun", name: "Brunei", sheet: 11 },
];

for (let i = 0; i < countries.length; i++) {
  const { id, name, sheet } = countries[i];

  drawChart(i, id, name, sheet);
}

function drawChart(index, id, name, sheet) {
  Highcharts.chart(`hc-${id}`, {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: "1JFh3wyAtvmWmglO-wGaRhlJm6iM9z6f88r-7nrzoSXg",
      googleSpreadsheetWorksheet: sheet,
      dateFormat: "mm/dd/YYYY",
    },

    // General Chart Options
    chart: {
      type: "line",
    },

    // Colors
    colors: ["#7FA8D9", "#49719b"],
    // Chart Title and Subtitle
    title: {
      text: name,
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
    },
    xAxis: {
      tickPositions: [2019, 2020, 2021],
      offset: 0,
      lineColor: "transparent",
      gridLineColor: "transparent",
      labels: {
        enabled: true,
        formatter: function (params) {
          if (params.value === 2019) {
            return "'19";
          } else if (params.value === 2020) {
            return "'20";
          } else {
            return "'21";
          }
        },
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
      // xDateFormat: " '%Y",
      // formatter: function () {
      //   console.log(this);
      //   return `
      //   '${this.x}<br>
      //   <span style="color: ${this.points[0].point.series.color}">\u25CF</span> ${this.points[0].series.name}: <b>${this.y}</b>

      //  `;
      // },
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
