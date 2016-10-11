$(function () {
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'PT Sans'
      }
    }
  });
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '1v169G9DsZtIantnJvXHKTGocrkhd_GXyzWygqZosNM0',
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
      href: "http://amti.csis.org",
      text: "CSIS/Asia Maritime Transparency Initiative"
    },
    title: {
      text: "Japan Coast Guard: Number of Chinese Vessels Spotted in the Contiguous Zone/Territorial Sea"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    legend: {
      title: {
        text: 'Type of Incursion<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        style: {
          fontStyle: 'italic'
        }
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Number of Incursions" },
      tickInterval: 20
    },
    xAxis: {
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
