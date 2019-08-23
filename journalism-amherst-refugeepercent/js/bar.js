Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
        googleSpreadsheetKey: '1NYtxVWJrXj2P21BlYw2oGJUDQDhXo39HCnDZdG4C-Q0',
        googleSpreadsheetWorksheet: 1,
        startColumn: 0,
        endColumn: 2,
        seriesMapping: [{
            x: 0, // X values are pulled from column 0 by default
            y: 2, // Y values are pulled from column 1 by default
            z: 1 // Labels are pulled from column 1 and picked up in the dataLabels.format below
        }]
    },

    // General Chart Options
    chart: {
        type: 'column',
        height: 600,
        inverted: true
    },
    // Chart Title and Subtitle
    title: {
        text: "Caribbean Nations Less Prominent but Deeply Affected",
        align: 'left'
    },
    subtitle: {
        text: "Although most Venezuelan migrants end up in Colombia, they account for a larger share of the population in the small Caribbean nations of Curaçao and Aruba. This sudden influx has challenged the public resources available in those countries, with little outside aid and attention to compensate.",
        align: 'left'
    },
    // Credits
    credits: {
        enabled: true,
        href: 'http://popstats.unhcr.org/en/asylum_seekers',
        text: "CSIS Bootcamp in Journalism | Source: UNCHR"
    },
    tooltip: {
        pointFormat: '<strong>{point.z:,f}</strong> Venezuelan migrants account for <strong>{point.y}</strong> of the population<br/>',
        valueSuffix: '%',
        shared: true
    },
    // Chart Legend
    legend: {
        enabled: false
        //title: {
        //  text: 'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
        //},
        //align: 'center',
        //verticalAlign: 'bottom',
        //layout: 'vertical'
    },
    // X Axis
    xAxis: {
        labels: {
            padding: 75,
            rotation: -35
        }
    },
    // Y Axis
    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            text: "Percentage of the population Venezuelan migrants account for"
        },
    },
    // Additional Plot Options
    plotOptions:
        {
            series: {
                pointPadding: .5,
                groupPadding: .8
            },
            column: {
                stacking: null, // Normal bar graph
                // stacking: "normal", // Stacked bar graph
                borderWidth: 1,
                pointWidth: 15,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
            }
        }
})
