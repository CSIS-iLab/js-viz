let title;

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  googleSpreadsheetKey: "1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs",
  googleSpreadsheetRange: "Year",
  parsed: function (columns) {
    title = "Generation, December " + columns[0][0];
    renderChart();
  },
});

function renderChart() {
  Highcharts.chart("hcContainer", {
    // Load Data in from Google Sheets
    data: {
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
      googleSpreadsheetKey: "1susmb2O7l-sRkILnlxZyatXmtebTrGjQk_K-qPqjzgs",
      googleSpreadsheetRange: "Intern Generation",
    },
    // General Chart Options
    chart: {
      type: "column",
    },
    // Colors
    colors: ["#0065A4"],
    // Chart Title and Subtitle
    title: {
      text: title,
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS | Center for Strategic and International Studies",
    },
    // Chart Legend
    legend: {
      enabled: false,
    },

    // X Axis
    xAxis: {},
    // Y Axis
    yAxis: {
      title: {
        text: "Number of Interns",
      },
    },
    // Additional Plot Options
    plotOptions: {
      column: {
        stacking: null, // Normal bar graph
        dataLabels: {
          enabled: false,
        },
      },
    },
  });
}
