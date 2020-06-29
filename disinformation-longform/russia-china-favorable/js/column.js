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
      text: "Case Study Countries' Favorable Opinions on Russia and China",
      style: {
        fontSize: '24px'
    }   
  },
  subtitle: {
    text: "Russia's scores are the average of polling conducted in that year in the United Kingdom and Germany. <br>China's scores are the average of polling conducted in that year in Australia and Japan.<br> Years where one country was missing data are omitted. <br>Hover to see the overall percentage of favorable responses to Russia and China.",
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
    valueDecimals: 2,
    valueSuffix: "%"
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
      color: "#a43135",
      states: {
          inactive: {opacity: 1}
      }
    }
  ]
});