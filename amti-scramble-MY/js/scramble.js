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
      text: "CSIS/Asia Maritime Transparency Initiative (Data daripada Kementerian Pertahanan Jepun)"
    },
    title: {
      text: "Pengerahan Pesawat Pejuang Jepun mengikut Tahun dan Negara"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function() {
        if(this.name == "China") {
          return "Terhadap pesawat Cina";
        }
        else if(this.name == "Russia") {
          return "Terhadap pesawat Rusia";
        }
        else {
          return this.name;
        }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "Bilangan Pengerahan Pesawat Pejuang" },
    },
    xAxis: {
      title: {
        text: "Tahun"
      }
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'China') {
                this.series.name = 'Cina';
            }
            else if (this.series.name === 'Russia') {
                this.series.name = 'Rusia';
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
