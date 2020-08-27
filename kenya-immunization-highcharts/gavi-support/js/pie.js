var seriesArray = []
var seriesObj = {
    name: "Contributions",
    colorByPoint: true,
    data: []
}
var drilldownData = []

Highcharts.data({
    googleSpreadsheetKey: '10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg',
    googleSpreadsheetWorksheet: 1,
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
            marginBottom: 50,
            height: 600
        },
        colors: ['#f9b392', '#f69262', '#f26522', '#d54d0d', '#a43c0a', '#742a07', '#541e05'],
        title: {
            text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">Gavi Commitments to the Republic of Kenya</span><br><span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">2001-2023</span>',
            margin: 50
        },
        subtitle: {
            text: `<span style="font-size: 16px; color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">This interactive shows how Gavi's support for Kenya has broken down since 2001. Hover over each slice to see the value of each area of support, and click to drill down into a more detailed breakdown of the priorities and costs of each category. Activities labeled as "active" were still supported as of 2019.</span>`
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
            formatter: function() {
                result = Highcharts.numberFormat(this.y, 0);
                return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>$' + result + ' (' + Math.round(this.percentage) + '%)</b>'
            }
        },
        series: seriesArray,
        drilldown: {
            series: drilldownData,
            activeDataLabelStyle: {
                color: '#000',
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
                    padding: 0,
                    style: {
                        fontSize: '16px'
                    }
                }
            },
        }
    })
}