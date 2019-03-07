getFundingData(1, "<5 vitamin A supplements");
getFundingData(2, "<5 nutrition programs");
getFundingData(3, "<5 nutrition-specific interventions");

function getFundingData(id, title) {
  var categories = [];
  Highcharts.data({
    googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
    googleSpreadsheetWorksheet: 4,
    switchRowsAndColumns: true,
    parsed: function(columns) {
      var data = {};

      columns.forEach(function(column, index) {
        column.forEach(function(c, i) {
          if (index === 0) {
            if (c !== "null") categories.push(c);
          } else {
            if (i === 0) {
              return;
            }
            data[categories[i - 1]] = data[categories[i - 1]] || [];
            data[categories[i - 1]].push(c);
          }
        });
      });

      var bubbleSeries = Object.keys(data).map(function(key, index) {
        var pointData = data[key].map(function(d, i) {
          return {
            x: 2014 + i,
            z: d,
            name: key
          };
        });

        return {
          data: pointData,
          type: "bubble",
          name: key,
          showInLegend: false
        };
      });

      makeLineChart(id, title, bubbleSeries);
    }
  });
}

function makeLineChart(i, title, bubbleSeries) {
  var tooltip = {
    enabled: true,
    xDateFormat: "%Y",
    headerFormat: "",
    pointFormatter: function() {
      var point = this;

      var bubbles = bubbleSeries.find(function(series) {
        return series.name == point.series.name;
      });
      var budget = bubbles.data[point.index].z / 1000000;
      var value = this.y / 1000000;

      return `<span style="color:${
        point.color
      }">\u25CF </span>    <span style=\"font-size: 13px;text-align:center;margin-bottom: 5px;font-weight: bold;font-family: 'Roboto', arial, sans-serif;\"> ${
        point.series.name
      }: ${point.x}</span><br>
          ${value.toFixed(1)} million children under 5<br>
          $${budget.toFixed(1)} million USD`;
    }
  };

  var events = {
    legendItemClick: function() {
      let match = this.chart.series.find(
        s => s.name === this.name && s.userOptions.type === "bubble"
      );
      match.visible ? match.hide() : match.show();
    }
  };

  Highcharts.chart(`hcContainer-${i}`, {
    data: {
      googleSpreadsheetKey: "1RXsxwg_tns3CICc1ZyYX3PEucq_RVMPDihn2y1Xs5jk",
      googleSpreadsheetWorksheet: i,
      complete: function(data) {
        bubbleSeries = bubbleSeries.map(function(series) {
          series.data = series.data.map(function(bubble, index) {
            var lineSeries = data.series.find(function(line) {
              return line.name === bubble.name;
            });

            return { ...bubble, y: lineSeries.data[index][1] };
          });
          return series;
        });
        data.series = data.series.map(function(series) {
          return { ...series, tooltip, events };
        });

        data.series = data.series.concat(bubbleSeries);
      }
    },
    chart: {
      zoomType: false,
      height: "40%"
    },
    title: {
      align: "left",
      x: 50,
      text: title
    },
    subtitle: {
      widthAdjust: -150,
      align: "left",
      x: 50,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    credits: {
      enabled: true,
      href: true,
      position: { y: -10 },
      text:
        'CSIS Global Health Policy Center | Source: <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">World Health Organization</a>'
    },
    xAxis: {
      tickInterval: 1,
      lineWidth: 0,
      gridLineWidth: 2
    },
    yAxis: {
      endOnTick: false,
      gridLineWidth: 0,
      title: {
        text: "Children under 5 (millions)"
      },
      labels: {
        formatter: function() {
          var value = this.value / 1000000;
          return this.value < 0 ? "" : `${value}`;
        }
      }
    },
    legend: {
      y: -15,
      verticalAlign: "bottom",
      layout: "horizontal",
      itemWidth: 200
    },
    tooltip: tooltip,
    plotOptions: {
      line: {
        marker: {
          enabled: true,
          symbol: "circle",
          radius: 3
        },
        lineWidth: 3
      },
      bubble: {
        sizeBy: "width",
        minSize: 2,
        maxSize: "30%"
      }
    }
  });
}
