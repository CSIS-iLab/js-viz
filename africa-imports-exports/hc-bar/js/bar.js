Highcharts.chart('hcContainer', {
    // Load Data in from Google Sheets
    data: {
      googleSpreadsheetKey: '1foLHWPEeGAYkC1O0CdyO-6fpBMUSUpy7kEdyZD4w0jQ',
      googleSpreadsheetWorksheet: 1
    },
    // General Chart Options
    chart: {
      type: 'bar'
    },
    // Chart Title and Subtitle
    title: {
      text: "State Imports/Exports"
    },
    subtitle: {
      text: ""
    },
    // Color
    colors: ["#0095AB","#004165"],
    // Credits
    credits: {
      enabled: true,
      href: false,
      text: "CSIS Africa Project | Source: NAME"
    },
    // Chart Legend
    legend: {
      title: {
        text: '<span style="font-size: 12px; color: #808080; font-weight: normal">(Click to hide)</span>'
      },
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    // Y Axis
    yAxis: {
      title: { 
        text: "Billions of US$"
      },
      labels: {
        formatter: function () {
          return (this.value / 1000000000);
        }
      }
    },
    // Tooltip
    tooltip: {
      shared: true,
      title: "",
      pointFormatter: function () {
        return `<span style="color:${this.color}">\u25CF </span> ${this.series.name}: 
        <b>$` + Highcharts.numberFormat(this.y/1000000, 0, ".", ",") + ` million</b><br>`;
      },
    },
    // Additional Plot Options
    plotOptions:
    {
      bar: {
        stacking: "normal",
        dataLabels: {
            enabled: false,
        }
      }
    }
  })
