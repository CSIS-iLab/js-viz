Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1R5A9iwIePPXDRwmGzzVg7Eut2_OMQ_U-fbU8A2n3dSw',
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'line',
      animation: {
    duration: 1000000000000
}
    },
    // Chart Title and Subtitle
    title: {
      text: "Inflation in Venezuela since 2016"
    },
    subtitle: {
      text: "Click and drag to zoom in"
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
      title: {
        text: "In Millions Bolivar"
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
