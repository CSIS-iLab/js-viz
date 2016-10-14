$(function () {
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'PT Sans'
      }
    }
  });
  $('#hcContainer').highcharts({
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
      text: "CSIS/Asia Maritime Transparency Initiative (Data from Japan Coast Guard)"
    },
    title: {
      text: "Number of Chinese Government  Vessels in Senkakus’ Contiguous Zone/Territorial Sea (August 2016)"
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    colors: ['#00b29e', '#023850', '#0C8D79'],
    yAxis: {
      tickInterval: 2,
      max: 16,
      title: {
        text: 'Number of Ships/Entries'
      }
    },
    xAxis: {
          categories: ['8/1/16', '8/2/16', '8/3/16', '8/4/16', '8/5/16', '8/6/16', '8/7/16', '8/8/16', '8/9/16', '8/10/16', '8/11/16', '8/12/16', '8/13/16', '8/14/16', '8/15/16', '8/16/16', '8/17/16', '8/18/16', '8/19/16', '8/20/16', '8/21/16', '8/22/16', '8/23/16', '8/24/16', '8/25/16', '8/26/16', '8/27/16', '8/28/16', '8/29/16', '8/30/16', '8/31/16'],
          title: {
            text: "Between August 5 and August 16, several Chinese vessels entered the territorial sea more than once."
          }
    },
    series: [{
        type: 'column',
        name: 'Ships Entering Contiguous Zone',
        data: [0, 0, 3, 3, 3, 7, 14, 15, 13, 12, 6, 4, 4, 4, 5, 8, 6, 4, 3, 3, 5, 5, 5, 5, 3, 4, 3, 0, 0, 0, 0]
      }, {
        type: 'column',
        name: 'Ships Entering Territorial Sea',
        data: [0, 0, 0, 0, 2, 0, 6, 3, 4, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        type: 'column',
        name: 'Total Entries into Territorial Sea',
        data: [0, 0, 0, 0, 3, 0, 11, 4, 10, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
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
