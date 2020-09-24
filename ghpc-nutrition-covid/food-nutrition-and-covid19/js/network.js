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
        "There is a dynamic relationship between food, nutrition, and Covid-19. Hover over each element to explore some of the ways in which the pandemic has impacted nutrition.",
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
            to: "Supply Chains",
            tip:
              "The pandemic’s disruption of supply chains, including suspended transportation routes or reductions in personnel available to manage warehouses, has limited the supply of nutritious food and raised the prices of what is available.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Labor and Food Markets",
            tip:
              "The supply of agricultural labor, including migratory or seasonal workers available to plant and harvest food, has been disrupted in many places due to travel restrictions, while stricter hygiene measures, social distancing requirements, and limited availability of some products have made it more difficult and expensive to access nutritious food in markets.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Income Loss",
            tip:
              "The economic impacts of the pandemic, including furloughs, layoffs, the closure of businesses, and disruptions to the informal economy, have made it more difficult for families to prioritize the purchase of nutritious food, even when it is available.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Regulatory Processes",
            tip:
              "Diminished regulatory oversight in some places has created greater potential for the sale of contaminated or adulterated products, as well as price gouging in unstable markets, making it more difficult for consumers to access safe and nutritious food for their families.",
          },
          {
            from: "Nutrition & COVID-19",
            to: "Misinformation",
            tip:
              "False claims about certain foods and Covid-19, particularly around ways to prevent infection or cure Covid-19 naturally, have inspired criminal activity selling these fake remedies.",
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
            id: "Supply Chains",
            color: "#E86259",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Labor and Food Markets",
            color: "#8e6c89",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Income Loss",
            color: "#EDA27C",
            marker: {
              radius: 80,
            },
          },
          {
            id: "Regulatory Processes",
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
