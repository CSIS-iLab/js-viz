Highcharts.chart('hcContainer', {
  data: {
    googleSpreadsheetKey: "1uf6yWzyUSU_-oQ85lK3695iQbWL_YbcmWB00PnZvxlA",
    googleSpreadsheetWorksheet: 8
  },
  chart: {
      type: 'column'
  },
  title: {
      text: 'Russia v. China: Unfavorable'
  },
  subtitle: {
    text: "Hover to see the percentage of favorable or unfavorable responses.<br>Years where polling was not conducted are omitted.",
  },
  credits: {
    enabled: true,
    href: false,
    text: "CSIS | Source: PEW",
  } ,
  yAxis: {
    title: "",
    min: 0,
    max: 100,
    labels: {
        formatter: function () {
            return Math.abs(this.value) + "%";
        },
    }
  },
  plotOptions: {
      column: {
          stacking: ''
      },
    series: {
      centerInCategory: true
    }
  },
  tooltip: {
    shared: true,
    positioner: function(w, h, p) {
      return {
          x: p.plotX + this.chart.hoverSeries.xAxis.left - w/2,
          y: p.plotY
      }
    },
    borderColor: 'gray',
    headerFormat: '<span style="font-size: 14px">{point.key}</span><br/>',
    pointFormatter: function () {
        var result = this.y
            if (result < 0) {
                result = result * -1
            } else if (result > 0) {
                result 
            }
        
        return  '<span style="font-size: 14px;color:' + this.color + '">\u25CF</span> ' + this.series.name + ': <b>' + Highcharts.numberFormat(result,2) + ' %</b><br/>'
    }  
  },
  series: [
    {
      name: "Russia",
      color: "#8CB561",
      states: {
          inactive: {opacity: 1}
      }
    },
    { name: "China",
      color: "#83BADC",
      states: {
          inactive: {opacity: 1}
      }
    }
  ]
});