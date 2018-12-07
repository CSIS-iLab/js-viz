Highcharts.setOptions({
    colors: ['#000000', '#FFFFFF']
});


Highcharts.chart('container', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'How much do Europeans trust government and media?'
    },

    subtitle: {
        text: 'Size shows levels of trust in the media. Larger sizes indicate higher levels of trust.'
    },

    credits: {
    text: 'CSIS Practicum in International Reporting | Source: Eurobarometer, Spring 2018',
    href: 'https://journalism.csis.org'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Trust in National Government'
        },
        labels: {
            format: '{value}'
        },


    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Trust in the European Union'
        },
        labels: {
            format: '{value}'
        },
        maxPadding: 0.2,

    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
            '<tr><th>Trust in National Government:</th><td>{point.x}%</td></tr>' +
            '<tr><th>Trust in the EU:</th><td>{point.y}%</td></tr>' +
            '<tr><th>Trust in the Media:</th><td>{point.z}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                allowOverlap: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: [
            { x: 60, y: 51, z: 53, name: 'Sweden', country: 'Sweden' },
            { x: 47, y: 53, z: 73, name: 'Finland', country: 'Finland' },
            { x: 49, y: 53, z: 48, name: 'Estonia', country: 'Estonia' },
            { x: 28, y: 66, z: 47, name: 'Lithuania', country: 'Lithuania' },
            { x: 39, y: 56, z: 48, name: 'Belgium', country: 'Belgium' },
            { x: 31, y: 30, z: 20, name: 'UK', country: 'UK' },
            { x: 31, y: 34, z: 31, name: 'France', country: 'France' },
            { x: 54, y: 49, z: 51, name: 'Germany', country: 'Germany' },
            { x: 28, y: 46, z: 37, name: 'Poland', country: 'Poland' },
            { x: 51, y: 43, z: 48, name: 'Austria', country: 'Austria' },
            { x: 46, y: 44, z: 38, name: 'Hungary', country: 'Hungary' },
            { x: 12, y: 27, z: 22, name: 'Greece', country: 'Greece' },
            { x: 15, y: 36, z: 42, name: 'Italy', country: 'Italy' },
            { x: 55, y: 57, z: 67, name: 'Portugal', country: 'Portugal' },
            { x: 17, y: 42, z: 36, name: 'Spain', country: 'Spain' },
            { x: 34, y: 42, z: 40, name: 'EU28', country: 'EU28' },


        ]
    }]

});
