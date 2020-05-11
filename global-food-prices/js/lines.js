Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: '1T98pKXiTxv7I3CNrR95lqR_lybe2NrS0ri601Mm20e4',
    googleSpreadsheetWorksheet: 1
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'line'
  },
  // Chart Title and Subtitle
  title: {
    text: "Interactive Title"
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
  // Y Axis
  yAxis: {
    title: {
      text: "Y Axis Title"
    }
  },
  // Additional Plot Options
  plotOptions:
  {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 3
    }
  }
})