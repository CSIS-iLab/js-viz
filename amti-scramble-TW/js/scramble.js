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
      googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
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
      text: "CSIS/Asia Maritime Transparency Initiative (日本防衛省提供的資料)"
    },
    title: {
      text: "依年份及抵禦國家區分的日本戰鬥機緊急起飛次數"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal',
      labelFormatter: function() {
        if(this.name == "China") {
          return "抵禦中國戰機";
        }
        else if(this.name == "Russia") {
          return "抵禦俄羅斯戰機";
        }
        else {
          return this.name;
        }
      }
    },
    colors: ['#00b29e', '#023850'],
    yAxis: {
      title: { text: "緊急起飛次數" },
    },
    xAxis: {
      title: {
        text: "年份"
      }
    },
    tooltip: {
        formatter: function () {
            if (this.series.name === 'China') {
                this.series.name = '中國';
            }
            else if (this.series.name === 'Russia') {
                this.series.name = '俄國';
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
