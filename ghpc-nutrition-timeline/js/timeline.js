var additionalOptions = {
  timenav_position: "top",
  timenav_height_min: 200,
  height: 800,
  initial_zoom: "4"
};

var spreadsheetID = "12cEbeUDoN1k7ejXJodaX_jGLEvFmVNakyEZVDj7TEo0";

var timelineURL =
  "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetID +
  "/1/public/values?alt=json";

fetch(timelineURL)
  .then(function(resp) {
    return resp.json();
  })
  .then(function(json) {
    var timeline_json = parseJson(json.feed.entry);
    window.timeline = new TL.Timeline(
      "timeline-embed",
      timeline_json,
      additionalOptions
    );
  });

function parseJson(json) {
  var data = json.map(function(r) {
    var row = r;
    var rowData = {};

    Object.keys(row).forEach(function(c, i) {
      var column = c;
      if (column.indexOf("gsx$") > -1) {
        var columnName = column.replace("gsx$", "");
        rowData[columnName] = row[column]["$t"];
      }
    });

    var eventData = {
      start_date: {
        day: rowData.day,
        format: "full",
        format_short: "full_short",
        month: rowData.month,
        year: rowData.year
      },
      end_date: {
        day: rowData.endday,
        format: "full",
        format_short: "full_short",
        month: rowData.endmonth,
        year: rowData.endyear
      },
      text: {
        headline: rowData.headline,
        text: rowData.text
      },
      group: rowData.group,
      media: {
        // caption: rowData.caption,
        // credit: rowData.media_2,
        url: rowData.media
      },
      unique_id: rowData.group
    };

    return eventData;
  });
  return { title: data[0], events: data.slice(1) };
}
