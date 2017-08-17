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
      text: "CSIS/Asia Maritime Transparency Initiative (日本海上保安廳提供的資料)"
    },
    title: {
      text: "釣魚台鄰接區/領海內的中國政府船艦數量 (2009 年至 2017 年)"
    },
    subtitle: {
      text: "按一下並拖曳以放大"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function () {
          if (this.name == 'Ships Entering Contiguous Zone') {
              return '進入鄰接區的船艦';
          }
          else if (this.name == 'Ships Entering Territorial Sea') {
              return '進入領海的船艦';
          }
          else {
              return this.name;
          }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "船艦數量" },
      tickInterval: 20
    },
    xAxis: {
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'Ships Entering Contiguous Zone') {
                this.series.name = '進入鄰接區的船艦';
            }
            else if (this.series.name === 'Ships Entering Territorial Sea') {
                this.series.name = '進入領海的船艦';
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
