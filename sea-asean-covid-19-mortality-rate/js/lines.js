Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});


Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: '1hvUG-GDb9fWX1GO-xm26R5lsWnLTmWPKoFY-0Y6BAWA',
    googleSpreadsheetRange: "Mortality Rate Calculated",
  },
  // General Chart Options
  chart: {
    zoomType: 'xy',
    type: 'line'
  },
  // Colors
  colors: [
  // Brunei
  '#004165',

  // Cambodia
  '#F28E2C',
  
  // Indonesia
  '#76B7B2',

  // Laos
  '#EDC949',

  // Malaysia
  '#BAD97C',

  // Myanmar
  '#E15759',

  // Philippines
  '#7FA8D9',

  // Singapore
  '#FF9DA7',

  // Thailand
  '#59A14F',

  // Vietnam
  '#AF7AA1',

  // Timor-Leste
  '#4271a8'
  ],
  // Chart Title and Subtitle
  title: {
    text: "Covid-19 Mortality Rate by Country in Southeast Asia"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Southeast Asia Program | Source: Johns Hopkins University"
  },
  // Chart Legend
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
  },
  // Y Axis
  yAxis: {
    title: {
      text: "Covid-19 Mortality Rate by Country (per Million)"
    }
  },
  xAxis: {
    dateTimeLabelFormats: {
      day: '%b %e',
      week: '%b %e'
    }
  },
  // Tooltip 
  tooltip: {
    shared: true,
    useHTML: true,
    xDateFormat: '%B %e, %Y',
    valueDecimals: 2,
    formatter: function (tooltip) {
      var items = this.points || splat(this),
          series = items[0].series,
          s;

      // sort the values
      items.sort(function(a, b){
          return ((a.y < b.y) ? -1 : ((a.y > b.y) ? 1 : 0));
      });
      items.reverse();

      return tooltip.defaultFormatter.call(this, tooltip);
    }
  },
  // Additional Plot Options
  plotOptions:
  {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 3
    }
  }
})
