let tooltipText = ''
Highcharts.chart("hcContainer", {
  // Load Data in from Google Sheets
  data: {
    googleAPIKey: 'AIzaSyBXuQRRw4K4W8E4eGHoSFUSrK-ZwpD4Zz4',
    googleSpreadsheetKey: "13_uDHtgIt1k_3DFz67tXgByfkuMKvyOuPVK_TmSvwSs",
    googleSpreadsheetRange: "vietnam",
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
  colors: [
    "#004165", // Average
    "#FD8A6D", // Upper middle income countries
    "#FFF1B5", // Latin America & Caribbean
  ],
  //Title
  title: {
    text: "Primary Health Care in Vietnam",
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
      if (this.key == "Nurse and midwife density (per 1,000 population) (2016)") {
        tooltipText = "Nurse and midwife density is the number of nurses and midwives relative to the size of a country’s population (per 1,000 population)."
      } else if (this.key == "Physician density (per 1,000 population) (2017)") {
        tooltipText = "Physician density is the number of physicians relative to the size of a country’s population (per 1,000 population)."
      } else {
        tooltipText = "Child immunization, DPT, measures the percentage of children ages 12-23 months who received DPT vaccinations before 12 months or at any time before the survey. A child is considered adequately immunized against diphtheria, pertussis (or whooping cough), and tetanus (DPT) after receiving three doses of vaccine."
      }
      return `<span style="font-size: 14px;color:${this.color}">\u25A0</span>
      ${this.series.name}: <b>${this.y.toFixed(1)}%</b><br/>
      <span style="font-size: 10px;">${tooltipText}</span>`;
    },
    style: {
      width: '250px',
    },
  },
  // Additional Plot Options
  plotOptions: {
    column: {
      stacking: null, // Normal bar graph
      dataLabels: {
        enabled: true,
        formatter: function () {
          if (this.point.shapeArgs.height < this.point.name.length * 2) {
            return
          } else {
            return this.y.toFixed(1) + '%'
          }
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