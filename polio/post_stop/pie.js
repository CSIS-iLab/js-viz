// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'pie',
        style: {
            fontFamily: 'Montserrat, sans-serif'
        }
    },

    title: {
        text: 'Post-STOP Deployment Career Trajectories'
    },
    subtitle: {
        text: 'Click the slices to view additional breakdown if applicable.'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    "series": [
        {
            "name": "Post STOP Career",
            "colorByPoint": true,
            "data": [
                {
                    "name": "Job or consultancy with multilateral organizations, governments, or NGOs",
                    "y": 39,

                },
                {
                    "name": "Unknown",
                    "y": 23,

                },
                {
                    "name": "Returned to previous job",
                    "y": 38,
                    "drilldown": "Returned to previous job"
                }
            ]
        }
    ],
    "drilldown": {
        "series": [
            {
                "name": "Returned to previous job",
                "id": "Returned to previous job",
                "data": [
                	 [
                        "Other",
                        47
                    ],
                    [
                        "Promoted at previous job",
                        21
                    ],
                    [
                        "Given additional responsibilities at previous job",
                        32
                    ],

                ]
            }
                ]
            },
          plotOptions: {
        pie: {
            allowPointSelect: true,
            startAngle: 30,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: 0,
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
        colors: ['#788ca8', '#A0ADBF', '#004165'],
        // Credits
        credits: {
          enabled: true,
          href: "https://academic.oup.com/jid/article-pdf/216/suppl_1/S316/24265079/jix163.pdf",
          text: "CSIS Global Health | Source: Yinka et. al."
        },

});
