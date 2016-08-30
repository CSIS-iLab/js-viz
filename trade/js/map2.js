$(function() {
  Highcharts.setOptions({
    lang: {
      thousandsSep: ",",
      numericSymbols: ['K', ' M', 'B', 'T']
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

      // Initiate the chart
      $('#container').highcharts('Map', {

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
        min: 2000,
        max: 590000000000
      	},

        tooltip: {
        	formatter: function () {
                    var value = (this.point.value == 0) ? 'Not currently available' : this.point.value;
                    return '<p><b>' + this.point.name + '</b></p><br />Total trade in $USD: ' + value;
                    // Highcharts.numberFormat(value,',')
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
