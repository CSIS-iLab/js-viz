Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

Highcharts.chart('container', {

    title: {
        text: 'New Pediatric HIV Infections in Kenya (Age 0-14)'
    },
    chart: {
        style: {
            fontFamily: "Source Sans Pro"
        }
    },
    data: {
        googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
        googleSpreadsheetKey: '1HA3hEmlb-rrp1_WsN5abxflDUbEhu_u4Zi1s3aaLaAg',
        parsed: function (columns) {
            console.log(columns)
        },
        error: console.error
    },

    subtitle: {
        text: 'Source: '
    },

    yAxis: {
        title: {
            text: 'Number of New Infections, Ages 0-14'
        }
    },

    credits: {
    //   enabled: true,
      text: 'CSIS Global Health Policy Center (GHPC) | Source: AIDSinfo, UNAIDS',
      href: false
    //   href: true
    },

    xAxis: {
        title: {
           text: "Year"
        },
        accessibility: {
            rangeDescription: 'Range: 1994 to 2020'
        }
    },

    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            color: "#0065A4"
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y:,.0f}</b><br/>',
        shared: true
    }

});