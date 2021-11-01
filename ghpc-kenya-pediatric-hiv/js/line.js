Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

Highcharts.chart('container', {

    title: {
        text: 'New Pediatric (Ages 0-14) HIV Infections in Kenya'
    },
    chart: {
        style: {
            fontFamily: "Source Sans Pro"
        }
    },
    data: {
        googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
        googleSpreadsheetKey: '1HA3hEmlb-rrp1_WsN5abxflDUbEhu_u4Zi1s3aaLaAg'
    },

    // subtitle: {
    //     text: '*"Pediatric" refers to children ages 0-14'
    // },

    yAxis: {
        title: {
            text: 'Number of New Pediatric Infections'
        }
    },

    credits: {
      text: 'CSIS Global Health Policy Center (GHPC) | Source: AIDSinfo, UNAIDS',
      href: false
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
            color: "#0065A4",
            label: false
        }
    },
    tooltip: {
        pointFormat: '<b>{point.y:,.0f} Infections</b><br/>',
        shared: true
    }

});