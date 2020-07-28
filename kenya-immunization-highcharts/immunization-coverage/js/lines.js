Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    numericSymbols: null
  },
  chart: {
    style: {
      fontFamily: "Roboto"
    }
  }
});


Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleSpreadsheetKey: "10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: true
  },
  // General Chart Options
  chart: {
    zoomType: 'x',
    type: 'line'
  },
  // Chart Title and Subtitle
  title: {
    text: "Kenyan Immunization Coverage (Measles 1st Dose)"
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: WHO"
  },
  // Chart Legend
  legend: {
    title: {
      text: '<br><span style="font-size: 12px; color: #808080";>(Click to hide)</span>',
    },
    margin: 40,
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal"
  },
  // Y Axis
  yAxis: {
    title: {
      text: '% DPT3 Coverage'
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
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3
      },
      lineWidth: 2
    }
  }
});