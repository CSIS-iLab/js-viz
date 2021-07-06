var datasets = [];
var seriesData = [];
var years = {};
var data = [];
var series = [];

Highcharts.data({
  googleSpreadsheetKey: "1UHLOir8XV9NrB2U_S1ESC3i_yOigU8W0JpX4cKV0qHQ",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};

    for (let i = 1; i < columns.length; i++) {
      const country = columns[i][1];
      const company = columns[i][2];
      const armsSale = columns[i][3];
      const year = columns[i][0];

      if (!dataset[year]) {
        dataset[year] = {
          name: year,
          countries: [],
        };
      }

      // If this pollutant within this city doesn't exist, create it
      dataset[year].countries[country] = dataset[year].countries[country] || {
        name: country,
        data: [],
      };

      dataset[year].countries[country].data.push({
        name: company,
        value: armsSale,
      });
    }

    // Create array of selection options
    series = Object.keys(dataset);
    // Create selection options objects
    for (let year in dataset) {
      datasets.push({
        year,
      });
    }

    // Convert object to array - we no longer need the keys
    let countries = Object.values(dataset);

    // Create array of countries objects for each year
    countries.forEach((year, i) => {
      seriesData.push(Object.values(year.countries));
    });

    populateSelect();
    renderChart(seriesData[0], datasets);
  },
});

function populateSelect() {
  const select = document.getElementById("datasets");
  datasets.reverse()
  datasets.forEach((option, i) => {
    const optionEl = document.createElement("option");
    if (i === 0) {
      optionEl.selected = " selected";
    }
    optionEl.value = i;
    optionEl.text = option.year;
    select.appendChild(optionEl);
  });

  select.addEventListener("change", function () {
    let chart = Highcharts.chart("container", {});
    chart.destroy();
    renderChart(seriesData[this.value], series);
  });
}

function renderChart(data) {
  Highcharts.chart("container", {
    // General Chart Options
    chart: {
      type: "packedbubble",
      height: 600,
      marginTop: 180,
      marginBottom: 160,
      spacingBottom: 60,
      backgroundColor: "transparent",
    },
    // Chart Title and Subtitle
    title: {
      text: "Title",
    },
    subtitle: {
      text: "subtitle",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      position: {
        y: -30,
      },
      text:
        "CSIS <br/>Source: bla bla bla",
    },
    // Chart Legend
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
    },
    // Colors
    colors: [
      "#3B75BB", // US
      "#69518D", // UK
      "#ED392A", // China
      "#F7890E", // Other
      "#F7D768", // France
      "#58A897", // Russia
    ],
    // Tooltip
    tooltip: {
      useHTML: true,
      headerFormat: `<span style="color:{series.color}">\u25CF </span>{series.name}<br/>`,
      parentNodeFormatter: function () {
        return (
          `Total value: <b>$` +
          Object.values(this.series.yData).reduce((a, b) => a + b, 0) /
          1000000000 +
          ` billion</b>`
        );
      },
      pointFormatter: function () {
        return `${this.name}: <b>$${(this.y / 1000000000).toFixed(1)} billion</b><br>`;
      },
    },
    // Additional Plot Options
    plotOptions: {
      packedbubble: {
        layoutAlgorithm: {
          gravitationalConstant: 0.02,
          splitSeries: true,
          seriesInteraction: false,
          // parentNodeLimit: true,
          parentNodeOptions: {
            friction: -0.981
          }
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
      series: {
        states: {
          inactive: {
            enabled: false
          },
          // hover: {
          // enabled: true,
          // }
        }
      }
    },
    series: data,
  });
}
