var continents = {
  AS: "Asia",
  AF: "Africa",
  EU: "Europe",
  ME: "The Middle East"
};

var spreadsheetID = "12_yhWuslrui9_kW57-HwySPk9kv1Mp2VlAYHUo5QWO8";

var translationsURL =
  "https://spreadsheets.google.com/feeds/list/" +
  spreadsheetID +
  "/7/public/values?alt=json";

fetch(translationsURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    countries = parseData(json.feed.entry);
    init();
  });

function parseData(rawData) {
  var data = rawData.map(function(r) {
    var row = r;
    var countryData = {};
    Object.keys(row).forEach(function(c) {
      var column = c;
      if (column.indexOf("gsx$") > -1) {
        var columnName = column.replace("gsx$", "");
        countryData[columnName] = row[column]["$t"];
      }
    });
    return countryData;
  });

  return data;
}

var tooltip = {
  show: function(content) {
    let yPos = event.pageY;
    let xPos = event.pageX;
    if (xPos + 10 > document.body.clientWidth - 215) {
      xPos = document.body.clientWidth + 5 - 215;
    }

    tooltipEl
      .transition()
      .duration(200)
      .style("opacity", 0.9)
      .on("end", function() {
        tooltipEl.classed("isActive", true);
        // tooltipEl.select('.tooltip-close').on('click', this.hide)
        tooltipEl.on("click", this.hide);
      });
    tooltipEl
      .html(content)
      .style("visibility", "visible")
      .style("left", xPos + "px")
      .style("top", yPos + "px");
  },
  hide: function() {
    tooltipEl
      .transition()
      .duration(300)
      .style("opacity", 0);
  },
  formatContent: function(component) {
    let content = '<ul class="tooltip-list">';
    component.forEach(function(item, index) {
      let cssClass = null;
      if (item.class) {
        cssClass = item.class;
      }
      let label = Object.keys(item)[0];
      content += `<li class="${cssClass}"><span class="tooltip-label">${label}:</span> ${
        item[label]
      }</li>`;
    });
    content += "</ul>";
    return content;
  }
};

var width, height;

var svg, labels, circles, circleSize;

var budgets;
var meanBudget, budgetExtent, budgetScaleX, budgetScaleY;
var regions;
var regionColorScale;
var circleRadiusScale;
var fontScale;
var labelMarginScale;
var forceStrength;
var forces, forceSimulation;
var countries;

function init() {
  circleSize = {
    min: Math.min(window.innerWidth / 144, 8.75),
    max: Math.min(window.innerWidth / 30, 42)
  };

  width = Math.min(900, window.innerWidth - 10);
  height = Math.max(width * 0.6, 535);

  createBubbleChart();
}

window.addEventListener("resize", () => location.reload(false));

function createBubbleChart() {
  budgets = countries.map(function(country) {
    return +country.budget;
  });

  meanBudget = d3.mean(budgets);
  budgetExtent = d3.extent(budgets);
  regions = d3.set(
    countries
      .map(function(country) {
        return country.regioncode;
      })
      .sort((a, b) => {
        return continents[a].length - continents[b].length;
      })
  );
  regionColorScale = d3
    .scaleOrdinal(["#004165", "#4C8984", "#75baa9", "#0064a6"])
    .domain(regions.values());

  circleRadiusScale = d3
    .scaleSqrt()
    .domain(budgetExtent)
    .range([circleSize.min, circleSize.max]);

  fontScale = d3
    .scaleSqrt()
    .domain(budgetExtent)
    .range([0.3, 1]);

  labelMarginScale = d3
    .scaleSqrt()
    .domain(budgetExtent)
    .range([2, 6]);

  forceStrength = 0.045;

  createSVG();
  toggleRegionKey();
  createForces();
  createForceSimulation();
  createCircles();
  createBudgetForces();
}

function createSVG() {
  var svgNodes = document.querySelectorAll(".chart").length;

  svg = svgNodes
    ? d3.select(".chart")
    : d3
        .select("#bubble-chart")
        .append("svg")
        .attr("class", "chart");

  svg.attr("width", width).attr("height", height);
}

function toggleRegionKey() {
  var keyElementWidth = (width - 80) / 4,
    keyElementHeight = 30;
  var onScreenYOffset = keyElementHeight * 1.5,
    offScreenYOffset = 30;

  createRegionKey();

  function createRegionKey() {
    var regionKeyScale = d3
      .scaleBand()
      .domain(regions.values())
      .range([70, width - 30 / 2]);

    var regionKeyNode = document.querySelectorAll(".region-key").length;

    var regionKeys = regionKeyNode
      ? d3.selectAll(".region-key")
      : svg
          .selectAll(".region-key")
          .data(regions.values())
          .enter()
          .append("g")
          .attr("class", function(d) {
            return `region-key-${d}`;
          })
          .attr("y", height - onScreenYOffset);

    regionKeys.each(function(g, gi, nodes) {
      var regionKeyColorNodes = document.querySelectorAll(
        `.region-key-color-${g}`
      ).length;

      var regionKeyColor = regionKeyColorNodes
        ? d3.selectAll(`.region-key-color-${g}`)
        : d3
            .select(nodes[gi])
            .append("rect")
            .attr("class", `region-key-color-${g}`);

      regionKeyColor
        .attr("width", keyElementWidth)
        .attr("height", keyElementHeight)
        .attr("x", function(d) {
          return regionKeyScale(d);
        })
        .attr("y", height - onScreenYOffset)

        .attr("fill", function(d) {
          return regionColorScale(d);
        });

      var regionKeyLabelNodes = document.querySelectorAll(
        `.region-key-label-${g}`
      ).length;

      var regionKeyLabels = regionKeyLabelNodes
        ? d3.selectAll(`.region-key-label-${g}`)
        : d3
            .select(nodes[gi])
            .append("text")
            .attr("class", `region-key-label-${g}`)
            .attr("text-anchor", "middle")
            .attr("font-size", ".7rem")
            .attr("fill", "white");

      regionKeyLabels
        .attr("x", function(d) {
          var val = regionKeyScale(d) + keyElementWidth / 2;
          return val;
        })
        .attr("y", height - onScreenYOffset + 30 * 0.67)

        .text(function(d) {
          return window.innerWidth > 768 ? continents[d] : d;
        });
    });
  }
}

function createCircles() {
  var formatBudget = d3.format(",");

  var circleContainerNodes = document.querySelectorAll(".circle-container")
    .length;

  var circleContainers = circleContainerNodes
    ? d3.selectAll(".circle-container")
    : svg
        .selectAll(".circle-container")
        .data(countries)
        .enter()
        .append("g")
        .attr("class", `circle-container`);

  circleContainers.each(function(g, gi, nodes) {
    var circleNodes = document.querySelectorAll(`.circle-${g.countrycode}`)
      .length;

    var circleSVG = circleNodes
      ? d3.selectAll(`.circle-${g.countrycode}`)
      : d3
          .select(nodes[gi])
          .append("circle")
          .attr("class", `circle-${g.countrycode}`);

    circleSVG
      .attr("r", function(d) {
        return circleRadiusScale(d.budget);
      })
      .attr("fill", function(d) {
        return regionColorScale(d.regioncode);
      });

    var labelNodes = document.querySelectorAll(`.label-${g.countrycode}`)
      .length;

    var labelSVG = labelNodes
      ? d3.selectAll(`.label-${g.countrycode}`)
      : d3
          .select(nodes[gi])
          .append("text")
          .attr("text-anchor", "middle")
          .attr("class", "label")
          .attr("fill", "white");

    labelSVG
      .attr("font-size", function(d) {
        return `${fontScale(d.budget)}rem`;
      })
      .text(function(d) {
        return d.countrycode;
      });
  });
  circles = svg
    .selectAll("circle")
    .on("mouseover", function(d) {
      updateCountryInfo(d);
      updateTooltip(d);
    })
    .on("mouseout", function(d) {
      updateCountryInfo();

      tooltip.hide();
    });

  labels = svg
    .selectAll(".label")
    .on("mouseover", function(d) {
      updateCountryInfo(d);
      updateTooltip(d);
    })
    .on("mouseout", function(d) {
      updateCountryInfo();
      tooltip.hide();
    });

  function updateTooltip(d) {
    var tooltipContent = `
    <p class="tooltip-heading">
      ${d.countryname}
    </p>
    <p class="tooltip-body">
      $${formatBudget(d.budget)}
    </p>

    `;
    tooltip.show(tooltipContent);
  }

  function updateCountryInfo(country) {
    var info = "";
    if (country) {
      info = country.countryname + ": $" + formatBudget(country.budget);
    }
    d3.select("#country-info").html(info);
  }
}

function createForces() {
  var regionNamesDomain = regions.values().map(function(regionCode) {
    return continents[regionCode];
  });
  var scaledBudgetMargin = circleSize.max;

  budgetScaleX = d3
    .scaleBand()
    .domain(regionNamesDomain)
    .range([30, width - 30]);

  budgetScaleY = d3
    .scaleLog()
    .domain(budgetExtent)
    .range([height - 40 - scaledBudgetMargin, scaledBudgetMargin * 2]);

  var centerCirclesInScaleBandOffset = budgetScaleX.bandwidth() / 2;
  return {
    x: d3
      .forceX(function(d) {
        return (
          budgetScaleX(continents[d.regioncode]) +
          centerCirclesInScaleBandOffset +
          75
        );
      })
      .strength(forceStrength * 1.3),

    y: d3
      .forceY(function(d) {
        return budgetScaleY(d.budget);
      })
      .strength(forceStrength * 21)
  };
}

function createForceSimulation() {
  forceSimulation = d3
    .forceSimulation()
    .force("x", d3.forceX(width / 2).strength(forceStrength))
    .force("y", d3.forceY(width / 2).strength(forceStrength));

  forceSimulation.stop();
  forceSimulation.restart();
  forceSimulation.tick();

  forceSimulation.nodes(countries).on("tick", function() {
    circles
      .attr("cx", function(d) {
        return d.x - 50;
      })
      .attr("cy", function(d) {
        return d.y;
      });

    labels
      .attr("x", function(d) {
        return d.x - 50;
      })
      .attr("y", function(d) {
        return d.y + labelMarginScale(d.budget);
      });
  });
}

function forceCollide(d) {
  return circleRadiusScale(d.budget) + 1;
}

function createBudgetForces() {
  forceSimulation
    .force("x", createForces().x)
    .force("y", createForces().y)
    .force("collide", d3.forceCollide(forceCollide))
    .alphaTarget(0.5);

  toggleBudgetAxes();

  function toggleBudgetAxes() {
    var onScreenYOffset = 40,
      offScreenYOffset = 30;

    createAxes();

    function createAxes() {
      var numberOfTicks = 10,
        tickFormat = ".0s";

      var yAxis = d3.axisLeft(budgetScaleY).ticks(numberOfTicks, tickFormat);
      var yAxisNode = document.querySelectorAll(".yAxis").length;

      var yAxisSVG = yAxisNode
        ? d3.select(".yAxis")
        : svg.append("g").attr("class", "yAxis");

      yAxisSVG
        .call(yAxis)
        .attr("transform", "translate(" + offScreenYOffset + 40 + ",0)")
        .transition()
        .duration(300)
        .attr("transform", "translate(" + onScreenYOffset + "," + "0)");
    }
  }
}

var tooltipEl = d3.select(".tooltip");
