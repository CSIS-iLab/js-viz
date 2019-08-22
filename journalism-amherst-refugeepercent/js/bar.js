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
      text: "Percentage of Total Population"
    },
    subtitle: {
      text: "The relative size of refugee populations ... "
    },
    // Credits
    credits: {
      enabled: true,
      href: 'http://popstats.unhcr.org/en/asylum_seekers',
      text: "CSIS Bootcamp in Journalism | Source: UNCHR"
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
