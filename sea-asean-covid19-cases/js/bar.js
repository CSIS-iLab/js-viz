let optionSelect = [];

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1XbH8PkA4L8WlBoY-cLH4bLRO-a_L48YsHn9huKq2dHY",
  googleSpreadsheetRange: "countries",
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};
    for (let i = 1; i < columns.length; i++) {
      const country = columns[i][0];
      const date = columns[i][1];
      const cases = columns[i][2];
      const employment = columns[i][3];
      const benchmark1 = columns[i][4];
      const benchmark2 = columns[i][5];
      const benchmark3 = columns[i][6];
      const text = columns[i][7];

      if (!dataset[country]) {
        dataset[country] = {
          name: country,
          data: [],
        };
      }

      dataset[country].data.push({
        name: date,
        y: cases,
        unemployment_rate: employment,
        benchmark_text: text,
        benchmark1: benchmark1,
        benchmark2: benchmark2,
        benchmark3: benchmark3,
        color: text ? "#94C9FF" : "#0065A6",
      });
    }

    const data = Object.values(dataset);

    // populating dropdown
    for (let value in data) {
      // populate event with first benchmark1 !== null
      let event = data[value].data.find((d) => d.benchmark1 !== null);
      // Add index key to event object to create plotband
      event["index"] = data[value].data.indexOf(event);
      data[value].event = event;
      optionSelect.push({
        name: data[value].name,
        data: data[value].data,
        event: data[value].event,
      });
    }
    populateSelect();
    renderChart(data[4]);
    return;
  },
});

function populateSelect() {
  const select = document.getElementById("optionSelect");
  optionSelect.forEach((option, i) => {
    const optionEl = document.createElement("option");
    if (i === 4) {
      optionEl.selected = " selected";
    }
    optionEl.value = i;
    optionEl.text = option.name;
    select.appendChild(optionEl);
  });

  // Destroy & redraw chart
  select.addEventListener("change", function () {
    let chart = Highcharts.chart("hcContainer", {});
    chart.destroy();
    renderChart(optionSelect[this.value]);
  });
}

function renderChart(data) {
  let labelData = [];

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].unemployment_rate) {
      labelData.push({
        point: { x: i, y: 0, xAxis: 0, yAxis: 0 },
        text:
          Highcharts.numberFormat(
            data.data[i].unemployment_rate.toString(),
            2
          ) + "%",
        align: "left",
      });
    }
  }

  Highcharts.chart("hcContainer", {
    // General Chart Options
    chart: {
      type: "column",
      zoomType: "x",
    },
    // Chart Title and Subtitle
    title: false,
    subtitle: false,
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Southeast Asia Program | Source: SEA",
    },
    // Chart Legend
    legend: {
      title: {
        text: '<br/><span style="font-size: 12px; font-weight: normal"></span>',
      },
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
    },
    // Y Axis
    yAxis: {
      tickPixelInterval: 100,
      title: {
        text: "New cases per day",
      },
    },
    // x Axis
    xAxis: {
      type: "category",
      tickInterval: 15,
      crosshair: true,
      labels: {
        rotation: -45,
      },
    },
    // Tooltip
    tooltip: {
      useHTML: true,
      formatter: function () {
        return `Date: ${this.key} <br>
          New Cases: ${this.y} <br>
          ${this.point.options.benchmark1 ? "Categories: " : ""}
          <ul>
          ${
            this.point.options.benchmark1
              ? `<li>${this.point.options.benchmark1} </li>`
              : ""
          }
          ${
            this.point.options.benchmark2
              ? `<li>${this.point.options.benchmark2} </li>`
              : ""
          }
          ${
            this.point.options.benchmark3
              ? `<li>${this.point.options.benchmark3} </li>`
              : ""
          }
          </ul>
          ${this.point.options.benchmark_text || ""}`;
      },
    },

    // Additional Plot Options
    plotOptions: {
      series: {
        minPointLength: 2,
      },
      column: {
        stacking: null, // Normal bar graph
        dataLabels: {
          enabled: false,
        },
        // Disable hide on click
        events: {
          legendItemClick: function (e) {
            e.preventDefault();
          },
        },
      },
    },
    annotations: [
      {
        labels: labelData,
        labelOptions: {
          verticalAlign: "top",
          shape: "connector",
          style: {
            fontSize: "0.8em",
            fill: "none",
            color: "#666",
            textOutline: "2px white",
          },
        },
      },
    ],

    series: [data],
  });
}
