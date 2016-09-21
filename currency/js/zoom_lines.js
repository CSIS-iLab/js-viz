$(function() {
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1kORKDt-Idfwe0snoi2seee90mTbMa_Rdb3P9jluumko',
    },
    chart: {
      zoomType: 'xy',
      type: 'line',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: "http://csis.org",
      text: "CSIS China Power Project | Source: OECD"
    },
    title: {
      text: "Exchange Rates with US Dollar"
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
    colors: ['#4D6E79', '#303D43', '#E2EA44', '#781F30', '#EC382A', '#61884D'],
    yAxis: {
      title: { text: "National currency per US dollar" },
      max: 80
    },
    xAxis: {
      minRange: 5,
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
