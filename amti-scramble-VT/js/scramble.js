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
      text: "CSIS/Asia Maritime Transparency Initiative (Số liệu từ Bộ Quốc phòng Nhật Bản)"
    },
    title: {
      text: "Số lần triển khai máy bay chiến đấu của Nhật Bản theo năm và quốc gia"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function() {
        if(this.name == "China") {
          return "Với máy bay của Trung Quốc";
        }
        else if(this.name == "Russia") {
          return "Với máy bay của Nga";
        }
        else {
          return this.name;
        }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Số lần triển khai" },
    },
    xAxis: {
      title: {
        text: "Năm"
      }
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'China') {
                this.series.name = 'Trung Quốc';
            }
            else if (this.series.name === 'Russia') {
                this.series.name = 'nước Nga';
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
