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
    googleSpreadsheetRange: "country-comparison-cumulative-covid-deaths",
  },

  // General Chart Options
  chart: {
    type: "spline",
    // inverted: true,
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },

  // Colors
  colors: [
    "#D92F5D", // Venezuela
    "#F3C11B", // Colombia
    "#4881B5", // Ecuador
    "#44C07B", // Brazil
    "#8B7B5A", // Guyana
    "#7D4391", // Peru
  ],

  // Chart Title and Subtitle
  accessibility: {
    description:
      "Cumulative COVID-19 Deaths (from 3/27/2020 to 8/31/2022)",
  },
  title: {
    text: "Cumulative COVID-19 Deaths (from 3/27/2020 to 8/31/2022)",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "Dayle country comparison between Venezuela, Colombia, Ecuador, Brazil, Guyana and Peru",
    align: "left",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "GHPC, CSIS | Source: ",
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
      text: "Cumulative Deaths (per million people)",
    },
    // max: 150000,
  },
  xAxis: {
    type: "days",
    tickInterval: 1,
    accessibility: {
      rangeDescription: "Days: ",
    },
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
    // shared: true,
    style: {
      fontSize: "14px",
    },
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      borderWidth: 0,
      groupPadding: 0.1,
      pointWidth: 130,

      dataLabels: {
        // align: "left",
        enabled: false,
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
