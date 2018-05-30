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
      text: "CSIS/Asia Maritime Transparency Initiative (日本海岸警衛隊提供的資料)"
    },
    title: {
      text: "進入釣魚臺鄰接區/領海的中國政府船艦數目 (2009 年迄今)"
    },
    subtitle: {
      text: "按住拖曳可放大"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function () {
          if (this.name == 'Ships Entering Contiguous Zone') {
              return '進入鄰接區的船';
          }
          else if (this.name == 'Ships Entering Territorial Sea') {
              return '進入領海的船';
          }
          else {
              return this.name;
          }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "船數" },
      tickInterval: 20
    },
    xAxis: {
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'Ships Entering Contiguous Zone') {
                this.series.name = '進入鄰接區的船';
            }
            else if (this.series.name === 'Ships Entering Territorial Sea') {
                this.series.name = '進入領海的船';
            }
            return Highcharts.dateFormat('%B %Y', new Date(this.x)) + '<br/>' + '<span style="color:' + this.series.color + '">●</span> ' + this.series.name + ': <b>' + this.y + '</b>';
        }
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
