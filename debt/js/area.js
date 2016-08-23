$(function() {
  Highcharts.setOptions({
                      lang: { thousandsSep: ",",
  numericSymbols: ['K', ' M', 'B', 'T']}
                  });
  $('#hcContainer').highcharts({
    data: {
      googleSpreadsheetKey: '18ssNn-aaM0kTAJJSnSauR8njvWH6mMX9RABG0Nx1p1o',
      switchRowsAndColumns: true
    },
    chart: {
      type: 'area',
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      plotShadow: true
    },
    credits: {
                            enabled: true,
                            href: "http://csis.org",
                            text: "CSIS China Power Project | Source: U.S. Treasury"
                        },
                        title: {
                            text: "Holders of U.S. Debt"
                        },
                        subtitle: {
                            text: "Foreign entity figures calculated from long-term treasury holdings"
                        },
                        tooltip: {
                            valuePrefix: "$"
                        },
                        xAxis: {
                          tickInterval: 1,
                          tickmarkPlacement: 'on'
                        },
                        yAxis: {
                            title: { text: "In trillions of dollars" }
                        },
                        colors: ['#4D6E79', '#303D43', '#907561', '#781F30', '#EC382A', '#61884D', '#C9AC4D', '#52496D', '#5AA992', '#887295', '#2576CE', '#aa266a'],
                        legend: {
    title: {
                    text: 'Entity<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
                    style: {
                        fontStyle: 'italic'
                    }
                },
                            align: 'right',
                            verticalAlign: 'middle',
                            layout: 'vertical',
                            itemHoverStyle: {
                               color: '#781F30'
                            }
                        },
    plotOptions: {
                            area: {
                                stacking: "normal",
                                marker: { enabled: false, symbol: "circle" }
                            }
                        }
});
});
