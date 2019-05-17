Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
    text: 'CSIS Bootcamp in International Journalism | Source: WFP',
    href: 'https://journalism.csis.org'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: ["#cf6c1d", "#a9bc52", "#a18a92"],
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: '',
        colorByPoint: true,
        data: [{
            name: 'Food Insecurity',
            y: 63.2,
            sliced: true,
            selected: true
        }, {
            name: 'Economic Insecurity',
            y: 24.5
        }, {
            name: 'Other',
            y: 12.3
        }]
    }]
});
