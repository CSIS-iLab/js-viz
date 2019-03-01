Highcharts.chart("spline", {
  data: {
    googleSpreadsheetKey: "102UZJBqMdAhmKHtYEMOvE2UNIG_Bp8Dtl3wn9rcl-74",
    googleSpreadsheetWorksheet: 1
  },
  chart: {
    defaultSeriesType: "spline",
    backgroundColor: "#131A28",
    style: {
      fontFamily: "museo-sans, sans-serif"
    }
  },
  credits: {
    style: {
      enabled: false
    }
  },
  colors: ["#83d4ef", "#92278f", "#be1e2d", "#ffc624"],
  legend: {
    itemHoverStyle: {
      color: "#ffc726  "
    },
    itemStyle: {
      color: "#fff",
      fontWeight: "light"
    }
  },

  title: {
    text: " "
  },
  subtitle: {
    text:
      "Powered by Predata / Graphics by CSIS iDeas Lab / Analysis by BeyondParallel",
    style: {
      color: "#ffffff"
    }
  },

  yAxis: {
    gridLineWidth: 0,
    minorGridLineWidth: 0,
    min: 1.5,
    title: {
      text: "Signal Strength",
      style: {
        color: "#ffc726",
        fontSize: "15px"
      }
    }
  },
  xAxis: {
    type: "datetime",

    gridLineWidth: 1,
    gridLineColor: "#333333",
    tickWidth: 0,
    labels: {
      formatter: function() {
        return Highcharts.dateFormat("%b %e", this.value);
      }
    },
    title: {
      text: "Last 30 Days",
      style: {
        color: "#ffc726",
        fontSize: "15px"
      }
    }
  },
  plotOptions: {
    spline: {
      marker: {
        enabled: false
      }
    }
  },
  credits: {
    text: "CSIS Beyond Parallel | Source: Predata",
    style: {
      display: "none"
    }
  }
});

google.load("visualization", "1", { packages: ["timeline"] });
google.setOnLoadCallback(drawChart);

function drawChart() {
  var query = new google.visualization.Query(
    "https://docs.google.com/spreadsheets/d/1_EP44NzkbjXPn24TKmk9Af21y_k8CM89fCjUpLuzNcA/edit#gid=0"
  );
  query.send(handleQueryResponse);
}
function handleQueryResponse(response) {
  var data = response.getDataTable();

  data.setColumnProperty(4, "role", "tooltip");

  var chart = new google.visualization.Timeline(
    document.getElementById("timeline")
  );

  var options = {
    backgroundColor: "#131A28",
    timeline: {
      showRowLabels: false,
      showBarLabels: false,
      singleColor: "#ffc624"
    }
  };

  chart.draw(data, options);
  google.visualization.events.addListener(chart, "onmouseover", function(e) {
    setTooltipContent(data, e.row);
  });

  function setTooltipContent(data, row) {
    if (row != null) {
      var startDate = new Date(Date.parse(data.getValue(row, 2)));
      var endDate = new Date(Date.parse(data.getValue(row, 3)));

      console.log(startDate.day, endDate.day);
      var content =
        '<div class="custom-tooltip" ><strong>' +
        data.getValue(row, 1) +
        "</strong><br>" +
        startDate +
        (startDate.day !== endDate.day ? " to " + endDate : "") +
        "</div>";

      var tooltip = document.getElementsByClassName(
        "google-visualization-tooltip"
      )[0];
      tooltip.innerHTML = content;
    }
  }
}
