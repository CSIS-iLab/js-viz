// main series array of one object
//      object has 
//D          name of series (contributions)
//D          colorByPoint F
//D          data which is an array of objects
//              name of donor group
//              y - total group contributions
//              drilldown (name of donor group again)




// drilldown is an object with 1 item - series
//      series is an array of objects
//          name (name of donor group from level1)
//          id (name of donor group from level1)
//          data which is an array of arrays
//              donor
//              y - donor contribution amount


// Set default values for series and drilldownseries
var seriesArray = []
var seriesObj = {
    name: "Contributions",
    colorByPoint: false,
    // array of objects
    data: []
}
var drilldownSeries = {
    // array of objects
    series: []
}

Highcharts.data({
    // Load Data in from Google Sheets
    googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
    googleSpreadsheetWorksheet: 2,
    switchRowsAndColumns: true,
    parsed: function parsed(columns) {
        // create default variables
        var seriesData = []
        var group = ""
        var drilldownName = ""
        var drilldownSeriesArray = []
        var drilldownID = ""
        var drilldownData = []

        // iterate over data
        columns.forEach(function (row, i) {
            // skip first row
            if (i == 0) {
                return
            }
            var groupRow = row[0]
            var donor = row[1]
            var amount = row[2]
            // console.log(group)
            // console.log(donor)
            // console.log(amount)

            // check if group name exists in root series
            if (group !== groupRow) {
                group = groupRow
                // if group doesn't exist, create group (name, y, drilldown name)
                seriesData.push({ "name": group, "y": amount, "drilldown": group })
            } else {
                // if group exists, add value to y
                objIndex = seriesData.findIndex((obj => obj.name == groupRow))
                seriesData[objIndex].y += amount
            }
            // check if donor/group relationship exists in drilldown series
            // if (donor)
            // if relationship exists, add value to y
            // if relationship doesn't exist, push new array of donor and value to the drilldown group's data array

        })
        seriesObj.data.push(seriesData)
        console.log(seriesObj)





    }
})
