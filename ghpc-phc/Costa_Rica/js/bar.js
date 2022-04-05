let tooltipText = ''
Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4',
    googleSpreadsheetKey: "13_uDHtgIt1k_3DFz67tXgByfkuMKvyOuPVK_TmSvwSs",
    googleSpreadsheetRange: "costa_rica",
  },
  // General Chart Options
  chart: {
    type: "column",
    spacingBottom: 60,
    style: {
      fontFamily: ['Source Sans Pro', 'sans-serif']
    }
  },
  // Colors
  // colors: [
  //   "#C52125", // Strongly Disagree
  //   "#FD8A6D", // Disagree
  //   "#FFF1B5", // Neutral
  // ],
  //Title
  title: {
    text: "Primary Health Care in Costa Rica",
    align: "center",
    style: {
      color: 'black',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  // Credits
  credits: {
    enabled: true,
    href: false,
    text: "CSIS GHPC Progam | Source: Goes Here",
    style: {
      fontSize: '11px'
    },
    position: {
      y: -30
    }
  },
  // Y Axis
  yAxis: {
    title: {
      text: ""
    },
    max: 100,
  },
  // Legend
  legend: {
    align: "center", // left, center, right
    x: -10,
    verticalAlign: "bottom", // top, middle, bottom
    layout: "horizontal",
    symbolRadius: 0,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
    },
  },
  // Tooltip
  tooltip: {
    formatter: function() {
      if (this.key == "Life expectancy at birth (2019)") {
        tooltipText = "The number of years a newborn infant would live if the mortality patterns at the time of its birth were to stay the same throughout its life."
      } else if (this.key == "UHC service coverage index (2019)") {
        tooltipText = "Coverage index for essential health services (based on tracer interventions that include reproductive, maternal, newborn and child health, infectious diseases, noncommunicable diseases and service capacity and access). It is presented on a scale of 0 to 100."
      } else {
        tooltipText = "Child immunization, DPT, measures the percentage of children ages 12-23 months who received DPT vaccinations before 12 months or at any time before the survey. A child is considered adequately immunized against diphtheria, pertussis (or whooping cough), and tetanus (DPT) after receiving three doses of vaccine."
      }
      return `<span style="font-size: 14px;color:${this.color}">\u25A0</span>
      ${this.key}: <b>${this.y.toFixed(1)}%</b><br/>
      <span style="font-size: 10px;">${tooltipText}</span>`;
    }
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: null, // Normal bar graph
      dataLabels: {
        enabled: true,
        formatter: function () {
          return this.y.toFixed(1) + '%'
        },
        style: {
          textOutline: 'none',
          fontWeight: 'normal'
        },
        inside: true,
      }
    },
    series: {
      showInLegend: true,
    }
  }
})