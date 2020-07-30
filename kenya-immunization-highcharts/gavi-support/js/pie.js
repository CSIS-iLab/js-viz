var seriesArray = []
var seriesObj = {
    name: "Contributions",
    colorByPoint: true,
    data: []
}
var drilldownData = []

Highcharts.data({
    googleSpreadsheetKey: '10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg',
    googleSpreadsheetWorksheet: 3,
    switchRowsAndColumns: true,
    parsed: function parsed(columns) {
        var seriesData = []
        var group = ""
        columns.shift()
        columns.forEach(function (row) {
            var groupRow = row[2]
            var donor = row[0]
            var amount = row[1]

            if (group !== groupRow) {
                group = groupRow
                var drilldownGroup = group
                if (donor == "null") {
                    drilldownGroup = null
                }
                seriesObj.data.push({ "name": group, "y": amount, "drilldown": drilldownGroup, })
                drilldownData.push({
                    "id": group,
                    "name": group,
                    "data": [[donor, amount]]
                })
            } else {
                objIndex = seriesObj.data.findIndex((obj => obj.name == groupRow))
                seriesObj.data[objIndex].y += amount
                drilldownData[objIndex].data.push([donor, amount])
            }
        })
        seriesObj.data.sort(function (a, b) {
            return b.y - a.y
        })
        seriesArray.push(seriesObj)

        renderChart(seriesArray, drilldownData)
    }
})

function renderChart(seriesArray, drilldownData) {

    Highcharts.setOptions({
        lang: {
            thousandsSep: ",",
            drillUpText: "◁ Back to Main"
        },
        chart: {
            style: {
                fontFamily: 'Roboto',
                fontSize: '16px'
            }
        }
    });
    Highcharts.chart('hcContainer', {
        chart: {
            type: 'pie',
        },
        title: {
            text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">Gavi Commitments to the Republic of Kenya</span>'
        },
        subtitle: {
            text: `<span style="font-size: 16px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">This interactive shows how Gavi's support for Kenya has broken down since 2001. Hover over each slice and click to drill down to see a more detailed breakdown of support. Activities labeled as "active" were still supported as of 2019.</span>`
        },
        // Credits
        credits: {
            enabled: true,
            href: false,
            text: "CSIS Global Health Policy Center"
        },
        tooltip: {
            valueDecimals: 0,
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
        plotOptions: {
            pie: {
                allowPointSelect: true,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f}%',
                    padding: 0
                }
            },
        }
    })
}