Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    decimalPoint: ".",
  },
})

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "venezuela-migration",
  },
  // General Chart Options
  chart: {
    type: "spline",
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },
  // Colors
  colors: ["#004C7B", "#0065A4", "#5E9DBF", "#BFD6DB"],
  // Chart Title and Subtitle
  accessibility: {
    description: "Mass exodus of people living in Venezuela (2000 - 2021)",
  },
  title: {
    text: "Mass exodus of people living in Venezuela (2000 - 2021)",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "We need a subtitle?",
    align: "left",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "GHPC, CSIS | Source: ???",
    style: {
      fontSize: "11px",
    },
    position: {
      y: -30,
    },
  },
  // Chart Legend
  legend: {
    align: "left",
    x: -10,
    verticalAlign: "top",
    layout: "horizontal",
    symbolRadius: 0,
    itemStyle: {
      color: "#333",
      fontWeight: "normal",
    },
    labelFormatter: function () {
      return this.name;
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: "People",
    },
    max: 6000000,
    tickInterval: 1000000,
    reversedStacks: false,
    startOnTick: false,
    endOnTick: false,
    // visible: false,
  },
  xAxis: {
    type: "year",
    // max: 2017,
    tickInterval: 1,
    accessibility: {
      rangeDescription: "Range: 2000 to 2021",
    },
    crosshair: true,
  },
  // Tooltip
  tooltip: {
    headerFormat: "{point.key}<br/>",
    pointFormatter: function () {
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        this.series.name +
        ": <b> " +
        new Intl.NumberFormat().format(this.y) +
        "</b><br/>"
      );
    },
    shared: true,
    style: {
      fontSize: "14px",
    },
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      borderWidth: 0,
      groupPadding: 0.1,

      dataLabels: {
        align: "left",
        enabled: true,
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
