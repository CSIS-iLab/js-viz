$(function() {
  $(`#hcContainer`).highcharts({
    // Load Data in from Google Sheets
    data: {
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
      googleSpreadsheetRange: "Assistance Ratings by Party",
    },
    // General Chart Options
    chart: {
      zoomType: "x",
      type: "column",
      height: "300px"
    },
    exporting: { enabled: true },
    // Chart Title and Subtitle
    title: {
      style: { lineHeight: "33%" },
      text:
        "Humanitarian, Development and Global Health Assistance<br> Ratings by Party"
    },
    subtitle: {
      text: ""
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS"
    },
    // Chart Legend
    legend: {
      title: {
        text: ""
      },
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal"
    },
    // Y Axis
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: "#000000",
      title: {
        text: "Response Count"
      }
    },
    xAxis: {
      gridLineWidth: 0,
      labels: {
        formatter: function() {
          return this.value === 1
            ? `${this.value}<br>Oppose`
            : this.value === 7
              ? `${this.value}<br>Support`
              : this.value === "."
                ? ``
                : `${this.value}`;
        }
      }
    },
    tooltip: {
      headerFormat: ""
    },
    // Additional Plot Options
    plotOptions: {
      column: {
        stacking: null,
        borderColor: "transparent",
        groupPadding: 0.1,
        pointPadding: 0.05,
        // pointWidth: 33,
        dataLabels: {
          enabled: false
        }
      }
    }
  });
});
