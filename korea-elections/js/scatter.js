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
      zoomType: 'y',
      backgroundColor: '#131A28'

    },
    title: {
      text: 'DPRK PROVOCATIONS & U.S. ELECTIONS',
      style: {
              fontFamily: 'museo sans',
              color:'#fff'
          }
    },
    subtitle: {
      text: 'Source: CSIS Korea Chair',
      style: {
              fontFamily: 'museo sans',
              color:'#fff'
          }
    },
    credits: {
      text: 'CSIS/Beyond Parallel',
      href: 'https://beyondparallel.csis.org'
    },
    xAxis:{

    allowDecimals: false,
    labels: {
      style: {
             color: "#fff"
         }
         },
      title: {
        enabled: true,
        text: 'Year of Election',
        style: {
               color: "#fff"
           }
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      plotLines: [{
                color: '#FF0000',
                width: 4,
                value: 0
            }],
       gridLineWidth: true,
      labels: {
        style: {
               color: "#fff"
           }
           },
           min: -400,
           max: 400,
           tickInterval: 50,
           lineWidth: 1,

      title: {
        text: 'Days Before/After Election',
        style: {
               color: "#fff"
           }
      },

    },
    legend: {
      itemHoverStyle: {
              color: '#ffc726'
          },
   itemStyle: {
              color: '#fff',
              fontWeight: 'light'
      },
      enabled: true,
      title: {
        text: 'Type of Election<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to toggle)</span>',
        style: {
               color: "#fff"
           }
      },
      layout: 'horizontal'
    },
    plotOptions: {
      scatter: {
        dataLabels: {
          format: "{point.name}",
          enabled: false,


        },
        marker: {
          radius: 4,
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
          pointFormat: '{point.y} Days'
        }
      }
    },
    series: [{
      name: 'Congressional',
      color: 'rgba(131, 212, 239, 1)',
      data: [

        {
        "name":"3/10/2003 - Anti-Ship Cruise Missile Launch",
        "x":2002,
        "y":125,
        },
        {
        "name":"2/24/2003 - Anti-Ship Cruise Missile Launch",
        "x":2002,
        "y":111,
        },
        {
        "name":"6/29/2002 - The Second Yeonpyeong Naval Campaign",
        "x":2002,
        "y":-129,
        },
        {
        "name":"12/22/2001 - Territorial Incursion (Maritime)",
        "x":2002,
        "y":318,
        },
        {
        "name":"11/27/2001 - Exchange of Fire (Ground)",
        "x":2002,
        "y":343,
        },
        {
        "name":"6/15/1999 - The First Yeonpyeong Naval Campaign",
        "x":1998,
        "y":224,
        },
        {
        "name":"12/17/1998 - Infiltration and Incursion",
        "x":1998,
        "y":44,
        },
        {
        "name":"8/31/1998 - Intermediate-range Ballistic Missile Launch",
        "x":1998,
        "y":-64,
        },
        {
        "name":"6/22/1998 - Infiltration and Incursion",
        "x":1998,
        "y":-134,
        },
        {
        "name":"10/25/1995 - Infiltration and Incursion",
        "x":1994,
        "y":351,
        },
        {
        "name":"10/17/1995 - Infiltration and Incursion",
        "x":1994,
        "y":343,
        },
        {
        "name":"8/1/1995 - Detainment of South Korean Vessel",
        "x":1994,
        "y":266,
        },
        {
        "name":"5/1/1995 - Exchange of Fire (Maritime)",
        "x":1994,
        "y":174,
        },
        {
        "name":"3/31/1995 - Anti-Ship Cruise Missile Launch",
        "x":1994,
        "y":143,
        },
        {
        "name":"12/17/1994 - Attack on the U.S. Military",
        "x":1994,
        "y":39,
        },
        {
        "name":"6/2/1994 - Anti-Ship Cruise Missile Launch",
        "x":1994,
        "y":-159,
        },
        {
        "name":"5/31/1994 - Anti-Ship Cruise Missile Launch",
        "x":1994,
        "y":-161,
        },
        {
        "name":"7/1/1991 - Short-range Ballistic Missile Launch",
        "x":1990,
        "y":237,
        },
        {
        "name":"6/1/1990 - Short-range Ballistic Missile Launch",
        "x":1990,
        "y":-158,
        },
        {
        "name":"5/1/1990 - Medium-range Ballistic Missile Launch",
        "x":1990,
        "y":-189,
        },

        {
          "name":"8/20/15 - DMZ Exchange of Fire",
          "x":2014,
          "y":289,
        },  {
          "name": "8/4/15 - Land Mine Explosion",
          "x":2014,
          "y":273
}, {
"name": "6/14/15 - Anti-Ship Cruise Missile Launch",
"x":2014,
"y":222
}, {
  "name": "4/3/15 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":150
}, {
"name": "4/2/15 - Short-range Ballistic Missile Launch",
"x":2014,
"y":149
}, {
 "name": "3/13/15 - Short-range Ballistic Missile Launch",
 "x":2014,
 "y":129
}, {
  "name": "3/2/15 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":118
}, {
  "name": "2/8/15 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":96
}, {
  "name": "2/7/15 - Anti-Ship Cruise Missile Launch",
  "x":2014,
  "y":95
}, {
"name": "10/19/14 - DMZ Exchange of Fire",
"x":2014,
"y":-16
}, {
  "name": "10/10/14 - DMZ Exchange of Fire",
  "x":2014,
  "y":-25
}, {
  "name": "10/7/14 - NLL Exchange of Fire",
  "x":2014,
  "y":-28
}, {
  "name": "9/6/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-59
}, {
  "name": "8/14/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-82
}, {
  "name": "7/26/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-101
}, {
  "name": "7/13/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-114
}, {
  "name": "7/9/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-118
}, {
  "name": "7/2/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-125
}, {
  "name": "6/29/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-128
}, {
  "name": "6/26/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-131
}, {
  "name": "5/22/14 - NLL Exchange of Fire",
  "x":2014,
  "y":-166
}, {
  "name": "3/31/14 - NLL Exchange of Fire",
  "x":2014,
  "y":-218
}, {
  "name": "3/26/14 - Medium-range Ballistic Missile Launch",
  "x":2014,
  "y":-223
}, {
  "name": "3/23/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-226
}, {
  "name": "3/22/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-227
}, {
  "name": "3/16/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-233
}, {
  "name": "3/4/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-245
}, {
  "name": "3/3/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-246
}, {
  "name": "2/27/14 - Short-range Ballistic Missile Launch",
  "x":2014,
  "y":-250
}, {
  "name": "6/8/11 - Short-range Surface-to-Air Missile Launch",
  "x":2010,
  "y":218
}, {
  "name": "11/23/10 - Shelling of Yeonpyeong Island",
  "x":2010,
  "y":21
}, {
  "name": "8/9/10 - Artillery Fire",
  "x":2010,
  "y":-85
}, {
  "name": "3/26/10 - Sinking of the ROKS Cheonan",
  "x":2010,
  "y":-221
}, {
  "name": "1/27/10 - Artillery Fire",
  "x":2010,
  "y":-279
}, {
  "name": "11/10/09 - Daecheong Naval Campaign",
  "x":2010,
  "y":-357
}, {
  "name": "6/27/07 - Short-range Ballistic Missile Launch",
  "x":2006,
  "y":232
}, {
  "name": "6/7/07 - Anti-Ship Cruise Missile Launch",
  "x":2006,
  "y":212
}, {
  "name": "5/25/07 - Anti-Ship Cruise Missile Launch",
  "x":2006,
  "y":199
}, {
  "name": "10/9/06 - Nuclear Test",
  "x":2006,
  "y":-29
}, {
  "name": "7/4/06 - Inter-Continental Ballistic Missile/Short-Range Missile Launches",
  "x":2006,
  "y":-126
}, {
  "name": "3/7/06 - Short-range Ballistic Missile Launch",
  "x":2006,
  "y":-245



        }]
      }, {
        name: 'Presidential',
        color: 'rgba(250, 175, 64, 1)',
        data: [

          {
"name":"9/19/2001 - Territorial Incursion (Ground)",
"x":2000,
"y":316,
},
{
"name":"2/5/2001 - Territorial Incursion (Maritime)",
"x":2000,
"y":95,
},
{
"name":"7/16/1997 - Exchange of Fire (Ground)",
"x":1996,
"y":253,
},
{
"name":"5/23/1997 - Anti-Ship Cruise Missile Launch",
"x":1996,
"y":199,
},
{
"name":"4/10/1997 - Exchange of Fire (Ground)",
"x":1996,
"y":156,
},
{
"name":"11/5/1996 - Infiltration and Exchange of Fire (Ground)",
"x":1996,
"y":0,
},
{
"name":"9/30/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":-36,
},
{
"name":"9/28/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":-38,
},
{
"name":"9/22/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":-44,
},
{
"name":"9/21/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":-45,
},
{
"name":"9/19/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":-47,
},
{
"name":"9/18/1996 - Infiltration and Incursion",
"x":1996,
"y":-48,
},
{
"name":"4/5/1996 - Territorial Provocation (Ground)",
"x":1996,
"y":-214,
},
{
"name":"5/29/1993 - Medium-range Ballistic Missile Launch",
"x":1992,
"y":207,
},
{
"name":"6/1/1992 - Medium-range Ballistic Missile Launch",
"x":1992,
"y":-155,
},
{
"name":"5/22/1992 - Infiltration and Incursion",
"x":1992,
"y":-165,
},

          {
            "name":"9/9/16 - Nuclear Test",
            "x":2016,
            "y":-60
          }, {
            "name": "9/5/16 - Medium-range Ballistic Missile Launch",
            "x":2016,
            "y":-64
          }, {
            "name": "8/24/16 - Submarine Launched Ballistic Missile Launch",
            "x":2016,
            "y":-76
          }, {
            "name": "8/3/16 - Medium-range Ballistic Missile Launch",
            "x":2016,
            "y":-97
          }, {
            "name": "7/19/16 - Medium-range Ballistic Missile Launch",
            "x":2016,
            "y":-112
          }, {
            "name": "7/9/16 - Submarine Launched Ballistic Missile Launch",
            "x":2016,
            "y":-122
          }, {
            "name": "6/22/16 - Intermediate-range Ballistic Missile Launch",
            "x":2016,
            "y":-139
          },{
            "name": "5/31/16 - Intermediate-range Ballistic Missile Launch",
            "x":2016,
            "y":-161
          },{
            "name": "4/28/16 - Intermediate-range Ballistic Missile Launch",
            "x":2016,
            "y":-194
          }, {
            "name": "4/23/16 - Submarine Launched Ballistic Missile Launch",
            "x":2016,
            "y":-199
          }, {
            "name": "4/15/16 - Intermediate-range Ballistic Missile Launch",
            "x":2016,
            "y":-207
          }, {
            "name": "4/6/16 - Submarine Launched Ballistic Missile Launch",
            "x":2016,
            "y":-216
          }, {
            "name": "4/1/16 - Long-range Surface-to-Air Missile Launch",
            "x":2016,
            "y":-221
          }, {
            "name": "3/29/16 - Short-range Ballistic Missile Launch",
            "x":2016,
            "y":-224
          }, {
            "name": "3/21/16 - Short-range Ballistic Missile Launch",
            "x":2016,
            "y":-232
          }, {
            "name": "3/18/16 - Medium-range Ballistic Missile Launch",
            "x":2016,
            "y":-235
          }, {
            "name": "3/10/16 - Short-range Ballistic Missile Launch",
            "x":2016,
            "y":-243
          }, {
            "name": "3/3/16 - Short-range Ballistic Missile Launch",
            "x":2016,
            "y":-250
          },
          {
            "name": "2/7/16 - Satellite Launch",
            "x":2016,
            "y":-275
          },
          {
            "name": "1/6/16 - Nuclear Test",
            "x":2016,
            "y":-307
          },
          {
            "name": "11/28/15 - Submarine Launched Ballistic Missile Launch",
            "x":2016,
            "y":-346
          },
          {
            "name": "8/29/13 - Nuclear Fuel Reactor Operation",
            "x":2012,
            "y":296
          },
          {
            "name": "5/20/13 - Short-range Ballistic Missile Launch",
            "x":2012,
            "y":195
          },
          {
            "name": "5/19/13 - Short-range Ballistic Missile Launch",
            "x":2012,
            "y":194
          },
          {
            "name": "5/18/13 - Short-range Ballistic Missile Launch",
            "x":2012,
            "y":193
          }, {
            "name": "4/2/13 - Nuclear Fuel Reactor Operation",
            "x":2012,
            "y":147
          },
          {
            "name": "3/15/13 - Short-range Ballistic Missile Launch",
            "x":2012,
            "y":129
          },
          {
            "name": "2/12/13 - Nuclear Test",
            "x":2012,
            "y":98
          },
          {
            "name": "12/12/12 - Satellite Launch",
            "x":2012,
            "y":36
          },
          {
            "name": "4/13/12 - Satellite Launch",
            "x":2016,
            "y":-207
          },  {
              "name": "3/29/12 - Anti-Ship Cruise Missile Launch",
              "x":2012,
              "y":-222
            },
            {
              "name": "10/12/09 - Short-range Ballistic Missile Launch",
              "x":2008,
              "y":342
            },
            {
              "name": "7/30/09 - Fishing Boat Seizure at NLL",
              "x":2008,
              "y":268
            },
            {
              "name": "7/4/09 - Medium-range Ballistic Missile Launch",
              "x":2008,
              "y":242
            },  {
                "name": "7/2/09 - Short-range Ballistic Missile Launch",
                "x":2008,
                "y":240
              },
              {
                "name": "5/29/09 - Short-range Ballistic Missile Launch",
                "x":2008,
                "y":206
              },  {
                  "name": "5/27/09 - Short-range Ballistic Missile Launch",
                  "x":2008,
                  "y":204
                },
                {
                  "name": "5/16/09 - Short-range Ballistic Missile Launch",
                  "x":2008,
                  "y":203
                },
                {
                  "name": "4/25/09 - Nuclear Test / Short-range missile launch",
                  "x":2008,
                  "y":202
                },
                {
                  "name": "4/5/09 - Satellite Launch",
                  "x":2008,
                  "y":152
                },{
                  "name": "10/7/08 - Anti-Ship Cruise Missile Launch",
                  "x":2008,
                  "y":-28
                },
                {
                  "name": "5/30/08 - Anti-Ship Cruise Missile Launch",
                  "x":2008,
                  "y":-158
                },  {
                    "name": "3/28/08 - Anti-Ship Cruise Missile Launch",
                    "x":2012,
                    "y":-221
                  },
                  {
                    "name": "5/1/05 - Anti-Ship Cruise Missile Launch",
                    "x":2004,
                    "y":180
                  },
                  {
                    "name": "11/1/04 - Territorial Incursion (Maritime)",
                    "x":2004,
                    "y":-1
                  },


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
