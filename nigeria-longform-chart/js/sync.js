$(function() {
    Highcharts.setOptions({
      lang: {
        thousandsSep: ','
      }
    });
  
    $('#container').bind('mousemove touchmove', function(e) {
      var chart,
        points = [],
        point,
        i,
        j;
  
      for (i = 0; i < Highcharts.charts.length; i++) {
        chart = Highcharts.charts[i];
        e = chart.pointer.normalize(e); 
  
        for (j = 0; j < chart.series.length; j++) {
          point = chart.series[j].searchPoint(e, true);
  
          if (point) {
            points.push(point);
          }
        }
  
        if (points.length) {
          for (j = 0; j < points.length; j++) {
            points[j].onMouseOver();
          }
          
          chart.tooltip.refresh(points);
          chart.xAxis[0].drawCrosshair(e, points[0]);
        }
      }
    });

    Highcharts.Pointer.prototype.reset = function() {};
  
    function syncExtremes(e) {
      var thisChart = this.chart;
  
      Highcharts.each(Highcharts.charts, function(chart) {
        if (chart !== thisChart) {
          if (chart.xAxis[0].setExtremes) { // It is null while updating
            chart.xAxis[0].setExtremes(e.min, e.max);
          }
        }
      });
    }
  
    var activity = {
        "xData": [2014, 2015, 2016, 2017, 2018, 2019],
        "datasets": [{
          "name": "Internally-displaced People (IDPs)<br>in Northeast Nigeria",
          "data": [389280, 2151978, 1770444, 1702680, 2026602, 2039092],
          "unit": "IDPs in NE Nigeria",
          "type": "line",
          "color": '#357DC0',
          "valueDecimals": 0
        }, {
          "name": "",
          "data": [],
          "unit": "",
          "type": "",
          "color": '',
          "valueDecimals": 0
        }, {
          "name": "UN Humanitarian Appeal<br>Funding Gap",
          "data": [17794549, 57989983, 267880318, 733410453, 715210134, 581092637],
          "unit": "Unmet UN Appeal Funding Requirements (US$)",
          "type": "area",
          "color": '#008000',
          "valueDecimals": 0
        }, {
          "name": "",
          "data": [93397393, 100263495, 484179598, 1054431494, 1047768587, 847703581],
          "unit": "Total Requirements (US$)",
          "type": "area",
          "valueDecimals": 0
        }]
      },
      lastChart;
  
    $.each(activity.datasets, function(i, dataset) {
  
      dataset.data = Highcharts.map(dataset.data, function(val, i) {
        return [activity.xData[i], val];
      });
  
      if (i % 2 == 0) { 
  
        $('<div class="chart">')
          .appendTo('#container')
          .highcharts({
            chart: {
              marginLeft: 60, 
              spacingTop: 20,
              spacingBottom: 20
            },
            title: {
              text: dataset.name,
              align: 'left',
              margin: 0,
              x: 30,
              y: 0
            },
            credits: {
             enabled: false
            },
            legend: {
              enabled: false
            },
            xAxis: {
              crosshair: true,
              events: {
                setExtremes: syncExtremes
              },
              tickInterval: 1
            },
            yAxis: {
              title: {
                text: null
              },
              labels:{
                formatter:function(){
      
                  if(this.value >= 1000000000){
                    return '$' + (this.value / 1000000000) + 'B';
                  }
                  else if(this.value >= 3000000) {
                    return '$' + (this.value / 1000000) + 'M';
                  }
                  else if(this.value >= 1000000) {
                      return (this.value / 1000000) + 'M';
                  }
                  else if(this.value >= 1000) {
                      return (this.value / 1000) + 'K';
                  }
                  else {
                      return this.value;
                  }
                }
              }
            },
            tooltip: {
              shared: true,
              positioner: function() {
                return {
                  x: this.chart.chartWidth - this.label.width, 
                  y: 20 
                };
              },
              borderWidth: 0,
              backgroundColor: 'none',
              pointFormat: '{point.y}<br>',
              headerFormat: '',
              shadow: false,
              style: {
                fontSize: '12px'
              },
              formatter: function () {
                var value = this.y,
                  shortValue = '',
                  suffix = '';
  
                if (this.points.length === 3) {
                  value = Math.abs(this.points[1].y - this.points[2].y);
                }
  
                if (value / 1000 >= 1 && value / 1000 < 1000) {
                  shortValue = (value / 1000).toFixed(2);
                  suffix = ' Thousand';
                } else if (value / 1000000 >= 1 && value / 1000000 < 1000) {
                  shortValue = (value / 1000000).toFixed(2);
                  suffix = ' Million';
                } else if (value / 1000000000 >= 1 ) {
                  shortValue = (value / 1000000000).toFixed(2);
                  suffix = ' Billion';
                }
                
                return dataset.unit + ': <b>' + (shortValue || value) + suffix + '</b>';
              }
            },
            plotOptions: {
              series: {
               stacking: 'normal',
               },				 
              area: {
                fillColor: '#ffffff00'
              }
           },
            series: [{
              data: dataset.data,
              name: dataset.name,
              type: dataset.type,
              color: dataset.color,
              fillColor: '#ebf2fa',
              fillOpacity: 0.3,
              xtooltip: {
                xvalueSuffix: ' ' + dataset.unit,
                pointFormat: dataset.unit + ': <b>{point.y}</b>'
              }
            }]
          });
      } else { 
        lastChart = Highcharts.charts[Highcharts.charts.length - 1];
        lastChart.addSeries({
          data: dataset.data,
          name: dataset.name,
          type: dataset.type,
          color: Highcharts.getOptions().colors[i],
          fillOpacity: 0.3,
          tooltip: {
            valuePrefix: dataset.unit + ': '
          }
        });
      }
    });
  });