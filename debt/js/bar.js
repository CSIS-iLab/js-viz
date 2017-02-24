$(function() {
  Highcharts.setOptions({
    lang: { thousandsSep: ",",
    numericSymbols: ['K', ' M', 'B', 'T']}
  });
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '16jhd4_ym9tax91vw28yYdueY13N8qknCyGIgqf0eRj4',
      switchRowsAndColumns: true
    },
    chart: {
      type: 'column',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true,
      zoomType: 'x'
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS China Power Project | Source: IMF"
    },
    title: {
      text: "Foreign Reserves Held by Key Countries"
    },
    subtitle: {
        text: "Total Reserves Excluding Gold, US Dollars. Click and drag to zoom in."
    },
    tooltip: {
      valuePrefix: "$"
    },
    yAxis: {
      title: { 
        text: "Current $USD"
      }
    },
    colors: ['#ffd160', '#aa142d', '#ef9365', '#303d43', '#9864b6', '#5aa993', '#ed392a'],
    legend: {
      title: {
        text: 'Country<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic'
        }
      },
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemHoverStyle: {
        color: '#781F30'
      }
    },
    plotOptions: {
      area: {
        stacking: "normal",
        marker: { enabled: false, symbol: "circle" }
      }
    }
  });
});
