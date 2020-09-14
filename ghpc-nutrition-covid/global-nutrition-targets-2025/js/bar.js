Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
      fontSize: '16px'
    },
  },
});
Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1YcIOXbY6seINOUcFqlvBDFsQ9iT7TUcmiHiY6u7dTSs',
      googleSpreadsheetWorksheet: 2
    },
    // General Chart Options
    chart: {
      zoomType: 'x',
      type: 'bar'
    },
    // Chart Title and Subtitle
    title: {
      text: "Progress on 2025 Global Nutrition Targets"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Project Name | Source: NAME"
    },
    // Chart Legend
    legend: {
      title: {
        text: 'Legend Title<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Colors
    colors: ["#004165", "#E86259", "#75BAA9", "#EDA27C", "#0064A6", "#4C8984"],
    // Tooltip
    tooltip: {
      useHTML: true,
      hideDelay: 1500,
      style: {
        pointerEvents: 'auto',
        // fontFamily: '"Open Sans", Arial, Helvetica, sans-serif'
      }
    },
    // Additional Plot Options
    plotOptions:
    {
      series: {
        // stacking: null, // Normal bar graph
        stacking: "normal", // Stacked bar graph
        dataLabels: {
            enabled: false,
        }
      }
    }
  })
