$(function() {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ",",
      numericSymbols: ['K', ' M', 'B', 'T']
    },
    chart: {
      height: 700,
      style: {
        fontFamily: 'Roboto'
      }
    }
  });

  // Load in JSON for Trade Map
  var data = [];
  var import_data = [];
  var export_data = [];
  var labels = [];
  function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
      'apiKey': 'AIzaSyBN_MpyKl22Q_5eJSA3uX5igz3GtKIji0c',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://sheets.googleapis.com/v4/spreadsheets/1HnRP1XCUtNM3BdLUyvWjiQd5HQDM5cGNpnshgVBMSro/values:batchGet?ranges=Sheet1!A:AC&ranges=Imports!A:AC&ranges=Exports!A:AC'
      })
    }).then(function(response) {
      // Loop through selected sheets
      $.each(response.result.valueRanges, function(rangeIndex, rangeResult) {
          // Get the name of the layer from the sheet name
          var layerName = rangeResult.range.substr(0, rangeResult.range.indexOf('!'));
          var colCount = rangeResult.values[0].length; // Get Column Count

          //Loop through the values of Sheet1
          if(layerName == "Sheet1") {
            $.each(rangeResult.values, function(index, value) {
              // Populate labels array by getting all values from index 0 and removing first two items
              if(index == 0) {
                labels = value.splice(2).map(Number);
              }
              else {
                // Get Sequence Information
                var sequence = [];
                for(i = 2; i <= (colCount - 1); i++) {
                  var pointValue = +value[i] || 0;
                  sequence.push(pointValue);
                }

                // Get Country's Information
                var country = {
                  "country": value[0],
                  "iso-a3": value[1],
                  "value": value[2],
                  "sequence": sequence
                }
                data.push(country);
              }
            });

            // Color China
            data.push({
              'iso-a3': 'CHN',
              value: null,
              color: '#ED392A'
            });
          }
          // Create Import & Export objects
          else {
            $.each(rangeResult.values, function(index, value) {
              if(index > 0) {
                // Get Sequence Information
                var sequence = [];
                for(i = 2; i <= (colCount - 1); i++) {
                  var pointValue = +value[i] || 0;
                  sequence.push(pointValue);
                }

                // Get Country's Information
                if(layerName == "Imports") {
                  import_data[value[1]] = {
                    "country": value[0],
                    "iso-a3": value[1],
                    "value": value[2],
                    "sequence": sequence
                  }
                }
                else if(layerName == "Exports") {
                  export_data[value[1]] = {
                    "country": value[0],
                    "iso-a3": value[1],
                    "value": value[2],
                    "sequence": sequence
                  }
                }
              }
            });
          }
        });
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    }).then(function() {
      // 4. Render Chart
      renderChart();
    });
  };
  // 1. Load the JavaScript client library.
  gapi.load('client', start);


  function renderChart() {
    // Initiate the chart
    $('#container').highcharts('Map', {
      title: {
        text: 'Global Trade with China'
      },
      subtitle: {
        text: 'Total export/imports from 1990 - '+labels[labels.length - 1]
      },
      credits: {
        text: 'CSIS/China Power Project',
        href: 'https://chinapower.csis.org'
      },

      motion: {
        enabled: true,
        axisLabel: 'year',
        labels: labels,
          series: 0, // The series which holds points to update
          magnet: {
            round: 'floor', // ceil / floor / round
            step: 0.1
          }
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            theme: {
              fill: 'white',
              'stroke-width': 1,
              stroke: 'silver',
              r: 0,
              states: {
                hover: {
                  fill: '#bada55'
                },
                select: {
                  stroke: '#039',
                  fill: '#bada55'
                }
              }
            },
            verticalAlign: 'bottom'
          }
        },

        legend: {
          title: {
            text: 'In 2014 $USD',
            style: {
              color: '#fff'
            },
          },
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          shadow: true,
          backgroundColor: '#303030',
          borderColor: '#ffffff',
          borderWidth: 2,
          borderRadius: 0
        },

        colorAxis: {
          stops: [
          [0, '#3847E0'],
          [0.1, '#7433DE'],
          [0.2, '#C42FDD'],
          [0.3, '#DB2AA0'],
          [0.4, '#DA2649'],
          [0.5, '#D85622'],
          [0.6, '#D7AA1E'],
          [0.7, '#A9D51A'],
          [0.8, '#4DD416'],
          [0.9, '#11D235']
          ],
          min: 0
        },

        tooltip: {
          formatter: function () {
            if (this.point.value == 0) {
              return '<p><em>Data not currently available for this year.</em></p>';
            } else {
              var label = labels[this.series.chart.motion.currentAxisValue];
              var importValue = import_data[this.point["iso-a3"]].sequence[this.series.chart.motion.currentAxisValue];
              var exportValue = export_data[this.point["iso-a3"]].sequence[this.series.chart.motion.currentAxisValue];
              return '<b>'+ this.point.name + ' | ' + label + '</b><br />$' + Highcharts.numberFormat(this.point.value,0,',',',') + '<br /><b>Imports:</b> ' + Highcharts.numberFormat(importValue,0,',',',') + '<br /><b>Exports:</b> '+exportValue;
            }
          }
        },

        series: [{
          data: data,
          mapData: Highcharts.maps['custom/world-palestine-highres'],
          joinBy: 'iso-a3',
          states: {
            hover: {
              color: '#BADA55'
            }
          },
          dataLabels: {
            enabled: false
          }
        }]
      });
    chart = $('#container').highcharts();
    chart.motion.reset();
  }

});
