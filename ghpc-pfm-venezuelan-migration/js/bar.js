Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
  googleSpreadsheetRange: "venezuela",
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};
    console.log(columns);
    columns.forEach(element => {
      console.log(element)
    })
    renderChart();
  },
});

function renderChart() {
  Highcharts.chart("hcContainer", {
    // Load Data in from Google Sheets
    data: {
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
      googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
      googleSpreadsheetRange: "venezuela",
    },
    // General Chart Options
    chart: {
      // type: "column",
      spacingBottom: 60,
      style: {
        fontFamily: ["Source Sans Pro", "sans-serif"],
      },
    },
    // Colors
    colors: [
      "#0050A4", // Strongly Disagree
      // "#FD8A6D", // Disagree
      // "#FFF1B5", // Neutral
      // "#93BB84", // Agree
      "#00B2E3", // Strongly Agree
      // "#C5C4C0" // refuse to answer
    ],
    // Chart Title and Subtitle
    accessibility: {
      description: "Outbreaks of VPD in Venezuela.",
    },
    title: {
      text: "Outbreaks of VPD in Venezuela.",
      align: "left",
      style: {
        color: "black",
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    // subtitle: {
    //   text: "% of respondents that believe ___",
    //   align: "left",
    // },
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
        return this.name.slice(0, -2); // remove the last 2 characters of the string ' %'
      },
    },
    // Y Axis
    yAxis: {
      title: {
        text: "",
      },
      max: 6000,
      reversedStacks: false,
      // visible: false,
    },
    xAxis: {
      type: "category",
      accessibility: {
        rangeDescription: "Range: 2000 to 2021",
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
          this.series.name.slice(0, -2) +
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
}
