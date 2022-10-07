Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    decimalPoint: '.',
  },
})

Highcharts.chart('hcContainer', {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyAImbihK2tiRewSFzuJTF_lcgPlGSr7zcg',
    googleSpreadsheetKey: '12_ks76ZrqO3NcqmqlLtBi9ynpX0Zy9RvsWaprU47u4c',
    googleSpreadsheetRange: 'venezuela-migration',
  },
  // General Chart Options
  chart: {
    type: 'spline',
    spacingBottom: 60,
    height: 500,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif'],
    },
    backgroundColor: '#080808'
  },
  // Colors
  colors: ['#ffb3b3', '#e28080', '#c24c50', '#9f0023'],
  // Chart Title and Subtitle
  accessibility: {
    description:
      'Legal Status of Venezuelans in Their Host Countries (2000–2021)',
  },
  title: {
    text: 'Legal Status of Venezuelans in Their Host Countries (2000–2021)',
    align: 'left',
    style: {
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  subtitle: {
    text: '<b>Refugees</b> include individuals recognized under the 1951 Convention relating to the Status of Refugees, its 1967 Protocol, the 1969 Organization of African Unity (OAU) Convention Governing the Specific Aspects of Refugee Problems in Africa, and the refugee definition contained in the 1984 Cartagena Declaration on Refugees as incorporated into national laws; those recognized in accordance with the UNHCR Statute; individuals granted complementary forms of protection; and those enjoying temporary protection.<br/><br/><b>Asylum seekers</b> are individuals who have sought international protection and whose claims for refugee status have not yet been determined.<br/><br/><b>Venezuelans displaced abroad</b> refers to persons of Venezuelan origin who are likely to be in need of international protection under the criteria contained in the Cartagena Declaration but who have not applied for asylum in the country in which they are present.<br/><br/>Hover over the lines below to see the number for each category.',
    align: 'left',
    style: {
      color: 'white'
    }
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: '<a href="https://www.csis.org/programs/global-health-policy-center" target="_blank">CSIS Global Health Policy Center (GHPC)</a> | Source: UNHCR Refugee Statistics',
    style: {
      fontSize: '11px',
    },
    position: {
      y: -30,
    },
  },
  // Chart Legend
  legend: {
    align: 'left',
    x: -10,
    verticalAlign: 'top',
    layout: 'horizontal',
    symbolRadius: 0,
    itemStyle: {
      color: '#fff',
      fontWeight: 'normal',
    },
    labelFormatter: function () {
      return this.name
    },
  },
  // Y Axis
  yAxis: {
    title: {
      text: 'Number of Venezuelans',
      style: {
        color: 'white'
      }
    },
    max: 6000000,
    tickInterval: 1000000,
    reversedStacks: false,
    startOnTick: false,
    endOnTick: false,
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  xAxis: {
    type: 'year',
    tickInterval: 1,
    accessibility: {
      rangeDescription: 'Range: 2000 to 2021',
    },
    crosshair: true,
    labels: {
      style: {
        color: 'white'
      }
    }
  },
  // Tooltip
  tooltip: {
    headerFormat: '{point.key}<br/>',
    pointFormatter: function () {
      return (
        '<span style="font-size: 14px;color:' +
        this.color +
        '">\u25A0</span> ' +
        this.series.name +
        ': <b> ' +
        new Intl.NumberFormat().format(this.y) +
        '</b><br/>'
      )
    },
    shared: true,
    style: {
      fontSize: '14px',
    },
  },
  // Additional Plot Options
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        style: {
          textOutline: 'none',
          fontWeight: 'normal',
        },
        formatter: function () {
          if (this.x > 2017) return new Intl.NumberFormat().format(this.y)

          if (this.series.index === 3)
            return new Intl.NumberFormat().format(this.y)
        },
      },
    },
  },
})
