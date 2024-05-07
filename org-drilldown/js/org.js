let data = [];

Highcharts.data({
  googleAPIKey: "AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg",
  googleSpreadsheetKey: "1da63s1k5vaLu-19gin2wTb8QZBBYI1_WWRfglKDMXnI",
  googleSpreadsheetRange: "Sheet1",
  switchRowsAndColumns: true,
  parsed: function (rows) {
    let modifiedRows = rows.slice(1);
    modifiedRows.forEach((row, i) => {
      console.log(row);
      data[i] = {};
      data[i].id = row[0];
      data[i].parent = `${row[1]}`;
      data[i].name = row[2];
      data[i].contact_name = row[3];
      data[i].contact_title = row[4];
      data[i].description = row[5];
      data[i].leaf = row[6];

      
    });

    console.log(data);
    renderChart(data);
  },
});

function renderChart(data) {
  Highcharts.chart("container", {
    chart: {
      spacingBottom: 30,
      marginRight: 325,
      height: 1200,
    },
    data: data,
    title: {
      text: "U.S. Executive Branch",
    },
    tooltip: {
      useHTML: true,
      formatter: function () {
        console.log(this);
        return `<p><b>Department: </b>${this.point.name}</p><p><b>Contact Name: </b>${this.point.contact_name}</p><p><b>Contact Title: </b>${this.point.contact_title}</p><p><b>Description: </b>${this.point.description}</p>`
      },
    },
    series: [
      {
        type: "treegraph",
        keys: ["parent", "id", "level"],
        clip: false,
        data,
        marker: {
          symbol: "circle",
          radius: 6,
          fillColor: "#ffffff",
          lineWidth: 3,
        },
        dataLabels: {
          align: "left",
          pointFormat: "{point.name}",
          style: {
            color: "#000000",
            textOutline: "3px #ffffff",
            whiteSpace: "nowrap",
          },
          x: 24,
          crop: false,
          overflow: "scroll",
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: 0.25,
            },
            collapsed: true
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: -0.25,
            },
          },
          {
            level: 6,
            dataLabels: {
              x: 10,
            },
            marker: {
              radius: 4,
            },
          },
        ],
      },
    ],
  });
}
