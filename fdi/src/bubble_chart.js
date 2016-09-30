/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 *
 * Organization and style inspired by:
 * https://bost.ocks.org/mike/chart/
 *
 */
// Constants for sizing
  var dim = Math.min(parseInt(d3.select("#vis").style("width")), parseInt(d3.select("#vis").style("height")));
  var width = $("#vis").width();
  var height = $("#vis").height();

// Set position of tooltip manually
d3.selection.prototype.position = function() {

    var el = this.node();
    var elPos = el.getBoundingClientRect();
    var vpPos = getVpPos(el);

    function getVpPos(el) {
        if(el.parentNode.nodeName === 'svg') {
            return el.parentNode.getBoundingClientRect();
        }
        return getVpPos(el.parentNode);
    }

    return {
        top: elPos.top + $(document).scrollTop(),
        left: elPos.left,
        width: elPos.width,
        bottom: elPos.bottom - vpPos.top,
        height: elPos.height,
        right: elPos.right
    };

};

function bubbleChart() {

  // tooltip for mouseover functionality
  var tooltip = floatingTooltip('gates_tooltip', 240);

  // Locations to move bubbles towards, depending
  // on which view mode is selected.
  var center = { x: width / 2, y: height / 2 };

  var regionCenters = {
    "Americas": { x: width / 6 + 50, y: height / 2 },
    "Europe": { x: 2 * width / 6 + 50, y: height / 2 },
    "Asia": { x: 3 * width / 6 + 50, y: height / 2 },
    "Africa": { x: 4 * width / 6 + 50, y: height / 2 },
    "Oceania": { x: 5 * width / 6 + 25, y: height / 2 }
  };

  // X locations of the year titles.
  var regionsTitleX = {
    "Americas": width / 6 - 50,
    "Europe": 2 * width / 6 + 30,
    "Asia": 3 * width / 6 + 100,
    "Africa": 4 * width / 6 + 135,
    "Oceania": 5 * width / 6 + 115
  };

  var regionsTitleY = {
    "Americas": 40,
    "Europe": 40,
    "Asia": 40,
    "Africa": 40,
    "Oceania": 40
  };

  // World Bank Development Level Titles
  var devLevelsInfo = {
    "5": { x: width / 6, y: 70, title: "OECD high-income" },
    "4": { x: 2 * width / 6 + 85, y: 70, title: "High-income" },
    "3": { x: 3 * width / 6 + 100, y: 70, title: "Upper middle-income" },
    "2": { x: 4 * width / 6 + 135, y: 70, title: "Lower middle-income" },
    "1": { x: 5 * width / 6 + 115, y: 70, title: "Low-income" },
    "0": { x: width + 100, y: height, title: "0" }
  }

  var devLevelCenters = {
    "5": { x: width / 6 + 50, y: height / 2 },
    "4": { x: 2 * width / 6 + 50, y: height / 2 },
    "3": { x: 3 * width / 6 + 30, y: height / 2 },
    "2": { x: 4 * width / 6 + 50, y: height / 2},
    "1": { x: 5 * width / 6 + 35, y: height / 2 },
    "0": { x: width + 100, y: height }
  };

  // Used when setting up force and
  // moving around nodes
  var damper = 0.102;

  // These will be set in create_nodes and create_vis
  var svg = null;
  var bubbles = null;
  var nodes = [];

  // Charge function that is called for each node.
  // Charge is proportional to the diameter of the
  // circle (which is stored in the radius attribute
  // of the circle's associated data.
  // This is done to allow for accurate collision
  // detection with nodes of different sizes.
  // Charge is negative because we want nodes to repel.
  // Dividing by 8 scales down the charge to be
  // appropriate for the visualization dimensions.
  function charge(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  }

  // Here we create a force layout and
  // configure it to use the charge function
  // from above. This also sets some contants
  // to specify how the force layout should behave.
  // More configuration is done below.
  var force = d3.layout.force()
    .size([width, height])
    .charge(charge)
    .gravity(-0.01)
    .friction(0.9);


  // Nice looking colors - no reason to buck the trend
  if(currentViz == "China") {
    var fillColor = d3.scale.ordinal()
      .domain(['Americas', 'Europe', 'Asia', 'Africa', 'Oceania'])
      .range(['#3b75bb','#887395','#6b874d','#caac4c','#534a6e']);
  }
  else {
    var fillColor = d3.scale.ordinal()
    .domain(['Americas', 'Europe', 'Asia', 'Africa', 'Oceania', 'China'])
    .range(['#772132','#58a992','#907562','#5BCBF5','#afadbc','#212A2E']);
  }

  // Sizes bubbles based on their area instead of raw radius
  var radiusScale = d3.scale.pow()
    .exponent(0.5)
    .range([5, dim / 8]);

  /*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
  function createNodes(rawData) {
    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
    
    var myNodes = rawData.map(function (d) {
      if(d.country == "China") {
        var groupValue = d.country;
      }
      else {
        var groupValue = d.region;
      }

      return {
        id: d.id,
        radius: radiusScale(+d.value),
        value: d.value,
        name: d.country,
        group: groupValue,
        year: d.year,
        region: d.region,
        world_bank: d.group,
        gni: d.gni,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
    });

    // sort them to prevent occlusion of smaller nodes.
    myNodes.sort(function (a, b) { return b.value - a.value; });

    return myNodes;
  }

  /*
   * Main entry point to the bubble chart. This function is returned
   * by the parent closure. It prepares the rawData for visualization
   * and adds an svg element to the provided selector and starts the
   * visualization creation process.
   *
   * selector is expected to be a DOM element or CSS selector that
   * points to the parent element of the bubble chart. Inside this
   * element, the code will add the SVG continer for the visualization.
   *
   * rawData is expected to be an array of data objects as provided by
   * a d3 loading function like d3.csv.
   */
  var chart = function chart(selector, rawData) {
    d3.select(selector).select("svg").remove();
    // Use the max value in the data as the max in the scale's domain
    // note we have to ensure the value is a number by converting it
    // with `+`.
    var maxAmount = d3.max(rawData, function (d) { return +d.value; });
    radiusScale.domain([0, maxAmount]);

    nodes = createNodes(rawData);
    // Set the force's nodes to our newly created nodes array.
    force.nodes(nodes);

    // Create a SVG element inside the provided selector
    // with desired size.
    svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Bind nodes data to what will become DOM elements to represent them.
    bubbles = svg.selectAll('.bubble')
      .data(nodes, function (d) { return d.id; });

    // Create new circle elements each with class `bubble`.
    // There will be one circle.bubble for each object in the nodes array.
    // Initially, their radius (r attribute) will be 0.
    bubbles.enter().append('circle')
      .classed('bubble', true)
      .classed({
        'Americas': function (d) { return d.region === 'Americas'; },
        'Europe': function (d) { return d.region === 'Europe'; } })
      .attr('id', function (d) { return d.name.replace(/\s+/g, ''); })
      .attr('r', 0)
      .attr('fill', function (d) { return fillColor(d.group); })
      .attr('stroke', d3.rgb('#f2efef'))
      .attr('stroke-width', 1.5)
      .on('mouseover', showDetail)
      .on('mouseout', hideDetail)
      .on('touchend', hideDetail);

    // Fancy transition to make bubbles appear, ending with the correct radius
    bubbles.transition()
      .duration(2000)
      .attr('r', function (d) { return d.radius; });

    // Create the legend
    
    if(currentViz == "China") {
      var legendWidth = 3.2;
    }
    else {
      var legendWidth = 3.7;
    }

    var legendRectSize = 20;
    var legendSpacing = 15;
    var legend = svg
      .append("g")
        .attr("id","legendContainer")
      .selectAll("g")
      .data(fillColor.domain())
      .enter()
      .append('g')
        .attr('class', 'legend')
        .attr('transform', function(d, i) {

              // Switch to vertical if on mobile
              if(width < (767 * .9)) {
                var legendXCalc = 5;
                var legendYCalc = i * 10 + 245;
              }
              else {
                var legendXCalc = i * 100 + (width / legendWidth);
                var legendYCalc = height - 15;
              }

            var x = legendXCalc;
            var y = legendYCalc;
            return 'translate(' + x + ',' + y + ')';
      });

    // Draw rects, and color them by original_index
    legend.append('circle')
      .classed('scaleCircle', true)
      .attr('r', 5)
      .style('fill', fillColor)
      .style('stroke', d3.rgb('#f2efef'));
   
    legend.append('text')
      .classed('scaleCircleLabel', true)
      .attr('x', 12)
      .attr('y', 20 - legendSpacing)
      .text(function(d) { return d; });

    // Set initial layout to single group.
    if(currentState == "split") {
      splitBubbles();
    }
    else {
      groupBubbles();
    }
  };

  /*
   * Sets visualization in "single group mode".
   * The year labels are hidden and the force layout
   * tick function is set to move all nodes to the
   * center of the visualization.
   */
  function groupBubbles() {
    hideLabels();

    force.on('tick', function (e) {
      bubbles.each(moveToCenter(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();

    currentState = "grouped";
  }

  /*
   * Helper function for "single group mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it toward the center of
   * the visualization.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToCenter(alpha) {
    return function (d) {
      d.x = d.x + (center.x - d.x) * damper * alpha;
      d.y = d.y + (center.y - d.y) * damper * alpha;
    };
  }

  /*
   * Sets visualization in "split by year mode".
   * The year labels are shown and the force layout
   * tick function is set to move nodes to the
   * yearCenter of their data's year.
   */
  function splitBubbles() {
    hideLabels();
    showLabels();

    force.on('tick', function (e) {
      bubbles.each(moveToSplitView(e.alpha))
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    });

    force.start();

    currentState = "split";
  }

  /*
   * Helper function for "split by year mode".
   * Returns a function that takes the data for a
   * single node and adjusts the position values
   * of that node to move it the year center for that
   * node.
   *
   * Positioning is adjusted by the force layout's
   * alpha parameter which gets smaller and smaller as
   * the force layout runs. This makes the impact of
   * this moving get reduced as each node gets closer to
   * its destination, and so allows other forces like the
   * node's charge force to also impact final location.
   */
  function moveToSplitView(alpha) {
    return function (d) {
      if(currentView == "region") {
        var target = regionCenters[d.region];
      }
      else if(currentView == "gni") {
        var target = devLevelCenters[d.world_bank];
      }
      d.x = d.x + (target.x - d.x) * damper * alpha * 1.1;
      d.y = d.y + (target.y - d.y) * damper * alpha * 1.1;

    };
  }

  /*
   * Hides Year title displays.
   */
  function hideLabels() {
    svg.selectAll('.year').remove();
    svg.selectAll('.devLevel').remove();
    svg.selectAll('.devLevelTitle').remove();
  }

  /*
   * Shows Labels as titles in split view displays.
   */
  function showLabels() {
    if(currentView == "region") {
      var yearsData = d3.keys(regionsTitleX);
      var years = svg.selectAll('.year')
        .data(yearsData);

      years.enter().append('text')
        .attr('class', 'year')
        .attr('x', function (d) { return regionsTitleX[d]; })
        .attr('y', function (d) { return regionsTitleY[d]; })
        .attr('text-anchor', 'middle')
        .text(function (d) { return d; });
    }
    else if (currentView == "gni") {

      svg.append('text')
        .classed('devLevelTitle', true)
        .attr('x', width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .text("Economic Levels");

      var devLevelData = d3.keys(devLevelsInfo);
      var devLevels = svg.selectAll('.devLevel')
        .data(devLevelData);

      devLevels.enter().append('text')
        .attr('class', 'devLevel')
        .attr('x', function (d) { return devLevelsInfo[d]['x']; })
        .attr('y', function (d) { return devLevelsInfo[d]['y']; })
        .attr('text-anchor', 'middle')
        .text(function (d) { return devLevelsInfo[d]['title']; });
    }
  }

  /*
   * Function called on mouseover to display the
   * details of a bubble in the tooltip.
   */
  function showDetail(d) {
    var elementCoords = d3.select(this).position();

    // change outline to indicate hover state.
    d3.select(this).attr('fill', d3.rgb(fillColor(d.group)).darker());

    var content = '<span class="name">Country: </span><span class="value">' +
                  d.name +
                  '</span><br/>' +
                  '<span class="name">Amount: </span><span class="value">$' +
                  addCommas(d.value) +
                  ' million</span><br/>' +
                  '<span class="name">Year: </span><span class="value">' +
                  d.year +
                  '</span>';

    var coords = {
      pageX: elementCoords.right - 20,
      pageY: elementCoords.top - 20
    };

    tooltip.showTooltip(content, coords);
  }

  /*
   * Hides tooltip
   */
  function hideDetail(d) {
    // reset fill
    d3.select(this).attr('fill', d3.rgb(fillColor(d.group)));

    tooltip.hideTooltip();
  }

  /*
   * Externally accessible function (this is attached to the
   * returned chart function). Allows the visualization to toggle
   * between "single group" and "split by year" modes.
   *
   * displayName is expected to be a string and either 'year' or 'all'.
   */
  chart.toggleDisplay = function (displayName) {
    currentView = displayName;
    if (displayName === 'region' || displayName === 'gni') {
      splitBubbles();
    } else {
      groupBubbles();
    }
  };

  // return the chart function from closure.
  return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();

/*
 * Sets up the layout buttons to allow for toggling between view modes: grouped or split
 */
function setupButtons() {
  d3.select('#toolbar')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('#toolbar .button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);

      // Get the id of the button
      var buttonId = button.attr('id');

      // Toggle the bubble chart based on
      // the currently clicked button.
      myBubbleChart.toggleDisplay(buttonId);
    });
}

/*
 * Toggle between in and out stock
 */
function setupTypeButtons() {
  d3.select('#type')
    .selectAll('.button')
    .on('click', function () {
      // Remove active class from all buttons
      d3.selectAll('#type .button').classed('active', false);
      // Find the button just clicked
      var button = d3.select(this);

      // Set it as the active button
      button.classed('active', true);
      redraw();
    });
}

/*
 * Toggle between years
 */
function setupYearButtons() {
  d3.select('#yearsSelect')
    .on('change', function () {

      // Remove "selected" from options that are not our new selection
      var newYear = d3.select(this).property('value');
      $("#yearsSelect option").each(function(index, item){
        if($(item).val() == newYear) {
          $(item).attr("selected",true);
        }
        else {
          $(item).attr("selected",false);
        }
      });

      redraw();
    });
}

/*
  Toggle between regions
 */
function setupRegionFilter() {
  $("#regionFilter").contents().find(":checkbox").bind('change', function(){
    checked = this.checked;
    value = $(this).val();
    
    if(value === "All"){

      $("#regionFilter").contents().find(":checkbox").each(function(index, item){
        $(item).prop( "checked", false );
      });

      // We know "this" is the "All" checkbox
      $(this).prop("checked", true);
    }
    else {
      var checkedCount = 0;
      $("#regionFilter").contents().find(":checkbox").each(function(index, item){
        if($(item).val() === "All") {
          $(item).prop( "checked", false );  
        }

        if($(item).prop("checked") == true) {
          checkedCount++;
        }
      });

      // If no regions are checked, default to All
      if(checkedCount === 0) {
        $("#regionFilter input:checkbox[value=All]").prop("checked", true);
      }
    }

    redraw();
  });
}

/*
  Calculate the current state of the type, years, and regions
 */
function calculateType(){
  return $('#type .active').first().prop('id');
}

function calculateYears(){
  // return $('#years .active').first().prop('id');
  return $('#yearsSelect').val();
}

function calculateRegions(){
  var regions = [];
  $("#regionFilter input:checked").each(function(index, region){
    regions.push($(region).val());
  });

  return regions;
}

/*
  Based on the current state of type, years, and regions, build our dataset
 */
function calculateDataset(){
  var fullDataset;
  var returnDataset = [];
  var type = calculateType();
  var year = calculateYears();
  var regions = calculateRegions();

  if(currentViz == "China") {
    fullDataset = datasetChina[year];
  }
  else {
    if(type === 'in'){
      fullDataset = datasetIn[year];
    } else {
      fullDataset = datasetOut[year];
    }
  }

  $(regions).each(function(index, region){
    returnDataset = $.merge(returnDataset, fullDataset[region]);
  });

  return returnDataset;
}

// Redraw function triggers chart creation
function redraw() {
  $("#loading").hide();
  myBubbleChart('#vis', calculateDataset());
}

// Redraw based on the new size whenever the browser window is resized.
window.addEventListener("resize", redraw);

// setup the buttons.
setupButtons();
setupTypeButtons();
setupYearButtons();
setupRegionFilter();

// Define our global dataset variables.
var datasetIn = {2000:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2005:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2010:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2014:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] } };
var datasetOut = {2000:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2005:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2010:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2014:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] } };
var datasetChina = {2010:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2011:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2012:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2013:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2014:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] }, 2015:{"All":[], "Partial":[], "Americas":[], "Europe":[], "Asia":[], "Africa":[], "Oceania":[] } };
var currentState = "grouped";
var currentView = "all";

// Get our google spreadsheet based on currentViz data
if(currentViz == "China") {
  showInfoChina();
}
else {
  showInfo();
}

// Populate our dataset variables
function showInfo() {

  d3.csv("data/global-fdi-stocks.csv", function(data) {
    $.each(data, function(i,row) {
      
      Object.keys(datasetIn).forEach(function(key){
        Object.keys(datasetIn[key]).forEach(function(regionKey) {

          if(regionKey == "All") {
            if(row.in_stock && row.year == key) {
              datasetIn[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.in_stock,
                group: row.group,
                year: key,
                gni: row.gni
              });
            }
          }
          else {
            if(row.in_stock && row.year == key && row.region == regionKey) {
              datasetIn[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.in_stock,
                group: row.group,
                year: key,
                gni: row.gni
              });
            }
          }
        });
      });

      Object.keys(datasetOut).forEach(function(key){
        Object.keys(datasetOut[key]).forEach(function(regionKey) {
          if(regionKey == "All") {
            if(row.out_stock && row.year == key) {
              datasetOut[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.out_stock,
                group: row.group,
                year: key,
                gni: row.gni
              });
            }
          }
          else {
            if(row.out_stock && row.year == key && row.region == regionKey) {
              datasetOut[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.out_stock,
                group: row.group,
                year: key,
                gni: row.gni
              });
            }
          }
        });
      });

    }); // Close $.each

    redraw();

  }); // Close d3.csv

}

// Populate our dataset variables
function showInfoChina(data, tabletop) {
  d3.csv("data/china-investment-outflows.csv", function(data) {
    $.each(data, function(i,row) {

      Object.keys(datasetChina).forEach(function(key){
        Object.keys(datasetChina[key]).forEach(function(regionKey) {
          if(regionKey == "All") {
            if(row.value && row.year == key) {
              datasetChina[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.value,
                group: row.group,
                year: key
              });
            }
          }
          else {
            if(row.value && row.year == key && row.region == regionKey) {
              datasetChina[key][regionKey].push({
                region: row.region,
                id: row.id,
                country: row.country,
                value: row.value,
                group: row.group,
                year: key
              });
            }
          }
        });
      });

    }); // Close $.each
    redraw();
  }); // Close d3.csv
}
