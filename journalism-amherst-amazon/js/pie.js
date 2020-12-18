Highcharts.setOptions({
  colors: [
    "#253D1A",
    "#567D18",
    "#B19C29",
    "#ECB741",
    "#77AFBE",
    "#38809C",
    "#D8672B",
    "#B73027",
    "#6C2B44",
  ],
  lang: {
    thousandsSep: ",",
  },
});
Highcharts.chart("hcContainer", {
  credits: {
    text: "Terra-i: Land use Status and Trends",
    href: "https://www.terra-i.org/terra-i/publications.html",
  },
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Proportion of Amazon Contained per Country",
  },
  tooltip: {
    headerFormat: "<b>{point.key}</b><br>",
    pointFormat:
      "{series.name}: {point.percentage:.1f}% <br/> Total Area of Amazon Contained (square miles): {point.y:,.0f}",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",

      dataLabels: {
        style: {
          fontWeight: "normal",
        },
        enabled: true,
        format: "{point.name}: {point.percentage:.1f} %",
      },
    },
  },
  series: [
    {
      name: "Proportion",
      colorByPoint: true,
      data: [
        {
          name: "Brazil",
          y: 1340000,
          sliced: true,
          selected: true,
        },
        {
          name: "Peru",
          y: 295000,
        },
        {
          name: "Bolivia",
          y: 178877,
        },
        {
          name: "Colombia",
          y: 163524,
        },
        {
          name: "Venezuela",
          y: 141277,
        },
        {
          name: "Guyana",
          y: 71031,
        },
        {
          name: "Suriname",
          y: 56981,
        },
        {
          name: "French Guiana",
          y: 31205,
        },
        {
          name: "Ecuador",
          y: 22461,
        },
      ],
    },
  ],
});
