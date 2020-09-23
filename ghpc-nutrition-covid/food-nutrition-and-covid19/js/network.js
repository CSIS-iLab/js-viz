Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: "16px",
    },
  },
});

$(function () {
  $(`#hcContainer`).highcharts({
    // General Chart Options
    chart: {
      type: "networkgraph",
      height: 700,
    },
    // Chart Title and Subtitle
    title: {
      text: "Nutrition and Covid-19",
      style: {
        fontWeight: 700,
      },
    },
    subtitle: {
      text:
        "There is a dynamic relationship between food, nutrition, and Covid-19. Hover over each element to explore how each pandemic disruption has impacted nutrition.",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Global Health Policy Center",
    },
    // Additional Plot Options
    plotOptions: {
      networkgraph: {
        keys: ["from", "to"],
      },
    },
    // Hard Coded Data
    series: [
      {
        dataLabels: {
          enabled: true,
          linkFormat: "",
          verticalAlign: "middle",
        },
        data: [
          {
            from: "Nutrition & COVID-19",
            to: "Disrupted Supply Chains",
            tip:
              "The pandemic’s disruption of supply chains has led to increased food insecurity and rising prices.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Interrupted Food Markets",
            tip:
              "Agricultural labor and markets have been disrupted due to travel restrictions and social distancing practices.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Loss of Income",
            tip:
              "The economic impacts of the pandemic, particularly job loss and disruption to the informal economy, have made purchasing food more difficult.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Poor Regulation",
            tip:
              "Lack of oversight has created greater potential for contamination or adulteration of street food, and price gouging in unstable markets.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Misinformation",
            tip:
              "False claims about certain foods and Covid-19, particularly about natural cures, have led to criminal activity selling these fake remedies.",
          },
        ],
        // Node Color and Size
        nodes: [
          {
            id: "Nutrition & COVID-19",
            color: "#004165",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Disrupted Supply Chains",
            color: "#E86259",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Interrupted Food Markets",
            color: "#8e6c89",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Loss of Income",
            color: "#EDA27C",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Poor Regulation",
            color: "#0064A6",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Misinformation",
            color: "#4C8984",
            marker: {
              radius: 80,
            },
          },
        ],
      },
    ],
    // Tooltip
    tooltip: {
      formatter: function () {
        if (this.key === "Nutrition & COVID-19") {
          return "Nutrition & COVID-19";
        } else {
          var text = "";

          if (this.point.linksTo[0]) {
            text += this.point.linksTo[0].tip;
          }

          return text;
        }
      },
    },
  });
});
