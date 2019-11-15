Highcharts.setOptions({
    colors: ['#576071']
});
Highcharts.chart('container', {

    title: {
        text: 'Searches for "VPN" in Uganda, 2016 - Present'
    },

    subtitle: {
      text: 'Ugandans can use virtual private networks (VPNs) to access the internet without incurring a penalty from the social media tax. Interest in Google searches for VPNs rose dramatically when the social media tax was announced.'
    },


     credits: {
        text: 'Source: Google Trends'

    },



    yAxis: {
        title: {
            text: 'Number of Google Searches'
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
                text: 'Media tax came into effect',
                style: {
                    color: '#576071',
                    fontWeight: 'bold'
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
        name: 'Searches for "VPN"',
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
