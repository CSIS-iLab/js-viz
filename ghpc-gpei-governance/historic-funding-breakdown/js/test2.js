$(function () {
    // Set default values for drilldown, y, and name
    var drilldown = "";
    var dataArray = {};
    var drilldownArray = [];
    var value =

        Highcharts.data({
            googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
            googleSpreadsheetWorksheet: 2,
            enablePolling: false,
            switchRowsAndColumns: true,
            parsed: function (columns) {
                $.each(columns, function (i, row) {
                    // Loop through all rows but the first row
                    if (i < 0) {
                        // Get the drilldown & value

                    }
                })
            }
        })


})