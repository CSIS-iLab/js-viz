Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "venezuela-mvc2",
  },
  // General Chart Options
  chart: {
    type: "spline",
    // height: 600,
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },
  // Colors
  colors: [
    "#E53E3A", // Venezuela
    "#0050A4", // Americas
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      "Full Measles Vaccination Coverage in Venezuela vs. the Americas Region (2000-2021)",
  },
  title: {
    text: "Full Measles Vaccination Coverage in Venezuela vs. the Americas Region (2000-2021)",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "Measles vaccination 2nd dose coverage.",
    align: "left",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "GHPC | CSIS",
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
      text: "Coverage",
    },
    labels: {
      formatter: function () {
        return this.value + "%";
      },
    },
    max: 100,
    tickInterval: 10,
    reversedStacks: false,
  },
  xAxis: {
    type: "year",
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
      let customSeriesName = ''
      if (this.series.name == "Venezuela - Full Measles Vaccination Coverage") {
        customSeriesName = 'Venezuela measles vaccination'
      } else {
        customSeriesName = 'Americas Region measles vaccination'
      }
        return (
          '<span style="font-size: 14px;color:' +
          this.color +
          '">\u25A0</span> ' +
          // this.series.name +
          customSeriesName +
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
    series: {
      // borderWidth: 0,
      // groupPadding: 0.1,
      marker: {
        symbol: "circle",
      },
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
