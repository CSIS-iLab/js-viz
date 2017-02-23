// Main

$(function () {

    // ================================================= //
    // Global variables
    // ================================================= //

    var aqiData,
        currentCity,
        currentYear,
        heatMap,
        barChart,
        prevTargetX = 0,
        mobileWidth = 700,
        isMobile = ($(window).width() < mobileWidth) ? true : false,
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


    // ================================================= //
    // Initialize
    // ================================================= //

    // $.getJSON("data/aqi-data.json", function(data) {
    //     aqiData = data;
    //     initialize(data);
    // });

    $.ajax({
        type: "GET",
        url: "data/aqi-data.csv",
        dataType: "text",
        success: function(data) {initialize(data);}
    });

    function initialize(data) {
        aqiData = processData(data);
        currentCity = 'Beijing';
        currentYear = '2016';
        buildHeatMap();
        buildBarChart();
        // updateChart(aqiData[currentCity][currentYear]);
        updateChart(aqiData['BeijingInit'][currentYear]);
        setDropdownHandler();
    };


    // ================================================= //
    // Event handlers
    // ================================================= //

    function processData(csvText) {
        var csvTextLines = csvText.split(/\r\n|\n/);
        var headers = csvTextLines[0].split(',');
        var lines = [];
        var cityGroup = {};
        var cityData = {};
        var chartData = {};

        // Loop through CSV lines, skipping the header
        // Parse each line into JSON format
        for (var i = 1; i < csvTextLines.length; i++) {
            var line = csvTextLines[i].split(',');

            if (line.length == headers.length) {
                var obj = {};
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = line[j];
                }
                lines.push(obj);
            }
        }

        // Group data by city
        cityGroup = _.groupBy(lines, function(item){ return item['city']; });

        // Group data by year in each city
        for (var key in cityGroup) {
            var years = _.groupBy(cityGroup[key], function(item){ return item['year']; });
            cityData[key] = years;
        }

        // Loop through cities
        for (var city in cityData) {

            chartData[city] = {};

            // Loop through years
            for (var year in cityData[city]) {

                chartData[city][year] = {};

                var x = 0; // Month counter
                chartData[city][year]['aqi'] = [];
                chartData[city][year]['rainfall'] = [];

                // Loop through months
                for (var month in cityData[city][year]) {

                    chartData[city][year]['rainfall'].push([]);

                    var y = 2;
                    var rainfall = parseFloat(cityData[city][year][month]['rainfall']);
                    var aqi_high = parseFloat(cityData[city][year][month]['aqi_high']);
                    var aqi_avg = parseFloat(cityData[city][year][month]['aqi_avg']);
                    var aqi_low = parseFloat(cityData[city][year][month]['aqi_low']);

                    // Populate AQI cityData
                    for (var i = 0; i < 3; i++) {
                        var o = {};
                        o['x'] = x;
                        o['y'] = y;
                        if (i == 0) { o['value'] = Math.round(aqi_high); }
                        else if (i == 1) { o['value'] = Math.round(aqi_avg); }
                        else { o['value'] = Math.round(aqi_low); }
                        chartData[city][year]['aqi'].push(o);
                        y--;
                    }

                    // Populate rainfall cityData
                    chartData[city][year]['rainfall'][x].push(months[x]);
                    chartData[city][year]['rainfall'][x].push(rainfall);
                    x++; // Increment month counter
                }
            }
        }

        return chartData;
    }

    function triggerHover(event) {
        // Grab current heatmap x coordinate
        var targetX = event.target.x;
        // Set hover state to target
        barChart.series[0].data[targetX].setState('hover');
        barChart.tooltip.refresh(barChart.series[0].data[targetX]);
        // Set previous target helper
        prevTargetX = targetX;
    }

    function resetHover() {
        // Reset hover state of previous target
        barChart.series[0].data[prevTargetX].setState();
        barChart.tooltip.hide();
        // Reset previous target helper
        prevTargetX = 0;
    }

    function setDropdownHandler() {
        $('.aq-dropdown').change(function() {
            currentCity = $('.aq-city-select').val();
            currentYear = $('.aq-year-select').val();
            updateChart(aqiData[currentCity][currentYear]);
        });
    }

    function updateChart(data) {
        heatMap.series[0].setData(data['aqi'], true, true, true);
        barChart.series[0].setData(data['rainfall'], true, true, true);
    }


    // ================================================= //
    // Chart constructors
    // ================================================= //

    function buildHeatMap() {
        var yAxisCategories = (isMobile) ? ['Lo', 'Avg', 'Hi'] : ['Low AQI', 'Avg. AQI', 'High AQI'],
            marginLeft = (isMobile) ? 35 : 68,
            ttDefault = {
                formatter: function () {
                    var value = (this.point.value > 500) ? '>500' : this.point.value;
                    return '<div class="aq-heatmap-tooltip"><p>' + value + '</p></div>';
                },
                hideDelay: 100,
                animation: false,
                borderWidth: 0,
                shadow: false,
                useHTML: true,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                positioner: function(labelWidth, labelHeight, point) {
                    var x = (point.plotX + heatMap.plotLeft) - (labelWidth/2),
                        y = (point.plotY + heatMap.plotTop) - (labelHeight/2);
                    return {x: x, y: y}
                }
            },
            ttMobile = {
                formatter: function () {
                    var value = (this.point.value > 500) ? '>500' : this.point.value;
                    return '<span style="font-size:11px;color:#999;">AQI</span><br/><b style="font-size:14px;color:#232323;font-weight:bold;">' + value + '</b>';
                },
                hideDelay: 100,
                shadow: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                style: {
                    fontWeight: 'normal',
                    fontSize: 14
                }
            },
            tooltip = (isMobile) ? ttMobile : ttDefault;

        // Heatmap constructor
        heatMap = new Highcharts.Chart({
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 26,
                marginLeft: marginLeft,
                borderWidth: 0,
                plotBorderWidth: 0,
                renderTo: 'aq-heatmap-container',
                events:{
                    load: function() {
                        this.credits.element.onclick = function() {
                            window.open(
                              'http://beijing.usembassy-china.org.cn/aqirecent3.html',
                              '_blank'
                            );
                        }
                    }
                }
            },
            title: {
                text: ''
            },
            credits: {
                text: 'CSIS China Power Project | Source: U.S. Embassy Beijing Air Quality Monitor',
                href: 'http://beijing.usembassy-china.org.cn/aqirecent3.html',
                position: {
                    x: -40,
                    y: -8
                }
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                opposite: true,
                minorGridLineWidth: 0,
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                categories: yAxisCategories,
                title: null,
                tickLength: 0,
                minorTickLength: 0,
                minorGridLineWidth: 0
            },
            colorAxis: {
                dataClasses: [{
                    from: 0,
                    to: 50,
                    color: '#85C1A1'
                }, {
                    from: 51,
                    to: 100,
                    color: '#FFD160'
                }, {
                    from: 101,
                    to: 150,
                    color: '#EF9365'
                }, {
                    from: 151,
                    to: 200,
                    color: '#DD4760'
                }, {
                    from: 201,
                    to: 300,
                    color: '#973B7A'
                }, {
                    from: 301,
                    color: '#702341'
                }]
            },
            plotOptions: {
                heatmap: {
                    borderColor: '#fff',
                    borderWidth: 0,
                    enableMouseTracking: true,
                    point: {
                        events: {
                            mouseOver: function(event) {
                                triggerHover(event);
                            },
                            mouseOut: function() {
                                resetHover();
                            }
                        }
                    }
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                chartOptions: {
                    title: {
                        text: 'China Air Quality Index'
                    },
                    chart: {
                        marginTop: 65
                    }
                },
                buttons: {
                    contextButton: {
                        align: 'right',
                        x: 0,
                        y: 14,
                        verticalAlign: 'bottom',
                        symbolStroke: '#aaa'
                    }
                }
            },
            tooltip: tooltip,
            series: [{
                borderWidth: 1,
                // data: data,
                dataLabels: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }]
        });
        
        // Fix border radius in safari, firefox
        $('#aq-heatmap-container .highcharts-series rect').attr('rx', '6px');
    };

    function buildBarChart() {
        var marginTop = (isMobile) ? 5 : 20,
            marginLeft = (isMobile) ? 35 : 68;

        // Bar chart constructor
        barChart = new Highcharts.Chart({
            chart: {
                type: 'column',
                marginTop: marginTop,
                marginBottom: 26,
                marginLeft: marginLeft,
                renderTo: 'aq-barchart-container',
                events:{
                    load: function() {
                        this.credits.element.onclick = function() {
                            window.open(
                              'http://www.cma.gov.cn/en2014/',
                              '_blank'
                            );
                        }
                    }
                }
            },
            title: {
                text: ''
            },
            credits: {
                text: 'CSIS China Power Project | Source: China Meteorological Administration',
                href: 'http://www.cma.gov.cn/en2014/',
                position: {
                    x: -40,
                    y: -8
                }
            },
            xAxis: {
                type: 'category',
                labels: {
                    enabled: false
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Precipitation (mm)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#ccc'
                }, {
                    value: 50,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 100,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 150,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 200,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 250,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 300,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 350,
                    width: 1,
                    color: '#eee'
                }, {
                    value: 400,
                    width: 1,
                    color: '#eee'
                }]
            },
            legend: {
                enabled: false
            },
            exporting: {
                chartOptions: {
                    title: {
                        text: 'Monthly Precipitation'
                    },
                    chart: {
                        marginTop: 50
                    }
                },
                buttons: {
                    contextButton: {
                        align: 'right',
                        x: 0,
                        y: 14,
                        verticalAlign: 'bottom',
                        symbolStroke: '#aaa'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px;color:#999;">{point.key}. rainfall</span><br/>',
                pointFormat: '<b style="font-size:14px;color:#232323;font-weight:bold;">{point.y}</b> mm',
                hideDelay: 100,
                animation: true,
                borderColor: '#ccc',
                shadow: false,
                style: {
                    'padding': '8px',
                    'text-align': 'center'
                }
            },
            series: [{
                // data: data
            }]
        });
    };
});
