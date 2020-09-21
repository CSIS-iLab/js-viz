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
      type: 'bar'
    },
    // Chart Title and Subtitle
    title: {
      text: "2025 Global Nutrition Targets"
    },
    subtitle: {
      text: "In 2012 the World Health Assembly endorsed a Comprehensive implementation plan on maternal, infant, and young child nutrition, to be achieved by 2025. In 2020, most of the 194 countries tracked by the Global Nutrition Report have either not been assessed or are not on track to meet these targets."
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
        text: '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Colors
    colors: ["#004165", "#E86259", "#75BAA9", "#EDA27C", "#0064A6", "#4C8984"],
    yAxis: {
      title: {
        text: "",
      },
    },
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
