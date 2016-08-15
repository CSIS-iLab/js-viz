$(function() {
  Highcharts.setOptions({
    lang: {
        decimalPoint: '.',
        thousandsSep: ','
    }
});
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1q_5wGoZFIpJGhdm7RB4xYddr5iewss2bx7Vhvp-MB0U',
    },
    chart: {
      type: 'area',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: "http://csis.org",
      text: "CSIS China Power Project | Source: UN World Tourism Organization (UNWTO)"
    },
    title: {
      text: "Tourists Visiting China"
    },
    subtitle: {
      text: "Tourists per year for top 10 countries, selected by mean value over the years (excluding Hong Kong, Macau, and Taiwan)"
    },
    legend: {
      title: {
        text: 'Country<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic'
        }
      },
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
      colors: ['#4D6E79', '#303D43', '#907561', '#781F30', '#EC382A', '#61884D', '#C9AC4D', '#52496D', '#5AA992', '#887295'],
    xAxis: {
      tickInterval: 1,
      tickmarkPlacement: 'on'
    },
    yAxis: {
      title: {
        text: "National currency per US dollar"
      },
    },
    plotOptions: {
                            area: {
                                stacking: "normal",
                                marker: { enabled: false, symbol: "circle" }
                            }
                        }
});
});
