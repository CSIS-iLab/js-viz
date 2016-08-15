$(function() {
  Highcharts.setOptions({
      colors: ['#781F30', '#303D43', '#52496D', '#61884D', '#C9AC4D']
  });
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '142QeSARBEY7aZSebRFpYiFftx4toUizAtsl4X5G937s',
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
        href: "http://chinapower.csis.org",
        text: 'CSIS China Power Project | Source: Various*',
        style: {
          cursor: 'pointer',
          color: '#000',
          fontSize: '10px'
        }
      },

      title: {
        text: "China's Defense Spending",
        style: {
          color: '#404041',
          fontWeight: '500',
          fontSize:'24px',
          letterSpacing: '0.5px'
        }
      },
      subtitle: {
        text: '2008 - 2015',
        style: {
          color: '#772031',
        }
      },
      xAxis: {
        labels: {
          style: {
            color: '#000000',
            fontSize: '14px'
          }
        },
        categories: [ 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015 ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        labels: {
          style: {
            color: '#000000',
            fontSize: '14px'
          }
        },
        title: {
          text: 'Billions $ USD',
          style: {
            color: '#772031',
            fontWeight: 'bold',
            fontSize: '16px'
          }
        }

      },
      tooltip: {
        backgroundColor: '#FFF',
        style: {
          color: '#000',
          fontWeight: 'bol'
        },
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:.1f} bn</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      legend: {
        title: {
          text: 'Source<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
          style: {
            fontStyle: 'italic'
          }
        },
        align: 'left',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        itemHoverStyle: {
          color: '#781F30'
        }
      },

    });
  });
