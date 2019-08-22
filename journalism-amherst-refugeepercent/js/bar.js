Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1NYtxVWJrXj2P21BlYw2oGJUDQDhXo39HCnDZdG4C-Q0',
      googleSpreadsheetWorksheet: 1
    },
    // General Chart Options
    chart: {
      type: 'column',
      height: 600,
      inverted: true
    },
    // Chart Title and Subtitle
    title: {
      text: "Curacao and Aruba Less Visible but Deeply Affected",
      align: 'left'
    },
    subtitle: {
      text: "Although most Venezuelan migrants end up in Colombia, they account for a larger share of the population in the small Caribbean nations of Curacao and Aruba. This sudden influx has challenged the public resources available in those countries, with little outside aid and attention to compensate.",
      align: 'left'
    },
    // Credits
    credits: {
      enabled: true,
      href: 'http://popstats.unhcr.org/en/asylum_seekers',
      text: "CSIS Bootcamp in Journalism | Source: UNCHR"
    },
    tooltip: {
    pointFormat: '{series.name} <strong>{point.y}</strong><br/>',
    valueSuffix: '% of the population',
    shared: true
},
    // Chart Legend
    legend: {
      enabled: false
      //title: {
      //  text: 'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      //},
      //align: 'center',
      //verticalAlign: 'bottom',
      //layout: 'vertical'
    },
    // X Axis
    xAxis: {
      labels: {
        padding: 75,
        rotation: -35
      }
    },
    // Y Axis
    yAxis: {
      labels: {
    format: '{value}%'
},
      title: {
        text: "By Percent"
      },
    },
    // Additional Plot Options
    plotOptions:
    {
      series: {
        pointPadding: .5,
        groupPadding: .8
      },
      column: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
        borderWidth: 1,
        pointWidth: 15,
        cursor: 'pointer',
        dataLabels: {
            enabled: false
        },
      }
    }
  })
