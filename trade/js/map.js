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

  var googleSpreadsheetKey = '1HnRP1XCUtNM3BdLUyvWjiQd5HQDM5cGNpnshgVBMSro',
  data = [],
  labels = [];

  $.ajax({
    dataType: 'json',
    url: 'https://spreadsheets.google.com/feeds/cells/' +
    googleSpreadsheetKey + '/' + 'od6' +
    '/public/values?alt=json-in-script&callback=?',
    success: function(json) {
      var cells = json.feed.entry,
      cell,
      cellValue,
      cellCount = cells.length,
      colCount = 27,
      rowCount = 8,
      row,
      col,
      i,
      point,
      sequence;

      for (i = 2; i <= colCount; i++) {
        labels.push(+cells[i].content.$t)
      }

      for (i = colCount; i < cellCount; i++) {
        cell = cells[i],
        col = +cell.gs$cell.col;
        value = cell.content.$t;

        if (col === 1) {
          point = {};
          sequence = [];
          point.country = value;
        } else if (col === 2) {
          point['iso-a3'] = value;
        } else if (3 <= col && col <= colCount) {
          sequence.push(+value);
          if (col === colCount) {
            point.sequence = sequence;
            point.value = null;
            data.push(point);
          }
        }
      }
      data.push({
        'iso-a3': 'CHN',
        value: null,
        color: '#ED392A'
      });

      // Initiate the chart
      $('#container').highcharts('Map', {

        title: {
          text: 'Global Trade with China'
        },
        subtitle: {
          text: 'Total export/imports from 1990 - 2014'
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
              return '<p><em>Data not currently available for this year.</em></p>'
            } else {
              var label = labels[this.series.chart.motion.currentAxisValue];
              return '<p><b>'+ this.point.name + ' | ' + label + '</b></p><br />$' + Highcharts.numberFormat(this.point.value,0,',',',') + '</p>';
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
});
