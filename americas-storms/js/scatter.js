var inObject = [];
var Deaths = [];
var Damage = [];
var hurricanesByYear = [];

function evaluateHurricanes(previous, next) {
  if (Array.isArray(previous)) {
    console.log("this is an array");
    previous.push(next);
  } else {
    console.log("this is not an array, should be changing", previous);
    previous = [previous, next]
    console.log("this should be the new item", previous);
  }
}

Highcharts.data({
    // Load Data in from Google Sheets
  googleSpreadsheetKey: '1RA7238ksArtZZyta89GIo5uWyYBQZaVT19ZA_G_1lvQ',
  googleSpreadsheetWorksheet: 3,
  parsed: function (columns){
    for(var j=1; j<columns[0].length; j++){
      inObject.push({
        "Year": columns[0][j],
        "Deaths": columns[1][j],
        "Category": columns[2][j],
        "Damage": columns[3][j],
        "Name": columns[4][j],
        "Countries": columns[5][j],
        "Source": columns[6][j]
      });
      var newHurricane = (inObject[inObject.length - 1]);
      var prev = hurricanesByYear[hurricanesByYear.length - 1];
      // hurricanesByYear.push([columns[0][j], newHurricane]);
      if(j == 1){
        hurricanesByYear.push([columns[0][j], inObject[inObject.length - 1]]);
        console.log(hurricanesByYear, "if");
      } else {
        if(prev[0] == columns[0][j]){
          // console.log(newHurricane);
          evaluateHurricanes(prev[1], newHurricane);
        } else {
          hurricanesByYear.push([columns[0][j], newHurricane]);
        }
        console.log(hurricanesByYear, "else");
      }
      // ––––– ignore this –––––
      // Deaths.push([columns[0][j], columns[1][j]]);
      // Damage.push([columns[0][j], columns[3][j]]);
    }
    data = Object.values(inObject);
    renderChart(hurricanesByYear, Damage, inObject);
  }
});

function renderChart(data1, data2, allData) {
  Highcharts.chart("hcContainer", {
    // Chart Title and Subtitle
    title: {
      text: "Hurricanes 1992-Present"
    },
    subtitle: {
      text: "Click and drag to zoom in"
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
        text: 'Legend<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to select data)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    tooltip: {
        stickOnContact: true,
        style: {
          pointerEvents: 'auto',
          fontFamily: "Roboto, Arial, sans-serif"
        },
        useHTML: true,
        formatter: function () {
            var index = this.point.index;
            return (
            `<div class="tooltip">
            <h4>Hurricane <a href="${allData[index].Source}">${allData[index].Name}</a></h4>
            <ul>
              <li>Category: ${allData[index].Category}</li>
              <li>Deaths: ${allData[index].Deaths}</li>
              <li>Damage: $${allData[index].Damage}</li>
            </ul>
            </div>
            `
            );
        }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        // dataLabels: {
        //   enabled: true
        // }
      },
      series: {
        events: {
          legendItemClick: function(event) {
            if (this.visible) {
                return false;
            }else{
                let series = this.chart.series,
                    i = series.length,
                    otherSeries;
                while(i--) {
                    otherSeries = series[i]
                    if (otherSeries != this && otherSeries.visible) {
                        otherSeries.hide();
                    }
                }
            }
          }
        }
      }
    },
    series: [
      {
        type: "scatter",
        data: data1,
        name: "Number of Hurricanes",
      },
      {
        type: "scatter",
        name: "Damage",
        data: data2,
        visible: false
      }
    ]
  })
}