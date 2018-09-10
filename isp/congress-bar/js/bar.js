$(function() {
  Highcharts.chart("tilemap", {
    chart: {
      type: "tilemap",
      inverted: true,
      height: "80%"
    },

    title: {
      text: "U.S. states by population in 2016"
    },

    subtitle: {
      text:
        'Source:<a href="https://simple.wikipedia.org/wiki/List_of_U.S._states_by_population">Wikipedia</a>'
    },

    xAxis: {
      visible: false
    },

    yAxis: {
      visible: false
    },

    colorAxis: {
      dataClasses: [
        {
          from: 0,
          to: 1000000,
          color: "#F9EDB3",
          name: "< 1M"
        },
        {
          from: 1000000,
          to: 5000000,
          color: "#FFC428",
          name: "1M - 5M"
        },
        {
          from: 5000000,
          to: 20000000,
          color: "#FF7987",
          name: "5M - 20M"
        },
        {
          from: 20000000,
          color: "#FF2371",
          name: "> 20M"
        }
      ]
    },

    tooltip: {
      headerFormat: "",
      pointFormat:
        "The population of <b> {point.name}</b> is <b>{point.value}</b>"
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.hc-a2}",
          color: "#000000",
          style: {
            textOutline: false
          }
        }
      }
    },

    series: [
      {
        name: "",
        data: [
          {
            "hc-a2": "AL",
            name: "Alabama",
            region: "South",
            x: 6,
            y: 7,
            value: 4849377
          },
          {
            "hc-a2": "AK",
            name: "Alaska",
            region: "West",
            x: 0,
            y: 0,
            value: 737732
          },
          {
            "hc-a2": "AZ",
            name: "Arizona",
            region: "West",
            x: 5,
            y: 3,
            value: 6745408
          },
          {
            "hc-a2": "AR",
            name: "Arkansas",
            region: "South",
            x: 5,
            y: 6,
            value: 2994079
          },
          {
            "hc-a2": "CA",
            name: "California",
            region: "West",
            x: 5,
            y: 2,
            value: 39250017
          },
          {
            "hc-a2": "CO",
            name: "Colorado",
            region: "West",
            x: 4,
            y: 3,
            value: 5540545
          },
          {
            "hc-a2": "CT",
            name: "Connecticut",
            region: "Northeast",
            x: 3,
            y: 11,
            value: 3596677
          },
          {
            "hc-a2": "DE",
            name: "Delaware",
            region: "South",
            x: 4,
            y: 9,
            value: 935614
          },
          {
            "hc-a2": "DC",
            name: "District of Columbia",
            region: "South",
            x: 4,
            y: 10,
            value: 7288000
          },
          {
            "hc-a2": "FL",
            name: "Florida",
            region: "South",
            x: 8,
            y: 8,
            value: 20612439
          },
          {
            "hc-a2": "GA",
            name: "Georgia",
            region: "South",
            x: 7,
            y: 8,
            value: 10310371
          },
          {
            "hc-a2": "HI",
            name: "Hawaii",
            region: "West",
            x: 8,
            y: 0,
            value: 1419561
          },
          {
            "hc-a2": "ID",
            name: "Idaho",
            region: "West",
            x: 3,
            y: 2,
            value: 1634464
          },
          {
            "hc-a2": "IL",
            name: "Illinois",
            region: "Midwest",
            x: 3,
            y: 6,
            value: 12801539
          },
          {
            "hc-a2": "IN",
            name: "Indiana",
            region: "Midwest",
            x: 3,
            y: 7,
            value: 6596855
          },
          {
            "hc-a2": "IA",
            name: "Iowa",
            region: "Midwest",
            x: 3,
            y: 5,
            value: 3107126
          },
          {
            "hc-a2": "KS",
            name: "Kansas",
            region: "Midwest",
            x: 5,
            y: 5,
            value: 2904021
          },
          {
            "hc-a2": "KY",
            name: "Kentucky",
            region: "South",
            x: 4,
            y: 6,
            value: 4413457
          },
          {
            "hc-a2": "LA",
            name: "Louisiana",
            region: "South",
            x: 6,
            y: 5,
            value: 4649676
          },
          {
            "hc-a2": "ME",
            name: "Maine",
            region: "Northeast",
            x: 0,
            y: 11,
            value: 1330089
          },
          {
            "hc-a2": "MD",
            name: "Maryland",
            region: "South",
            x: 4,
            y: 8,
            value: 6016447
          },
          {
            "hc-a2": "MA",
            name: "Massachusetts",
            region: "Northeast",
            x: 2,
            y: 10,
            value: 6811779
          },
          {
            "hc-a2": "MI",
            name: "Michigan",
            region: "Midwest",
            x: 2,
            y: 7,
            value: 9928301
          },
          {
            "hc-a2": "MN",
            name: "Minnesota",
            region: "Midwest",
            x: 2,
            y: 4,
            value: 5519952
          },
          {
            "hc-a2": "MS",
            name: "Mississippi",
            region: "South",
            x: 6,
            y: 6,
            value: 2984926
          },
          {
            "hc-a2": "MO",
            name: "Missouri",
            region: "Midwest",
            x: 4,
            y: 5,
            value: 6093000
          },
          {
            "hc-a2": "MT",
            name: "Montana",
            region: "West",
            x: 2,
            y: 2,
            value: 1023579
          },
          {
            "hc-a2": "NE",
            name: "Nebraska",
            region: "Midwest",
            x: 4,
            y: 4,
            value: 1881503
          },
          {
            "hc-a2": "NV",
            name: "Nevada",
            region: "West",
            x: 4,
            y: 2,
            value: 2839099
          },
          {
            "hc-a2": "NH",
            name: "New Hampshire",
            region: "Northeast",
            x: 1,
            y: 11,
            value: 1326813
          },
          {
            "hc-a2": "NJ",
            name: "New Jersey",
            region: "Northeast",
            x: 3,
            y: 10,
            value: 8944469
          },
          {
            "hc-a2": "NM",
            name: "New Mexico",
            region: "West",
            x: 6,
            y: 3,
            value: 2085572
          },
          {
            "hc-a2": "NY",
            name: "New York",
            region: "Northeast",
            x: 2,
            y: 9,
            value: 19745289
          },
          {
            "hc-a2": "NC",
            name: "North Carolina",
            region: "South",
            x: 5,
            y: 9,
            value: 10146788
          },
          {
            "hc-a2": "ND",
            name: "North Dakota",
            region: "Midwest",
            x: 2,
            y: 3,
            value: 739482
          },
          {
            "hc-a2": "OH",
            name: "Ohio",
            region: "Midwest",
            x: 3,
            y: 8,
            value: 11614373
          },
          {
            "hc-a2": "OK",
            name: "Oklahoma",
            region: "South",
            x: 6,
            y: 4,
            value: 3878051
          },
          {
            "hc-a2": "OR",
            name: "Oregon",
            region: "West",
            x: 4,
            y: 1,
            value: 3970239
          },
          {
            "hc-a2": "PA",
            name: "Pennsylvania",
            region: "Northeast",
            x: 3,
            y: 9,
            value: 12784227
          },
          {
            "hc-a2": "RI",
            name: "Rhode Island",
            region: "Northeast",
            x: 2,
            y: 11,
            value: 1055173
          },
          {
            "hc-a2": "SC",
            name: "South Carolina",
            region: "South",
            x: 6,
            y: 8,
            value: 4832482
          },
          {
            "hc-a2": "SD",
            name: "South Dakota",
            region: "Midwest",
            x: 3,
            y: 4,
            value: 853175
          },
          {
            "hc-a2": "TN",
            name: "Tennessee",
            region: "South",
            x: 5,
            y: 7,
            value: 6651194
          },
          {
            "hc-a2": "TX",
            name: "Texas",
            region: "South",
            x: 7,
            y: 4,
            value: 27862596
          },
          {
            "hc-a2": "UT",
            name: "Utah",
            region: "West",
            x: 5,
            y: 4,
            value: 2942902
          },
          {
            "hc-a2": "VT",
            name: "Vermont",
            region: "Northeast",
            x: 1,
            y: 10,
            value: 626011
          },
          {
            "hc-a2": "VA",
            name: "Virginia",
            region: "South",
            x: 5,
            y: 8,
            value: 8411808
          },
          {
            "hc-a2": "WA",
            name: "Washington",
            region: "West",
            x: 2,
            y: 1,
            value: 7288000
          },
          {
            "hc-a2": "WV",
            name: "West Virginia",
            region: "South",
            x: 4,
            y: 7,
            value: 1850326
          },
          {
            "hc-a2": "WI",
            name: "Wisconsin",
            region: "Midwest",
            x: 2,
            y: 5,
            value: 5778708
          },
          {
            "hc-a2": "WY",
            name: "Wyoming",
            region: "West",
            x: 3,
            y: 3,
            value: 584153
          }
        ]
      }
    ]
  });

  Highcharts.chart("treemap", {
    colorAxis: {
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0]
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: [
          {
            name: "A",
            value: 6,
            colorValue: 1
          },
          {
            name: "B",
            value: 6,
            colorValue: 2
          },
          {
            name: "C",
            value: 4,
            colorValue: 3
          },
          {
            name: "D",
            value: 3,
            colorValue: 4
          },
          {
            name: "E",
            value: 2,
            colorValue: 5
          },
          {
            name: "F",
            value: 2,
            colorValue: 6
          },
          {
            name: "G",
            value: 1,
            colorValue: 7
          }
        ]
      }
    ],
    title: {
      text: "Highcharts Treemap"
    }
  });

  $([
    "Alliance Ratings by Party",
    "Security Assitance Ratings by Party",
    "Assistance Ratings by Party",
    "Average Foreign Aid Ratings by Party",
    "Use of Force Ratings by Party",
    "Multilateralism Ratings by Party",
    "Trade Ratings by Party",
    "Iran Policy Response"
  ]).each((x, title) => {
    $(`#hcContainer-${x + 1}`).highcharts({
      // Load Data in from Google Sheets
      data: {
        googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
        googleSpreadsheetWorksheet: x + 1
      },
      // General Chart Options
      chart: {
        zoomType: "x",
        type: "column"
      },
      // Chart Title and Subtitle
      title: {
        text: title
      },
      subtitle: {
        text: ""
      },
      // Credits
      credits: {
        enabled: true,
        href: false,
        text: "CSIS International Security Program | Source: NAME"
      },
      // Chart Legend
      legend: {
        title: {
          text: ""
        },
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal"
      },
      // Y Axis
      yAxis: {
        title: {
          text: "Response Count"
        }
      },
      // Additional Plot Options
      plotOptions: {
        column: {
          stacking: null, // Normal bar graph
          // stacking: "normal", // Stacked bar graph
          dataLabels: {
            enabled: false
          }
        }
      }
    });
  });

  var chart, newOffset;
  var data = [];

  Highcharts.data({
    googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: false,
    parsed: function(columns) {
      columns[0].slice(1).forEach((column, i) => {
        nation = {};
        nation[column] = {};
        nation[column].democrat = columns[1].slice(1)[i];
        nation[column].republican = columns[2].slice(1)[i];
        nation[column].incidents =
          nation[column].democrat + nation[column].republican;
        data.push(nation);
      });

      data = data.sort((b, a) => {
        let nationA = Object.keys(a)[0];
        let nationB = Object.keys(b)[0];
        return a[nationA].incidents - b[nationB].incidents;
      });

      data.nations = columns[0].slice(1);
      data.democrat = columns[1].slice(1);
      data.republican = columns[2].slice(1);
      data.max = Math.max(...data.republican.concat(data.democrat));
      renderChart(data);
      offsetYAxis();
    }
  });

  window.addEventListener("resize", () => {
    offsetYAxis();
  });

  function offsetYAxis() {
    let containerWidth = document.getElementById("butterfly").offsetWidth;
    let adjustedOffset = 0 - containerWidth / 2;
    chart.update({
      xAxis: {
        offset: adjustedOffset
      }
    });
  }

  function renderChart(data) {
    chart = Highcharts.chart("butterfly", {
      exporting: { enabled: false },
      chart: {
        margin: [100, 50, 100, 50],
        type: "bar",
        style: {
          paddingBottom: "50px",
          overflow: "visible"
        }
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 400,
              minWidth: 250
            },
            chartOptions: {
              chart: {
                marginTop: 225,
                height: 900
              },

              xAxis: {
                reversed: true,
                labels: {
                  style: {
                    fontSize: "11px"
                  }
                }
              }
            }
          },
          {
            condition: {
              maxWidth: 768,
              minWidth: 400
            },
            chartOptions: {
              chart: {
                marginTop: 125,
                height: 700
              }
            }
          },
          {
            condition: {
              maxWidth: 768
            },
            chartOptions: {
              yAxis: [
                {
                  width: "30%"
                },
                {
                  left: "70%",
                  width: "30%"
                },
                {}
              ]
            }
          }
        ]
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
        layout: "horizontal",
        y: 15,
        itemStyle: {
          fontWeight: "normal"
        }
      },
      title: {
        text: "Alliance Ratings by Party",
        floating: false
      },
      subtitle: {
        useHTML: true,
        text: ""
      },
      credits: {
        enabled: true,
        href: false,
        text: "CSIS International Security PRogram | Source: CSIS",
        position: {
          y: 15
        }
      },
      tooltip: {
        crosshairs: true,
        borderColor: Highcharts.getOptions().colors[2],

        valueSuffix: " "
      },
      xAxis: {
        title: {
          text: null
        },
        categories: data.nations,
        labels: {
          align: "center",
          style: {
            width: "100%",
            color: "black"
          },
          formatter: function() {
            return this.value === 1
              ? "Oppose"
              : this.value === 7
                ? "Support"
                : this.value === 2
                  ? "⬆"
                  : this.value === 6
                    ? "⬇"
                    : "▮";
          }
        },
        lineWidth: 0,
        tickWidth: 0
      },
      yAxis: [
        {
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          max: data.max,
          width: "40%",
          reversed: true,
          opposite: false
        },
        {
          offset: 0,
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          max: data.max,
          left: "60%",
          width: "40%"
        },
        {
          title: {
            text: "",
            align: "middle",
            y: -15,
            style: { fontWeight: "bold" }
          }
        }
      ],
      series: [
        {
          name: "Democrat",
          yAxis: 0,
          data: data.democrat
        },
        {
          name: "Republican",
          yAxis: 1,
          data: data.republican
        }
      ]
    });
  }
});
