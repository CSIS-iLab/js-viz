Highcharts.setOptions({
    colors: ['#B53224', '#FFFFFF']
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
        text: 'How much do Europeans trust the EU Parliament and Media?'
    },

    subtitle: {
        text: 'The size of the circles correspond to levels of trust in the media. Larger sizes mean higher levels of trust.'
    },

    credits: {
    text: 'CSIS Practicum in International Reporting | Source: Eurobarometer, Spring 2018',
    href: 'https://journalism.csis.org'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Trust in the European Union'
        },
        labels: {
            format: '{value}'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Trust in European Parliament'
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
            '<tr><th>Trust in the EU:</th><td>{point.x}</td></tr>' +
            '<tr><th>Trust in EU Parliament:</th><td>{point.y}</td></tr>' +
            '<tr><th>Trust in Media:</th><td>{point.z}</td></tr>',
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
            { x: 51, y: 71, z: 53, name: 'Sweden', country: 'Sweden' },
            { x: 53, y: 63, z: 73, name: 'Finland', country: 'Finland' },
            { x: 53, y: 57, z: 48, name: 'Estonia', country: 'Estonia' },
            { x: 66, y: 67, z: 47, name: 'Lithuania', country: 'Lithuania' },
            { x: 56, y: 61, z: 48, name: 'Belgium', country: 'Belgium' },
            { x: 30, y: 35, z: 20, name: 'United Kingdom', country: 'United Kingdom' },
            { x: 34, y: 43, z: 31, name: 'France', country: 'France' },
            { x: 49, y: 50, z: 51, name: 'Germany', country: 'Germany' },
            { x: 46, y: 48, z: 37, name: 'Poland', country: 'Poland' },
            { x: 43, y: 50, z: 48, name: 'Austria', country: 'Austria' },
            { x: 44, y: 55, z: 38, name: 'Hungary', country: 'Hungary' },
            { x: 27, y: 39, z: 22, name: 'Greece', country: 'Greece' },
            { x: 36, y: 49, z: 42, name: 'Italy', country: 'Italy' },
            { x: 57, y: 59, z: 67, name: 'Portugal', country: 'Portugal' },
            { x: 42, y: 41, z: 36, name: 'Spain', country: 'Spain' },
            { x: 42, y: 50, z: 40, name: 'EU28', country: 'EU28' },

        ]
    }]

});
