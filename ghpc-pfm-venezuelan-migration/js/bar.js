Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "venezuela",
    // complete: function () {
    //   // DATA
    //   console.log(this);
    // },
  },
  // General Chart Options
  chart: {
    // type: "column",
    type: "spline",
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },
  // Colors
  colors: ["#0050A4", "#00B2E3"],
  // Chart Title and Subtitle
  accessibility: {
    description: "Diphteria & Measles reported cases and incidence in Venezuela.",
  },
  title: {
    text: "Diphteria & Measles reported cases and incidence in Venezuela.",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "From 2000 to 2021",
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
      text: "Reported Cases & Incidence",
    },
    max: 6000,
    tickInterval: 1000,
    reversedStacks: false,
    startOnTick: false,
    endOnTick: false,
    // visible: false,
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
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        this.series.name +
        ": <b> " +
        this.y +
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
      // stacking: 'normal',
      borderWidth: 0,
      groupPadding: 0.1,

      dataLabels: {
        align: "left",
        enabled: true,
        // formatter: function () {
        //   if (this.point.shapeArgs.height < this.point.name.length * 2) {
        //     return;
        //   } else {
        //     return this.y;
        //   }
        // },
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
