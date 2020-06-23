var categories

Highcharts.chart('hcContainer', {
    data: {
        googleSpreadsheetKey: "1uf6yWzyUSU_-oQ85lK3695iQbWL_YbcmWB00PnZvxlA",
        googleSpreadsheetWorksheet: 2
    },
    chart: {
        type: 'bar'
    },
    title: {
        text: "UK's Ratings of Russia"
    },
    subtitle: {
        text: 'Years where polling was not conducted are omitted.<br> Hover to see the percentage of favorable or unfavorable responses toward Russia.'
    },
    credits: {
        enabled: true,
        href: false,
        text: "CSIS | Source: PEW"
    },
    xAxis: [{
            categories: categories,
            reversed: true
        },
        {
            opposite: true,
            categories: categories,
            linkedTo: 0
        },
    ],
    yAxis: {
        title: "",
        max: 100,
        min: -100,
        labels: {
            formatter: function () {
                return Math.abs(this.value) + "%";
            },
        }
    },
    plotOptions: {
        series: {
            stacking: "normal",
        },
    },
    tooltip: {
        shared: false,
        borderColor: 'gray',
        headerFormat: '<span style="font-size: 14px">{point.key}</span><br/>',
        pointFormatter: function () {
            var result = this.y
                if (result < 0) {
                    result = result * -1
                } else if (result > 0) {
                    result 
                }
            
            return  '<span style="font-size: 14px;color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + result + ' %</b><br/>'
        }
        
    },
    
    series: [
      {
        name: "Favorable",
        color: "#ED392A",
        legendIndex: 2,
        states: {
            inactive: {opacity: 1}
        }
      },
      { name: "Unfavorable",
        color: "#7cb5ec",
        legendIndex: 1,
        states: {
            inactive: {opacity: 1}
        }
      }
    ]
});