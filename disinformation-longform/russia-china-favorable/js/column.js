Highcharts.chart('hcContainer', {
  data: {
    googleSpreadsheetKey: "1uf6yWzyUSU_-oQ85lK3695iQbWL_YbcmWB00PnZvxlA",
    googleSpreadsheetWorksheet: 6
  },
  chart: {
      type: 'column',
      style: {
        fontFamily: 'Roboto'
    }
  },
  title: {
      text: 'Russia v. China: Favorable'
  },
  subtitle: {
    text: "Russia's scores are the average of polling conducted in that year in the United Kingdom and Germany. <br>China's scores are the average of polling conducted in that year in Australia and Japan.<br> Years where one country was missing data are ommitted. <br>Hover to see the overall percentage of favorable responses to Russia and China.",
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
      color: "#000",
      states: {
          inactive: {opacity: 1}
      }
    },
    { name: "China",
      color: "#ED392A",
      states: {
          inactive: {opacity: 1}
      }
    }
  ]
});