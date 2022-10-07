Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
  chart: {
    style: {
      fontFamily: "'Source Sans Pro', sans-serif",
    },
  },
});

Highcharts.chart("container", {
  title: {
    text: "Economic Assistance to Ukraine: 2014 - 2021",
  },
  colors: ["#edb21b", "#6dadd1", "#6B806F", "#064265", "#141B2B"],
  subtitle: {
    text: "In Millions of US Dollars",
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS",
  },
  legend: {
    title: {
      text: '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  xAxis: {
    tickInterval: 1,
  },
  yAxis: {
    title: {
      text: "Million USD",
    },
  },
  plotOptions: {
    line: {
      marker: {
        enabled: true,
        symbol: "circle",
      },
      lineWidth: 3,
    },
    series: {
      pointStart: 2014,
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
        ": <b>$" +
        result +
        "M</b>"
      );
    },
  },
  series: [
    {
      name: "United States",
      data: [307, 273, 518, 515, 569.5, 595.3, 679.1, 254.9],
    },
    {
      name: "European Union",
      data: [592.48, 745.57, 771.63, 709.13, 746.36, 810.11, 747.23, 227.46],
    },
    {
      name: "Canada",
      data: [37.24, 388.512, 62.244, 44.764, 43.852, 50.844, 46.436, 34.96],
    },
    {
      name: "United Kingdom",
      data: [9.3, 39.46, 68.57, 18.27, 33.13, 32.69, 38.59, 40],
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
});
