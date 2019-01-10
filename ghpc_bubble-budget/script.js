var continents = {
  AF: "Africa",
  AS: "Asia",
  EU: "Europe",
  EM: "The Middle East"
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
    var countries = parseData(json.feed.entry);
    createBubbleChart(countries);
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

function createBubbleChart(countries) {
  var budgets = countries.map(function(country) {
    return +country.budget;
  });
  var meanBudget = d3.mean(budgets),
    budgetExtent = d3.extent(budgets),
    budgetScaleX,
    budgetScaleY;

  var regions = d3.set(
    countries.map(function(country) {
      return country.regioncode;
    })
  );
  var regionColorScale = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(regions.values());

  var width = Math.min(900, window.innerWidth),
    height = width * 0.75;
  var svg,
    labels,
    circles,
    circleSize = {
      min: Math.min(10, window.innerWidth / 72),
      max: Math.min(60, window.innerWidth / 12)
    };
  var circleRadiusScale = d3
    .scaleSqrt()
    .domain(budgetExtent)
    .range([circleSize.min, circleSize.max]);
  var forceStrength = 0.04;
  var forces, forceSimulation;

  createSVG();
  toggleRegionKey();
  createCircles();
  createForces();
  createForceSimulation();
  createBudgetForces();

  function createSVG() {
    svg = d3
      .select("#bubble-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
  }

  function toggleRegionKey() {
    // fff;
    var keyElementWidth = width / 4 - 60,
      keyElementHeight = 30;
    var onScreenYOffset = keyElementHeight * 1.5,
      offScreenYOffset = 100;

    if (d3.select(".region-key").empty()) {
      createRegionKey();
    }
    var regionKey = d3.select(".region-key");

    translateRegionKey("translate(0," + (height - onScreenYOffset) + ")");

    function createRegionKey() {
      var keyWidth = keyElementWidth * regions.values().length;
      var regionKeyScale = d3
        .scaleBand()
        .domain(regions.values())
        .range([(width - keyWidth) / 2, (width + keyWidth) / 2]);

      svg
        .append("g")
        .attr("class", "region-key")
        .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
        .selectAll("g")
        .data(regions.values())
        .enter()
        .append("g")
        .attr("class", "region-key-element");

      d3.selectAll("g.region-key-element")
        .append("rect")
        .attr("width", keyElementWidth)
        .attr("height", keyElementHeight)
        .attr("x", function(d) {
          return regionKeyScale(d) + 40;
        })
        .attr("fill", function(d) {
          return regionColorScale(d);
        });

      d3.selectAll("g.region-key-element")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", ".7rem")
        .attr("fill", "white")
        .attr("x", function(d) {
          var val = regionKeyScale(d) + keyElementWidth / 2;
          return val + 40;
        })
        .text(function(d) {
          return continents[d];
        });

      // The text BBox has non-zero values only after rendering
      d3.selectAll("g.region-key-element text").attr("y", function(d) {
        var textHeight = this.getBBox().height;
        // The BBox.height property includes some extra height we need to remove
        var unneededTextHeight = 4;
        return (keyElementHeight + textHeight) / 2 - unneededTextHeight;
      });
    }

    function translateRegionKey(translation) {
      regionKey
        .transition()
        .duration(500)
        .attr("transform", translation);
    }
  }

  function isChecked(elementID) {
    return d3.select(elementID).property("checked");
  }

  function createCircles() {
    var formatBudget = d3.format(",");

    var group = svg
      .selectAll("g")
      .data(countries)
      .enter()
      .append("g")
      .attr("class", "circle-container")
      .append("circle")
      .attr("r", function(d) {
        return circleRadiusScale(d.budget);
      });

    var groups = svg.selectAll(".circle-container");

    groups.each(function(g, gi, nodes) {
      d3.select(nodes[gi])
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", ".5rem")
        .attr("class", "label")
        .text(function(d) {
          return d.countrycode;
        })
        .selectAll("circle")
        .data(
          countries.filter(function(d) {
            return g.countrycode === d.countrycode;
          })
        )
        .enter()
        .append("circle")
        .attr("r", function(d) {
          return circleRadiusScale(d.budget);
        });
    });

    circles = svg
      .selectAll("circle")
      .on("mouseover", function(d) {
        updateCountryInfo(d);
      })
      .on("mouseout", function(d) {
        updateCountryInfo();
      });
    labels = svg
      .selectAll(".label")
      .on("mouseover", function(d) {
        updateCountryInfo(d);
      })
      .on("mouseout", function(d) {
        updateCountryInfo();
      });

    updateCircles();

    function updateCountryInfo(country) {
      var info = "";
      if (country) {
        info = country.countryname + ": $" + formatBudget(country.budget);
      }
      d3.select("#country-info").html(info);
    }
  }

  function updateCircles() {
    circles.attr("fill", function(d) {
      return regionColorScale(d.regioncode);
    });
  }

  function createForces() {
    var regionNamesDomain = regions.values().map(function(regionCode) {
      return continents[regionCode];
    });
    var scaledBudgetMargin = circleSize.max;

    budgetScaleX = d3
      .scaleBand()
      .domain(regionNamesDomain)
      .range([scaledBudgetMargin, width - scaledBudgetMargin * 2]);
    budgetScaleY = d3
      .scaleLog()
      .domain(budgetExtent)
      .range([height - scaledBudgetMargin, scaledBudgetMargin * 2]);

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
        .strength(forceStrength * 2),
      y: d3
        .forceY(function(d) {
          return budgetScaleY(d.budget);
        })
        .strength(forceStrength)
    };
  }

  function createForceSimulation() {
    forceSimulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width / 2).strength(forceStrength))
      .force("y", d3.forceY(width / 2).strength(forceStrength));

    forceSimulation.nodes(countries).on("tick", function() {
      circles
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });

      labels
        .attr("x", function(d) {
          return d.x;
        })
        .attr("y", function(d) {
          return d.y;
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

      .alphaTarget(0.5)
      .restart();

    toggleRegionKey();
    toggleBudgetAxes();

    function toggleBudgetAxes() {
      var onScreenXOffset = 100,
        offScreenXOffset = -40;
      var onScreenYOffset = 40,
        offScreenYOffset = 100;

      if (d3.select(".x-axis").empty()) {
        createAxes();
      }
      var xAxis = d3.select(".x-axis"),
        yAxis = d3.select(".y-axis");

      translateAxis(
        xAxis,
        "translate(80," + (height - onScreenYOffset - 5) + ")"
      );

      translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");

      function createAxes() {
        var numberOfTicks = 10,
          tickFormat = ".0s";

        var xAxis = d3
          .axisBottom(budgetScaleX)
          .ticks(numberOfTicks, tickFormat);

        svg
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
          .call(xAxis)
          .selectAll(".tick text")
          .attr("fill", "transparent");

        var yAxis = d3.axisLeft(budgetScaleY).ticks(numberOfTicks, tickFormat);

        svg
          .append("g")
          .attr("class", "y-axis")
          .attr("transform", "translate(" + offScreenXOffset + 40 + ",0)")
          .call(yAxis);
      }

      function translateAxis(axis, translation) {
        axis
          .transition()
          .duration(500)
          .attr("transform", translation);
      }
    }
  }
}
