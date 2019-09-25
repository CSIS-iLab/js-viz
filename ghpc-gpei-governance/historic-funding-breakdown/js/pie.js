// main series array of one object
//      object has 
//D          name of series (contributions)
//D          colorByPoint F
//D          data which is an array of objects
//              name of donor group
//              y - total group contributions
//              drilldown (name of donor group again)




// drilldown is an object with 1 item - series
//      series is an array of objects
//          name (name of donor group from level1)
//          id (name of donor group from level1)
//          data which is an array of arrays
//              donor
//              y - donor contribution amount

// Set default values for series and drilldownseries
var seriesArray = []
var seriesObj = {
    name: "Contributions",
    colorByPoint: true,
    // array of objects
    data: []
}
var drilldownData = []

Highcharts.data({
    // Load Data in from Google Sheets
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetWorksheet: 2,
    switchRowsAndColumns: true,
    parsed: function parsed(columns) {
        // create default variables
        var seriesData = []
        var group = ""


        // iterate over data
        columns.forEach(function (row, i) {
            // skip first row
            if (i == 0) {
                return
            }
            var groupRow = row[0]
            var donor = row[1]
            var amount = row[2]

            // check if group name exists in root series
            if (group !== groupRow) {
                // update group
                group = groupRow
                // if group doesn't exist, create group (name, y, drilldown name)
                seriesObj.data.push({ "name": group, "y": amount, "drilldown": group })
                // if drilldown doesn't exist, push id name and data to drilldownData array
                drilldownData.push({
                    "id": group,
                    "name": group,
                    "data": [[donor, amount]]
                })
            } else {
                // if group exists, add value to y
                objIndex = seriesObj.data.findIndex((obj => obj.name == groupRow))
                seriesObj.data[objIndex].y += amount
                // if drilldown exists, push new array of donor and amount into data array
                drilldownData[objIndex].data.push([donor, amount])
            }
        })
        // sort series by value of y
        seriesObj.data.sort(function (a, b) {
            return a.y - b.y
        })
        // seriesObj.data.push(seriesData)
        seriesArray.push(seriesObj)

        renderChart(seriesArray, drilldownData)

    }
})

function renderChart(seriesArray, drilldownData) {

    // format numbers
    Highcharts.setOptions({
        lang: {
            thousandsSep: ",",
            drillUpText: "◁ Back to Main"
        }
    });
    Highcharts.chart('hcContainer', {
        // General Chart Options
        chart: {
            type: 'pie',
        },
        // Chart Colors
        colors: ["#0064a6", '#e86259', '#EDA27C', '#75baa9', '#4C8984', '#004165'],
        // Chart Title and Subtitle
        title: {
            text: "GPEI Contributions by Donor 1985-2018"
        },
        subtitle: {
            text: "Click a slice for funding breakdown by donor"
        },
        // Credits
        credits: {
            enabled: true,
            href: "http://polioeradication.org/financing/donors/historical-contributions/",
            text: "CSIS Global Health | Source: Polio Global Eradication Initiative"
        },
        tooltip: {
            valueDecimals: 2,
            valuePrefix: '$',
        },
        series: seriesArray,
        drilldown: {
            series: drilldownData,
            drillUpButton: {
                position: { align: "left", y: -5 },
                relativeTo: "spacingBox"
            }
        },
        // Additional Plot Options
        plotOptions: {
            pie: {
                allowPointSelect: true,
                startAngle: 30,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
                    padding: 0
                    // filter: {
                    //     property: 'percentage',
                    //     operator: '>',
                    //     value: 2
                    // }
                }
            },
        }
    })

}