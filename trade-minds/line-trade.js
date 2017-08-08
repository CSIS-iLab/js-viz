Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 3;
         ctx.setLineDash([5, 5]);
         ctx.strokeStyle = '#bbb';
         ctx.stroke();
         ctx.restore();
      }
   }
});





var ctx = document.getElementById("tv_line_01");

var labels = [];
for(var i=1970;i<2017;i++){
  labels.push(i);

}
var handsData = [38.0, 37.0, 37.0, 37.2, 36.5, 34.2, 34.2, 34.1, 34.0, 33.8, 32.7, 32.1, 30.6, 29.8, 29.9, 29.1, 28.2, 27.6, 27.2, 26.7, 26.0, 25.1, 24.5, 24.2, 23.9, 23.6, 23.3, 23.1, 22.9, 22.5, 22.2, 21.5, 20.7, 20.1, 19.9, 19.8, 19.7, 19.2, 18.6, 17.1, 16.5, 16.4, 16.4, 16.4, 16.4, 16.4, 16.2]
var mindsData = [26.4, 26.9, 26.9, 26.8, 27.3, 28.3, 28.4, 28.5, 28.6, 28.8, 29.7, 30.2, 31.1, 31.5, 31.4, 31.9, 32.5, 33.0, 33.3, 33.7, 34.2, 35.1, 35.7, 36.2, 36.5, 36.7, 37.1, 37.6, 38.1, 38.6, 39.0, 39.5, 40.1, 40.5, 40.7, 40.9, 41.2, 41.5, 42.0, 43.1, 43.7, 43.7, 43.8, 43.8, 43.7, 43.8, 44.1]

var myChart = new Chart(ctx, {
  type: 'LineWithLine',
  showXLabels: 5,
  data: {
    labels: labels,
    datasets: [{
      label: 'Hands',
      data: handsData,
      fill: false,
      backgroundColor: 'rgba(1, 151, 169, 1.0)',
      borderColor: 'rgba(1, 151, 169, 1.0)',
      borderWidth: 4
    }, {
      label: 'Minds',
      data: mindsData,
      fill: false,
      backgroundColor: 'rgba(248, 157, 46, 1.0)',
      borderColor: 'rgba(248, 157, 46, 1.0)',
      borderWidth: 4
    }]
  },
  options: {
         scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 50,
                    stepSize: 10
                }
            }]
        },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    tooltips: {
      mode: 'label',
      intersect: false,
      callbacks: {
        label: function(tooltipItems, data) {
          var ll='';
          data.datasets.forEach(function(item){
            ll+= ' ' + item.label + ' ' + tooltipItems.yLabel + '%';
          });
          if(first_last == 0){
            first_last = 1;
            return ll.split('%')[0]+'%';
          }
          else{
            first_last = 0;
            return ll.split('%')[1]+'%';
          }
          return ll;
        }
      }
    }
  }
});
var first_last = 0;
