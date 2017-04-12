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
      text: 'ROK ELECTIONS VS NK PROVOCATIONS',
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
                width: 5,
                value: 0
            }],
       gridLineWidth: false,
      labels: {
        style: {
               color: "#fff"
           }
           },
           min: -700,
           max: 700,
           tickInterval: 100,
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
          headerFormat: '<b>{series.name} Election</b><br><b>Provocation Date & Name:</b> {point.key}<br>',
          pointFormat: '<b>Provocation Window (+ After / - Before):</b> {point.y} Days',
        }
      }
    },
    series: [{
      name: 'National Assembly',
      color: 'rgba(131, 212, 239, 1)',
      data: [

        {
"name":"10/20/2016 - Intermediate-Range Ballistic Missile Launch",
"x":2016,
"y":190,
},
{
"name":"10/15/2016 - Intermediate-Range Ballistic Missile Launch",
"x":2016,
"y":185,
},
{
"name":"9/9/2016 - Nuclear Test",
"x":2016,
"y":149,
},
{
"name":"9/5/2016 - Medium-Range Ballistic Missile Launch",
"x":2016,
"y":145,
},
{
"name":"8/24/2016 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":133,
},
{
"name":"8/3/2016 - Medium-Range Ballistic Missile Launch",
"x":2016,
"y":112,
},
{
"name":"7/19/2016 - Medium-Range Ballistic Missile Launch",
"x":2016,
"y":97,
},
{
"name":"7/9/2016 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":87,
},
{
"name":"6/22/2016 - Intermediate-Range Ballistic Missile Launch",
"x":2016,
"y":70,
},
{
"name":"5/31/2016 - Intermediate-range Ballistic Missile Launch",
"x":2016,
"y":48,
},
{
"name":"4/28/2016 - Intermediate-range Ballistic Missile Launch",
"x":2016,
"y":15,
},
{
"name":"4/23/2016 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":10,
},
{
"name":"4/15/2016 - Intermediate-Range Ballistic Missile Launch",
"x":2016,
"y":2,
},
{
"name":"4/6/2016 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":-7,
},
{
"name":"4/1/2016 - Long-Range Surface-to-Air Missile Launch",
"x":2016,
"y":-12,
},
{
"name":"3/29/2016 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-15,
},
{
"name":"3/21/2016 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-23,
},
{
"name":"3/18/2016 - Medium-Range Ballistic Missile Launch",
"x":2016,
"y":-26,
},
{
"name":"3/10/2016 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-34,
},
{
"name":"3/3/2016 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-41,
},
{
"name":"2/7/2016 - Satellite Launch",
"x":2016,
"y":-66,
},
{
"name":"1/6/2016 - Nuclear Test",
"x":2016,
"y":-98,
},
{
"name":"11/28/2015 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":-137,
},
{
"name":"8/20/2015 - DMZ Exchange of Fire",
"x":2016,
"y":-237,
},
{
"name":"8/4/2015 - Land Mine Explosion",
"x":2016,
"y":-253,
},
{
"name":"6/14/2015 - Anti-Ship Cruise Missile Launch",
"x":2016,
"y":-304,
},
{
"name":"5/8/2015 - Submarine Launched Ballistic Missile Launch",
"x":2016,
"y":-341,
},
{
"name":"4/3/2015 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-376,
},
{
"name":"4/2/2015 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-377,
},
{
"name":"3/13/2015 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-397,
},
{
"name":"3/2/2015 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-408,
},
{
"name":"2/8/2015 - Short-Range Ballistic Missile Launch",
"x":2016,
"y":-430,
},
{
"name":"2/7/2015 - Anti-Ship Cruise Missile Launch",
"x":2016,
"y":-431,
},
{
"name":"10/19/2014 - DMZ Exchange of Fire",
"x":2016,
"y":-542,
},
{
"name":"10/10/2014 - DMZ Exchange of Fire",
"x":2016,
"y":-551,
},
{
"name":"10/7/2014 - NLL Exchange of Fire",
"x":2016,
"y":-554,
},
{
"name":"9/6/2014 - Short-range Ballistic Missile Launch",
"x":2016,
"y":-585,
},
{
"name":"4/13/2012 - Satellite Launch",
"x":2012,
"y":2,
},
{
"name":"3/29/2012 - Anti-Ship Cruise Missile Launch",
"x":2012,
"y":-13,
},
{
"name":"6/8/2011 - Short-Range Surface-to-Air Missile Launch",
"x":2012,
"y":-308,
},
{
"name":"11/23/2010 - Shelling of Yeonpyeong Island",
"x":2012,
"y":-505,
},
{
"name":"8/9/2010 - Artillery Fire Near NLL",
"x":2012,
"y":-611,
},
{
"name":"3/26/2010 - Sinking of ROKS Cheonan",
"x":2008,
"y":-716,
},
{
"name":"1/31/2010 - NK Declares No-Sail Zone",
"x":2008,
"y":662,
},
{
"name":"1/29/2010 - Artillery Fire Near NLL",
"x":2008,
"y":-660,
},
{
"name":"1/28/2010 - Artillery Fire Near NLL",
"x":2008,
"y":-659,
},
{
"name":"1/27/2010 - Artillery Fire Near NLL",
"x":2008,
"y":-658,
},
{
"name":"1/26/2010 - NK Declares No-Sail Zone",
"x":2008,
"y":657,
},
{
"name":"11/10/2009 - Daecheong Naval Campaign",
"x":2008,
"y":580,
},
{
"name":"10/12/2009 - Short-range Ballistic Missile Launch",
"x":2008,
"y":551,
},
{
"name":"7/30/2009 - Seizure of Fishing Boat Near NLL",
"x":2008,
"y":477,
},
{
"name":"7/4/2009 - Medium-range Ballistic Missile Launch",
"x":2008,
"y":451,
},
{
"name":"7/2/2009 - Short-range Ballistic Missile Launch",
"x":2008,
"y":449,
},
{
"name":"5/29/2009 - Short-range Ballistic Missile Launch",
"x":2008,
"y":415,
},
{
"name":"5/27/2009 - Short-range Ballistic Missile Launch",
"x":2008,
"y":413,
},
{
"name":"5/26/2009 - Short-range Ballistic Missile Launch",
"x":2008,
"y":412,
},
{
"name":"5/25/2009 - Nuclear Test & Short-range Ballistic Missile Launch",
"x":2008,
"y":411,
},
{
"name":"4/5/2009 - Satellite Launch",
"x":2008,
"y":361,
},
{
"name":"10/7/2008 - Anti-Ship Cruise Missile Launch",
"x":2008,
"y":181,
},
{
"name":"7/11/2008 - Killing of South Korean Tourist at Mt. Kumgang",
"x":2008,
"y":93,
},
{
"name":"5/30/2008 - Anti-Ship Cruise Missile Launch",
"x":2008,
"y":51,
},
{
"name":"3/28/2008 - Anti-Ship Cruise Missile Launch",
"x":2008,
"y":-12,
},
{
"name":"5/1/2005 - Anti-Ship Cruise Missile Launch",
"x":2004,
"y":381,
},
{
"name":"10/20/2003 - Anti-Ship Cruise Missile Launch",
"x":2004,
"y":-178,
},
{
"name":"8/23/2003 - Territorial Incursion (Maritime)",
"x":2004,
"y":-236,
},
{
"name":"6/15/1999 - First Yeonpyeong Naval Campaign",
"x":2000,
"y":-303,
},
{
"name":"11/5/1996 - Exchange of Fire from Manhunt - Final Incident",
"x":1996,
"y":208,
},
{
"name":"9/30/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":172,
},
{
"name":"9/28/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":170,
},
{
"name":"9/22/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":164,
},
{
"name":"9/21/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":163,
},
{
"name":"9/19/1996 - Exchange of Fire (Ground)",
"x":1996,
"y":161,
},
{
"name":"9/18/1996 - Infiltration and Incursion",
"x":1996,
"y":160,
},
{
"name":"4/7/1996 - Territorial Provocation (Ground)",
"x":1996,
"y":-4,
},
{
"name":"4/6/1996 - Territorial Provocation (Ground)",
"x":1996,
"y":-5,
},
{
"name":"4/5/1996 - Territorial Provocation (Ground)",
"x":1996,
"y":-6,
},
{
"name":"10/25/1995 - Infiltration and Incursion",
"x":1996,
"y":-169,
},
{
"name":"10/17/1995 - Infiltration and Incursion",
"x":1996,
"y":-177,
},
{
"name":"8/1/1995 - Detainment of South Korean Vessel",
"x":1996,
"y":-254,
},
{
"name":"3/31/1995 - Anti-Ship Cruise Missile Launch",
"x":1996,
"y":-377,
},
{
"name":"12/17/1994 - U.S. Helicopter Shot Down",
"x":1996,
"y":-481,
},
{
"name":"6/1/1992 - Medium-Range Ballistic Missile Launch",
"x":1992,
"y":69,
},
{
"name":"5/22/1992 - Infiltration and Incursion",
"x":1992,
"y":59,
},
{
"name":"7/1/1991 - Short-Range Ballistic Missile Launch",
"x":1992,
"y":-267,
},
{
"name":"6/1/1990 - Short-Range Ballistic Missile Launch",
"x":1992,
"y":-662,
},
{
"name":"5/1/1990 - Medium-Range Ballistic Missile Launch",
"x":1992,
"y":-693,
},
{
"name":"3/3/1990 - Infiltration and Incursion",
"x":1988,
"y":676,
},
{
"name":"11/29/1987 - Bombing of South Korean Civilian Aircraft",
"x":1988,
"y":-149



        }]
      }, {
        name: 'Presidential',
        color: 'rgba(250, 175, 64, 1)',
        data: [

          {
"name":"4/5/2017 - Medium-range Ballistic Missile Launch",
"x":2017,
"y":-34,
},
{
"name":"3/22/2017 - Failed Ballistic Missile Launch",
"x":2017,
"y":-48,
},
{
"name":"3/6/2017 - Short-range Ballistic Missile Launch",
"x":2017,
"y":-64,
},
{
"name":"2/12/2017 - Medium-range Ballistic Missile Launch",
"x":2017,
"y":-86,
},
{
"name":"8/14/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":603,
},
{
"name":"7/26/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":584,
},
{
"name":"7/13/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":571,
},
{
"name":"7/9/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":567,
},
{
"name":"7/2/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":560,
},
{
"name":"6/29/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":557,
},
{
"name":"6/26/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":554,
},
{
"name":"5/22/2014 - NLL Exchange of Fire",
"x":2012,
"y":519,
},
{
"name":"3/31/2014 - NLL Exchange of Fire",
"x":2012,
"y":467,
},
{
"name":"3/26/2014 - Medium-range Ballistic Missile Launch",
"x":2012,
"y":462,
},
{
"name":"3/23/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":459,
},
{
"name":"3/22/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":458,
},
{
"name":"3/16/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":452,
},
{
"name":"3/4/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":440,
},
{
"name":"3/3/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":439,
},
{
"name":"2/27/2014 - Short-range Ballistic Missile Launch",
"x":2012,
"y":435,
},
{
"name":"5/20/2013 - Short-range Ballistic Missile Launch",
"x":2012,
"y":152,
},
{
"name":"5/19/2013 - Short-range Ballistic Missile Launch",
"x":2012,
"y":151,
},
{
"name":"5/18/2013 - Short-range Ballistic Missile Launch",
"x":2012,
"y":150,
},
{
"name":"3/15/2013 - Short-range Ballistic Missile Launch",
"x":2012,
"y":86,
},
{
"name":"2/12/2013 - Nuclear Test",
"x":2012,
"y":55,
},
{
"name":"12/12/2012 - Satellite Launch",
"x":2012,
"y":-7,
},
{
"name":"3/28/2008 - Anti-Ship Cruise Missile Launch",
"x":2007,
"y":100,
},
{
"name":"6/27/2007 - Short-Range Ballistic Missile Launch",
"x":2007,
"y":-175,
},
{
"name":"6/7/2007 - Anti-Ship Cruise Missile Launch",
"x":2007,
"y":-195,
},
{
"name":"5/25/2007 - Short-Range Ballistic Missile Launch",
"x":2007,
"y":-208,
},
{
"name":"10/9/2006 - Nuclear Test",
"x":2007,
"y":-436,
},
{
"name":"7/4/2006 - Inter-continental and Short-Range Ballistic Missile Launch",
"x":2007,
"y":-533,
},
{
"name":"3/7/2006 - Short-Range Ballistic Missile Launch",
"x":2007,
"y":-652,
},
{
"name":"8/8/2003 - Territorial Incursion (Maritime)",
"x":2002,
"y":232,
},
{
"name":"7/17/2003 - Exchange of Fire (Ground)",
"x":2002,
"y":210,
},
{
"name":"6/1/2003 - Territorial Incursion (Maritime)",
"x":2002,
"y":164,
},
{
"name":"3/10/2003 - Anti-Ship Cruise Missile Launch",
"x":2002,
"y":81,
},
{
"name":"3/2/2003 - Aircraft Interception",
"x":2002,
"y":73,
},
{
"name":"2/24/2003 - Anti-Ship Cruise Missile Launch",
"x":2002,
"y":67,
},
{
"name":"2/20/2003 - Territorial Incursion (Air)",
"x":2002,
"y":63,
},
{
"name":"6/29/2002 - Second Yeonpyeong Naval Campaign",
"x":2002,
"y":-173,
},
{
"name":"12/22/2001 - Territorial Incursion (Maritime)",
"x":2002,
"y":-362,
},
{
"name":"9/20/2001 - Territorial Incursion (Ground)",
"x":2002,
"y":-455,
},
{
"name":"9/19/2001 - Territorial Incursion (Ground)",
"x":2002,
"y":-456,
},
{
"name":"12/17/1998 - Infiltration and Incursion",
"x":1997,
"y":363,
},
{
"name":"11/20/1998 - Infiltration and Incursion",
"x":1997,
"y":336,
},
{
"name":"8/31/1998 - Intermediate-range Ballistic Missile Launch",
"x":1997,
"y":255,
},
{
"name":"7/12/1998 - Infiltration and Incursion",
"x":1997,
"y":205,
},
{
"name":"6/22/1998 - Infiltration and Incursion",
"x":1997,
"y":185,
},
{
"name":"7/16/1997 - Exchange of Fire (Ground)",
"x":1997,
"y":-156,
},
{
"name":"6/5/1997 - Territorial Provocation (Maritime)",
"x":1997,
"y":-197,
},
{
"name":"5/23/1997 - Anti-Ship Cruise Missile Launch",
"x":1997,
"y":-210,
},
{
"name":"4/10/1997 - Exchange of Fire (Ground)",
"x":1997,
"y":-253,
},
{
"name":"6/2/1994 - Anti-Ship Cruise Missile Launch",
"x":1992,
"y":531,
},
{
"name":"5/31/1994 - Anti-Ship Cruise Missile Launch",
"x":1992,
"y":529,
},
{
"name":"5/30/1993 - Medium-range Ballistic Missile Launch",
"x":1992,
"y":163,
},
{
"name":"5/29/1993 - Medium-range Ballistic Missile Launch",
"x":1992,
"y":162,
},
{
"name":"11/29/1987 - Bombing of South Korean Civilian Aircraft",
"x":1987,
"y":-17,
},
{
"name":"11/21/1987 - Exchange of Fire (Ground)",
"x":1987,
"y":-25,
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
