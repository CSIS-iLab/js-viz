Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    decimalPoint: ".",
  },
})

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  // data: {
  //   googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  //   googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
  //   googleSpreadsheetRange: "Migration-Corridors-for-Venezuelan-Migrants",
  //   complete: function (data) {
  //     console.log( data )
  //     // data.series[0] = [{type: 'sankey'}]
  //     return data
  //   },
  // },
  series: [
    {
      colors: [
        "#535353", // Venezuela
        // "#FFC728", // Colombia
        // "#8B7B5A", // Peru
        // "#44C07B", // Chile
        // "#0050A4", // Americas
        // "#7D4391", // Ecuador
      ],
      keys: ["color", "from", "to", "weight"],
      data: [
        ["#FFC728", "Venezuela", "Colombia", 1780486],
        ["#8B7B5A", "Venezuela", "Peru", 941889],
        ["#44C07B", "Venezuela", "Chile", 523553],
        ["#0050A4", "Venezuela", "United States of America", 505647],
        ["#7D4391", "Venezuela", "Ecuador", 388861],
      ],
      type: "sankey",
    },
  ],
  // General Chart Options
  chart: {
    // type: "sankey",
    spacingBottom: 60,
    style: {
      fontFamily: ["Source Sans Pro", "sans-serif"],
    },
  },
  // Colors
  colors: [
    // "#E53E3A", // Venezuela
    "#535353", // Venezuela
    "#FFC728", // Colombia
    "#8B7B5A", // Peru
    "#44C07B", // Chile
    "#0050A4", // Americas
    "#7D4391", // Ecuador
  ],
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
    text: "Total number of migrants from Venezuela and which countries they ended up.",
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
  // legend: {
  //   align: "left",
  //   x: -10,
  //   verticalAlign: "top",
  //   layout: "horizontal",
  //   symbolRadius: 0,
  //   itemStyle: {
  //     color: "#333",
  //     fontWeight: "normal",
  //   },
  //   labelFormatter: function () {
  //     return this.name;
  //   },
  // },
  // Y Axis
  // yAxis: {
  //   title: {
  //     text: "People",
  //   },
  //   max: 6000000,
  //   tickInterval: 1000000,
  //   reversedStacks: false,
  //   startOnTick: false,
  //   endOnTick: false,
  //   // visible: false,
  // },
  // xAxis: {
  //   type: "year",
  //   // max: 2017,
  //   tickInterval: 1,
  //   accessibility: {
  //     rangeDescription: "Range: 2000 to 2021",
  //   },
  //   crosshair: true,
  // },
  // Tooltip
  tooltip: {
    //   headerFormat: "{point.key}<br/>",
    // pointFormatter: function () {
    //   console.log("tooltip formatter", this);
    //   point = this;
    //   from = countries[point.from] || point.from;
    //   to = countries[point.to] || point.to;
    //   console.log(point.weight);
    //   weight = new Intl.NumberFormat().format(point.weight);
    //   return (
    //     // '<span style="font-size: 14px;color:' +
    //     // this.color +
    //     // '">\u25A0</span> ' +
    //     // this.series.name +
    //     // ": <b> " +
    //     // new Intl.NumberFormat().format(this.y) +
    //     // "</b><br/>"
    //     from + " → " + to + ": " + weight
    //   );
    // },
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
