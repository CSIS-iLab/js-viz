Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM',
      googleSpreadsheetWorksheet: 5
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'column'
    },
    // Chart Title and Subtitle
    title: {
      text: "IFI Support by Country Income Group"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Economics Program | Source: IFI press releases"
    },
    // Colors
    colors: ["#4285F4", "#EA4335", "#FBBC04", "#34A853"],
    // Chart Legend
    legend: {
      title: {
        text: 'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Y Axis
    yAxis: {
      title: { 
        text: "USD Billions"
      },
    },
    // Additional Plot Options
    plotOptions:
    {
      column: {
        stacking: null, // Normal bar graph
        // stacking: "normal", // Stacked bar graph
        dataLabels: {
            enabled: false,
        }
      }
    }
  })
