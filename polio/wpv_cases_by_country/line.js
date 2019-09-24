Highcharts.chart('container', {

    chart: {
        plotBorderWidth: 1,
        type: 'line',
        zoomType: 'xy',
        style: {
            fontFamily: 'Montserrat, sans-serif'
        }
    },
    legend: {
        title: {
            text: '<span style="font-size: 13px; color: #000000; font-weight: bold">COUNTRIES</span>  <span style="font-size: 11px; color: #666; font-weight: normal">(Click to hide)</span>'
        },
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
    },
    title: {
        text: 'WPV Cases by Country'
    },

    subtitle: {
        text: 'Hover over a point to see the number of cases. Click countries in the legend below to turn on or off.'
    },


    yAxis: {
        title: {
            text: 'Number of Cases',
            min: 0,
            max: 350
        }
    },
    xAxis: {
        title: {
            text: 'Year'
        }
    },


    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2012,
            pointEnd: 2017
        }
    },

    series: [{
        name: 'Nigeria',
        data: [122, 53, 6, 0, 4, 0, 0],
        marker: {
            symbol: 'circle',
            radius: 2
        }
    }, {
        name: 'Pakistan',
        data: [58, 93, 306, 54, 20, 8, 0],
        marker: {
            symbol: 'circle',
            radius: 2
        }
    }, {
        name: 'Afghanistan',
        data: [37, 14, 28, 20, 13, 14, 3],
        marker: {
            symbol: 'circle',
            radius: 2
        }
    }],
    colors: ['#66c6cb', '#0065a4', '#788ca8'],
    // Credits
    credits: {
        enabled: true,
        href: false,
        text: "CSIS Global Health | Source: polioeradication.org"
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },

        }]
    }

});
