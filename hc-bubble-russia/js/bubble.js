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
        text: 'Managed Democracy vs. Western Democracy'
    },

    subtitle: {
        text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
    },

    credits: {
    text: 'CSIS Practicum in International Reporting',
    href: 'https://journalism.csis.org'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Freedom House Aggregate Score'
        },
        labels: {
            format: '{value}'
        },


    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Corruption Perception Index'
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
            '<tr><th>Freedom:</th><td>{point.x}</td></tr>' +
            '<tr><th>Corruption:</th><td>{point.y}</td></tr>' +
            '<tr><th>Military budget (USD millions):</th><td>{point.z}</td></tr>',
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
            { x: 86, y: 75, z: 609758, name: 'United States', country: 'United States' },
            { x: 20, y: 29, z: 66335, name: 'Russia', country: 'Russia' },
            { x: 62, y: 30, z: 3648, name: 'Ukraine', country: 'Ukraine' },
            { x: 64, y: 56, z: 333, name: 'Georgia', country: 'Georgia' },
            { x: 67, y: 46, z: 74.3, name: 'Montenegro', country: 'Montenegro' },
            { x: 73, y: 41, z: 731, name: 'Serbia', country: 'Serbia' },
            { x: 80, y: 43, z: 867, name: 'Bulgaria', country: 'Bulgaria' },
            { x: 72, y: 45, z: 1415, name: 'Hungary', country: 'Hungary' },
            { x: 87, y: 58, z: 514, name: 'Latvia', country: 'Latvia' },
            { x: 91, y: 59, z: 812, name: 'Lithuania', country: 'Lithuania' },
            { x: 94, y: 71, z: 536, name: 'Estonia', country: 'Estonia' },
            { x: 97, y: 88, z: 3795, name: 'Denmark', country: 'Denmark' },
            { x: 100, y: 85, z: 3597, name: 'Finland', country: 'Finland' },
            { x: 100, y: 84, z: 5560, name: 'Sweden', country: 'Sweden' },
            { x: 99, y: 82, z: 9562, name: 'Netherlands', country: 'Netherlands' },
            { x: 94, y: 82, z: 47193, name: 'United Kingdom', country: 'United Kingdom' },
            { x: 90, y: 70, z: 57770, name: 'France', country: 'France' },
            { x: 94, y: 81, z: 44329, name: 'Germany', country: 'Germany' },
            { x: 94, y: 57, z: 16227, name: 'Spain', country: 'Spain' },
            { x: 89, y: 50, z: 29236, name: 'Italy', country: 'Italy' },
            { x: 32, y: 40, z: 18190, name: 'Turkey', country: 'Turkey' },
            { x: 100, y: 85, z: 6568, name: 'Norway', country: 'Norway' },
            { x: 85, y: 48, z: 5094, name: 'Greece', country: 'Greece' },
            { x: 99, y: 82, z: 20567, name: 'Canada', country: 'Canada' },
            { x: 18, y: 30, z: 14548, name: 'Iran', country: 'Iran' },
            { x: 14, y: 41, z: 228231, name: 'China', country: 'Norway' },
        ]
    }]

});
