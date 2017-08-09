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
      type: 'column',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: "http://amti.csis.org",
      text: "CSIS/Asia Maritime Transparency Initiative (Data from Japan Coast Guard)"
    },
    title: {
      text: "Number of Chinese Government Vessels in Senkakus’ Contiguous Zone/Territorial Sea (2009-Present)"
    },
    subtitle: {
      text: "Click and drag to zoom in"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Number of Ships" },
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
