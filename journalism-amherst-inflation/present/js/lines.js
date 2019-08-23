Highcharts.setOptions({
      colors: ['#003F5C'],
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1e5PeUnB8FzLQ3d7IUzaYqKixpbUX7lCWUexliBQhbOg',
      googleSpreadsheetWorksheet: 1
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'spline'
    },
    // Chart Title and Subtitle
    title: {
      text: "By 2019, One Dollar Gets You Over a Billion Bolivars",
      align: "left"
    },
    subtitle: {
      text: "By August 2019, one U.S. Dollar was equivalent to 1.3 billion Bolivars and the exchange rate, relative to the start of 2016, surged by 155 million percent. This has driven an estimated 30 million Venezuelans into poverty, according to the United Nations.",
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
      title: {
        text: 'Equivalent to 1 USD'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
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
        text: "In Venezuelan Bolivar"
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
