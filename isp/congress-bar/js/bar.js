$(function() {
  let states = [
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "AL",
      name: "Alabama",
      region: "South",
      x: 6,
      y: 7
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "AK",
      name: "Alaska",
      region: "West",
      x: 0,
      y: 0
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "AZ",
      name: "Arizona",
      region: "West",
      x: 5,
      y: 3
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "AR",
      name: "Arkansas",
      region: "South",
      x: 5,
      y: 6
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "CA",
      name: "California",
      region: "West",
      x: 5,
      y: 2
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "CO",
      name: "Colorado",
      region: "West",
      x: 4,
      y: 3
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "CT",
      name: "Connecticut",
      region: "Northeast",
      x: 3,
      y: 11
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "DE",
      name: "Delaware",
      region: "South",
      x: 4,
      y: 9
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "DC",
      name: "District of Columbia",
      region: "South",
      x: 4,
      y: 10
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "FL",
      name: "Florida",
      region: "South",
      x: 8,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "GA",
      name: "Georgia",
      region: "South",
      x: 7,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "HI",
      name: "Hawaii",
      region: "West",
      x: 8,
      y: 0
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "ID",
      name: "Idaho",
      region: "West",
      x: 3,
      y: 2
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "IL",
      name: "Illinois",
      region: "Midwest",
      x: 3,
      y: 6
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "IN",
      name: "Indiana",
      region: "Midwest",
      x: 3,
      y: 7
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "IA",
      name: "Iowa",
      region: "Midwest",
      x: 3,
      y: 5
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "KS",
      name: "Kansas",
      region: "Midwest",
      x: 5,
      y: 5
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "KY",
      name: "Kentucky",
      region: "South",
      x: 4,
      y: 6
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "LA",
      name: "Louisiana",
      region: "South",
      x: 6,
      y: 5
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "ME",
      name: "Maine",
      region: "Northeast",
      x: 0,
      y: 11
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MD",
      name: "Maryland",
      region: "South",
      x: 4,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MA",
      name: "Massachusetts",
      region: "Northeast",
      x: 2,
      y: 10
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MI",
      name: "Michigan",
      region: "Midwest",
      x: 2,
      y: 7
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MN",
      name: "Minnesota",
      region: "Midwest",
      x: 2,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MS",
      name: "Mississippi",
      region: "South",
      x: 6,
      y: 6
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MO",
      name: "Missouri",
      region: "Midwest",
      x: 4,
      y: 5
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "MT",
      name: "Montana",
      region: "West",
      x: 2,
      y: 2
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NE",
      name: "Nebraska",
      region: "Midwest",
      x: 4,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NV",
      name: "Nevada",
      region: "West",
      x: 4,
      y: 2
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NH",
      name: "New Hampshire",
      region: "Northeast",
      x: 1,
      y: 11
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NJ",
      name: "New Jersey",
      region: "Northeast",
      x: 3,
      y: 10
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NM",
      name: "New Mexico",
      region: "West",
      x: 6,
      y: 3
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NY",
      name: "New York",
      region: "Northeast",
      x: 2,
      y: 9
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "NC",
      name: "North Carolina",
      region: "South",
      x: 5,
      y: 9
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "ND",
      name: "North Dakota",
      region: "Midwest",
      x: 2,
      y: 3
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "OH",
      name: "Ohio",
      region: "Midwest",
      x: 3,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "OK",
      name: "Oklahoma",
      region: "South",
      x: 6,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "OR",
      name: "Oregon",
      region: "West",
      x: 4,
      y: 1
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "PA",
      name: "Pennsylvania",
      region: "Northeast",
      x: 3,
      y: 9
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "RI",
      name: "Rhode Island",
      region: "Northeast",
      x: 2,
      y: 11
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "SC",
      name: "South Carolina",
      region: "South",
      x: 6,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "SD",
      name: "South Dakota",
      region: "Midwest",
      x: 3,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "TN",
      name: "Tennessee",
      region: "South",
      x: 5,
      y: 7
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "TX",
      name: "Texas",
      region: "South",
      x: 7,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "UT",
      name: "Utah",
      region: "West",
      x: 5,
      y: 4
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "VT",
      name: "Vermont",
      region: "Northeast",
      x: 1,
      y: 10
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "VA",
      name: "Virginia",
      region: "South",
      x: 5,
      y: 8
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "WA",
      name: "Washington",
      region: "West",
      x: 2,
      y: 1
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "WV",
      name: "West Virginia",
      region: "South",
      x: 4,
      y: 7
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "WI",
      name: "Wisconsin",
      region: "Midwest",
      x: 2,
      y: 5
    },
    {
      members: [],
      count: 0,
      value: null,
      abbreviation: "WY",
      name: "Wyoming",
      region: "West",
      x: 3,
      y: 3
    }
  ].map(s => {
    return {
      ...s,
      name: s.name.toUpperCase()
    };
  });

  let mapData = [];
  Highcharts.data({
    googleSpreadsheetKey: "1dq0elY4kkqXbjhpwDB5u43sAjm-wDiZixlvgmoKK4TM",
    googleSpreadsheetWorksheet: 1,
    switchRowsAndColumns: true,
    parsed: function(columns) {
      columns.forEach((column, i) => {
        if (i === 0) return;
        let state = states.find(s => s.abbreviation === column[2]);
        if (state) {
          state.members.push(column);
          state.count = state.count + 1;

          state.value = state.value || 0;
          state.value +=
            column[1] === "Democrat"
              ? 1
              : column[1] === "Independent"
                ? "2"
                : 0;

          state.value = state.value / state.count;
        }

        mapData.push(state);
      });
      let noMembers = states.filter(s => !s.members.length);

      renderTilemap(mapData.concat(noMembers));
    }
  });

  function renderTilemap(mapData) {
    console.log(mapData);
    Highcharts.chart("tilemap", {
      chart: {
        type: "tilemap",
        inverted: true,
        height: "85%"
      },

      title: {
        text: "Geographic Diversity"
      },

      subtitle: {
        text: "Geographic Diversity of Study Sample Group of Members"
      },

      credits: {
        enabled: true,
        href: false,
        text: "CSIS"
      },

      xAxis: {
        visible: false
      },

      yAxis: {
        visible: false
      },

      colorAxis: {
        // minColor: "#ee402f",
        // maxColor: "#79c5e6",
        dataClasses: [
          {
            from: 0,
            to: 0.001,
            color: "#ee402f",
            name: "Republican"
          },
          {
            from: 0.001,
            to: 0.66,
            color: "#B4838B",
            name: "Mixed"
          },

          {
            from: 0.66,
            to: 1.1,
            color: "#79c5e6",
            name: "Democrat"
          },
          {
            from: 2,
            color: "#CCCC00",
            name: "Independent"
          }
        ]
      },

      // legend: {
      //   labelFormatter: function() {
      //     return this.from === 0
      //       ? "Republican"
      //       : this.to === 1
      //         ? "Democrat"
      //         : this.from === 2
      //           ? "Independent"
      //           : "";
      //   }
      // },

      tooltip: {
        headerFormat:
          '<span style="font-size:18px;color:{point.color}">● </span><b>{point.key}</b><br>',
        pointFormatter: function() {
          let members = this.members
            .map(m => {
              let color =
                m[1] === "Democrat"
                  ? "#79c5e6"
                  : m[1] === "Republican"
                    ? "#ee402f"
                    : "#CCCC00";

              return `<span style="font-weight:bold;color:${color}">• </span>${
                m[3]
              }: ${m[0]}<br>`;
            })
            .join("");
          return members.replace(",", "");
        }
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: "{point.abbreviation}",
            color: "#ffffff",
            style: {
              textOutline: false
            }
          }
        }
      },

      series: [
        {
          nullColor: "#cccccc",
          pointPadding: 0.5,
          name: "",
          data: mapData
        }
      ]
    });
  }

  Highcharts.chart("treemap", {
    colorAxis: {
      minColor: "#f0e6e8",
      maxColor: "#B4838B"
    },
    credits: {
      enabled: true,
      href: false,
      text: "CSIS"
    },
    plotOptions: {
      treemap: {
        borderColor: "#ffffff",
        borderWidth: 3,
        dataLabels: {
          style: {
            color: "#white",
            textOutline: false,
            fontSize: ".8rem"
          }
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "squarified",
        data: [
          {
            name: "Foreign Affairs/ Relations",
            value: 16
          },
          {
            name: "Appropriations",
            value: 14
          },
          {
            name: "Budget",
            value: 10
          },
          {
            name: "Finance/ Ways and Means",
            value: 10
          },
          {
            name: "Intelligence ",
            value: 9
          },
          {
            name: "Armed Services",
            value: 8
          },
          {
            name:
              "Health, Education, Labor and Pensions/ Education and the Workforce",
            value: 8
          },
          {
            name: "Homeland Security/ Oversight and Government Reform",
            value: 8
          },
          {
            name: "Rules",
            value: 7
          },
          {
            name: "Banking/ Financial Services",
            value: 7
          },
          {
            name: "Energy and Natural Resources/ Energy and Commerce",
            value: 6
          },
          {
            name: "Judiciary",
            value: 6
          },
          {
            name: "Agriculture",
            value: 5
          }
        ].map(c => {
          return { ...c, colorValue: c.value };
        })
      }
    ],
    title: {
      text: "Committee Affiliation"
    }
  });

  $([
    "Alliance Ratings by Party",
    "Security Assistance Ratings by Party",
    "Humanitarian, Development and Global Health Assistance Ratings by Party",
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
        type: "column",
        height: "300px"
      },
      exporting: { enabled: true },
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
        text: "CSIS"
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
        gridLineWidth: 1,
        gridLineColor: "#000000",
        title: {
          text: "Response Count"
        }
      },
      xAxis: {
        gridLineWidth: 0,
        labels: {
          formatter: function() {
            return this.value === 1
              ? `${this.value}<br>Oppose`
              : this.value === 7
                ? `${this.value}<br>Support`
                : this.value === "."
                  ? ``
                  : `${this.value}`;
          }
        }
      },
      tooltip: {
        headerFormat: ""
      },
      // Additional Plot Options
      plotOptions: {
        column: {
          stacking: null,
          borderColor: "transparent",
          groupPadding: 0.1,
          pointPadding: 0.05,
          // pointWidth: 33,
          dataLabels: {
            enabled: false
          }
        }
      }
    });

    $(`#hcContainer-foreign-aid`).highcharts({
      // Load Data in from Google Sheets
      data: {
        googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
        googleSpreadsheetWorksheet: 4
      },
      // General Chart Options
      chart: {
        zoomType: "x",
        type: "column",
        height: "300px"
      },
      exporting: { enabled: true },
      // Chart Title and Subtitle
      title: {
        text: "Average Foreign Aid Ratings by Party"
      },
      subtitle: {
        text: ""
      },
      // Credits
      credits: {
        enabled: true,
        href: false,
        text: "CSIS"
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
        gridLineWidth: 1,
        gridLineColor: "#000000",
        title: {
          text: "Average Rating"
        }
      },
      xAxis: {
        gridLineWidth: 0,
        labels: {
          formatter: function() {
            return this.value === 1
              ? `${this.value}<br>Oppose`
              : this.value === 7
                ? `${this.value}<br>Support`
                : this.value === "."
                  ? ``
                  : `${this.value}`;
          }
        }
      },
      tooltip: {
        headerFormat: ""
      },
      // Additional Plot Options
      plotOptions: {
        column: {
          stacking: null,
          borderColor: "transparent",
          groupPadding: 0.1,
          pointPadding: 0.05,
          // pointWidth: 33,
          dataLabels: {
            enabled: false
          }
        }
      }
    });
    $(`#hcContainer-iran-policy`).highcharts({
      // Load Data in from Google Sheets
      data: {
        googleSpreadsheetKey: "16ZwPbeZX5gM7Ejz6sbH0Lr9ukqocqhNQM4DuaRE1T24",
        googleSpreadsheetWorksheet: 8
      },
      // General Chart Options
      chart: {
        zoomType: "x",
        type: "column",
        height: "300px"
      },
      exporting: { enabled: true },
      // Chart Title and Subtitle
      title: {
        text: "Iran Policy Response Ratings by Party"
      },
      subtitle: {
        text: ""
      },
      // Credits
      credits: {
        enabled: true,
        href: false,
        text: "CSIS"
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
        gridLineWidth: 1,
        gridLineColor: "#000000",
        title: {
          text: "Response Count"
        }
      },
      xAxis: {
        gridLineWidth: 0,
        labels: {
          formatter: function() {
            return this.value === 1
              ? `${this.value}<br>More Coercive Engagement`
              : this.value === 7
                ? `${this.value}<br>Less Coercive Engagement`
                : this.value === "."
                  ? ``
                  : `${this.value}`;
          }
        }
      },
      tooltip: {
        headerFormat: ""
      },
      // Additional Plot Options
      plotOptions: {
        column: {
          stacking: null,
          borderColor: "transparent",
          groupPadding: 0.1,
          pointPadding: 0.05,
          // pointWidth: 33,
          dataLabels: {
            enabled: false
          }
        }
      }
    });
  });
});
