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
        text: 'Trust and Interest Levels in the EU'
    },

    subtitle: {
        text: 'Trust in media correlated with trust in the European Union and political interest levels. Circle sizes correspond to polled interest levels in political life.'
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
        },


    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Trust in Media'
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
            '<tr><th>Trust in the European Union:</th><td>{point.x}</td></tr>' +
            '<tr><th>Trust in Media:</th><td>{point.y}</td></tr>' +
            '<tr><th>Political Interest:</th><td>{point.z}</td></tr>',
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
            { x: 51, y: 53, z: 80, name: 'Sweden', country: 'Sweden' },
            { x: 53, y: 73, z: 67, name: 'Finland', country: 'Finland' },
            { x: 53, y: 48, z: 73, name: 'Estonia', country: 'Estonia' },
            { x: 66, y: 47, z: 70, name: 'Lithuania', country: 'Lithuania' },
            { x: 56, y: 48, z: 56, name: 'Belgium', country: 'Belgium' },
            { x: 30, y: 20, z: 52, name: 'United Kingdom', country: 'United Kingdom' },
            { x: 34, y: 31, z: 48, name: 'France', country: 'France' },
            { x: 49, y: 51, z: 80, name: 'Germany', country: 'Germany' },
            { x: 46, y: 37, z: 61, name: 'Poland', country: 'Poland' },
            { x: 43, y: 48, z: 75, name: 'Austria', country: 'Austria' },
            { x: 44, y: 38, z: 78, name: 'Hungary', country: 'Hungary' },
            { x: 27, y: 22, z: 73, name: 'Greece', country: 'Greece' },
            { x: 36, y: 42, z: 61, name: 'Italy', country: 'Italy' },
            { x: 57, y: 67, z: 52, name: 'Portugal', country: 'Portugal' },
            { x: 42, y: 36, z: 50, name: 'Spain', country: 'Spain' },
        ]
    }]

});
