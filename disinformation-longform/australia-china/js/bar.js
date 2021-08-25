
Highcharts.chart("hcContainer", {
    data: {
        googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1uf6yWzyUSU_-oQ85lK3695iQbWL_YbcmWB00PnZvxlA",
        googleSpreadsheetWorksheet: 3
    },
    chart: {
        type: "bar",
        style: {
            fontFamily: 'Roboto'
        }
    },
    title: {
        text: "Australia: Opinions on China",
        style: {
            fontSize: '24px'
        }    
    },
    subtitle: {
        text: "Hover to see the percentage of favorable or unfavorable responses toward China.<br>Years where polling was not conducted are omitted.",
    },
    credits: {
        enabled: true,
        href: false,
        text: "CSIS | Source: PEW",
    },
    xAxis: [{
            reversed: true,
            tickInterval: 2
        },
        {
            // mirror axis on right side
            opposite: true,
            linkedTo: 0
        },
    ],
    yAxis: {
        title: null,
        min: -100,
        max: 100,
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
            
            return  '<span style="font-size: 14px;color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + result + '%</b><br/>'
        }
        
    },
    
    series: [
      {
        name: "Favorable",
        color: "#ED4031",
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