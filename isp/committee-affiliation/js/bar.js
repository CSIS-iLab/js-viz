$(function() {
  Highcharts.chart("treemap", {
    colorAxis: {
      minColor: "#f0e6e8",
      maxColor: "#B4838B"
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS International Security Program | Source: NAME"
    },
    plotOptions: {
      treemap: {
        borderColor: "#ffffff",
        borderWidth: 3,
        dataLabels: {
          style: {
            color: "#white",
            textOutline: false,
            fontSize: ".8rem"
          }
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: [
          {
            name: "Foreign Affairs/ Relations",
            value: 16
          },
          {
            name: "Appropriations",
            value: 14
          },
          {
            name: "Budget",
            value: 10
          },
          {
            name: "Finance/ Ways and Means",
            value: 10
          },
          {
            name: "Intelligence ",
            value: 9
          },
          {
            name: "Armed Services",
            value: 8
          },
          {
            name:
              "Health, Education, Labor and Pensions/ Education and the Workforce",
            value: 8
          },
          {
            name: "Homeland Security/ Oversight and Government Reform",
            value: 8
          },
          {
            name: "Rules",
            value: 7
          },
          {
            name: "Banking/ Financial Services",
            value: 7
          },
          {
            name: "Energy and Natural Resources/ Energy and Commerce",
            value: 6
          },
          {
            name: "Judiciary",
            value: 6
          },
          {
            name: "Agriculture",
            value: 5
          }
        ].map(c => {
          return { ...c, colorValue: c.value };
        })
      }
    ],
    title: {
      text: "Committee Affiliation"
    }
  });
});
