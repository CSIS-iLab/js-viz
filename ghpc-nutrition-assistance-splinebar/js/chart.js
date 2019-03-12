var allSeries = {},
  legend = {
    vitamin: "Children provided with vitamin A supplements",
    programs:
      "Children rached by nutrition programs or nutrition-specific-interventions",
    anemia: " of children have anemia",
    women: " of women with anemia"
  },
  report = {
    Bangladesh: " ",
    Uganda: " (2016)",
    Tanzania: " (2015–2016)",
    Senegal: " (2017)",
    Nepal: " (2016)",
    Mozambique: " (2011)",
    Malawi: " (2015–2016)",
    Mali: " (2012–2013)",
    Ghana: " (2014)",
    Ethiopia: " (2016)"
  },
  colorArray = ["#0a8672", "#0065a4", "#666"];

Highcharts.data({
  googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
  googleSpreadsheetWorksheet: 8,
  complete: function(data) {
    var countrySeries = data.series.find(function(series) {
      return series.name === "country";
    });

    countrySeries.data.forEach(function(country, index) {
      allSeries[country[1]] = allSeries[country[1]] || {};

      var fundingSeries = data.series.find(function(series) {
        return series.name === "funding";
      });

      ["anemia", "women"].forEach(function(metric) {
        var programsSeries = data.series.find(function(series) {
          return series.name === metric;
        });

        allSeries[country[1]][metric] = allSeries[country[1]][metric] || {};

        allSeries[country[1]][metric].series =
          allSeries[country[1]][metric].series || [];

        allSeries[country[1]][metric].series[0] =
          allSeries[country[1]][metric].series[0] || {};

        allSeries[country[1]][metric].series[0].name = "funding";

        allSeries[country[1]][metric].series[0].yAxis = 0;

        allSeries[country[1]][metric].series[0].data =
          allSeries[country[1]][metric].series[0].data || [];

        allSeries[country[1]][metric].series[0].data.push(
          fundingSeries.data[index]
        );

        allSeries[country[1]][metric] = allSeries[country[1]][metric] || {};

        allSeries[country[1]][metric].series[1] =
          allSeries[country[1]][metric].series[1] || {};

        allSeries[country[1]][metric].series[1].name = metric;

        allSeries[country[1]][metric].series[1].yAxis = 1;

        allSeries[country[1]][metric].series[1].data =
          allSeries[country[1]][metric].series[1].data || [];

        allSeries[country[1]][metric].series[1].data.push(
          programsSeries.data[index]
        );
      });

      var selectedSeries = ["vitamin", "programs", "interventions"].map(
        function(metric) {
          return (programsSeries = data.series.find(function(series) {
            return series.name === metric;
          }));
        }
      );

      allSeries[country[1]]["splinebar"] =
        allSeries[country[1]]["splinebar"] || {};

      allSeries[country[1]]["splinebar"].series =
        allSeries[country[1]]["splinebar"].series || [];

      allSeries[country[1]]["splinebar"].series[2] =
        allSeries[country[1]]["splinebar"].series[2] || {};

      allSeries[country[1]]["splinebar"].series[2].name = "funding";

      allSeries[country[1]]["splinebar"].series[2].yAxis = 0;

      allSeries[country[1]]["splinebar"].series[2].data =
        allSeries[country[1]]["splinebar"].series[2].data || [];

      allSeries[country[1]]["splinebar"].series[2].data.push(
        fundingSeries.data[index]
      );

      allSeries[country[1]]["splinebar"] =
        allSeries[country[1]]["splinebar"] || {};

      allSeries[country[1]]["splinebar"].series[0] =
        allSeries[country[1]]["splinebar"].series[0] || {};

      allSeries[country[1]]["splinebar"].series[0].name =
        selectedSeries[0].name;
      allSeries[country[1]]["splinebar"].series[0].type = "column";

      allSeries[country[1]]["splinebar"].series[0].yAxis = 1;

      allSeries[country[1]]["splinebar"].series[0].data =
        allSeries[country[1]]["splinebar"].series[0].data || [];

      allSeries[country[1]]["splinebar"].series[0].data.push(
        selectedSeries[0].data[index]
      );

      allSeries[country[1]]["splinebar"] =
        allSeries[country[1]]["splinebar"] || {};

      allSeries[country[1]]["splinebar"].series[1] =
        allSeries[country[1]]["splinebar"].series[1] || {};

      allSeries[country[1]]["splinebar"].series[1].name =
        selectedSeries[1].name;
      allSeries[country[1]]["splinebar"].series[1].type = "column";

      allSeries[country[1]]["splinebar"].series[1].yAxis = 1;

      allSeries[country[1]]["splinebar"].series[1].data =
        allSeries[country[1]]["splinebar"].series[1].data || [];

      selectedSeries[1].data[index]
        ? allSeries[country[1]]["splinebar"].series[1].data.push(
            selectedSeries[1].data[index]
          )
        : allSeries[country[1]]["splinebar"].series[1].data.push(
            selectedSeries[2].data[index]
          );
    });

    var container = document.querySelector("#container section");
    container.dataset.country = "Tanzania";

    makeSparkline(
      container.querySelector(".chart"),
      allSeries["Tanzania"]["splinebar"].series,
      3
    );

    var sections = Array.from(document.querySelectorAll("section"));

    sections.forEach(function(section, sectionIndex) {
      var country = section.dataset.country;
      section.querySelector("h2").innerText = country;

      var statistics = Array.from(
        section.querySelectorAll(".statistic figure")
      );

      statistics.forEach(function(figure, figureIndex) {
        var metric = figure.dataset.metric;

        var stat = allSeries[country][metric].series[1].data[1][1];

        if (stat) {
          figure.innerHTML +=
            '<h5><span class="stat">' +
            stat +
            "%</span><span>" +
            legend[metric] +
            report[country] +
            "</span><h5>";
        }
      });
    });
  }
});

function makeSparkline(figure, series, index) {
  Highcharts.chart(figure, {
    title: {
      text: ""
    },
    chart: {
      type: "spline",
      backgroundColor: null,
      borderWidth: 0,
      // margin: [0, 0, 0, 0],
      height: "40%",
      style: {
        overflow: "visible"
      },
      skipClone: true
    },
    colors: colorArray,
    xAxis: {
      tickInterval: 1,
      labels: {
        overflow: "allow",
        distance: 0,
        padding: 0,
        formatter: function() {
          return `${this.value.toString().replace("20", "'")}`;
        }
      }
    },
    yAxis: [
      {
        labels: {
          formatter: function() {
            var value = Math.round((this.value / 1000000) * 10) / 10;
            return `$${value}M`;
          },
          style: {
            color: colorArray[0]
          }
        },
        title: {
          text: "USD",
          style: {
            color: colorArray[0]
          }
        },
        reversedStacks: true
      },
      {
        title: {
          text: "Children < 5",
          style: {
            color: colorArray[index]
          }
        },
        labels: {
          formatter: function() {
            var value = Math.round((this.value / 1000000) * 10) / 10;
            return `${value}M`;
          },
          style: {
            color: colorArray[index]
          }
        },
        reversedStacks: true,
        opposite: true
      }
    ],
    series: series.map(function(s) {
      return { ...s, marker: { symbol: "circle" } };
    }),
    legend: {
      enabled: true
    },
    tooltip: {
      shared: true
    },
    credits: {
      text: ""
    }
  });
}
