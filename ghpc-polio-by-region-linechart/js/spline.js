Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    numericSymbols: null
  },
  chart: {
    style: {
      fontFamily: '"Source Sans", Arial, Helvetica, sans-serif',
      fontSize: '16px'
    }
  }
});


Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "14m3yFJqWpdo-SecoFTIetBVBnhzTgMf131VbxBFsrxY"
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
    text: '<span style="font-size: 32px; color: #333333; max-width: 1280px; text-align: center">Global Polio Cases by Region, 1980-2019</span>'
  },
  subtitle: {
    text: '<span style="color: #333333; max-width: 1280px; margin-bottom: 1.5rem; line-height: 1.4">Hover over a line to see the number of cases per region in that year. <br> Click and drag to zoom.</span>'
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
      text: 'Number of Polio Cases <br> (WPV and cVDPV)'
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