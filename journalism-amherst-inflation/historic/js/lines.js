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
      text: "Six Years of Gradual Inflation Preluded Venezuela’s Crisis"
    },
    subtitle: {
      text: "2010-2016: Although didn't seem much, the actual inflation rate in Venezuela between 2010 to 2016 had a significant effect to Venezuelans and the country's economy. Click and drag to zoom in on specific dates."
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
        text: "In Hundreds Bolivar"
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
