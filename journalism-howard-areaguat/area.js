Highcharts.setOptions({
    colors: ["#cf6c1d", "#a9bc52"]
});

Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    credits: {
      text: 'CSIS Bootcamp in International Journalism | Source: USAID'
    },
    xAxis: {
        categories: ['2014', '2015', '2016', '2017', '2018'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Millions'
        }
    },
    tooltip: {
        split: true,
        valuePrefix: '$',
        valueSuffix: ' million'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Department of State + USAID',
        data: [138.83, 137.45, 138.77, 135.67, 143.14]
    }, {
        name: 'Appropriated agriculture funds',
        data: [45, 45, 38, 30.08, 25.08]
    }]
});
