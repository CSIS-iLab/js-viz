$(function () {
  Highcharts.setOptions({
    lang: { thousandsSep: ",",
    numericSymbols: ['K', ' M', 'B', 'T']
  }
});
Highcharts.data({

    googleSpreadsheetKey: '1HnRP1XCUtNM3BdLUyvWjiQd5HQDM5cGNpnshgVBMSro',

    // custom handler when the spreadsheet is parsed
    parsed: function (columns) {

        // Read the columns into the data array
        var data = [];
        $.each(columns[0], function (i, code) {
            data.push({
                code: code.toUpperCase(),
                value: parseFloat(columns[2][i]),
                name: columns[1][i]
            });
        });
    }
// Get data and display
$('#hcContainer').highcharts('Map', {

  chart: {
    backgroundColor: '#fff'
  },
  credits: {
    enabled: true,
    href: "http://csis.org",
    text: "CSIS China Power Project | Source: International Monetary Fund"
  },
  title: {
    text: ""
  },
  colorAxis: {
    type: 'logarithmic',
    maxColor: '#4E6D78',
    min: 6000,
    max: 590000000000
  },
  mapNavigation: {
    enabled: true,
    enableMouseWheelZoom:false,
    buttonOptions: {
      verticalAlign: 'bottom'
    }
  },
  series: [{
    animation: false,
    // data: dataObj.data,
    tooltip: {
      headerFormat: "<span style='font-size: 12px'>{point.key}</span><br/>",
      pointFormat:  "<b>${point.value:,.0f}</b><br/>"
    },
    mapData: Highcharts.maps["custom/world"],
    joinBy: [ 'iso-a3', 'iso-a3'],
    borderColor: 'rgb(61, 60, 61)',
    borderWidth: 0.2,

    states: {
      hover: {
        color: '#ED392A'
      }
    }
    }],
    motion: {
      enabled: true,
      // labels: dataObj.labels,
      series: 0,
      axisLabel: 'year',
      magnet: {
        round: 'floor', // ceil / floor / round
        step: 0.1
      }
    },
    exporting: {
      buttons: {
        contextButton: {
          enabled: false
        },
        printButton: {
          text: 'Export Map State',
          onclick: function () {
            this.print();
          }
        }
      }
    }
  });
});
