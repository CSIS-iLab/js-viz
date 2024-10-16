Highcharts.setOptions({
    colors: ['#576071']
});
Highcharts.chart('container', {

    title: {
        text: 'Searches for "VPN" in Uganda, 2016 - Present'
    },

     credits: {
        text: 'Source: Google Trends'

    },

    yAxis: {
        title: {
            text: 'Popularity'
        }
    },

    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
    },

    xAxis: {
        type: 'datetime',
                plotLines: [{
            color: '#c21414',
            width: 1,
            dashStyle: 'dot',
            value: Date.UTC(2018, 6, 1),
            label: {
                text: 'Media tax comes into effect',
                verticalAlign: 'middle',
                align: 'left',
                rotation: 0,
                style: {
                    color: '#576071'
                }
            }
        }]
    },

    plotOptions: {
        series: {
            pointStart: Date.UTC(2016, 0, 3),
            pointInterval: 24 * 3600 * 7000 // one day
        }
    },

    series: [{
        name: '"VPN" Popularity',
        data: [0,
0,
1,
1,
0,
0,
59,
12,
2,
1,
1,
1,
1,
1,
1,
1,
0,
1,
42,
2,
1,
1,
1,
1,
1,
1,
1,
0,
0,
1,
1,
0,
1,
1,
1,
1,
0,
1,
0,
1,
1,
1,
1,
0,
0,
1,
0,
0,
1,
1,
0,
1,
0,
0,
1,
1,
1,
0,
0,
0,
1,
0,
1,
0,
1,
1,
0,
1,
1,
0,
0,
0,
0,
0,
0,
0,
0,
1,
0,
0,
1,
0,
1,
0,
1,
0,
0,
0,
0,
2,
1,
0,
1,
0,
1,
0,
0,
0,
1,
0,
1,
0,
0,
0,
1,
0,
0,
1,
0,
1,
1,
1,
0,
0,
1,
0,
1,
1,
1,
0,
0,
0,
0,
1,
1,
1,
0,
1,
1,
23,
100,
28,
22,
15,
13,
11,
10,
12,
10,
9,
9,
8,
7,
8,
7,
6,
6,
7,
6,
6,
6,
6,
7,
7,
7,
6,
6,
7,
6,
6,
7,
6,
6,
5,
6,
4,
4,
4,
5,
5,
4,
6,
5,
6,
7,
6,
7,
5,
6,
5,
6,
5,
5,
5,
5,
4,
5,
4,
5,
5,
6,
4,
6,
5,
4,
5,
6,
5,
6,
5,
4,
4]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
