// From https://api.highcharts.com/highcharts/yAxis.events.pointBreak
Highcharts.wrap(Highcharts.Axis.prototype, "getLinePath", function (
  proceed,
  lineWidth
) {
  var axis = this,
    brokenAxis = axis.brokenAxis,
    path = proceed.call(this, lineWidth),
    start = path[0],
    x = start[1],
    y = start[2];

  (brokenAxis.breakArray || []).forEach(function (brk) {
    if (axis.horiz) {
      x = axis.toPixels(brk.from);
      path.splice(
        1,
        0,
        ["L", x - 4, y], // stop
        ["M", x - 9, y + 5],
        ["L", x + 1, y - 5], // left slanted line
        ["M", x - 1, y + 5],
        ["L", x + 9, y - 5], // higher slanted line
        ["M", x + 4, y]
      );
    } else {
      y = axis.toPixels(brk.from);
      path.splice(
        1,
        0,
        ["L", x, y - 4], // stop
        ["M", x + 5, y - 9],
        ["L", x - 5, y + 1], // lower slanted line
        ["M", x + 5, y - 1],
        ["L", x - 5, y + 9], // higher slanted line
        ["M", x, y + 4]
      );
    }
  });
  return path;
});

/**
 * On top of each column, draw a zigzag line where the axis break is.
 */
function pointBreakColumn(e) {
  var point = e.point,
    brk = e.brk,
    shapeArgs = point.shapeArgs,
    x = shapeArgs.x,
    y = this.translate(brk.from, 0, 1, 0, 1),
    w = shapeArgs.width,
    key = ["brk", brk.from, brk.to],
    path = [
      "M",
      x,
      y,
      "L",
      x + w * 0.25,
      y + 4,
      "L",
      x + w * 0.75,
      y - 4,
      "L",
      x + w,
      y,
    ];

  if (!point[key]) {
    point[key] = this.chart.renderer
      .path(path)
      .attr({
        "stroke-width": 4,
        stroke: point.series.options.borderColor,
      })
      .add(point.graphic.parentGroup);
  } else {
    point[key].attr({
      d: path,
    });
  }
}

Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
    googleSpreadsheetKey: "1a0wC2PhRyHJ8HKz3BB1nCTcV1KUbR2DjnqWpPom6jDM",
    googleSpreadsheetWorksheet: 2,
  },
  // General Chart Options
  chart: {
    type: "column",
    spacingBottom: 25,
  },
  // Chart Title and Subtitle
  title: {
    text: "Approved Support by Institution",
  },
  colors: ["#0A8672"],
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS Economics Program | Source: IFI press releases",
  },
  // Chart Legend
  legend: {
    enabled: false,
    title: {
      text:
        '<br/><span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>',
    },
    align: "center",
    verticalAlign: "bottom",
    layout: "horizontal",
  },
  // Y Axis
  yAxis: {
    title: {
      text: "USD Billions",
    },
    endOnTick: false,
    tickInterval: 10,
    lineColor: "#bfbbbb",
    lineWidth: 1,
    max: 120,
    breaks: [
      {
        from: 55,
        to: 95,
        breakSize: 1,
      },
    ],
    events: {
      pointBreak: pointBreakColumn,
    },
  },
  tooltip: {
    valueDecimals: 1,
    valuePrefix: "$",
    valueSuffix: " billion",
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: null, // Normal bar graph
      // stacking: "normal", // Stacked bar graph
      dataLabels: {
        enabled: true,
        formatter: function () {
          return Highcharts.numberFormat(this.y, 1);
        },
      },
    },
  },
});
