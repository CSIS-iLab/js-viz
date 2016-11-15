	$(function () {

		var barChart;
		var description; // Initialize indicator description variable. Will be populated when chart renders
		var currentIndicator = 'education';
		var legendTitle;
		var dataObj;
		var prevTargetIndex = 0;

		// Compare 2nd column of data array
		function comparedSecondColumn (a,b) {
	        return b[1] - a[1];
	    };

	    function compareEI (a, b) {
			return b.educationIndex - a.educationIndex;
	    }

	    function compareValue (a, b) {
			return b.value - a.value;
	    }

		// Object associated text with indicators
		var indicatorsObj = {
			education: {
				buttonText: "Education Index",
				legendText: "Development Level",
				description: "Calculated from mean years of schooling and expected years of schooling. Rated from 0 (no educational attainment) to 1 (perfect educational attainment).<br />Source: UNDP",
				buttonX: 100,
				buttonY: 600,
				maxColor: null,
				reversed: false,
				zones: [{
		                    value: 0.489,
		                    color: '#DD4760'
		                },
		                {
		                    value: 0.653,
		                    color: '#EF9365'
		                }, {
		                    value: 0.767,
		                    color: '#FFD160'
		                }, {
		                    color: '#85C1A1'
		                }
		        ],
		        dataClasses: [{
	                    from: 0,
	                    to: 1,
	                    name: 'Low<br />0.199-0.489',
	                    color: '#DD4760'
	                }, {
	                    from: 1.1,
	                    to: 2,
	                    name: 'Medium<br />0.489 - 0.653',
	                    color: '#EF9365'
	                }, {
						from: 2.1,
						to: 3,
						name: 'High<br />0.653 - 0.767',
						color: '#FFD160'
					},
					{
						from: 3.1,
						to: 4,
						name: 'Very High<br />0.767 - 0.932',
						color: '#85C1A1'
					}
				],
				max: 1
			},
	      	literacy: {
				buttonText: "Literacy",
				legendText: "Literacy Rate",
				description: "Percentage of the population 15+ years with the ability to read and write.<br />Source: China Statistical Yearbook, World Bank",
				buttonX: 215,
				buttonY: 600,
				reversed: false,
				stops: [
					[0, "#bcdeb6"],
					[0.5,"#85c1a1"],
					[.9, "#395243"]
				],
				zones: [{
		                    value: 70,
		                    color: '#bcdeb6'
		                },
		                {
		                    value: 80,
		                    color: '#86C1A1'
		                }, {
		                    value: 90,
		                    color: '#577E68'
		                }, {
		                    color: '#395243'
		                }
		        ],
		        max: 100
			},
	      	primary: {
				buttonText: "Primary Student-Teacher Ratio",
				legendText: "Student-Teacher Ratio",
				description: "Ratio of students who attend a primary educational institution divided by the number of teachers in the institution.<br />Source: China Statistical Yearbook, UNESCO",
				buttonX: 284,
				buttonY: 600,
				reversed: true,
				stops: [
					[0, "#8e7337"],
					[0.5,"#ffd161"],
					[.9, "#fcf49f"]
				],
				zones: [{
		                    value: 10,
		                    color: '#8e7337'
		                },
		                {
		                    value: 13,
		                    color: '#DCB454'
		                }, {
		                    value: 17,
		                    color: '#FEDB73'
		                }, {
		                    color: '#fcf49f'
		                }
		        ],
		        max: 20
			},
	      	secondary: {
				buttonText: "Secondary Student-Teacher Ratio",
				legendText: "Student-Teacher Ratio",
				description: "Ratio of students who attend a secondary educational institution divided by the number of teachers in the institution.<br />Source: China Statistical Yearbook, UNESCO",
				buttonX: 483,
				buttonY: 600,
				reversed: true,
				stops: [
					[0, "#88533a"],
					[0.5,"#ef9365"],
					[.9, "#fee499"]
				],
				zones: [{
		                    value: 10,
		                    color: '#88533a'
		                },
		                {
		                    value: 15,
		                    color: '#CF7F58'
		                }, {
		                    value: 20,
		                    color: '#F5B67B'
		                }, {
		                    color: '#fee499'
		                }
		        ],
		        max: 25
			},
	      	tertiary: {
				buttonText: "Tertiary Enrollment Share",
				legendText: "Enrollment Share",
				description: "Percentage of people enrolled in a tertiary institution out the entire college-age population.<br />Source: UNDP, World Bank",
				buttonX: 695,
				buttonY: 600,
				reversed: false,
				stops: [
					[0, "#edb2be"],
					[0.5,"#dd4760"],
					[.9, "#662230"]
				],
				zones: [{
		                    value: 20,
		                    color: '#edb2be'
		                },
		                {
		                    value: 40,
		                    color: '#DD4A62'
		                }, {
		                    value: 60,
		                    color: '#953043'
		                }, {
		                    color: '#662230'
		                }
		        ],
		        max: 80
			},
		};

		var options = {
			data: {
				googleSpreadsheetKey: '1wjo9UVjnL2N22ukdwI5B4CC4RKLEbW3fqWNNCx-no_0',
				googleSpreadsheetWorksheet: 1,


			    // custom handler when the spreadsheet is parsed
			    parsed: function(columns) {

					// Read the columns into the data array
					var data = {
						education: [],
						literacy: [],
						primary: [],
						secondary: [],
						tertiary: [],
						educationBar: [],
						literacyBar: [],
						primaryBar: [],
						secondaryBar: [],
						tertiaryBar: []
					};

				    columns[0].forEach(function(code, i) {
				      	if (i != 0) {
				      		data.education.push({
				      			code: columns[1][i].toUpperCase(),
				      			value: parseFloat(columns[4][i]),
				      			name: columns[0][i],
				      			id: columns[0][i],
				      			countryMatch: columns[3][i],
				      			educationIndex: parseFloat(columns[2][i])
				      		});
				      		
				      		data.educationBar.push([columns[0][i], parseFloat(columns[2][i])]);

				      		data.literacy.push({
				      			code: columns[1][i].toUpperCase(),
				      			name: columns[0][i],
				      			id: columns[0][i],
				      			value: parseFloat(columns[5][i]),
				      			countryMatch: columns[6][i]
				      		});

				      		data.literacyBar.push([columns[0][i], parseFloat(columns[5][i])]);

				      		data.primary.push({
				      			code: columns[1][i].toUpperCase(),
				      			name: columns[0][i],
				      			id: columns[0][i],
				      			value: parseFloat(columns[7][i]),
				      			countryMatch: columns[8][i]
				      		});

				      		data.primaryBar.push([columns[0][i], parseFloat(columns[7][i])]);

				      		data.secondary.push({
				      			code: columns[1][i].toUpperCase(),
				      			name: columns[0][i],
				      			id: columns[0][i],
				      			value: parseFloat(columns[9][i]),
				      			countryMatch: columns[10][i]
				      		});

				      		data.secondaryBar.push([columns[0][i], parseFloat(columns[9][i])]);

				      		data.tertiary.push({
				      			code: columns[1][i].toUpperCase(),
				      			name: columns[0][i],
				      			id: columns[0][i],
				      			value: parseFloat(columns[11][i]),
				      			countryMatch: columns[12][i]
				      		});

				      		data.tertiaryBar.push([columns[0][i], parseFloat(columns[11][i])]);
				      	}
				    });
			      	dataObj = data;

			      	// Sort the data
			      	dataObj.education.sort(compareEI);
			      	dataObj.literacy.sort(compareValue);
			      	dataObj.primary.sort(compareValue);
			      	dataObj.secondary.sort(compareValue);
			      	dataObj.tertiary.sort(compareValue);
			      	dataObj.educationBar.sort(comparedSecondColumn);
			      	dataObj.literacyBar.sort(comparedSecondColumn);
			      	dataObj.primaryBar.sort(comparedSecondColumn);
			      	dataObj.secondaryBar.sort(comparedSecondColumn);
			      	dataObj.tertiaryBar.sort(comparedSecondColumn);
				}
			},

			chart: {
				borderWidth: 0,
				marginBottom: 50,
				events: {
					load: function() {
						this.series[0].setData(dataObj.education);
					}
				},
				style: {
                    fontFamily: 'Roboto Slab'
                }
			},
			exporting: {
				enabled: false
			},

			colors: ['#DD4760','#EF9365','#FFD160','#85C1A1'],
			//title of map
			title: {
				text: null,
				// margin: 50,
				align: 'left'
			},

			// +/- zoom
			mapNavigation: {
				enabled: true,
				buttonOptions: {
					verticalAlign: "middle"
				},
				enableMouseWheelZoom: false
			},

			credits: {
				enabled: false,
				text: 'CSIS China Power Project'
			},

			legend: {
				align: 'left',
				verticalAlign: 'bottom',
				floating: true,
				layout: 'horizontal',
				valueDecimals: 0,
				symbolRadius: 0,
				symbolHeight: 15
			},

		  	colorAxis: {
		  		dataClassColor: "category",
			  	labels: {
			  		enabled: true,
			  		formatter: function() {
			  			return this.value
			  		}
			  	},
			 	dataClasses: indicatorsObj[currentIndicator].dataClasses
			},

			tooltip: {
				useHTML: true,
				formatter: function() {
					if(currentIndicator == 'education') {
						value = this.point.educationIndex;
					}
					else {
						value = this.point.value;
					}
					return '<span style="font-weight:bold;text-decoration:underline;text-align:center;display:block;margin-bottom:-10px;">'+this.key+'</span><br /><strong>'+indicatorsObj[currentIndicator].buttonText+':</strong> '+value+'<br /><strong>Country Match:</strong> '+this.point.countryMatch;
				}
			},

			series: [{
			    mapData: Highcharts.maps['countries/cn/cn-all'],
			    joinBy: ['hc-a2', 'code'],
			    animation: true,
			    nullColor: '#4E6D78',
			    borderColor: '#ECECEC',
			    name: 'GDP Growth Rate',
			    states: {
			    	hover: {
			    		brightness: -0.2
			    	}
			    },
			    tooltip: {
			    	valueDecimals: 2,
			    	valueSuffix: '%'
			    },
			    point: {
				    events: {
	                    mouseOver: function() {
	                        triggerHover("map", this);
	                    },
	                    mouseOut: function() {
	                        resetHover("map");
	                    }
	                }
	            }
			}]
		};

		function renderMap() {

			// Create the Bar Chart
			var optionsBar = {
			    chart: {
			      	type: 'bar',
			      	border: 'none',
			      	events: {
						load: function() {
							this.series[0].setData(dataObj.educationBar);
						}
					},
					marginTop: 50,
					plotBorderColor:"#ECECEC",
					plotBorderWidth: 1
			    },
			    credits: {
			      enabled: true,
			      text: "CSIS China Power Project",
			    },
			    title: {
			      text: null,
			    },
			    // exporting: {
			    // 	buttons: {
			    // 		contextButton: {
			    // 			verticalAlign: "bottom"
			    // 		}
			    // 	}
			    // },
			    xAxis: {
			        type: 'category',
			        labels: {
			    		enabled: true,
                		step: 1
			    	},
			    	lineColor: "#ECECEC",
			    	tickColor: "#ECECEC"
			    },
			    yAxis: {
			    	reversed: false,
			    	labels: {
			    		overflow: 'justify'
			    	},
			    	title: {
			    		text: null
			    	},
			    	tickAmount: 3,
			    	lineWidth: 1,
			    	lineColor: "#ECECEC"
			    },
			    plotOptions: {
			    	bar: {
		                dataLabels: {
		                    enabled: false,
		                },
		                zones: indicatorsObj[currentIndicator].zones
				    },
				    series: {
				    	states: {
					    	hover: {
					    		brightness: -0.2
					    	}
					    },
				    }
			    },
			    legend: {
			    	enabled: false,
			      	align: 'center',
			      	verticalAlign: 'bottom',
			      	layout: 'horizontal'
			    },
			    series: [{
			    	name: indicatorsObj[currentIndicator].legendText,
			    	point: {
					    events: {
		                    mouseOver: function() {
		                        triggerHover("bar", this);
		                    },
		                    mouseOut: function() {
		                        resetHover("bar");
		                    }
		                }
		            }
			    }]
			};
			barChart = Highcharts.chart('containerBar', optionsBar);

			// Show Indicators Dropdown & Description on chart load
			$(".indicatorSelect").show();
			$("#description").show();

			// Render Initial Legend Text
			legendTitle = chart.renderer.text(indicatorsObj[currentIndicator].legendText, 18, chart.chartHeight - 65).attr({'id': "legendTitle", 'class': "legendTitle"}).add();

			// Disable Legend Click (Existing bug in highcharts)
	        $(".highcharts-legend-item text").click(function() {
	        	return false;
	        });

		}

		// Initiate the Map chart
		var chart = Highcharts.Map('container', options, renderMap);


        // Switch between datasets
        
        $(".indicatorSelect").change(function (){
        	var indicator = $(this).val();

        	currentIndicator = indicator; // Update the current Indicator
        	currentIndicatorBar = indicator+"Bar";

        	// Update the Map
        	if(indicator == "education") {
	        	chart.colorAxis[0].update({
	        		dataClasses: indicatorsObj[currentIndicator].dataClasses,
					reversed: indicatorsObj[currentIndicator].reversed
	        	}, false);

	        	chart.legend.update();

				legendTitle.attr({text: indicatorsObj[currentIndicator].legendText, y: chart.chartHeight - 65}); // Update the description text
	        }
	        else {
	        	chart.colorAxis[0].update({
	        		dataClasses: undefined,
	        		dataClassColor: "tween",
	        		stops: indicatorsObj[currentIndicator].stops,
	        		reversed: indicatorsObj[currentIndicator].reversed
	        	}, false);

	        	chart.legend.update();

				legendTitle.attr({text: indicatorsObj[currentIndicator].legendText, y: chart.chartHeight - 65}); // Update the description text
	        }

        	chart.series[0].setData(dataObj[indicator], true); // Update the series data
        	$("#description").html(indicatorsObj[currentIndicator].description); // Update description text

           	// Update the Bar Chart
           	barChart.update({
           		yAxis: {
           			max: indicatorsObj[indicator].max
           		}
           	}, false);
           	barChart.options.plotOptions.bar.zones = indicatorsObj[indicator].zones;
           	barChart.series[0].update({name: indicatorsObj[indicator].legendText}); // Update Series Name
           	barChart.series[0].setData(dataObj[currentIndicatorBar], true); // Update the series data

        });

        // Event handlers
	    var triggerHover = function(originType, point) {
	    	var targetIndex = point.index;

	    	// Set hover state to target
	    	if(originType == "map") {
	    		barChart.series[0].data[targetIndex].setState('hover');
	        	barChart.tooltip.refresh(barChart.series[0].data[targetIndex]);
	    	}
	    	else {
	    		chart.series[0].data[targetIndex].setState('hover');
	        	chart.tooltip.refresh(chart.series[0].data[targetIndex]);
	    	}
	        
	        // Set previous target helper
	        prevTargetIndex = targetIndex;
	    };

	    var resetHover = function(originType) {
	        // Reset hover state of previous target
	        if(originType == "map") {
	        	barChart.series[0].data[prevTargetIndex].setState();
	        	barChart.tooltip.hide();
	        }
	        else {
	        	chart.series[0].data[prevTargetIndex].setState();
	        	chart.tooltip.hide();
	        }
	        // Reset previous target helper
	        prevTargetIndex = 0;
	    };

	});