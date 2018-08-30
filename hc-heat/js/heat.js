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
            ? data.data.push([x - 1, y - 1, x])
            : data.data.push([x - 1, y - 1, 0]);
        });
      });

      console.log(columns[0]);
      columns[0].forEach((type, i) => {
        if (i == 0) {
          return;
        }
        data.types = data.types || [];
        data.types.push(type);
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
        plotBorderWidth: 1,
        height: "110%"
      },

      title: {
        text: "Heat Map"
      },

      xAxis: {
        categories: data[2],
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
        stops: [
          [0, "#ffffff"],
          [0.25, "#ff0"],
          [0.5, "#FF8000"],
          [1, "#FF0040"]
        ]
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
