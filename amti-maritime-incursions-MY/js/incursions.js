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
      text: "CSIS/Asia Maritime Transparency Initiative (Data daripada Pengawal Pantai Jepun)"
    },
    title: {
      text: "Bilangan Kapal Kerajaan China di Zon Berdampingan/Lautan Wilayah Kepulauan Senkakus (2009-Kini)"
    },
    subtitle: {
      text: "Klik dan seret untuk mengezum masuk"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function () {
          if (this.name == 'Ships Entering Contiguous Zone') {
              return 'Kapal yang Memasuki Zon Berdampingan';
          }
          else if (this.name == 'Ships Entering Territorial Sea') {
              return 'Kapal yang Memasuki Lautan Wilayah';
          }
          else {
              return this.name;
          }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Bilangan kapal" },
      tickInterval: 20
    },
    xAxis: {
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'Ships Entering Contiguous Zone') {
                this.series.name = 'Kapal yang Memasuki Zon Berdampingan';
            }
            else if (this.series.name === 'Ships Entering Territorial Sea') {
                this.series.name = 'Kapal yang Memasuki Lautan Wilayah';
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
