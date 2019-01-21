"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var chart2 = void 0,
  series = [];

Highcharts.data({
  googleSpreadsheetKey: "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8",
  googleSpreadsheetWorksheet: 2,
  switchRowsAndColumns: true,
  parsed: function parsed(columns) {
    var endemic = columns.filter(c => c[9] === "x");
    var notEndemic = columns.filter(c => c[9] !== "x");

    endemic.forEach(c => {
      var row = {};
      row.type = "line";
      row.name = c[0];
      row.data = c.slice(1, c.length - 1).map((c, i) => {
        return { y: c, x: i + 2010 };
      });
      row.showInLegend = true;
      row.visible = true;
      series.push(row);
    });

    notEndemic.forEach(c => {
      var row = {};
      row.type = "line";
      row.name = c[0];
      row.data = c.slice(1, c.length - 1).map((c, i) => {
        return { y: c, x: i + 2010 };
      });
      row.showInLegend = false;
      row.visible = false;
      series.push(row);
    });

    return renderLineChart(series);
  }
});

function renderLineChart(data) {
  console.log(data, "57");

  chart2 = Highcharts.chart(
    "container2",
    _defineProperty({
      chart: {
        zoomType: false,
        type: "line",
        height: "40%"
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
        max: 104,
        min: 0
      },
      xAxis: {
        categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
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
      series: data,
      tooltip: {
        headerFormat: `<b>{point.series.name}</b><br/>`,
        pointFormatter: function() {
          return `Score: ${this.y}`;
        }
      }
    })
  );
}
