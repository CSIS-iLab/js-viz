Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    numericSymbols: null,
  },
  chart: {
    style: {
      fontFamily: "Roboto",
    },
  },
});

Highcharts.chart("hcContainer", {
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg",
    googleSpreadsheetWorksheet: 3,
    switchRowsAndColumns: true,
  },
  chart: {
    type: "column",
    marginBottom: 50,
  },
  annotations: [
    {
      labelOptions: {
        backgroundColor: "rgba(255,255,255, 0)",
        verticalAlign: "top",
        borderColor: "rgba(255,255,255,0)",
      },
      labels: [
        {
          point: {
            xAxis: 0,
            yAxis: 0,
            x: 2.5,
            y: 12000000,
          },
          style: {
            fontSize: "14px",
            color: "red",
          },
          text: "<b><em>Accelerated Transition Phase</em></b>",
        },
      ],
    },
  ],
  colors: [
    // HPV national
    "#b5dddf",

    // YF routine
    "#90cdd0",

    // Rota
    "#6bbcc0",

    // PCV
    "#47acb1",

    // Penta
    "#347d81",
  ],
  title: {
    text:
      "<span style='font-size: 32px;'>Timeline for Kenya's Transition from Gavi Support</span>",
    margin: 35,
  },
  subtitle: {
    text:
      "<span style='font-size: 16px;'>Hover over the bars to see how Gavi's support will break down across the different vaccines it co-finances, and how Kenya's co-financing obligations will increase as it moves into accelerated transition in 2022, with the goal of taking on full financial responsibility for its immunization program by 2027. Gavi allows for a “grace year” with lower obligations in the first year of accelerated transition before a country’s co-financing requirements increase more dramatically.</span>",
  },
  credits: {
    enabled: true,
    href: false,
    text:
      "CSIS Global Health Policy Center | Source: Gavi, the Vaccine Alliance",
  },
  xAxis: {
    plotBands: {
      to: 5,
      from: 1.5,
      color: "rgb(216,217,220,0.5)",
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "Kenya Co-Financing Projections<br> in Millions USD",
    },
    labels: {
      formatter: function () {
        return "$" + this.value / 1000000 + "M";
      },
    },
    stackLabels: {
      enabled: true,
      formatter: function () {
        return "Total: $" + (this.total / 1000000).toFixed(2) + "M";
      },
    },
  },
  legend: {
    align: "right",
    verticalAlign: "middle",
    layout: "vertical",
  },
  tooltip: {
    useHTML: true,
    shared: true,
    borderColor: "gray",
    headerFormat:
      '<span style="font-size: 12px">Gavi Funding Support Breakdown:<br>{point.key}</span><br>',
    valuePrefix: "$",
  },
  plotOptions: {
    column: {
      stacking: "normal",
      borderColor: "rgba(255,255,255,0)",
    },
    series: {
      events: {
        legendItemClick: function () {
          return false;
        },
      },
    },
  },
});
