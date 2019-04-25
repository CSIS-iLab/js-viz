Highcharts.setOptions({
  lang: {
    thousandsSep: ","
  },

  colors: [
    "#344a45",
    "#3a5a56",
    "#3e6a69",
    "#437a7f",
    "#488b96",
    "#4f9cae",
    "#59acc8",
    "#67bce2",
    "#0095AB"
  ]
});

Highcharts.chart("container", {
  chart: {
    type: "pie",
    margin: [10, 0, 50, 0],
    styledMode: true,
    colorCount: 9
  },
  title: {
    text: ""
  },
  subtitle: {
    text: ""
  },
  credits: {
    href: false,
    text:
      "CSIS Defending Democratic Institutions | Source: Twitter Election Integrity Hub 2018 Dataset"
  },
  plotOptions: {
    pie: {
      size: "100%",
      states: {
        inactive: {
          opacity: 0.75
        }
      },
      dataLabels: {
        enabled: true,
        format: "{point.name}<br> ({point.y:,f} tweets)"
      }
    }
  },
  drilldown: {
    drillUpButton: {
      position: { align: "left", y: -50 },
      relativeTo: "spacingBox"
    }
  },
  tooltip: {
    headerFormat:
      '<span style="color:{point.color}"> \u25CF</span> <span style="font-size: 13px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: \'Roboto\', arial, sans-serif;"> {point.key}</span><br/>',

    pointFormatter: function() {
      var suffix = "% of total<br/>";

      var percentage = this.series.options._levelNumber
        ? (this.percentage / 10).toFixed(1)
        : this.percentage.toFixed(1);

      return parseFloat(percentage, 10) < 0.5
        ? percentage + suffix + "<br/>(" + this.y.toLocaleString() + " tweets)"
        : percentage + suffix;
    }
  },

  series: [
    {
      name: "Languages",
      colorByPoint: true,
      data: [
        {
          name: "German",
          y: 99332,
          drilldown: null
        },
        {
          name: "Ukrainian",
          y: 82237,
          drilldown: null
        },
        {
          name: "Bulgarian",
          y: 54690,
          drilldown: null
        },
        {
          name: "Italian",
          y: 20376,
          drilldown: null
        },
        {
          name: "Spanish",
          y: 12802,
          drilldown: null
        },
        {
          name: "French",
          y: 12636,
          drilldown: null
        },
        {
          name: "Serbian",
          y: 8045,
          drilldown: null
        },
        {
          name: "Estonian",
          y: 6146,
          drilldown: null
        },
        { name: "Other Languages", y: 32826, drilldown: "Other Languages" }
      ]
    }
  ],
  drilldown: {
    series: [
      {
        name: "Other Languages",
        id: "Other Languages",
        data: [
          ["Turkish", 3927],
          ["Dutch", 3541],
          ["Danish", 3483],
          ["Slovakian", 3343],
          ["Romanian", 3161],
          ["Portugese", 2904],
          ["Welsh", 2677],
          ["Slovenian", 2347],
          ["Polish", 1921],
          ["Swedish", 1863],
          ["Finnish", 1794],
          ["Norwegian", 1605],
          ["Lithuanian", 1453],
          ["Czech", 1070],
          ["Bosnian", 615],
          ["Latvian", 525],
          ["Hungarian", 519]
        ]
      }
    ]
  }
});
