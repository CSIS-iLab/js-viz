// Create the chart
Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
        googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
        googleSpreadsheetWorksheet: 2
    },
    // General Chart Options
    chart: {
        type: 'pie',
        style: {
            fontFamily: 'Montserrat, sans-serif'
        }
    },
    // Chart Colors
    colors: ['#004165', '#e86259', '#EDA27C', "#0064a6", '#75baa9', '#4C8984'],

    // Chart Title and Subtitle
    title: {
        text: 'Historic Funding Breakdown - By Donor'
    },
    subtitle: {
        text: 'Click the slices to view additional breakdown.'
    },
    // Credits
    credits: {
        enabled: false,
        href: false,
        text: "CSIS Global Health | Source: Polio Global Eradication Initiative"
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    plotOptions: {
        pie: {
            allowPointSelect: true,
            startAngle: 30,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: 0,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },

});
