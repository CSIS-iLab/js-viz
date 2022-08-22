Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    decimalPoint: ".",
  },
});

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "venezuela",
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
  colors: ["#0050A4", "#00B2E3"],
  // Chart Title and Subtitle
  accessibility: {
    description:
      "Diphteria & Measles reported cases in Venezuela (2000 - 2021)",
  },
  title: {
    text: "Diphteria & Measles reported cases in Venezuela (2000 - 2021)",
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
      const legend = this.name
      const legendsWords = legend.split(' ')
      const legendsWordsLength = legendsWords.length
      let modifiedLegend = ''
      // find the last word and make it bold and recreate the sentence
      legendsWords.map( (element, index) => {
        // console.log(element)
        if ( index === ( legendsWordsLength - 1 ) ) {
          // console.log(element)
          modifiedLegend += '<b>' + element + '<b/>'
        } else {
          modifiedLegend += element + ' '
        }
      })
      // console.log(modifiedLegend)
      return modifiedLegend
      // return this.name + " (click to hide)"
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Reported Disease Cases",
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
      let lastWord = this.series.name.split(" ");
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        // this.series.name +
        lastWord[lastWord.length - 1] +
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
      borderWidth: 0,
      groupPadding: 0.1,

      dataLabels: {
        align: "left",
        enabled: true,
        // formatter: function() {
        //   console.log(this.x );
        //   return this.y + "<br/>(" + Math.round(((this.y / this.point.total) * 100) * 100) / 100 + " %)"
        // },
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
