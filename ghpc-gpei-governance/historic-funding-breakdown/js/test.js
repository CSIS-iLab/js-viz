$(function () {

    var data = {}
    var datasets
    var seriesData = []

    var drilldownData = {}
    var seriesDrilldown = []
    var yTitle = ''

    Highcharts.data({
        googleSpreadsheetKey: '1VCCDXp4Cj4htKWrSbVM7pZ20k7_Yj9clOYHt60_CH68',
        googleSpreadsheetWorksheet: 2,
        enablePolling: false,
        // beforeParse: function (csv) {
        //   console.log(csv)
        // },
        // googleSpreadsheetKey: '1NyJlNTTLUrdhVjhVWO0f3BYnV4uWnCuUnoyOFaEBn2Q',
        // googleSpreadsheetWorksheet: 1,
        // switchRowsAndColumns: true,
        parsed: function (columns) {
            console.log(columns)
            $.each(columns, function (i, code) {
                if (i == 0) {
                    return
                }

                var level1 = code[0];
                var level2 = code[1];
                var level3 = code[2];
                var level4 = code[3];
                var year = code[4];
                var value_current = code[5];
                var value_constant = code[6];

                // var type = code[0];
                // var series = code[1];
                // var category = code[2];
                // var year = code[3];
                // var value = code[4];

                data[level1] = data[level1] || {}
                data[level1][level2] = data[level1][level2] || {
                    name: level1,
                    colorByPoint: false,
                    data: {},
                    drilldown: true
                }

                // Check to see if we already have data for that year, series, and type. If we do, then add the row's value to the existing values. If we don't, set the other year values.
                if (data[level1][level2].data[year]) {
                    data[level1][level2].data[year].y += value_current
                } else {
                    data[level1][level2].data[year] = {
                        name: year,
                        x: year,
                        y: value_current,
                        label: level2,
                        drilldown: year
                    }
                }

                drilldownData[level1] = drilldownData[level1] || {}
                drilldownData[level1][year] = drilldownData[level1][year] || {
                    name: year,
                    id: year,
                    data: []
                }

                drilldownData[level1][year].data.push(
                    [level3, value_current]
                )
                drilldownData[level1][year].data.sort(function (a, b) {
                    if (b[1] < a[1]) return -1;
                    if (b[1] > a[1]) return 1;
                    return 0;
                })
            })

            datasets = Object.keys(data)

            // Convert data object to array - we no longer need the keys
            var dataArray = $.map(data, function (value, index) {
                return [value];
            });

            // Convert each series & its data property into an array.
            dataArray.forEach(function (value) {
                var series = $.map(value, function (item, index) {
                    var itemData = $.map(item.data, function (dataItem, dataIndex) {
                        return [dataItem];
                    })
                    item.data = itemData
                    return [item];
                });
                seriesData.push(series)
            })

            // Convert drilldown object to array
            var drilldownArray = $.map(drilldownData, function (value, index) {
                return [value];
            })

            drilldownArray.forEach(function (value) {
                var series = $.map(value, function (item, index) {
                    return [item];
                });
                seriesDrilldown.push(series)
            })
            populateSelect()
            renderChart(seriesData[0], seriesDrilldown[0], datasets[0])
        }
    })

    function populateSelect() {
        var options = '';
        $.each(datasets, function (i, dataset) {
            options += '<option value="' + i + '">' + dataset + '</option>';
        })
        $('.datasets').append(options);

        // Destroy & redraw chart so we get smooth animation when switching datasets.
        // $('.datasets').on('change', function() {
        //   var chart = $('#hcContainer').highcharts()
        //   chart.destroy()
        //   renderChart(seriesData[this.value], seriesDrilldown[this.value],datasets[this.value])
        // })
    }


    function renderChart(data, drilldown, dataset) {
        var chartCont = {
            // General Chart Options
            chart: {
                type: 'column',
                zoomType: 'x'
            },
            // Chart Title and Subtitle
            title: {
                text: "Area Chart Multiple Drilldown"
            },
            subtitle: {
                text: "Click a column for a budget breakdown"
            },
            // Credits
            credits: {
                enabled: true,
                href: false,
                text: "CSIS Defense360 | Source: "
            },
            // Chart Legend
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            // X Axis
            xAxis: {
                allowDecimals: false,
                type: 'category',
                tickmarkPlacement: 'on'
            },
            // Y Axis
            yAxis: {
                title: {
                    text: "Budget Authority, in Billions (" + dataset + " Dollars)"
                },
                labels: {
                    formatter: function () {
                        var label = "$" + this.value / 1000 + "B";
                        return label;
                    }
                }
            },
            // Tooltip
            tooltip: {
                valueDecimals: 2,
                valuePrefix: '$',
                valueSuffix: 'M'
            },
            series: data,
            drilldown: {
                series: drilldown
            },
            // Additional Plot Options
            plotOptions:
            {
                series: {
                    stacking: "normal",
                    dataLabels: {
                        enabled: false,
                    }
                },
                column: {
                    dataLabels: {
                        enabled: true,
                    }
                }
            }
        }
        $('#hcContainer').highcharts(chartCont);
    }
});