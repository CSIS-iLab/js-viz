Highcharts.chart('container', {

    title: {
        text: 'New Pediatric (Ages 0-14) HIV Infections in Kenya',
        style: {
            fontSize: '1.5rem'
        }
    },
    subtitle: {
        text: "Hover over the graph to see how the number of new pediatric HIV infections (ages 0-14) has fallen year to year from 1996 to 2020.",
        style: {
            fontSize: '.9rem'
        }
    },
    chart: {
        style: {
            fontFamily: "Source Sans Pro"
        }
    },
    data: {
        googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
        googleSpreadsheetKey: '1HA3hEmlb-rrp1_WsN5abxflDUbEhu_u4Zi1s3aaLaAg',
        googleSpreadsheetRange: "Sheet1"
    },

    yAxis: {
        title: {
            text: 'Number of New Pediatric HIV Infections',
            style: {
                fontSize: '1rem'
            }
        }
    },

    credits: {
      text: '<a href="https://www.csis.org/programs/global-health-policy-center">CSIS Global Health Policy Center (GHPC)</a> | Source: AIDSinfo, UNAIDS, 2020, <a href="https://aidsinfo.unaids.org/">https://aidsinfo.unaids.org/</a>',
      href: false
    },

    xAxis: {
        title: {
           text: "Year",
            style: {
                fontSize: '1rem'
            }
        },
        accessibility: {
            rangeDescription: 'Range: 1996 to 2020'
        }
    },

    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            color: "#C44E47",
            label: false
        }
    },
    tooltip: {
      style: {
        fontSize: '.875rem'
      },
      headerFormat: "",
      pointFormatter: function pointFormatter(e) {
        return (
          '<div><span style="font-size:18px;color:' +
          this.color +
          '">\u25CF </span><b>' +
          this.x +
          "</b><br/>" +
          this.y.toLocaleString() +
          " New HIV Infections" +
          "</div>"
        );
      }
    }

});