// Create the chart
Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    drillUpText: "◁ Back to Main",
  },
  chart: {
    style: {
      fontFamily: "'Source Sans Pro', sans-serif",
    },
  },
});

Highcharts.chart("container", {
  chart: {
    type: "pie",
  },
  colors: ["#edb21b", "#6dadd1", "#6B806F", "#064265", "#141B2B"],

  title: {
    text: "Refugees and Internally Displaced Persons",
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: UNHCR",
  },
  subtitle: {
    text: "Click Europe to see more.",
  },

  accessibility: {
    announceNewData: {
      enabled: true,
    },
    point: {
      valueSuffix: "%",
    },
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        format: "{point.name}: {point.y:,.0f}",
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    formatter: function () {
      result = Highcharts.numberFormat(this.y, 0);
      return (
        '<span style="color:' +
        this.color +
        '">\u25CF</span> ' +
        this.series.name +
        ": <b>" +
        result +
        " (" +
        Math.round(this.percentage) +
        "%)</b>"
      );
    },
  },

  series: [
    {
      name: "Total People",
      colorByPoint: true,
      data: [
        {
          name: "Europe",
          y: 5981358,
          drilldown: "Europe",
        },
        {
          name: "United States",
          y: 100000,
        },
        {
          name: "Canada",
          y: 91000,
        },
        {
          name: "IDPs",
          y: 7000000,
        },
      ],
    },
  ],
  drilldown: {
    series: [
      {
        name: "Refugees",
        id: "Europe",
        data: [
          ["Poland", 3251955],
          ["Romania", 889674],
          ["Hungary", 577820],
          ["Moldova", 458242],
          ["Slovakia", 406833],
        ],
      },
    ],
  },
});
