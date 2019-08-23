Highcharts.setOptions({
      colors: ['#003F5C'],
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1UiDIeBA-QJUAKFogEtYhNa95UGim--UjuuRq7pqkkqA'
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'spline'
    },
    // Chart Title and Subtitle
    title: {
      text: "In 2010, One Dollar Got You Eight Bolivars",
      align: "left"
    },
    subtitle: {
      text: "When former president Hugo Chávez declared an 'economic war' in June 2010, one U.S. Dollar was equivalent to about eight Bolivars. Between that time and the end of 2015, the exchange rate jumped by 10,438 percent, with poverty and shortages increasing around the country.",
      align: "left"
    },

    // Credits
    credits: {
      enabled: true,
      href: "https://journalism.csis.org",
      text: "CSIS Journalism Bootcamp | Source: DolarToday.com"
    },
    // Chart Legend
    legend: {
      enabled: false
      //title: {
      //  text: 'Equivalent to 1 USD'
      //},
      //align: 'center',
      //verticalAlign: 'bottom',
      //layout: 'horizontal'
    },
    tooltip: {
    pointFormat: '{series.name}: <b>{point.y}</b><br/>',
    valueSuffix: ' Bs',
    shared: true
},
    // X Axis
    //xAxis: {
    //plotBands: [{ // mark the weekend
    //    color: '#FF0000',
    //    from: Date.UTC(2019, 0, 2),
    //    to: Date.UTC(2019, 4, 30),
    //    label: {
    //      text: 'I am a label', // Content of the label.
    //      align: 'left', // Positioning of the label
    //      rotation: 90
    //  }
    //}],
    //type: 'datetime'
//},
    // Y Axis
    yAxis: {
      labels: {
      format: '{value:,f} Bs'
    },
      title: {
        text: "$1 USD in Venezuelan Bolivars (Bs)"
      }
    },

    // Additional Plot Options
    plotOptions: {
      //series: {
        //animation: {
          //duration: 5000
        //},
      //},
      line: {
        marker: {
          enabled: false,
        },
        lineWidth: 4
      }
    }
  })
