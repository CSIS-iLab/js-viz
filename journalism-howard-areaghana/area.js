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
        data: [65.28, 108.13, 131.23, 140.45, 120.07]
    }, {
        name: 'Appropriated agriculture funds',
        data: [14, 17, 17, 18.10, 18.13]
    }]
});
