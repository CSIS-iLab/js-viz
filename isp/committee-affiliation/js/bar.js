$(function() {
  Highcharts.chart("treemap", {
    chart: {
      events: {
        load: function() {
          var label = this.renderer
            .label(
              "Committee Affiliation counts were tallied by adding up all committee affiliations of the 50 members studied. <br>Many members served on multiple committees and each committee affiliation was counted."
            )
            .css({
              fontSize: "12px"
            })
            .add();

          label.align(
            Highcharts.extend(label.getBBox(), {
              align: "center",
              verticalAlign: "bottom",
              y: -20 // offset
            }),
            null,
            "spacingBox"
          );
        }
      },
      marginBottom: 100
    },
    colorAxis: {
      minColor: "#f0e6e8",
      maxColor: "#B4838B"
    },
    credits: {
      enabled: true,
      href: false,
      text:
        "Committee Affiliation counts were tallied by adding up all committee affiliations of the 50 members studied. Many members served on multiple committees and each committee affiliation was counted | CSIS"
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
      text: "Committee Affiliation Among Members Studied"
    }
  });
});
