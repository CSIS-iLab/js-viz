function createBubbleChart(error, countries, regionNames) {
  var budgets = countries.map(function(country) {
    return +country.Budget;
  });
  var meanBudget = d3.mean(budgets),
    budgetExtent = d3.extent(budgets),
    budgetScaleX,
    budgetScaleY;

  var regions = d3.set(
    countries.map(function(country) {
      return country.RegionCode;
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
  updateForces(forces.region);
  setTimeout(function() {
    return updateForces(forces.countryCenters);
  }, 5000);
  addGroupingListeners();

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

      d3
        .selectAll("g.region-key-element")
        .append("rect")
        .attr("width", keyElementWidth)
        .attr("height", keyElementHeight)
        .attr("x", function(d) {
          return regionKeyScale(d) + 40;
        })
        .attr("fill", function(d) {
          return regionColorScale(d);
        });

      d3
        .selectAll("g.region-key-element")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", ".7rem")
        .attr("fill", "white")
        .attr("x", function(d) {
          var val = regionKeyScale(d) + keyElementWidth / 2;
          return val + 40;
        })
        .text(function(d) {
          return regionNames[d];
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
        return circleRadiusScale(d.Budget);
      });

    var groups = svg.selectAll(".circle-container");

    groups.each(function(g, gi, nodes) {
      d3
        .select(nodes[gi])
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", ".5rem")
        .attr("class", "label")
        .text(function(d) {
          return d.CountryCode;
        })
        .selectAll("circle")
        .data(
          countries.filter(function(d) {
            return g.CountryCode === d.countryCode;
          })
        )
        .enter()
        .append("circle")
        .attr("r", function(d) {
          return circleRadiusScale(d.Budget);
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
        info = country.CountryName + ": $" + formatBudget(country.Budget);
      }
      d3.select("#country-info").html(info);
    }
  }

  function updateCircles() {
    circles.attr("fill", function(d) {
      return regionColorScale(d.RegionCode);
    });
  }

  function createForces() {
    forces = {
      countryCenters: createCountryCenterForces(),
      region: createRegionForces(),
      budget: createBudgetForces()
    };

    function createCountryCenterForces() {
      var projectionStretchY = 0.25,
        projectionMargin = circleSize.max,
        projection = d3
          .geoEquirectangular()
          .scale((width / 2 - projectionMargin) / Math.PI)
          .translate([width / 2, height * (1 - projectionStretchY) / 2]);

      return {
        x: d3
          .forceX(function(d) {
            return projection([d.CenterLongitude, d.CenterLatitude])[0];
          })
          .strength(forceStrength),
        y: d3
          .forceY(function(d) {
            return (
              projection([d.CenterLongitude, d.CenterLatitude])[1] *
              (1 + projectionStretchY)
            );
          })
          .strength(forceStrength)
      };
    }

    function createRegionForces() {
      return {
        x: d3.forceX(regionForceX).strength(forceStrength),
        y: d3.forceY(regionForceY).strength(forceStrength)
      };

      function regionForceX(d) {
        if (d.RegionCode === "EU") {
          return left(width);
        } else if (d.RegionCode === "AF") {
          return left(width);
        } else if (d.RegionCode === "AS") {
          return right(width);
        } else if (d.RegionCode === "EM" || d.RegionCode === "EM") {
          return right(width);
        }
        return center(width);
      }

      function regionForceY(d) {
        if (d.RegionCode === "EU") {
          return top(height);
        } else if (d.RegionCode === "AF") {
          return bottom(height - 100);
        } else if (d.RegionCode === "AS") {
          return top(height);
        } else if (d.RegionCode === "EM" || d.RegionCode === "EM") {
          return bottom(height - 100);
        }
        return center(height);
      }

      function left(dimension) {
        return dimension / 4;
      }
      function center(dimension) {
        return dimension / 2;
      }
      function right(dimension) {
        return dimension / 4 * 3;
      }
      function top(dimension) {
        return dimension / 4;
      }
      function bottom(dimension) {
        return dimension / 4 * 3;
      }
    }

    function createBudgetForces() {
      var regionNamesDomain = regions.values().map(function(regionCode) {
        return regionNames[regionCode];
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
              budgetScaleX(regionNames[d.RegionCode]) +
              centerCirclesInScaleBandOffset +
              75
            );
          })
          .strength(forceStrength * 2),
        y: d3
          .forceY(function(d) {
            return budgetScaleY(d.Budget);
          })
          .strength(forceStrength)
      };
    }
  }

  function createForceSimulation() {
    forceSimulation = d3
      .forceSimulation()
      .force("x", d3.forceX(width / 2).strength(forceStrength))
      .force("y", d3.forceY(width / 2).strength(forceStrength))
      .force("collide", d3.forceCollide(forceCollide));
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
    return !countryCenterGrouping() || !budgetGrouping()
      ? circleRadiusScale(d.Budget) + 1
      : 0;
  }

  function countryCenterGrouping() {
    return isChecked("#country-centers");
  }

  function budgetGrouping() {
    return isChecked("#budget");
  }

  function addGroupingListeners() {
    addListener("#country-centers", forces.countryCenters);
    addListener("#regions", forces.region);
    addListener("#budget", forces.budget);

    function addListener(selector, forces) {
      d3.select(selector).on("click", function() {
        updateForces(forces);
        toggleRegionKey(!budgetGrouping());
        toggleBudgetAxes(budgetGrouping());
      });
    }

    function toggleBudgetAxes(showAxes) {
      var onScreenXOffset = 100,
        offScreenXOffset = -40;
      var onScreenYOffset = 40,
        offScreenYOffset = 100;

      if (d3.select(".x-axis").empty()) {
        createAxes();
      }
      var xAxis = d3.select(".x-axis"),
        yAxis = d3.select(".y-axis");

      if (showAxes) {
        translateAxis(
          xAxis,
          "translate(80," + (height - onScreenYOffset - 5) + ")"
        );

        console.log(onScreenXOffset);
        translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");
      } else {
        translateAxis(
          xAxis,
          "translate(80," + (height + offScreenYOffset) + ")"
        );
        translateAxis(yAxis, "translate(" + offScreenXOffset + ",0)");
      }

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

  function updateForces(forces) {
    forceSimulation
      .force("x", forces.x)
      .force("y", forces.y)
      .force("collide", d3.forceCollide(forceCollide))
      .alphaTarget(0.5)
      .restart();
  }
}
