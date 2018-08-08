$(function() {
  var chart, newOffset;
  var data = [];

  Highcharts.data({
    googleSpreadsheetKey: "1fdRF457KDaedi5pTe852vJD1RCEfWJryhOfz8HAa4ww",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: false,
    parsed: function(columns) {
      columns[0].slice(1).forEach((column, i) => {
        nation = {};
        nation[column] = {};
        nation[column].offender = columns[1].slice(1)[i];
        nation[column].victim = columns[2].slice(1)[i];
        nation[column].incidents =
          nation[column].offender + nation[column].victim;
        data.push(nation);
      });

      data = data.sort((b, a) => {
        let nationA = Object.keys(a)[0];
        let nationB = Object.keys(b)[0];
        return a[nationA].incidents - b[nationB].incidents;
      });

      data.nations = columns[0].slice(1);
      data.offender = columns[1].slice(1);
      data.victim = columns[2].slice(1);
      data.max = Math.max(...data.victim.concat(data.offender));
      renderChart(data);
      offsetYAxis();
    }
  });

  window.addEventListener("resize", () => {
    offsetYAxis();
  });

  function offsetYAxis() {
    let containerWidth = document.getElementById("hcContainer").offsetWidth;
    let adjustedOffset = 0 - containerWidth / 2;
    chart.update({
      xAxis: {
        offset: adjustedOffset
      }
    });
  }

  function renderChart(data) {
    chart = Highcharts.chart("hcContainer", {
      chart: {
        margin: [100, 50, 100, 50],
        type: "bar"
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        y: 5
      },
      title: {
        text: "Significant Cyber Incidents"
      },
      subtitle: {
        text:
          "The above charts are based on publicly reported information describing acts of state-sponsored cyber espionage and cyber warfare, and do not include instances of cyber crime. Long-running campaigns were treated as single instances for the purposes of incident totals."
      },
      // Credits
      credits: {
        enabled: true,
        href: false,
        text: "CSIS Technology Policy | SOURCE"
      },
      tooltip: {
        crosshairs: true,
        borderColor: Highcharts.getOptions().colors[2],

        valueSuffix: " incidents"
      },
      plotOptions: {
        series: {
          // events: {
          //   legendItemClick: function() {
          //     return false;
          //   }
          // }
        }
      },
      xAxis: {
        title: {
          text: null
        },
        categories: data.nations,
        labels: {
          align: "center",
          style: {
            width: "100%",
            color: "black"
          }
        },
        lineWidth: 0,
        tickWidth: 0
      },
      yAxis: [
        {
          title: {
            text: null
          },
          max: data.max,
          width: "40%",
          reversed: true,
          opposite: false
        },
        {
          offset: 0,
          title: {
            text: null
          },
          max: data.max,
          left: "60%",
          width: "40%"
        },
        {
          title: {
            text: "Number of Incidents"
          }
        }
      ],
      series: [
        {
          name: "Offender",
          yAxis: 0,
          data: data.offender
        },
        {
          name: "Victim",
          yAxis: 1,
          data: data.victim
        }
      ]
    });
  }
});
