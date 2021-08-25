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
  colorArray = [
    "#666",
    "#fff",
    "#0a8672",
    "#0065a4",
    "#eda27c",
    "#67bce2",
    "#B7FFD2",
    "#e86259"
  ];

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
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

      var metrics = ["vitamin", "programs", "interventions", "anemia", "women"];

      metrics.forEach(function(metric) {
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
    });

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

      var figures = Array.from(section.querySelectorAll(".chart"));

      figures.forEach(function(figure, figureIndex) {
        var metric = figure.dataset.metric;
        if (metric === "interventions") metric === "programs";

        var legendItem;

        if (["interventions"].indexOf(metric) < 0) {
          legendItem =
            "<h4 class=" + metric + "><span></span>" + legend[metric] + "</h4>";

          if (sectionIndex === 0) {
            document.querySelector(".legend-box").innerHTML += legendItem;

            document.querySelector(
              `.legend-box .${metric} span`
            ).style.backgroundColor =
              colorArray[figureIndex + 2];
          }
        }

        section.querySelector(".legend-line").innerHTML += legendItem;

        section.querySelector(
          `.legend-line .${metric} span`
        ).style.backgroundColor =
          colorArray[figureIndex + 2];

        var metricSeries = allSeries[country][metric];

        metricSeries.series[1].color = colorArray[figureIndex + 2];

        if (["interventions", "anemia", "women"].indexOf(metric) < 0) {
          makeSparkline(figure, metricSeries.series, figureIndex + 2);
        }
      });
      section.querySelector(".legend-line").innerHTML +=
        "<h4><span></span>Funding</h4>";
    });

    document.querySelector(".legend-box").innerHTML +=
      "<h4><span></span>Funding</h4>";
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
      height: 125,
      style: {
        overflow: "visible"
      },
      skipClone: true
    },
    colors: [colorArray[0], colorArray[index]],
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
      enabled: false
    },
    tooltip: {
      shared: true
    },
    credits: {
      text: ""
    }
  });
}
