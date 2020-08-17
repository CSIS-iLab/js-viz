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
        var group = ""
        
        columns.shift()
        columns.forEach(function (row) {
            var groupRow = row[0]
            var donor = row[1]
            var amount = row[2]
            var labelRank = row[3]

            if (group !== groupRow) {
                group = groupRow
                seriesObj.data.push({ "name": group, "y": amount, "drilldown": group, "labelrank": labelRank })
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
            marginBottom: 50
        },
        colors: ['#c9b8c7', '#b39cb0', '#a588a1', '#8e6c89', '#5e475a', '#41313f', '#241b23'],
        title: {
            text: '<span style="font-size: 16px; color: #333333; max-width: 1280px; text-align: center">Gavi Commitments to the Republic of Kenya, 2001-2023</span>',
            margin: 50
        },
        subtitle: {
            text: `<span style="font-size: 14px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">This interactive shows how Gavi's support for Kenya has broken down since 2001. Hover over each slice click to drill down to a more detailed breakdown of support. Activities labeled as "active" were still supported as of 2019.</span>`
        },
        // Credits
        credits: {
            enabled: true,
            href: false,
            text: "CSIS Global Health Policy Center | Source: Gavi, the Vaccine Alliance"
        },
        tooltip: {
            valueDecimals: 0,
            valuePrefix: '$',
            headerFormat: '<span style="font-size: 12px"><br>{point.key}</span><br>',
        },
        series: seriesArray,
        drilldown: {
            series: drilldownData,
            activeDataLabelStyle: {
                color: '#000',
                textDecoration: "none"
            }
        },
        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                dataLabels: {
                    connectorShape: 'crookedLine',
                    crookDistance: '60%',
                    format: '{point.name}',
                    padding: 0
                }
            },
        }
    })
}