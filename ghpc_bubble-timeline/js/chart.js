Highcharts.chart("container2", {
  data: {
    googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
    googleSpreadsheetWorksheet: 4,
    switchRowsAndColumns: true
  },
  chart: {
    zoomType: false,
    type: "line",
    height: "180%"
  },
  title: {
    align: "left",
    x: 50,
    text: "Surveillance Scores by year and country"
  },

  subtitle: {
    widthAdjust: -150,
    align: "left",
    x: 50,
    text:
      "A States Parties Questionnaire (also referred to as the IHR monitoring questionnaire) is sent annually to National IHR Focal Points (NFPs) for data collection. It contains a checklist of 20 indicators specifically developed for monitoring each core capacity, including its status of implementation."
  },
  credits: {
    enabled: true,
    href: true,
    position: { y: -10 },
    text:
      'CSIS Global Health Policy Center | Source: <a href=http://apps.who.int/gho/data/view.main.IHRCTRY03v?lang=en">World Health Organization</a>'
  },
  yAxis: {
    title: { text: "Score" },
    endOnTick: false,
    max: 104
  },
  legend: {
    y: -15,
    verticalAlign: "bottom",
    layout: "horizontal",
    itemWidth: 200
  },
  plotOptions: {
    column: {
      groupPadding: 0.5,
      pointWidth: 150,
      borderWidth: 0
    }
  },

  tooltip: {
    headerFormat: `<b>{point.series.name}</b><br/>`,
    pointFormatter: function() {
      return `Score: ${this.y}`;
    }
  }
});
