// CSIS China View
// Nick Harbaugh
// http://sevenmilemedia.com

// Globals

var masterData = [];

var initialize = function() {
    initCharts();
};


// Constructors

var initNav = function(y) {
    var years = y.reverse(); // Reverse years array
    var count = years.length;
    var markup = '<ul>';
    // Build markup by looping through years array
    for (i = 0; i < count; i++) {
        var activeClass = (i == count-1) ? 'active' : ''; // Add active class to first nav item
        var m = '<li>'+
                '<a class="'+activeClass+'" href="#" data-value="'+years[i]+'">'+
                    '<p>'+years[i]+'</p>'+
                    '<span></span>'+
                '</a>'+
            '</li>';
        markup += m;
        if (i == count-1) { markup += '</ul>' } // Close unordered list
    }
    // Append markup to DOM
    $('.cv-nav-container').append(markup);
    calculateNavSpacing();
    // Nav click handler
    $('.cv-nav-container a').click(updateNav);
};


// Event handlers

var updateNav = function(e) {
    e.preventDefault();
    var self = $(this);
    var val = self.attr('data-value');
    // Update chart with active year
    updateChart(val);
    // Update active nav item
    $('.cv-nav-container a').removeClass('active');
    self.addClass('active');
};

var calculateNavSpacing = function() {
    var count = $('.cv-nav-container li').length - 1;
    $('.cv-nav-container li').each(function(index) {
        var leftVal = (index / count)*100 + '%';
        $(this).css('left', leftVal);
    });
};

var updateChart = function(newYear) {
    var data = [];
    $.each(masterData[0], function (i, code) {
        // Choose fields with corresponding year
        if (masterData[3][i] == newYear) {
            var val = Math.round(parseFloat(masterData[2][i])*100),
                key = masterData[1][i]
            data.push({
                code: code.toUpperCase(),
                value: val,
                name: key,
                x: i+1,
                y: val
            });
        }
    });

    var names = [];
    var values = [];
    $.each(data, function (i, item) {
        names.push(data[i].name);
        values.push(data[i].value);
    });

    barChart.series[0].setData(values, true, true, true);
    barChart.xAxis[0].update({categories: names}, true);
    // barChart.redraw(true);

    // Update map
    mapChart.series[0].setData(data, true, true, true);

    // Update chart title
    $('.aq-chart-title').html('International Views of China (' + newYear + ')');
};


// Highcharts initializers

var initCharts = function() {
    Highcharts.data({

        googleSpreadsheetKey: '1wIzw2JFgC0EU_aPszsPCBRGBosG-i78o5Ep-cHuF9GU',

        // custom handler when the spreadsheet is parsed
        parsed: function (columns) {

            // Read the columns into the data array
            masterData = columns;
            var data = [];
            var barData = {
                countries: [],
                series: []
            };
            var years = [];
            // Select the latest year
            var year = _.max(columns[3], function(year) { return year; });

            $.each(columns[0], function (i, code) {
                var y = columns[3][i];
                // Choose fields with corresponding year
                if (y == year) {
                    var val = Math.round(parseFloat(columns[2][i])*100),
                        key = columns[1][i]
                    data.push({
                        code: code.toUpperCase(),
                        value: val,
                        name: key,
                        x: i+1,
                        y: val
                    });
                }
                // Populate years array with unique values
                if (i !== 0 && !_.contains(years, y)) {
                    years.push(y);
                }
            });

            initNav(years);
            initBarChart(data);
            initMap(data);
        }
    });
};

var initBarChart = function(data) {
    // Preprocess data for Highcharts bar chart format
    var names = [];
    var values = [];
    $.each(data, function (i, item) {
        names.push(data[i].name);
        values.push(data[i].value);
    });

    // Bar chart constructor
    barChart = new Highcharts.Chart({
        chart: {
            type: 'column',
            marginTop: 10,
            marginBottom: 90,
            renderTo: 'cv-barchart-container'
        },
        plotOptions: {
            column: {
                zones: [{
                    value: 25,
                    color: '#F9DAE1'
                },
                {
                    value: 50,
                    color: '#F0A9BA'
                }, {
                    value: 75,
                    color: '#E2607F'
                }, {
                    color: '#D30B3B'
                }]
            }
        },
        title: {
            text: ''
        },
        credits: {
            text: 'CSIS China Power Project | Source: Pew Research Center',
            href: 'http://www.pewglobal.org/database/indicator/24/survey/17/',
            position: {
                x: -40,
                y: -5
            }
        },
        xAxis: {
            tickmarkPlacement: 'on',
            categories: names,
            labels: {
                style: {'color': '#aaa', 'font-size': '10px', 'font-weight': 'normal'}
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Favorability (%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#eee'
            }, {
                value: 25,
                width: 1,
                color: '#eee'
            }, {
                value: 50,
                width: 1,
                color: '#eee'
            }, {
                value: 75,
                width: 1,
                color: '#eee'
            }, {
                value: 100,
                width: 1,
                color: '#fff'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            chartOptions: {
                title: {
                    text: 'International Views of China'
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
            headerFormat: '<span style="font-size:11px;color:#999;">{point.key}</span><br/>',
            pointFormat: '<b style="font-size:14px;color:#232323;font-weight:bold;">{point.y}</b>% favorable',
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
            data: values,
            states: {
                hover: {
                    color: '#8C0425'
                }
            },
        }]
    });
};

var initMap = function(data) {
    mapChart = new Highcharts.Map({
        chart: {
            borderWidth: 0,
            renderTo: 'cv-map-container'
        },
        title : {
            text : ''
        },
        credits: {
            text: 'CSIS China Power Project | Source: Pew Research Center',
            href: 'http://www.pewglobal.org/database/indicator/24/survey/17/',
            position: {
                x: -40,
                y: -15
            }
        },
        mapNavigation: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        exporting: {
            chartOptions: {
                title: {
                    text: 'International Views of China'
                },
                chart: {
                    marginTop: 50
                }
            },
            buttons: {
                contextButton: {
                    align: 'right',
                    x: 0,
                    y: 4,
                    verticalAlign: 'bottom'
                }
            }
        },
        colorAxis: {
            minColor: '#333',
            dataClasses: [{
                color: 'rgba(211,11,59,0.15)',
                to: 25
            }, {
                color: 'rgba(211,11,59,0.35)',
                from: 25,
                to: 50
            }, {
                color: 'rgba(211,11,59,0.65)',
                from: 50,
                to: 75
            }, {
                color: 'rgba(211,11,59,1)',
                from: 75,
                to: 100
            }]
        },
        series : [{
            data : data,
            nullColor: '#e5e5e5',
            mapData: Highcharts.maps['custom/world'],
            joinBy: ['iso-a2', 'code'],
            animation: true,
            name: 'Opinion of China',
            states: {
                hover: {
                    color: '#8C0425'
                }
            },
            tooltip: {
                valueSuffix: '% favorable'
            }
        }]
    });
};

// Initialize

$(function () {
    initialize();
});
