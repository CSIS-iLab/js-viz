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
        text: 'Media Freedom, Dem Index, Trust in EU'
    },

    subtitle: {
        text: 'Source: <a href="http://ec.europa.eu/commfrontoffice/publicopinion/index.cfm/Survey/getSurveyDetail/instruments/STANDARD/surveyKy/2180">Eurobarometer</a> Spring 2018'
    },

    credits: {
    text: 'CSIS Practicum in International Reporting',
    href: 'https://journalism.csis.org'
    },

    xAxis: {
        gridLineWidth: 1,
        reversed: true,
        title: {
            text: 'Reporters without Borders Media Freedom'
        },
        labels: {
            format: '{value}'
        },


    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Economist Democracy Index'
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
            '<tr><th>Reporters without Borders Media Freedom:</th><td>{point.x}</td></tr>' +
            '<tr><th>Economist Democracy Index:</th><td>{point.y}</td></tr>' +
            '<tr><th>Trust in EU:</th><td>{point.z}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: [
            { x: 8.3, y: 9.4, z: 51, name: 'Sweden', country: 'Sweden' },
            { x: 10.2, y: 9, z: 53, name: 'Finland', country: 'Finland' },
            { x: 14, y: 7.8, z: 53, name: 'Estonia', country: 'Estonia' },
            { x: 22, y: 7.4, z: 66, name: 'Lithuania', country: 'Lithuania' },
            { x: 13, y: 7.7, z: 56, name: 'Belgium', country: 'Belgium' },
            { x: 23, y: 8.5, z: 30, name: 'United Kingdom', country: 'United Kingdom' },
            { x: 21, y: 7.8, z: 34, name: 'France', country: 'France' },
            { x: 14, y: 8.6, z: 49, name: 'Germany', country: 'Germany' },
            { x: 26, y: 6.6, z: 46, name: 'Poland', country: 'Poland' },
            { x: 14, y: 8.4, z: 43, name: 'Austria', country: 'Austria' },
            { x: 29, y: 6.6, z: 44, name: 'Hungary', country: 'Hungary' },
            { x: 29, y: 7.3, z: 27, name: 'Greece', country: 'Greece' },
            { x: 24, y: 8, z: 36, name: 'Italy', country: 'Italy' },
            { x: 14, y: 7.8, z: 57, name: 'Portugal', country: 'Portugal' },
            { x: 20, y: 8.1, z: 42, name: 'Spain', country: 'Spain' },
        ]
    }]

});
