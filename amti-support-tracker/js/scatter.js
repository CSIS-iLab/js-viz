$(function () {
  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: 'PT Sans'
      }
    }
  });
  $('#hcContainer').highcharts({
    chart: {
      type: 'scatter',
      zoomType: 'xy',
      backgroundColor: '#f2f2f2'
    },
    title: {
      text: 'Links Between Arbitration Support, Corruption, and Governance'
    },
    subtitle: {
      text: 'Source: CPI/Freedom House'
    },
    credits: {
      text: 'CSIS/Asia Maritime Transparency Initiative',
      href: 'https://amti.csis.org'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Corruption Perceptions Index'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      ceiling: 100,
      title: {
        text: 'Freedom House Ranking'
      }
    },
    legend: {
      enabled: true,
      title: {
        text: 'Stances<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to toggle)</span>'
      },
      layout: 'horizontal'
    },
    plotOptions: {
      scatter: {
        dataLabels: {
          format: "{point.name}",
          enabled: true
        },
        marker: {
          radius: 5,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: true
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{point.key}</b><br>',
          pointFormat: '{point.x} CPI Rating, {point.y} Freedom House Score'
        }
      }
    },
    series: [{
      name: 'Opposing Arbitration Ruling',
      color: 'rgba(223, 83, 83, 1)',
      data: [
        {
          "name":"China",
          "x":37,
          "y":16
        }, {
          "name": "Montenegro",
          "x":44,
          "y":70
        }, {
          "name": "Pakistan",
          "x":30,
          "y":41
        }, {
          "name": "Sudan",
          "x":12,
          "y":6
        }, {
          "name": "Taiwan",
          "x":62,
          "y":89
        }]
      }, {
        name: 'Making Neutral Statements, without Addressing Ruling',
        color: 'rgba(221, 199, 181, 1)',
        data: [
          {
            "name":"Algeria",
            "x":36,
            "y":35
          }, {
            "name": "Cambodia",
            "x":21,
            "y":32
          }, {
            "name": "Hungary",
            "x":51,
            "y":79
          }, {
            "name": "Indonesia",
            "x":36,
            "y":65
          }, {
            "name": "Laos",
            "x":25,
            "y":12
          }, {
            "name": "Russia",
            "x":29,
            "y":22
          }, {
            "name": "Serbia",
            "x":40,
            "y":78
          },
          {
            "name": "Syria",
            "x":18,
            "y":0
          },
          {
            "name": "Thailand",
            "x":38,
            "y":32
          }]
        }, {
          name: 'Positively Acknowledging Ruling, but Calling for Compliance',
          color: 'rgba(180, 213, 224, 1)',
          data: [
            {
              "name":"Belgium",
              "x":77,
              "y":96
            }, {
              "name": "Bosnia & Herzegovina",
              "x":38,
              "y":57
            }, {
              "name": "Bulgaria",
              "x":41,
              "y":80
            }, {
              "name": "Croatia",
              "x":51,
              "y":87
            }, {
              "name": "Cyprus",
              "x":61,
              "y":94
            }, {
              "name": "Czech Republic",
              "x":56,
              "y":95
            }, {
              "name": "Denmark",
              "x":91,
              "y":98
            }, {
              "name": "Estonia",
              "x":70,
              "y":94
            },
            {
              "name": "Finland",
              "x":90,
              "y":100
            },
            {
              "name": "France",
              "x":70,
              "y":91
            },
            {
              "name": "Germany",
              "x":81,
              "y":95
            },
            {
              "name": "Greece",
              "x":46,
              "y":83
            },
            {
              "name": "Hungary",
              "x":51,
              "y":79
            },
            {
              "name": "Ireland",
              "x":75,
              "y":96
            },
            {
              "name": "India",
              "x":38,
              "y":77
            },
            {
              "name": "Italy",
              "x":44,
              "y":89
            },
            {
              "name": "Latvia",
              "x":55,
              "y":86
            },
            {
              "name": "Lithuania",
              "x":61,
              "y":91
            },
            {
              "name": "Luxembourg",
              "x":81,
              "y":98
            },
            {
              "name": "Malaysia",
              "x":50,
              "y":45
            },
            {
              "name": "Malta",
              "x":56,
              "y":96
            },
            {
              "name": "Myanmar",
              "x":22,
              "y":28
            },
            {
              "name": "Netherlands",
              "x":87,
              "y":99
            },
            {
              "name": "Poland",
              "x":62,
              "y":93
            },
            {
              "name": "Portugal",
              "x":63,
              "y":97
            },
            {
              "name": "Romania",
              "x":46,
              "y":83
            },
            {
              "name": "Singapore",
              "x":85,
              "y":51
            },
            {
              "name": "Slovakia",
              "x":51,
              "y":89
            },
            {
              "name": "Slovenia",
              "x":60,
              "y":92
            },
            {
              "name": "South Korea",
              "x":56,
              "y":83
            },
            {
              "name": "Spain",
              "x":58,
              "y":95
            },
            {
              "name": "Sweden",
              "x":89,
              "y":100
            },
            {
              "name": "U.K.",
              "x":81,
              "y":95
            }]
          }, {
            name: 'Calling for Ruling to be Respected',
            color: 'rgba(25, 142, 212, 1)',
            data: [
              {
                "name":"Australia",
                "x":79,
                "y":98
              },
              {
                "name":"Canada",
                "x":83,
                "y":99
              },
              {
                "name":"Japan",
                "x":75,
                "y":96
              },
              {
                "name":"New Zealand",
                "x":88,
                "y":98
              },
              {
                "name":"Philippines",
                "x":35,
                "y":65
              },
              {
                "name":"U.S.",
                "x":76,
                "y":90
              }, {
                "name": "Vietnam",
                "x":31,
                "y":20
              }
            ]
          }],
          exporting: {
            buttons: {
              contextButton: {
                text: 'Share Chart'
              }
            }
          }
        });
      });
