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
      zoomType: "x",
      type: "networkgraph",
    },
    // Chart Title and Subtitle
    title: {
      text: "Food Nutrition and COVID-19",
    },
    subtitle: {
      text: "Click and drag to zoom in",
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Project Name | Source: NAME",
    },
    // Y Axis
    yAxis: {
      title: {
        text: "Y Axis Title",
      },
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
              radius: 30
            }
          },
          {
            id: "Disrupted Supply Chains",
            color: "#E86259",
            marker: {
              radius: 30
            }
          },
          {
            id: "Interrupted Food Markets",
            color: "#75BAA9",
            marker: {
              radius: 30
            }
          },
          {
            id: "Loss of Income",
            color: "#EDA27C",
            marker: {
              radius: 30
            }
          },
          {
            id: "Poor Regulation",
            color: "#0064A6",
            marker: {
              radius: 30
            }
          },
          {
            id: "Misinformation",
            color: "#4C8984",
            marker: {
              radius: 30
            }
          },
        ],
      },
    ],
    // Tooltip
    tooltip: {
      formatter: function () {
        var text = "Name: " + this.point.name + "<br>";

        if (this.point.linksTo[0]) {
          text += "Description: " + this.point.linksTo[0].tip;
        }

        return text;
      },
    },
  });
});
