$(function() {
  var data = {};

  Highcharts.data({
    googleSpreadsheetKey: "1yAEX-ptYcBwUokVACVgmrKc-NV0ngGa0dFDgy9T5qbU",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: true,
    parsed: function(columns) {
      columns.forEach((country, y) => {
        if (y == 0) {
          return;
        }

        country.forEach((value, x) => {
          if (x == 0) {
            data.countries = data.countries || [];
            data.countries.push(value);
            return;
          }
          data.data = data.data || [];
          value
            ? data.data.push([x - 1, y - 1, Math.abs(13 - value)])
            : data.data.push([x - 1, y - 1, 0]);
        });
      });

      // Convert object to array - we no longer need the keys
      var dataArray = $.map(data, function(value, index) {
        return [value];
      });

      renderChart(dataArray);
    }
  });

  function renderChart(data) {
    console.log(data[1]);
    Highcharts.chart("container", {
      chart: {
        type: "heatmap",
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },

      title: {
        text: "Heat Map"
      },

      xAxis: {
        categories: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        labels: {
          enabled: false
        }
      },

      yAxis: {
        categories: data[0],
        title: null
      },

      colorAxis: {
        min: 0,
        minColor: "#FFFFFF",
        maxColor: Highcharts.getOptions().colors[5]
      },

      legend: {
        title: {
          text: ""
        },
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        symbolHeight: 10,
        y: 20
      },

      credits: {
        enabled: true,
        href: false,
        text: "CSIS | Source: "
      },
      tooltip: {
        formatter: function() {
          return (
            "<b>" +
            this.series.yAxis.categories[this.point.y] +
            "</b><br>" +
            this.series.xAxis.categories[this.point.x]
          );
        }
      },

      series: [
        {
          name: "Heatmap",
          borderWidth: 1,
          data: data[1]
        }
      ]
    });
  }
});
