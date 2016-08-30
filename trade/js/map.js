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

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },

        motion: {
          enabled: true,
          axisLabel: 'year',
          labels: labels,
          series: 0, // The series which holds points to update
          updateInterval: 1,
          magnet: {
            round: 'floor', // ceil / floor / round
            step: 0.1
          }
        },

        colorAxis: {
          stops: [
            [0, '#1478E6'],
            [0.1, '#1884D5'],
            [0.2, '#1D90C4'],
            [0.3, '#219CB4'],
            [0.4, '#26A8A3'],
            [0.5, '#2AB592'],
            [0.6, '#2FC182'],
            [0.7, '#33CD71'],
            [0.8, '#38D960'],
            [0.9, '#3DE650']
          ],
          min: 2000,
          max: 590000000000
        },

        tooltip: {
          formatter: function () {
            if (this.point.value == 0) {
              return '<p><em>Data not currently available for this year.</em></p>'
            } else {
              return '<p><b>'+ this.point.name + ' | ' + this.series.label + '</b></p><br />$' + Highcharts.numberFormat(this.point.value,0,',',',') + '</p>';
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
    }
  });
});
