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
      googleSpreadsheetKey: '1cXgL3cVGCVeLXibYvaUQ1ypUjmnVkiDp34UmksuplV0',
    },
    chart: {
      type: 'column',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
      enabled: true,
      href: "http://amti.csis.org",
      text: "CSIS/Asia Maritime Transparency Initiative (日本防卫省数据)"
    },
    title: {
      text: "日本战斗机紧急升空次数（依年份和应对国家)"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function() {
        if(this.name == "China") {
          return "应对中国战机";
        }
        else if(this.name == "Russia") {
          return "应对俄罗斯战机";
        }
        else {
          return this.name;
        }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "日本战斗机紧急升空次数" },
    },
    xAxis: {
      title: {
        text: "年份"
      }
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'China') {
                this.series.name = '中国';
            }
            else if (this.series.name === 'Russia') {
                this.series.name = '俄国';
            }
            return this.x + '<br/>' + '<span style="color:' + this.series.color + '">●</span> ' + this.series.name + ': <b>' + this.y + '</b>';
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
