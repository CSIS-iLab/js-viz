var inObject = [];

function percentage(inputNum) {
  var xMax = 500;
  var xMin = 5;
  var yMax = 11374;
  var yMin = 0;
  var percent = (inputNum - yMin) / (yMax - yMin);
  var outputX = percent * (xMax - xMin) + xMin;
  return outputX;
}

function numFormatter(num) {
  if(num < 1000000){
    console.log("thousand")
    return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000000){
    console.log("Billion")
    return (num/1000000000).toFixed(1) + 'B'; // convert to B for number from > 1 billion
  }else if(num > 1000000){
    console.log("Million")
    return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
  }else if(num < 900){
    return num; // if value < 1000, nothing to do
  }
}

Highcharts.data({
    // Load Data in from Google Sheets
  googleSpreadsheetKey: '1RA7238ksArtZZyta89GIo5uWyYBQZaVT19ZA_G_1lvQ',
  googleSpreadsheetWorksheet: 3,
  parsed: function (columns){
    var counter = 1;
    for(var j=1; j<columns[0].length; j++){
      (columns[0][j] == columns[0][j-1]) ? counter++ : counter=1;
      inObject.push({
        "x": columns[0][j],
        "y": counter,
        "z": percentage(columns[1][j]),
        "Deaths": columns[1][j],
        "Category": columns[2][j],
        "Damage": columns[3][j],
        "Name": columns[4][j],
        "Countries": columns[5][j],
        "Source": columns[6][j]
      });
    }
    console.log(inObject);
    renderChart(inObject);
  }
});

Highcharts.setOptions({
    lang: {
        numericSymbols: [' K', ' M', ' B']
    }
});

function renderChart(data) {
  Highcharts.chart("hcContainer", {
    // Chart Title and Subtitle
    title: {
      text: "Hurricanes 1992-Present"
    },
    subtitle: {
      text: "Size of Bubbles: Deaths<br>Color of Bubbles: Damage in USD"
    },
    chart: {
      height: 600
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Americas Project"
    },
    // Chart Legend
    legend: {
      title: {
        text: 'Damage in USD'
      },
      bubbleLegend: {
        enabled: true,
        minSize: 5,
        maxSize: 100,
        labels: {
          format: '{value:f} deaths'
        },
        ranges: [{
            value: 0
        }, {
          value: 500
        }, {
            value: 11374
        }]
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    yAxis: {
      min: 0,
      max: 6.5,
      tickInterval: 1,
      endOnTick: false,
      title: {
        text: "Number of Hurricanes Per Year"
      }
    },
    xAxis: {
      title: {
        text: "Year"
      }
    },
    colorAxis: {
      min: 0,
      max: 55000000000,
      stops: [
            [0, '#e9e9e9'],
            [0.00001, '#fcb045'],
            [0.4, '#fd1d1d'],
            [1, '#833ab4']
        ],
      title: {
        text: "Damage in USD"
      }
    },
    tooltip: {
        style: {
          pointerEvents: 'auto',
          fontFamily: "Roboto, Arial, sans-serif"
        },
        useHTML: true,
        formatter: function () {
            var index = this.point.index;
            var deaths = (data[index].Deaths >= 1) ? data[index].Deaths : 0;
            var damage = (data[index].Damage >= 1) ? `$${numFormatter(data[index].Damage)}` : "Minimal";
            return (
            `<div class="tooltip">
            <h4>Hurricane <a href="${data[index].Source}">${data[index].Name}</a></h4>
            <ul>
              <li>Category: ${data[index].Category}</li>
              <li>Deaths: ${deaths}</li>
              <li>Damage: ${damage}</li>
            </ul>
            </div>
            `
            );
        }
    },
    plotOptions: {
      bubble: {
          minSize: 5,
          maxSize: 100
      }
    },
    series: [
      {
        type: "bubble",
        colorKey: "Damage",
        nullColor: "#fff",
        data: data,
        name: "Number of Hurricanes"
      }
    ]
  })
}