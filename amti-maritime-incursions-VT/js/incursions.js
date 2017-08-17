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
      text: "CSIS/Asia Maritime Transparency Initiative (Dữ liệu từ Cảnh sát biển Nhật Bản)"
    },
    title: {
      text: "Số tàu của Chính phủ Trung Quốc trong Vùng Tiếp Giáp/Lãnh Hải của Senkaku (2009-2017)"
    },
    subtitle: {
      text: "Nhấn vào và kéo để phóng to"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function () {
          if (this.name == 'Ships Entering Contiguous Zone') {
              return 'Tàu xâm nhập vào khu vực tiếp giáp ';
          }
          else if (this.name == 'Ships Entering Territorial Sea') {
              return 'Tàu xâm nhập vào lãnh hải';
          }
          else {
              return this.name;
          }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Số lượng tàu" },
      tickInterval: 20
    },
    xAxis: {
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'Ships Entering Contiguous Zone') {
                this.series.name = 'Tàu xâm nhập vào khu vực tiếp giáp';
            }
            else if (this.series.name === 'Ships Entering Territorial Sea') {
                this.series.name = 'Tàu xâm nhập vào lãnh hải';
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
