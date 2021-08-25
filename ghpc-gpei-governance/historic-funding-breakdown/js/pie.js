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
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetRange: "Historic Funding Breakdown - By Donor",
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
            var labelRank = row[3]

            // check if group name exists in root series
            if (group !== groupRow) {
                // update group
                group = groupRow
                var drilldownGroup = group
                if (donor == "null") {
                    // if group doesn't exist, create group (name, y, drilldown name)
                    drilldownGroup = null
                }
                // if group doesn't exist, create group (name, y, drilldown name)
                seriesObj.data.push({ "name": group, "y": amount, "drilldown": drilldownGroup, "labelrank": labelRank })
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
            return b.y - a.y
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
        },
        chart: {
            style: {
                fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
                fontSize: '16px'
            }
        }
    });
    Highcharts.chart('hcContainer', {
        // General Chart Options
        chart: {
            type: 'pie',
        },
        // Chart Colors
        colors: ['#0f3c68', '#25496f', '#3e5f7a', '#557786', '#6d9293', '#789e98', '#88b1a1', '#9ccaac'],
        // Chart Title and Subtitle
        title: {
            text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">GPEI Contributions by Donor 1985-2018</span>'
        },
        subtitle: {
            text: `<span style="font-size: 16px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">Hover over a slice to see that donor's contribution to the GPEI. Click to see a breakdown of donors who contributed between $10 and $100 million, or to see contributions under $10 million</span>`
        },
        // Credits
        credits: {
            enabled: true,
            href: false,
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
                position: { align: "left", y: 450 },
                relativeTo: "spacingBox"
            }
        },
        // Additional Plot Options
        plotOptions: {
            pie: {
                allowPointSelect: true,
                // startAngle: 30,
                // cursor: 'pointer',
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