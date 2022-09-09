// Use the one in the Venezuela folder
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
    googleSpreadsheetRange: "diphtheria-reported-cases-colombia-venezuela",
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
  colors: [
    "#F3C11B", // Colombia
    "#4881B5", // Americas
  ],
  // Chart Title and Subtitle
  accessibility: {
    description:
      "Reported Cases of Diphtheria Colombia vs. Venezuela (2000-2021)",
  },
  title: {
    text: "Reported Cases of Diphtheria Colombia vs. Venezuela (2000-2021)",
    align: "left",
    style: {
      color: "black",
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
  subtitle: {
    text: "From 2000 to 2021, gaps in health services for Venezuelans resulted in 2 major outbreaks of measles and diptheria. Concerns also abound about data collection gaps, especially during the Maduro presidency. Hover over the lines below to see how many reported cases there were of measles and diptheria in a given year in Venezuela. To focus only on one disease, click 'measles' or 'diptheria' in the legend below to hide that data.",
    align: "left",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "GHPC, CSIS | Source: WHO/UNICEF Joint Reporting Form on Immunization (JRF)",
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
      const legend = this.name;
      const legendsWords = legend.split(" ");
      const legendsWordsLength = legendsWords.length;
      let modifiedLegend = "";
      // find the last word and make it bold and recreate the sentence
      legendsWords.map((element, index) => {
        if (index === 0) {
          modifiedLegend += "<b>" + element + "</b> ";
        } else {
          modifiedLegend += element + " ";
        }
      });
      return modifiedLegend;
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Reported Disease Cases",
    },
    max: 800,
    // tickInterval: 1000,
    // reversedStacks: false,
    // startOnTick: false,
    // endOnTick: false,
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
        this.series.name +
        // lastWord[lastWord.length - 1] +
        ": <b> " +
        new Intl.NumberFormat().format(this.y) +
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
