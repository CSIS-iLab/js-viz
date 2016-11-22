$(function () {
	var chart;
	var categories = ['College', 'Senior', 'Junior', 'Primary', 'None'];

	var options = {
		chart: {
            type: 'bar',
			style: {
                fontFamily: 'Roboto Slab'
            },
            marginTop: 20,
            plotBorderColor: "#ECECEC",
            plotBorderWidth: 1
        },
        title: {
            text: null
        },
        credits: {
			enabled: true,
			href: null,
			text: 'CSIS China Power Project | <a href="http://www.stats.gov.cn/tjsj/ndsj/2015/indexeh.htm" target="_new">China Statistical Yearbook 2015</a>'
		},
		colors: ["#303D43", "#5AA993", "#53496E", "#7F4B9D"],
        xAxis: [{
            categories: categories,
            reversed: false,
            labels: {
                step: 1,
                padding: 0
            },
            alternateGridColor: '#E6E7E9',
            lineColor: "#ECECEC",
            tickWidth: 0
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: categories,
            linkedTo: 0,
            labels: {
                step: 1,
                padding: 0
            },
            alternateGridColor: '#E6E7E9',
            lineColor: "#ECECEC",
            tickWidth: 0
        }],
        yAxis: {
            title: {
                text: "Percentage of Population"
            },
            labels: {
                formatter: function () {
                    return Math.abs(this.value) + '%';
                },
                style: {
		            textOverflow: 'none'
		        }
            },
            gridLineWidth: 0,
            max: 60,
            ceiling: 60,
            floor: -60,
            min: -60,
            endOnTick: false,
            tickInterval: 20
        },

        plotOptions: {
            series: {
                stacking: "normal",
                groupPadding: 0,
                pointPadding: 0
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ': ' + this.point.category + '</b><br/>' + Math.abs(this.point.y) + '%';
            }
        },

        series: [{
            name: 'Left Male',
            data: null,
            stack: 'male',
        },
        {
            name: 'Left Female',
            data: null,
            stack: 'female',
        },
        {
            name: 'Right Male',
            data: null,
            stack: 'male',
        },
        {
            name: 'Right Female',
            data: null,
            stack: 'female',
        },
        
        
        ],

    //     responsive: {
    //         rules: [{
    //         	condition: {
    //         		maxWidth: 503
    //         	},
    //         	chartOptions: {
    //         		xAxis: {
    //         			categories: ['test','test','test','test','test']
    //         		}
				// }
    //         }]
    //     }
    // 	responsive: {
	   //    rules: [{
	   //        	condition: {
	   //            	maxWidth: 500,
	   //            	callback: function() {
    //             	// var maxWidth = this.containerWidth;
    //             	// if(maxWidth <= 503) {
    //             		this.axes[1].categories = ['','','','',''];
    //             		this.axes[0].options.labels.rotation = 270;
    //             	// }
    //             	// else {
    //             		// this.axes[1].categories = categories;
    //             		// this.axes[0].options.labels.rotation = 0;
    //             	// }
					
				// 	return true;
				// }
	   //        	},
	          	
	   //    	}]
	  	// }
	};

	var googleSpreadsheetKey = "1wjo9UVjnL2N22ukdwI5B4CC4RKLEbW3fqWNNCx-no_0";
	var dataObj = {};

	$.getJSON('https://spreadsheets.google.com/feeds/cells/' +
		googleSpreadsheetKey + '/' + 'oxxz341' +
		'/public/values?gid=2052447835&alt=json-in-script&callback=?', function(data) {
			var cells = data.feed.entry,
			cellCount = cells.length,
			colCount = 12,
			rowCount = 32,
			cell;

		    for (i = colCount; i < cellCount; i++) {
		        cell = cells[i],
		        col = +cell.gs$cell.col;
		        value = cell.content.$t;
		        var provinceCode;

		        if (col === 1) {
		        	var row = {
		        		name: value,
		        		maleLeft: { data:[] },
		        		femaleLeft: { data:[] },
		        		maleRight: { data:[] },
		        		femaleRight: { data:[] },
		        	};
		        } else if (col === 2) {
		          provinceCode = value;
		        } else if (3 <= col && col <= colCount) {

		        	// Male Values (even columns)
		        	if(col % 2 == 0) {
		        		row.maleRight.stack = "male";
		        		row.maleRight.data.unshift(parseFloat(value));

		        		row.maleLeft.stack = "male";
		        		row.maleLeft.data.unshift(-Math.abs(parseFloat(value)));
		        	}
		        	else {
		        		row.femaleRight.stack = "female";
		        		row.femaleRight.data.unshift(parseFloat(value));

		        		row.femaleLeft.stack = "female";
		        		row.femaleLeft.data.unshift(-Math.abs(parseFloat(value)));
		        	}
		        	if (col === colCount) {
		            	dataObj[provinceCode] = row;
		          	}
		        }
		    }

			//Populate Left Side of Chart (0 = Male, 1 = Female)
			options.series[0].data = dataObj.AH.maleLeft.data;
			options.series[0].name = "Anhui Male";

			options.series[1].data = dataObj.AH.femaleLeft.data;
			options.series[1].name = "Anhui Female"; 

			// Populate Right Side of Chart (2 = Male, 3 = Female)
			options.series[2].data = dataObj.BJ.maleRight.data;
			options.series[2].name = "Beijing Male";

			options.series[3].data = dataObj.BJ.femaleRight.data;
			options.series[3].name = "Beijing Female"; 

			// Create the chart
			chart = Highcharts.chart('container', options);

	});

	var selectedLeft = "AH";
	var selectedRight = "BJ";

	// Switch Between Datasets on Left Side
	$(".selectLeft").change(function (){
		province = $(this).val();

		// Prevent user from choosing this province on the other side; allow user to choose old option
		selectedLeft = province;
		$(".selectRight option:disabled").attr("disabled",false);
		$(".selectRight option[value='"+province+"']").attr("disabled",true);

		// Switch Legend Title
		chart.series[0].update({name: dataObj[province].name + " Male"}, false);
		chart.series[1].update({name: dataObj[province].name + " Female"}, false);

		// Switch Data Sets
		chart.series[0].setData(dataObj[province].maleLeft.data);
		chart.series[1].setData(dataObj[province].femaleLeft.data);
	});

	// Switch Between Datasets on Right Side
	$(".selectRight").change(function (){
		province = $(this).val();

		// Prevent user from choosing this province on the other side; allow user to choose old option
		selectedRight = province;
		$(".selectLeft option:disabled").attr("disabled",false);
		$(".selectLeft option[value='"+province+"']").attr("disabled",true);

		// Switch Legend Title
		chart.series[2].update({name: dataObj[province].name + " Male"}, false);
		chart.series[3].update({name: dataObj[province].name + " Female"}, false);

		// Switch Data Sets
		chart.series[2].setData(dataObj[province].maleRight.data);
		chart.series[3].setData(dataObj[province].femaleRight.data);
	});

});