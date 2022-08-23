Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "Share-of-People-Vaccinated-Against-covid19",
  },

  // General Chart Options
  chart: {
    type: "pie",
    // inverted: true,
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },

  // Colors
  colors: [
    "#E53E3A", // Venezuela
    "#FFC728", // Colombia
  ],

  // Chart Title and Subtitle
  accessibility: {
    description:
      "Percent of Venezuelan and Colombian Populations Vaccinated Against COVID-19 (5/25/22)",
  },
  title: {
    text: "Percent of Venezuelan and Colombian Populations Vaccinated Against COVID-19 (5/25/22)",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "Share of People Vaccinated Against COVID-19, Share of people with a complete initial protocol",
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
      text: "",
    },
    labels: {
      formatter: function () {
        return this.value + "%";
      },
    },
    max: 100,
  },
  xAxis: {
    type: "year",
    tickInterval: 1,
    accessibility: {
      rangeDescription: "Countries: Venezuela and Colombia.",
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
        this.y +
        "%</b><br/>"
      );
    },
    shared: true,
    style: {
      fontSize: "14px",
    },
  },
  // Additional Plot Options
  plotOptions: {
    // pie: {
    //     shadow: false,
    //     center: ['70%', '25%']
    // },
    series: {
      borderWidth: 0,
      groupPadding: 0.1,
      innerSize: "50%",

      dataLabels: {
        // align: "left",
        enabled: true,
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
