Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    numericSymbols: null
  },
  chart: {
    style: {
      fontSize: '16px',
      fontFamily: "'Source Sans Pro'"
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
    text: '<span style="font-size: 32px; color: #333333; text-align: center">Global Polio Cases by World Bank Regions, 1980-2019</span>'
  },
  subtitle: {
    useHTML: 'true',
    align: 'center',
    text: '<span style="color: #333333; margin-bottom: 1.5rem; line-height: 1.4;">To see the original World Health Organization region breakdown of cases, click here for the data from <a href="https://www.who.int/immunization/monitoring_surveillance/data/en/" target="_blank" style="color: #0065A6;">1980-2016</a>, <a href="https://extranet.who.int/polis/public/CaseCount.aspx" target="_blank" style="color:#0065A6;">2017-2018</a>, or <a href="http://polioeradication.org/polio-today/polio-now/this-week/" target="_blank" style="color: #0065A6;">2019</a>.<br> Hover over a line to see the number of cases per World Bank <a href="http://datatopics.worldbank.org/sdgatlas/the-world-by-region.html" target="_blank" style="color: #0065A6;">region</a> in that year. Click and drag to zoom.</span>'
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: WHO, GPEI"
  },
  // Chart Legend
  legend: {
    title: {
      text: '<br><span style="font-size: 12px; color: #808080";>(Click to hide)</span>',
    },
    itemStyle: {
      fontWeight: 900
    },
    margin: 40,
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: 'Number of Polio Cases <br> <span style="font-size: 12px">(WPV and cVDPV)</span>'
    }
  },
  // X Axis
  xAxis: {
    tickInterval: 2
  },
  // Tooltip
  tooltip: {
    shared: true,
    useHTML: true,
    style: {
      lineHeight: '21px',
      opacity: 0.8
    },
    headerFormat: '<span style="font-size: 12px"><b>{point.key}</b></span><br/>'
  },
  // Additional Plot Options
  plotOptions: {
    spline: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 2
    }
  }
});