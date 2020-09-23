Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: "16px",
    },
  },
});

Highcharts.data({
  googleSpreadsheetKey: "1YcIOXbY6seINOUcFqlvBDFsQ9iT7TUcmiHiY6u7dTSs",
  googleSpreadsheetWorksheet: 3,
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};

    for (let i = 1; i < columns.length; i++) {
      const country = columns[i][1];
      const ODA = columns[i][2];
      const region = columns[i][0];

      if (!dataset[region]) {
        dataset[region] = {
          name: region,
          data: [],
        };
      }

      dataset[region].data.push({ name: country, value: ODA });
    }

    const data = Object.values(dataset);
    renderChart(data);
    return;
  },
});

function renderChart(data) {
  Highcharts.chart("hcContainer", {
    // General Chart Options
    chart: {
      type: "packedbubble",
      height: 600,
    },
    // Chart Title and Subtitle
    title: {
      text: "Allocation of Global Nutrition Funding (2017)",
      style: {
        fontWeight: 700,
      },
    },
    subtitle: {
      text:
        "Official development assistance (ODA) for nutrition has plateaued in recent years. Hover over each bubble to see how this funding was dispersed globally in 2017.",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      position: {
        y: -15,
      },
      text:
        "CSIS GHPC<br/>Source: Global Nutrition Report by WHO/UNICEF/World Bank/IHME (2020)",
    },
    // Chart Legend
    legend: {
      title: {
        text:
          '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
      },
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
    },
    // Colors
    colors: ["#004165", "#E86259", "#75BAA9", "#EDA27C", "#0064A6", "#4C8984"],
    // Tooltip
    tooltip: {
      useHTML: true,
      // headerFormat: "",
      pointFormat: "<b>{point.name}:</b> ${point.value} Million ",
    },
    // Additional Plot Options
    plotOptions: {
      packedbubble: {
        minSize: "5",
        maxSize: "100",
        zMin: 0,
        zMax: 1000,
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
          splitSeries: true,
          seriesInteraction: false,
          parentNodeLimit: true,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          filter: {
            property: "y",
            operator: ">",
            value: 250,
          },
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
      },
    },
    series: data,
  });
}
