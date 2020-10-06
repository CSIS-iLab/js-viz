let optionSelect = [];

Highcharts.data({
  googleSpreadsheetKey: "1XbH8PkA4L8WlBoY-cLH4bLRO-a_L48YsHn9huKq2dHY",
  googleSpreadsheetWorksheet: 1,
  switchRowsAndColumns: true,
  parsed: function (columns) {
    let dataset = {};

    // columns.forEach((row, i)) {
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

    console.log(data);

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
  console.log(data);
  let maxCases = Math.max(...data.data.map((d) => d.y));
  let labelData = [];

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].unemployment_rate) {
      labelData.push({
        point: { x: i, y: maxCases, xAxis: 0, yAxis: 0 },
        text:
          Highcharts.numberFormat(
            data.data[i].unemployment_rate.toString(),
            2
          ) + "%",
      });
    }
  }

  // console.log(labelData);

  Highcharts.chart("hcContainer", {
    // General Chart Options
    chart: {
      type: "column",
      width: 800,
    },
    // Chart Title and Subtitle
    title: {
      text: "Covid-19 and Government Responses in Southeast Asia",
    },
    subtitle: {
      text:
        "Effectiveness of government policies on Covid-19 cases and the economy. Availability of economic data may vary by country. (Percentages indicate unemployment rate)",
    },
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
      title: {
        text: "New cases per day",
      },
    },
    // x Axis
    xAxis: {
      type: "category",
      tickInterval: 15,
      crosshair: true,
      plotBands: {
        color: "red", // Color value
        from: data.event.index,
        to: data.event.index,
        label: {
          text: "First Major Government Interaction: " + data.event.benchmark1, // Content of the label.
          align: "left", // Positioning of the label.
        },
      },
    },
    // Tooltip
    tooltip: {
      useHTML: true,
      formatter: function () {
        // console.log(this);
        return `<p class="date">Date: ${this.key}</p>
          New Cases: ${this.y}
          <ul>
          <li> ${this.point.options.benchmark1 || ""} </li>
          <li> ${this.point.options.benchmark2 || ""} </li>
          <li> ${this.point.options.benchmark3 || ""} </li>
          </ul>
          ${this.point.options.benchmark_text || ""}`;
      },
    },

    // Additional Plot Options
    plotOptions: {
      column: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
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
          backgroundColor: "rgba(255,255,255, 0)",
          verticalAlign: "top",
          borderColor: "rgba(255,255,255,0)",
        },
      },
    ],

    series: [data],
  });
}
