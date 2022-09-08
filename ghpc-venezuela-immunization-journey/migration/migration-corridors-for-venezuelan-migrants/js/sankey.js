let columnsLength = 0
let keys = []
let data = []
let colors = []
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    decimalPoint: ".",
  },
})

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
  googleSpreadsheetRange: "Migration-Corridors-for-Venezuelan-Migrants",
  switchRowsAndColumns: true,
  parsed: function (columns) {
    keys = columns.shift()
    columnsLength = columns.length
    for (let i = 0; i < columnsLength; i++) {
      data.push(columns[i])
      colors.push(columns[i][0])
    }
    renderChart(keys, data, colors)
  },
});

function renderChart(keys, data, colors) {
  Highcharts.chart("hcContainer", {
    series: [
      {
        keys: keys,
        data: data,
        // colors: ["#D92F5D", ...colors], //red color for Venezuela
        colors: ["#000", ...colors], //black color for Venezuela

        type: "sankey",
      },
    ],
    // General Chart Options
    chart: {
      spacingBottom: 60,
      style: {
        fontFamily: ["Source Sans Pro", "sans-serif"],
      },
    },
    // Chart Title and Subtitle
    accessibility: {
      description: "Migration Corridors for Venezuelan Migrants (2020)",
    },
    title: {
      text: "Migration Corridors for Venezuelan Migrants (2020)",
      align: "left",
      style: {
        color: "black",
        fontSize: "20px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      text: "As of 2020, over 4,140,436 Venezuelans had fled to other countries. Hover over the color ribbons to see how many Venezuelan migrants ended up in each of the countries below.",
      align: "left",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "GHPC, CSIS | Source: IOM World Migration Report 2022",
      style: {
        fontSize: "11px",
      },
      position: {
        y: -30,
      },
    },
    // Tooltip
    tooltip: {
      headerFormat: "",
      pointFormatter: function () {
        console.log("tooltip formatter", this);
        point = this;
        from = point.from;
        to = point.to;
        weight = new Intl.NumberFormat().format(point.weight);
        return (
          "<b>" + from + " → " + to + "</b><br/>" + weight + " Venezuelans"
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
}