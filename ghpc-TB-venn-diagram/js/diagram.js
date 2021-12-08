let allData = {
    side1: [],
    side2: [],
    side3: [],
    middle1: [],
    middle2: [],
    middle3: [],
    center: []
}

let colors = ["#2E7FB3", "#71B9A9", "#F1C076", "#439B9C", "#BAB473", "#929575", "#9EA46B"];

Highcharts.data({
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: '1I594eG9WNqHCyhZ3sRtXcuJBqA3OlpF7gZ3NmwXxg9M',
    googleSpreadsheetRange: 'Sheet1',
    parsed: function(columns) {
        let countryList = [];
        columns.forEach(column => {
            for (x=1; x< column.length; x++) {
                if(!countryList.includes(column[x])) {
                    countryList.push(column[x]);
                }
            }
        });
        for(num in countryList){
            let x,y,z = 0;
            if (columns[0].includes(countryList[num])){
                x = 1;
            }
            if (columns[1].includes(countryList[num])) {
                y = 1;
            }
            if (columns[2].includes(countryList[num])) {
                z = 1;
            }
            if(x == 1 && y == 1 && z == 1){
                allData.center.push(countryList[num]);
                allData.middle1.push(countryList[num]);
                allData.middle2.push(countryList[num]);
                allData.middle3.push(countryList[num]);
                allData.side1.push(countryList[num]);
                allData.side2.push(countryList[num]);
                allData.side3.push(countryList[num]);
            } else if (x == 1 && y == 1 && z !== 1) {
                allData.middle1.push(countryList[num]);
                allData.side1.push(countryList[num]);
                allData.side2.push(countryList[num]);
            }
            else if(z ==1 && y == 1 && x !== 1){
                allData.middle2.push(countryList[num])
                allData.side2.push(countryList[num]);
                allData.side3.push(countryList[num]);
            }
            else if(x == 1 && z == 1 && y !== 1){
                allData.middle3.push(countryList[num]);
                allData.side1.push(countryList[num]);
                allData.side3.push(countryList[num]);
            }
            else if(x == 1 && y !== 1 && z !== 1){
                allData.side1.push(countryList[num]);
            }  
            else if(y == 1 && x !== 1 && z !== 1) {
                allData.side2.push(countryList[num]);
            }   
            else if(z == 1 && x !== 1 && y !== 1) {
                allData.side3.push(countryList[num]);
            }
        }
      allData.center.sort();
      allData.middle1.sort();
      allData.middle2.sort();
      allData.middle3.sort();
      allData.side1.sort();
      allData.side2.sort();
      allData.side3.sort();
    }
})

Highcharts.chart('container', {
    chart: {
        height: 600,
    },
    tooltip: {
        hideDelay: 500,
        useHTML: true,
        formatter: function () {
            var subname = this.point.subname;
            let string= '';
            for(num in allData[subname]){
                string += `<li>${allData[subname][num]}</li>`
            }
            return (
            `<div class="tooltip">
            <h4>${this.point.name}</h4>
            <ul>
              ${string}
            </ul>
            </div>
            `
            );
        }
    },
    series: [{
        type: 'venn',
        name: 'Intersection of High TB, MDR/RR-TB, and TB/HIV Burden Countries',
        data: [{
            sets: ["TB"],
            name: "Highest TB Burden Countries",
            subname: "side1",
            color: `${colors[0]}`,
            value: 2
        },{
            sets: ["TB/HIV"],
            name: "Highest TB/HIV Burden Countries",
            subname: "side2",
            color: `${colors[1]}`,
            value: 2
        },{
            sets: ["MDR/RR-TB"],
            name: "Highest MDR/RR-TB Burden Countries",
            subname: "side3",
            color: `${colors[2]}`,
            value: 2
        },{
            sets: ["TB", "TB/HIV"],
            name: "Highest TB and HIV/TB Burden Countries",
            subname: "middle1",
            color: `${colors[3]}`,
            value: 1
        }, {
            sets: ["TB/HIV", "MDR/RR-TB"],
            name: "Highest HIV/TB and MDR/RR-TB Burden Countries",
            subname: "middle2",
            color: `${colors[4]}`,
            value: 1
        }, {
            sets: ["TB", "MDR/RR-TB"],
            name: "Highest TB and MDR/RR-TB Burden Countries",
            subname: "middle3",
            color: `${colors[5]}`,
            value: 1
        },{
            sets: ["TB", "MDR/RR-TB","TB/HIV"],
            name: "10 Countries with TB, HIV/TB, and MDR/RR-TB Burden",
            subname: "center",
            color: `${colors[6]}`,
            value: 1
        }]
    }],
    title: {
        text: 'Intersection of High TB, MDR/RR-TB, and TB/HIV Burden Countries'
    },
    credits: {
      text: "CSIS Global Health Policy Center | Source: World Health Organization",
      href: 0
    }
});
