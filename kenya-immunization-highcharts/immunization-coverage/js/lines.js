Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
    numericSymbols: null,
  },
  chart: {
    style: {
      fontFamily: "Roboto",
    },
  },
});

Highcharts.seriesTypes.line.prototype.drawLegendSymbol =
  Highcharts.seriesTypes.area.prototype.drawLegendSymbol;

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "10q0ygaHPEL53tAr8Nu3I4bh-PykxOYRIyDpa0RXE3jg",
    googleSpreadsheetRange: "Kenyan Immunization Coverage",
    switchRowsAndColumns: true,
  },
  // General Chart Options
  chart: {
    zoomType: "x",
    type: "line",
  },
  colors: [
    // Kenya
    "#F26522",

    // AFRO Region-Measles 1st Dose
    "#F5A623",

    // Countries in the same income group
    "#47ACB1",

    // Global
    "#8E6C89",
  ],
  // Chart Title and Subtitle
  title: {
    text:
      "<span style='font-size: 32px;'>Historical Immunization Coverage in Kenya</span>",
    margin: 40,
  },
  subtitle: {
    text:
      "<span style='font-size: 16px;'>Hover over the map and toggle on and off the legend options to see how Kenya's national immunization coverage has varied over the last several decades, based on the coverage with the first dose for the DPT3 vaccine (third dose of diphtheria toxoid, tetanus toxoid, and pertussis containing vaccine) among 1-year-olds.</span>",
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Global Health Policy Center | Source: WHO",
  },
  // Chart Legend
  legend: {
    title: {
      text:
        '<br><span style="font-size: 12px; color: #808080";>(Click to hide)</span>',
    },
    margin: 40,
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Y Axis
  yAxis: {
    max: 100,
    min: 0,
    title: {
      text: "% DTP3 Coverage",
    },
  },
  // X Axis
  xAxis: {
    tickInterval: 2,
  },
  // Tooltip
  tooltip: {
    valueSuffix: "%",
    borderColor: "gray",
    shared: true,
    useHTML: true,
    style: {
      lineHeight: "21px",
      opacity: 0.8,
    },
    headerFormat:
      '<span style="font-size: 12px"><b>{point.key}</b></span><br/>',
  },
  // Additional Plot Options
  plotOptions: {
    line: {
      marker: {
        enabled: false,
        symbol: "circle",
        radius: 3,
      },
      lineWidth: 2,
    },
  },
  series: [
    { dashStyle: "solid" },
    { dashStyle: "dash" },
    { dashStyle: "dash" },
    { dashStyle: "dash" },
  ],
});
