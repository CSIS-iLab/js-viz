var inObject = [];

// ------------------currently using this variable and function because google sheets integration not working----------
var datas = [['Year',1992,1992,1992
,1992
,1993
,1995
,1995
,1995
,1995
,1995
,1996
,1996
,1996
,1996
,1997
,1997
,1997
,1997
,1997
,1998
,1998
,1998
,1998
,1998
,1999
,1999
,1999
,2000
,2000
,2001
,2001
,2001
,2002
,2002
,2002
,2002
,2003
,2004
,2004
,2004
,2004
,2005
,2005
,2005
,2005
,2005
,2006
,2006
,2007
,2007
,2008
,2008
,2008
,2008
,2008
,2009
,2009
,2009
,2010
,2010
,2011
,2011
,2011
,2012
,2012
,2013
,2014
,2014
,2014
,2014
,2014
,2015
,2015
,2015
,2015
,2015
,2015
,2016
,2016
,2017
,2017
,2017
,2018
,2018
,2018
,2018
,2018
,2019
,2020
,2020
,2020
,2020
,2020,2020], ['Deaths',3,65,1,3,7,9,19,13,63,29,12,39,1,22,3,2,0,6,400,4,5,604,2,11374,7,85,17,18,68,12,36,48,0,22,15,4,51,35,50,124,3037,88,17,125,52
,9
,4
,5
,45
,133
,25
,214
,153
,1
,1
,2
,7
,4
,8
,22
,58
,3
,0
,0
,72
,0
,3
,6
,5
,18
,6
,4
,1
,22
,34
,13
,4
,603
,23
,134
,1
,3059
,2
,3
,0
,74
,9
,84
,6
,81
,6
,175
,84
,9], ["Category",
3
,5
,4
,3
,4
,4
,4
,3
,4
,3
,3
,4
,3
,3
,5
,3
,5
,4
,4
,4
,3
,4
,3
,5
,4
,4
,4
,4
,4
,4
,4
,4
,5
,3
,4
,5
,5
,4
,4
,5
,3
,4
,5
,5
,5
,3
,3
,4
,5
,5
,4
,4
,4
,4
,4
,4
,4
,5
,4
,3
,3
,3
,3
,3
,3
,3
,4
,5
,3
,4
,4
,4
,4
,3
,4
,5
,4
,5
,3
,5
,4
,5
,4
,4
,4
,5
,5
,5
,4
,4
,4
,4
,4
,3], ['Amount of Damage (2021 dollars)',
0
,50300000000
,0
,9200000
,15000000000
,6400000
,5800000000
,4400000000
,8300000000
,2600000000
,580000000
,273600000
,1300000
,1100000000
,0
,16900000
,5400000
,169300000
,758000000
,0
,1600000000
,15600000000
,0
,10100000000
,24400000
,10600000
,12800000
,0
,503300000
,613300000
,383500000
,3700000000
,0
,1900000000
,1700000000
,152500000
,5300000000
,24300000000
,14500000000
,37500000000
,11400000000
,5500000000
,1400000000
,25700000000
,38100000000
,21500000
,273500000
,82000000
,2100000000
,943500000
,124300000
,47900000000
,10400000000
,100900000
,573500000
,58500000
,267100000
,18500000
,56100000
,4900000000
,17100000000
,245900000
,2700000
,18300000
,4200000000
,0
,0
,22900000
,32500000
,1400000000
,363800000
,153000
,57800000
,4100000
,229300000
,530500000
,0
,18600000000
,217600000
,85500000000
,3100000
,101500000000
,0
,54600000
,2900000
,27500000000
,892200000
,5400000000
,52500000
,20000000000
,3200000000
,8700000000
,1400000000
,4600000000], ["Storm Name",
"DARBY","ANDREW","VIRGIL","WINIFRED","LIDIA","FELIX","LUIS","MARILYN","OPAL","ROXANNE","BERTHA","HORTENSE","FAUSTO","LILI","GUILLERMO","ERIKA","LINDA","NORA","PAULINE","BLAS","BONNIE","GEORGES","LESTER","MITCH","BRET","FLOYD","LENNY","CARLOTTA","KEITH","JULIETTE","IRIS","MICHELLE","HERNAN","ISIDORE","LILI","KENNA","ISABEL","CHARLEY","FRANCES","IVAN","JEANNE","DENNIS","EMILY","RITA","WILMA","BETA","LANE","JOHN","DEAN","FELIX","NORBERT","IKE","GUSTAV","OMAR","PALOMA","BILL","JIMENA","RICK","EARL","KARL","IRENE","JOVA","RINA","PAUL","SANDY","RAYMOND","AMANDA","MARIE","NORBERT","ODILE","GONZALO","BLANCA","DOLORES","LINDA","JOAQUIN","PATRICIA","SANDRA","MATTHEW","OTTO","IRMA","JOSE","MARIA","BUD","ROSA","SERGIO","MICHAEL","WILLA","DORIAN","GENEVIEVE","LAURA","DELTA","ETA","IOTA","ZETA"],
["Source","https://en.wikipedia.org/wiki/Hurricane_Darby_(1992)","https://en.wikipedia.org/wiki/Hurricane_Andrew","https://en.wikipedia.org/wiki/Hurricane_Virgil_(1992)","https://en.wikipedia.org/wiki/Hurricane_Winifred_(1992)","https://en.wikipedia.org/wiki/Hurricane_Lidia_(1993)","https://en.wikipedia.org/wiki/Hurricane_Felix_(1995)","https://en.wikipedia.org/wiki/Hurricane_Luis","https://en.wikipedia.org/wiki/Hurricane_Marilyn","https://en.wikipedia.org/wiki/Hurricane_Opal","https://en.wikipedia.org/wiki/Hurricane_Roxanne","https://en.wikipedia.org/wiki/Hurricane_Bertha_(1996)","https://en.wikipedia.org/wiki/Hurricane_Hortense","https://en.wikipedia.org/wiki/Hurricane_Fausto_(1996)","https://en.wikipedia.org/wiki/Hurricane_Lili_(1996)","https://en.wikipedia.org/wiki/Hurricane_Guillermo_(1997)","https://en.wikipedia.org/wiki/Hurricane_Erika_(1997)","https://en.wikipedia.org/wiki/Hurricane_Linda_(1997)","https://en.wikipedia.org/wiki/Hurricane_Nora_(1997)","https://en.wikipedia.org/wiki/Hurricane_Pauline","https://en.wikipedia.org/wiki/1998_Pacific_hurricane_season","https://en.wikipedia.org/wiki/Hurricane_Bonnie_(1998)#Impact","https://en.wikipedia.org/wiki/Hurricane_Georges#Impact_on_the_Leeward_Islands","https://en.wikipedia.org/wiki/Hurricane_Lester_(1998)","https://en.wikipedia.org/wiki/Hurricane_Mitch","https://en.wikipedia.org/wiki/Hurricane_Bret","https://en.wikipedia.org/wiki/Hurricane_Floyd","https://en.wikipedia.org/wiki/Hurricane_Lenny","https://en.wikipedia.org/wiki/Hurricane_Carlotta_(2000)","","https://en.wikipedia.org/wiki/Hurricane_Juliette_(2001)","https://en.wikipedia.org/wiki/Hurricane_Iris","https://en.wikipedia.org/wiki/Hurricane_Michelle","https://en.wikipedia.org/wiki/Hurricane_Hernan_(2002)","https://en.wikipedia.org/wiki/Hurricane_Isidore","https://en.wikipedia.org/wiki/Hurricane_Lili","https://en.wikipedia.org/wiki/Hurricane_Kenna","https://en.wikipedia.org/wiki/Hurricane_Isabel","https://en.wikipedia.org/wiki/Hurricane_Charley#Impact","https://en.wikipedia.org/wiki/Hurricane_Frances","https://en.wikipedia.org/wiki/Hurricane_Ivan","","https://en.wikipedia.org/wiki/Hurricane_Dennis#Impact","https://en.wikipedia.org/wiki/Hurricane_Emily_(2005)","https://en.wikipedia.org/wiki/Hurricane_Rita","https://en.wikipedia.org/wiki/Hurricane_Wilma","https://en.wikipedia.org/wiki/Hurricane_Beta","https://en.wikipedia.org/wiki/Hurricane_Lane_(2006)","https://en.wikipedia.org/wiki/Hurricane_John_(2006)","https://en.wikipedia.org/wiki/Hurricane_Dean","","https://en.wikipedia.org/wiki/Hurricane_Norbert_(2008)#Impact","https://en.wikipedia.org/wiki/Hurricane_Ike#Impact","https://en.wikipedia.org/wiki/Hurricane_Gustav#Jamaica_and_Cayman_Islands","https://en.wikipedia.org/wiki/Hurricane_Omar#Impact","https://en.wikipedia.org/wiki/Hurricane_Paloma#Impact","https://en.wikipedia.org/wiki/Hurricane_Bill_(2009)#Impact","https://en.wikipedia.org/wiki/Hurricane_Jimena_(2009)","https://en.wikipedia.org/wiki/Hurricane_Rick_(2009)","https://en.wikipedia.org/wiki/Hurricane_Earl_(2010)#Impact","https://en.wikipedia.org/wiki/Hurricane_Karl#Impact","https://en.wikipedia.org/wiki/Hurricane_Irene","https://en.wikipedia.org/wiki/Hurricane_Jova_(2011)","https://en.wikipedia.org/wiki/Hurricane_Rina","https://en.wikipedia.org/wiki/Hurricane_Paul_(2012)","https://en.wikipedia.org/wiki/Hurricane_Sandy","https://en.wikipedia.org/wiki/Hurricane_Raymond_(2013)","https://en.wikipedia.org/wiki/Hurricane_Amanda","https://en.wikipedia.org/wiki/Hurricane_Marie_(2014)","https://en.wikipedia.org/wiki/Hurricane_Norbert_(2014)","https://en.wikipedia.org/wiki/Hurricane_Odile","https://en.wikipedia.org/wiki/Hurricane_Gonzalo","https://en.wikipedia.org/wiki/Hurricane_Blanca_(2015)","https://en.wikipedia.org/wiki/Hurricane_Dolores_(2015)","https://en.wikipedia.org/wiki/Hurricane_Linda_(2015)","https://en.wikipedia.org/wiki/Hurricane_Joaquin#Impact_and_aftermath","https://en.wikipedia.org/wiki/Hurricane_Patricia","https://en.wikipedia.org/wiki/Hurricane_Sandra_(2015)#Preparations_and_impact","https://en.wikipedia.org/wiki/Hurricane_Matthew","https://en.wikipedia.org/wiki/Hurricane_Otto#Impact","https://en.wikipedia.org/wiki/Hurricane_Irma","https://en.wikipedia.org/wiki/Hurricane_Jose_(2017)#Preparations_and_impact","https://en.wikipedia.org/wiki/Hurricane_Maria#Impact_in_the_Lesser_Antilles","https://en.wikipedia.org/wiki/Hurricane_Bud_(2018)","https://en.wikipedia.org/wiki/Hurricane_Rosa_(2018)","https://en.wikipedia.org/wiki/Hurricane_Sergio_(2018)","https://en.wikipedia.org/wiki/Hurricane_Michael#Impact","https://en.wikipedia.org/wiki/Hurricane_Willa","https://en.wikipedia.org/wiki/Hurricane_Dorian","https://en.wikipedia.org/wiki/Hurricane_Genevieve_(2020)","https://en.wikipedia.org/wiki/Hurricane_Laura","https://en.wikipedia.org/wiki/Hurricane_Delta#Preparations","","https://en.wikipedia.org/wiki/Hurricane_Iota#Impact","https://en.wikipedia.org/wiki/Hurricane_Zeta"]]
function getData(columns){
  console.log(columns);
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
      "Source": columns[5][j]
    });
  }
  console.log(inObject)
  renderChart(inObject)
}; 
// end edit

function percentage(inputNum) {
  var xMax = 50;
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

// ------------when google starts working again, we can switch to this-----------
// Highcharts.data({
//     // Load Data in from Google Sheets
//   // googleSpreadsheetKey: '1RA7238ksArtZZyta89GIo5uWyYBQZaVT19ZA_G_1lvQ',
//   // googleSpreadsheetWorksheet: 3,
//   csvURL: window.location.origin + '/data.csv', 
//   parsed: function (columns){
//     console.log(columns);
//     var counter = 1;
//     for(var j=1; j<columns[0].length; j++){
//       (columns[0][j] == columns[0][j-1]) ? counter++ : counter=1;
//       inObject.push({
//         "x": columns[0][j],
//         "y": counter,
//         "z": percentage(columns[1][j]),
//         "Deaths": columns[1][j],
//         "Category": columns[2][j],
//         "Damage": columns[3][j],
//         "Name": columns[4][j],
//         "Countries": columns[5][j],
//         "Source": columns[6][j]
//       });
//     }
//     console.log(inObject);
//     renderChart(inObject);
//   }
// });

Highcharts.setOptions({
    lang: {
        numericSymbols: [' K', ' M', ' B']
    }
});

getData(datas);

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
        maxSize: 50,
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
      // min: 0,
      max: 6.5,
      softThreshold: false,
      minPadding: .05,
      endOnTick: false,
      startOnTick: false,
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
            [0, '#9c9c9c'],
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
          maxSize: 50
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