Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});


Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "14m3yFJqWpdo-SecoFTIetBVBnhzTgMf131VbxBFsrxY"
    /*googleSpreadsheetWorksheet: 2,
    parseDate: function(thisDate) {
      return Date.parse(thisDate.replace('-', '/1/'));
    }*/
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'spline'
  },
  // Colors
  colors: [
    '#4F72BE',
    '#DE8244',
    '#A5A5A5',
    '#F5C243',
    '#6A9AD0',
    '#0A8672',
    '#0FAA94'
  ],
  // Chart Title and Subtitle
  title: {
    text: '<span style="font-size: 32px">Global Polio Cases by Region, 1980-2019</span>'
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: WHO, GPEI"
  },
  // Chart Legend
  legend: {
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: '<span style="font-size: 16px">Number of Polio Cases <br> (WPV and cVDPV)</span>'
    }
  },
  // Tooltip
  tooltip: {
    shared: true,
    useHTML: true
  },
  // Additional Plot Options
  plotOptions: {
    spline: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 3
    }
  }
});