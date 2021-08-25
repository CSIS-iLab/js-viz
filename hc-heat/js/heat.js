$(function() {
  var data = {};

  Highcharts.data({
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1yAEX-ptYcBwUokVACVgmrKc-NV0ngGa0dFDgy9T5qbU",
    googleSpreadsheetRange: "Sheet1",
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

          //for boolean data
          value
            ? data.data.push([x - 1, y - 1, x])
            : data.data.push([x - 1, y - 1, 0]);

          //normal heatmap
          // data.data.push([x - 1, y - 1, value]);
        });
      });

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
    Highcharts.chart("container", {
      chart: {
        type: "heatmap",
        marginTop: 80,
        marginBottom: 180,
        plotBorderWidth: 1,
        height: "75%"
      },

      title: {
        text: "Russian Interference in Europe",
        style: {
          fontFamily: "Georgia"
        }
      },

      subtitle: {
        text: "Rating the intensity of interventions",
        style: {
          fontFamily: "'Roboto', 'Arial', sans-serif"
        }
      },

      xAxis: {
        categories: data[2],
        labels: {
          style: {
            fontWeight: "bold",
            fontSize: 12,
            fontFamily: "'Roboto', 'Arial', sans-serif"
          }
        }
      },

      yAxis: {
        categories: data[0],
        title: null,
        labels: {
          style: {
            fontWeight: "bold",
            letterSpacing: 0.5,
            fontFamily: "'Roboto', 'Arial', sans-serif"
          }
        }
      },

      colorAxis: {
        min: 0,
        stops: [
          [0, "#ffffff"],
          [0.25, "#5ca8ff"],
          [0.5, "#0069e0"],
          [1, "#002e63"]
        ],
        labels: {
          step: 3,
          enabled: true,
          formatter: function() {
            return this.value === 0 ? "More Covert" : "More Overt";
          }
        }
      },

      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        symbolHeight: 20
      },

      credits: {
        enabled: true,
        href: false,
        text: "CSIS | Journalism Practicum in International Reporting"
      },
      tooltip: {
        enabled: false
      },

      series: [
        {
          name: "Russian Interference in Europe",
          borderWidth: 1,
          data: data[1],
          states: {
            hover: {
              brightness: 0
            }
          }
        }
      ]
    });
  }
});
