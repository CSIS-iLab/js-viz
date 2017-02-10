$(function() {
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1T98pKXiTxv7I3CNrR95lqR_lybe2NrS0ri601Mm20e4',
      googleSpreadsheetWorksheet: 1
    },
    chart: {
      zoomType: 'x',
      type: 'line',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS China Power Project | Source: United Nations IPI Peacekeeping Database"
    },
    title: {
      text: "Peacekeeping Contributions by Country"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    legend: {
      title: {
        text: 'Country<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic'
        }
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    colors: ['#ffd160', '#aa142d', '#ef9365', '#303d43', '#9864b6', '#5aa993', '#ed392a'],
    yAxis: {
      title: { text: "Personnel" },
    },
  plotOptions:
  {
    line: {
      marker: {
        enabled: false,
        symbol: "circle"
      }
    }
  }
});
});
