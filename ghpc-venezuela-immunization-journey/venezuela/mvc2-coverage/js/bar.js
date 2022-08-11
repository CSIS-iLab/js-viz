var categories = [];

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c",
    googleSpreadsheetRange: "venezuela-mvc2",
  },
  // General Chart Options
  chart: {
    type: "bar",
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
      "Diphtheria tetanus toxoid and pertussis (DTP) vaccination coverage, 3rd dose.",
  },
  title: {
    text: "Venezuela vs Americas Region",
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
      text: "",
    },
    max: 100,
    tickInterval: 10,
    labels: {
      formatter: function () {
        return Math.abs(this.value) + "%";
      },
    },
    accessibility: {
      description: "Percentage population",
      rangeDescription: "Range: 0 to 5%",
    }
  },
  xAxis: [
    {
      categories: categories,
      reversed: false,
      labels: {
        step: 1,
      },
      accessibility: {
        description: "Age (male)",
      },
    },
    {
      // mirror axis on right side
      opposite: true,
      reversed: false,
      categories: categories,
      linkedTo: 0,
      labels: {
        step: 1,
      },
      accessibility: {
        description: "Age (female)",
      },
    },
  ],
  // Tooltip
  tooltip: {
    // formatter: function () {
    //     return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
    //         'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
    // },
    headerFormat: "{point.key}<br/>",
    pointFormatter: function () {
      let number = 0
      if (this.y > 0) {
        number = this.y
      } else {
        number = this.y * -1
      }
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        this.series.name +
        ": <b> " +
        number +
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
      stacking: 'normal',
      borderWidth: 0,
      // groupPadding: 0.1,
      pointWidth: 6,
      // spacing: 10,
      pointPadding: 0.25,

      dataLabels: {
        align: "left",
        enabled: true,
        formatter: function() {
          let number = 0
          // console.log(this.y);
          if (this.y > 0) {
            number = this.y
          } else {
            number = this.y * -1
          }
          return '<span> ' + number + '</span>'
        },
        style: {
          textOutline: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});
