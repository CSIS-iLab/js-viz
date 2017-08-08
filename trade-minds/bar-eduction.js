var ctx = document.getElementById("tv_bar_01");
var myChart = new Chart(ctx, {
  type: 'horizontalBar',
  data: {
    labels: ["Top Quintile (college or more)", "Fourth Quintile (some college or bachelors)", "Middle Quintile (associates degree or some college)", "Second Quintile (high school)", "Lowest Quintile (high school or less)"],
    datasets: [{
      label: 'Male Occupations',
      data: [14.9, 18.4, 0.3, -3.2, -4.1],
      backgroundColor: [
        'rgba(1, 151, 169, 1.0)',
        'rgba(1, 151, 169, 1.0)',
        'rgba(1, 151, 169, 1.0)',
        'rgba(1, 151, 169, 1.0)',
        'rgba(1, 151, 169, 1.0)'
      ],
    }, {
      label: 'Female Occupations',
      data: [18.6, 10.6, -2.2, 14.9, 14.4],
      backgroundColor: [
        'rgba(248, 157, 46, 1.0)',
        'rgba(248, 157, 46, 1.0)',
        'rgba(248, 157, 46, 1.0)',
        'rgba(248, 157, 46, 1.0)',
        'rgba(248, 157, 46, 1.0)'
      ],
    }]
  },
  options: {
  maintainAspectRatio: false,
    tooltips: {
      mode: 'label',
      callbacks: {
        label: function(tooltipItems, data) {
        var ll = '';
          data.datasets.forEach(function(item){
            ll+= item.label + ' ' + tooltipItems.xLabel + '%'
          });
          if(first_last == 0){
            first_last = 1;
            return ll.split('%')[0]+'%';
          }
          else{
            first_last = 0;
            return ll.split('%')[1]+'%';
          }
        }
      }
    }
  }
});
var first_last = 0;
