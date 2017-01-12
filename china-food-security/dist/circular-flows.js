/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Merge country indices. Seperated for testing purpose.
(function(scope) {
  scope.countrymerge = function(data, countries) {
    return data.regions.reduce(function(memo, region, i) {
      if (countries.indexOf(region) === -1) {
        memo.push(region);
      } else {
        for (var idx = region + 1; idx < (data.regions[i + 1] || data.names.length); idx++) {
          memo.push(idx);
        }
      }

      return memo;
    }, []);
  };
})((typeof exports !== 'undefined' && exports) || window.Globalmigration || (window.Globalmigration = {}));
;/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Basically a d3.layout.chord, but with
// Depends on countrymerge.js
(function(scope) {
  // from d3/layout/chord.js

  // import "../arrays/range";
  // import "../math/trigonometry";
  var π = Math.PI,
      radians = π / 180,
      degrees = 180 / π;

  scope.layout = function() {
    var chord = {},
        chords,
        groups,
        data,
        matrix,
        indices,
        countries,
        year,
        n,
        padding = 0,
        threshold = null,
        sortGroups,
        sortSubgroups,
        sortChords,
        alpha;

    // get region from country index
    function region(index) {
      var r = 0;
      for (var i = 0; i < data.regions.length; i++) {
        if (data.regions[i] > index) {
          break;
        }
        r = i;
      }
      return data.regions[r];
    }

    function relayout() {
      var subgroups = {},
          groupSums = [],
          groupIndex = d3.range(n),
          subgroupIndex = [],
          k,
          x,
          x0,
          i,
          j;

      data = data || { matrix: {}, names: [], regions: []};
      year = year || Object.keys(data.matrix)[0];
      matrix = year && data.matrix[year] || [];

      chords = [];
      groups = [];

      // Compute the sum.
      k = 0, i = -1; while (++i < n) {
        x = 0, j = -1; while (++j < n) {
          x += matrix[indices[i]][indices[j]];
          x += matrix[indices[j]][indices[i]];
          // if (x === 0) {
          //   x = 1;
          // }
        }
        groupSums.push(x);
        subgroupIndex.push({source: d3.range(n), target: d3.range(n)});
        k += x;
      }

      // Sort groups…
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }

      // Sort subgroups…
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.source.sort(function(a, b) {
            return sortSubgroups(matrix[indices[i]][indices[a]], matrix[indices[i]][indices[b]]);
          });
          d.target.sort(function(a, b) {
            return sortSubgroups(matrix[indices[a]][indices[i]], matrix[indices[b]][indices[i]]);
          });
        });
      }

      // TODO: substract padding from chords, instead of adding it to chrord sum
      // padding = 0;

      // Convert the sum to scaling factor for [0, 2pi].
      // TODO Allow start and end angle to be specified.
      // TODO Allow padding to be specified as percentage?
      k = (2 * π - padding * n) / k;

      // Compute the start and end angle for each group and subgroup.
      // Note: Opera has a bug reordering object literal properties!
      x = chord.alpha(), i = -1; while (++i < n) {
        var inflow = 0;
        var outflow = 0;

        var di = groupIndex[i];
        // targets
        x0 = x, j = -1; while (++j < n) {
          var dj = subgroupIndex[di].target[j],
              v = matrix[indices[dj]][indices[di]],
              a0 = x,
              d = v * k;
          x += d;
          subgroups['target' + '-' + di + "-" + dj] = {
            originalIndex: indices[dj],
            index: di,
            subindex: dj,
            startAngle: a0,
            dAngle: v * k,
            value: v
          };
          inflow += v;
        }
        var lastX0 = x0;
        // sources
        x0 = x, j = -1; while (++j < n) {
          var dj = subgroupIndex[di].source[j],
              v = matrix[indices[di]][indices[dj]],
              a0 = x,
              d = v * k;
          x += d;
          subgroups['source' + '-' + di + "-" + dj] = {
            originalIndex: indices[di],
            index: di,
            subindex: dj,
            startAngle: a0,
            dAngle: v * k,
            value: v
          };
          outflow += v;
        }
        
        groups[di] = {
          id: indices[di],
          region: region(indices[di]),
          index: di,
          startAngle: lastX0,
          endAngle: x,
          angle: lastX0 + (x - lastX0) / 2,
          inflow: inflow,
          outflow: outflow,
          value: Math.round((x - lastX0) / k)
        };
        x += padding;
      }

      // Generate chords for each (non-empty) subgroup-subgroup link.
      i = -1; while (++i < n) {
        j = i - 1; while (++j < n) {
          var source = subgroups['source' + '-' + i + "-" + j],
              target = subgroups['target' + '-' + j + "-" + i];
          if (i === j) {
            if (threshold === null || source.value > threshold) {
              var target = subgroups['target' + '-' + i + "-" + j];
              chords.push({
                id: 'source-' + indices[i] + "-" + indices[j],
                source: {
                  id: indices[source.index],
                  region: region(indices[source.index]),
                  index: source.index,
                  subindex: source.subindex,
                  startAngle: source.startAngle,
                  endAngle: source.startAngle + source.dAngle,
                  value: source.value
                },
                target: {
                  id: indices[target.index],
                  region: region(indices[target.index]),
                  index: target.index,
                  subindex: target.subindex,
                  startAngle: target.startAngle,
                  endAngle: target.startAngle + target.dAngle,
                  value: target.value
                }
              });
            }
          } else {
            if (threshold === null || source.value > threshold) {
              chords.push({
                id: 'source-' + indices[i] + "-" + indices[j],
                source: {
                  id: indices[source.index],
                  region: region(indices[source.index]),
                  index: source.index,
                  subindex: source.subindex,
                  startAngle: source.startAngle,
                  endAngle: source.startAngle + source.dAngle,
                  value: source.value
                },
                target: {
                  id: indices[target.index],
                  region: region(indices[target.index]),
                  index: target.index,
                  subindex: target.subindex,
                  startAngle: target.startAngle,
                  endAngle: target.startAngle + target.dAngle,
                  value: target.value
                }
              });
            }
            var source = subgroups['source' + '-' + j + "-" + i],
                target = subgroups['target' + '-' + i + "-" + j];
            if (threshold === null || source.value > threshold) {
              chords.push({
                id: 'target-' + indices[i] + "-" + indices[j],
                source: {
                  id: indices[source.index],
                  region: region(indices[source.index]),
                  index: source.index,
                  subindex: source.subindex,
                  startAngle: source.startAngle,
                  endAngle: source.startAngle + source.dAngle,
                  value: source.value
                },
                target: {
                  id: indices[target.index],
                  region: region(indices[target.index]),
                  index: target.index,
                  subindex: target.subindex,
                  startAngle: target.startAngle,
                  endAngle: target.startAngle + target.dAngle,
                  value: target.value
                }
              });
            }
          }
        }
      }

      if (sortChords) resort();
    }

    function resort() {
      chords.sort(function(a, b) {
        return sortChords(a.source.value, b.source.value);
      });
    }

    chord.data = function(x) {
      if (!arguments.length) return data;
      data = x;
      indices = data.regions.slice();
      n = indices.length;
      chords = groups = null;
      return chord;
    };

    chord.year = function(x) {
      if (!arguments.length) return year;
      year = x;
      chords = groups = null;
      return chord;
    };

    chord.countries = function(x) {
      if (!arguments.length) return countries;
      countries = x;
      indices = scope.countrymerge(data, countries);
      n = indices.length;
      chords = groups = null;
      return chord;
    };

    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };

    chord.threshold = function(x) {
      if (!arguments.length) return threshold;
      threshold = x;
      chords = groups = null;
      return chord;
    };

    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };

    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };

    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };

    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };

    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };

    // start angle for first region (decimal degrees)
    // (stored internally in radians)
    chord.alpha = function(x) {
      if (!arguments.length) return alpha * degrees;
      alpha = (x === 0) ? 0.00001 : x; // small but not zero
      alpha *= radians;
      alpha = alpha.mod(2*π);
      chords = groups = null;
      return chord;
    };

    // proper modulus (works taking the sign of the divisor not of the dividend)
    Number.prototype.mod = function (n) {
            return ((this % n) + n) % n;
    };

    return chord;
  };
})(window.Globalmigration || (window.Globalmigration = {}));
;/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Basically a d3.svg.chord, but with
// * sourcePadding
// * targetPadding
(function(scope) {
  // from d3/svg/chord.js

  // import "../core/functor";
  var d3_functor = d3.functor;
  // import "../core/source";
  function d3_source(d) {
    return d.source;
  }
  // import "../core/target";
  function d3_target(d) {
    return d.target;
  }
  // import "../math/trigonometry";
  var π = Math.PI;
  // import "arc";
  var d3_svg_arcOffset = -π / 2;
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  // import "svg";

  scope.chord = function() {
    var source = d3_source,
        target = d3_target,
        radius = d3_svg_chordRadius,
        sourcePadding = d3_svg_chordSourcePadding,
        targetPadding = d3_svg_chordTargetPadding,
        startAngle = d3_svg_arcStartAngle,
        endAngle = d3_svg_arcEndAngle;

    // TODO Allow control point to be customized.

    function chord(d, i) {
      var s = subgroup(this, source, d, i),
          t = subgroup(this, target, d, i, true);


      if (equals(s, t)) {
        s.a1 = s.a1 - (s.a1 - s.a0) / 2;
        s.p1 = [s.r * Math.cos(s.a1), s.r * Math.sin(s.a1)];

        t.a0 = t.a0 + (t.a1 - t.a0) / 2;
        t.p0 = [t.r * Math.cos(t.a0), t.r * Math.sin(t.a0)];
      }

      var ccp = cubic_control_points(s, t, s.r * 0.618);

      return "M" + s.p0
        + arc(s.r, s.p1, s.a1 - s.a0)
        + cubic_curve(ccp.cps1, ccp.cpt0, t.p0)
        + arc(t.r, t.p1, t.a1 - t.a0)
        + cubic_curve(ccp.cpt1, ccp.cps0, s.p0)
        + "Z";
    }

    function cubic_control_points(s, t, factor) {
      cps0 = [factor * Math.cos(s.a0), factor * Math.sin(s.a0)];
      cps1 = [factor * Math.cos(s.a1), factor * Math.sin(s.a1)];
      cpt0 = [factor * Math.cos(t.a0), factor * Math.sin(t.a0)];
      cpt1 = [factor * Math.cos(t.a1), factor * Math.sin(t.a1)];
      return {
        cps0: cps0, 
        cps1: cps1, 
        cpt0: cpt0, 
        cpt1: cpt1
      };
    }

    function subgroup(self, f, d, i, target) {
      var subgroup = f.call(self, d, i),
          r = radius.call(self, subgroup, i),
          a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
          a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
      
      if (target) {
        var d = targetPadding.call(self, subgroup, i) || 0;
        r = r - d;
      } else {
        var d = sourcePadding.call(self, subgroup, i) || 0;
        r = r - d;
      }

      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [r * Math.cos(a0), r * Math.sin(a0)],
        p1: [r * Math.cos(a1), r * Math.sin(a1)]
      };
    }

    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }

    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }

    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }

    function cubic_curve(cp0, cp1, p1) {
      return "C " + cp0 + " " + cp1 + " " + p1;
    }

    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };

    // null2
    chord.sourcePadding = function(v) {
      if (!arguments.length) return sourcePadding;
      sourcePadding = d3_functor(v);
      return chord;
    };
    chord.targetPadding = function(v) {
      if (!arguments.length) return targetPadding;
      targetPadding = d3_functor(v);
      return chord;
    };

    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };

    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };

    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };

    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };

    return chord;
  };

  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  function d3_svg_chordTargetPadding(d) {
    return d.targetPadding;
  }
  function d3_svg_chordSourcePadding(d) {
    return d.sourcePadding;
  }
})(window.Globalmigration || (window.Globalmigration = {}));
;/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Timeline: year selector
(function(scope) {
  scope.timeline = function(diagram, config) {
    var years = Object.keys(diagram.data.matrix).map(function(y) { return parseInt(y); }); 

    config = config || {};
    config.element = config.element || 'body';
    config.now = config.now || years[0];
    config.incr = config.incr || 5; // year span for buttons

    var form = d3.select(config.element).append('form');

    var year = form.selectAll('.year')
      .data(years);

    var span = year.enter().append('span')
      .classed('year', true);
    span.append('input')
      .attr({
        name: 'year',
        type: 'radio',
        id: function(d) { return 'year-' + d; },
        value: function(d) { return d; },
        checked: function(d) { return d === config.now || null; }
      })
      .on('click', function(d) {
        var y = d;
        year.selectAll('input').attr('checked', function(d) {
          return y === d || null;
        });
        diagram.draw(d);
      });

    span.append('label')
      .attr('for', function(d) { return 'year-' + d; })
      .text(function(d) { return d; });

    // keyboard control
    d3.select(document.body).on('keypress', function() {
      var idx = d3.event.which - 49;
      var y = years[idx];
      if (y) {
        year.selectAll('input').each(function(d) {
          if (d === y) {
            d3.select(this).on('click')(d);
          }
        });
      }
    });
  };
})(window.Globalmigration || (window.Globalmigration = {}));
;/*
 * globalmigration
 * https://github.com/null2/globalmigration
 *
 * Copyright (c) 2013 null2 GmbH Berlin
 * Licensed under the MIT license.
 */

// Initialize diagram
(function(scope) {
  var π = Math.PI;

  scope.chart = function(data, config) {
    data = data || { regions: [], names: [], matrix: [] };

    config = config || {};
    config.element = config.element || 'body';

    config.now = config.now || Object.keys(data.matrix)[0];

    // geometry
    config.width = config.width || 1100;
    config.height = config.height || 1100;
    config.margin = config.margin || 125;
    config.outerRadius = config.outerRadius || (Math.min(config.width, config.height) / 2 - config.margin);
    config.arcWidth = config.arcWidth || 24;
    config.innerRadius = config.innerRadius || (config.outerRadius - config.arcWidth);
    config.arcPadding = config.arcPadding || 0.005;
    config.sourcePadding = config.sourcePadding || 3;
    config.targetPadding = config.targetPadding || 20;
    config.labelPadding = config.labelPadding || 10;
    config.labelRadius = config.labelRadius || (config.outerRadius + config.labelPadding);

    // animation
    var aLittleBit = π / 100000;
    config.animationDuration = config.animationDuration || 1000;
    config.initialAngle = config.initialAngle || {};
    config.initialAngle.arc = config.initialAngle.arc || { startAngle: 0, endAngle: aLittleBit };
    config.initialAngle.chord = config.initialAngle.chord || { source: config.initialAngle.arc, target: config.initialAngle.arc };

    // layout
    config.layout = config.layout || {};
    config.layout.sortSubgroups = config.layout.sortSubgroups || d3.descending;
    config.layout.sortChords = config.layout.sortChords || d3.descending;
    config.layout.threshold = config.layout.threshold || 1000;
    config.layout.labelThreshold = config.layout.labelThreshold || 100000;
    config.layout.alpha = config.layout.alpha || aLittleBit; // start angle for first region (0, zero, is up North)

    config.maxRegionsOpen = config.maxRegionsOpen || 2;
    config.infoPopupDelay = config.infoPopupDelay || 300;


    var colors = d3.scale.category10().domain(data.regions);
    if (config.layout.colors) {
      colors.range(config.layout.colors);
    }

    function arcColor(d) {
      if (d.region === d.id) {
        return colors(d.region);
      }
      var hsl = d3.hsl(colors(d.region));
      var r = [hsl.brighter(0.75), hsl.darker(2), hsl, hsl.brighter(1.5), hsl.darker(1)];
      return r[(d.id - d.region) % 5];
    }

    function chordColor(d) {
      return arcColor(d.source);
    }

    // state before animation
    var previous = {
      countries: []
    };

    Number.prototype.mod = function (n) {
            return ((this % n) + n) % n;
    };

    // calculate label position
    function labelPosition(angle) {
      var temp = angle.mod(2*π);
      return {
        x: Math.cos(temp - π / 2) * config.labelRadius,
        y: Math.sin(temp - π / 2) * config.labelRadius,
        r: (temp - π / 2) * 180 / π
      };
    }

    function formatNumber(nStr, seperator) {
      seperator = seperator || ',';

      nStr += '';
      x = nStr.split('.');
      x1 = x[0];
      x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + seperator + '$2');
      }
      return x1 + x2;
    }

    function luminicity(color) {
      var rgb = d3.rgb(color);

      return 0.21 * rgb.r + 0.71 * rgb.g + 0.07 * rgb.b;
    }

    // arc path generator
    var textPathArc = d3.svg.arc()
        .innerRadius(config.outerRadius + 10)
        .outerRadius(config.outerRadius + 10);
    var textPathArc2 = d3.svg.arc()
        .innerRadius(config.outerRadius + 18)
        .outerRadius(config.outerRadius + 18);

    // arc generator
    var arc = d3.svg.arc()
        .innerRadius(config.innerRadius)
        .outerRadius(config.outerRadius);

    // chord diagram
    var layout = Globalmigration.layout()
        .padding(config.arcPadding)
        .threshold(config.layout.threshold)
        .data(data)
        .year(config.now);

    if (config.layout.sortGroups) {
      layout.sortGroups(config.layout.sortGroups);
    }
    if (config.layout.sortSubgroups) {
      layout.sortSubgroups(config.layout.sortSubgroups);
    }
    if (config.layout.sortChords) {
      layout.sortChords(config.layout.sortChords);
    }
    if (config.layout.alpha) {
      layout.alpha(config.layout.alpha);
    }

    // chord path generator
    var chordGenerator = Globalmigration.chord()
        .radius(config.innerRadius)
        .sourcePadding(config.sourcePadding)
        .targetPadding(config.targetPadding);

    // svg element
    var svg = d3.select(config.element).append("svg")
        .attr('preserveAspectRatio', 'xMidYMid')
        .attr('viewBox', '0 0 ' + config.width + ' ' + config.height)
        .attr("width", config.width)
        .attr("height", config.height);
    var element = svg.append("g")
        .attr("id", "circle")
        .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")");

    d3.select(window).on('resize.svg-resize', function() {
      var width = svg.node().parentNode.clientWidth;

      if (width) {
        // make height adapt to shrinking of page
        if (width < config.width) {
          svg.attr('height', width);
        }
      }
    });

    // needed for fade mouseover
    var circle = element.append("circle").attr("r", config.outerRadius + 24);

    var filter = svg.append('filter').attr('id', 'dropshadow');
    filter.append('feGaussianBlur').attr({
      in: 'SourceAlpha',
      stdDeviation: 2
    });
    filter.append('feOffset').attr({
      dx: 0,
      dy: 1,
      result: 'offsetblur'
    });
    filter.append('feComponentTransfer').append('feFuncA').attr({
      type: 'linear',
      slope: 0.5
    });
    var femerge = filter.append('feMerge');
    femerge.append('feMergeNode');
    femerge.append('feMergeNode').attr('in', 'SourceGraphic');

    var info = svg.append('g')
      .attr('class', 'info-group')
      .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")")
      .append('g')
        .attr('class', 'info')
        .attr('opacity', 0);
    
    info.append('rect')
      .style('filter', 'url(#dropshadow)');
    info.append('g').attr('class', 'text');

    svg.on('mousemove', function() {
      info
        .transition()
        .duration(10)
        .attr('opacity', 0);
    });

    circle.on('mouseout', function() {
      if (infoTimer) {
        clearTimeout(infoTimer);
      }
      info
        .transition()
        .duration(10)
        .attr('opacity', 0);
    });

    var infoTimer;

    // eg: West Africa: Total inflow 46, Total outflow 2
    function groupInfo(d) {
      var el = this;

      if (infoTimer) {
        clearTimeout(infoTimer);
      }

      var bbox = el.getBBox();
      infoTimer = setTimeout(function() {
        var color = d3.select(el).style('fill');

        info
          .attr('transform', 'translate(' + (bbox.x + bbox.width / 2) + ',' + (bbox.y + bbox.height / 2) + ')');

        var text = info.select('.text').selectAll('text')
          .data([
            data.names[d.id],
            'Total In: ' + formatNumber(d.inflow),
            'Total Out: ' + formatNumber(d.outflow)
          ]);
        text.enter().append('text');
        text
          .text(function(t) { return t; })
          .style({
            fill: luminicity(color) > 160 ? 'black' : 'white'
          })
          .attr({
            transform: function(t, i) {
              return 'translate(6, ' + (i * 14 + 16) + ')';
            }
          });
        text.exit().remove();

        var tbbox = info.select('.text').node().getBBox();
        info.select('rect')
          .style('fill', color)
          .attr({
            width: tbbox.width + 12,
            height: tbbox.height + 10
          });

        info
          .transition()
          .attr('opacity', 1);
      }, config.infoPopupDelay);
    }

    // chord info
    // eg: West Asia → Pacific: 46
    function chordInfo(d) {
      var el = this;

      if (infoTimer) {
        clearTimeout(infoTimer);
      }

      var bbox = el.getBBox();
      infoTimer = setTimeout(function() {
        var color = d3.select(el).style('fill');

        info.attr('transform', 'translate(' + (bbox.x + bbox.width / 2) + ',' + (bbox.y + bbox.height / 2) + ')')
          .attr('opacity', 0)
          .transition()
          .attr('opacity', 1);

        var text = info.select('.text').selectAll('text')
          .data([
            data.names[d.source.id] + ' → ' + data.names[d.target.id] + ': ' + formatNumber(d.source.value)
          ]);
        text.enter().append('text');
        text.exit().remove();
        text
          .text(function(t) { return t; })
          .style({
            fill: luminicity(color) > 160 ? 'black' : 'white'
          })
          .attr('transform', function(t, i) {
            return 'translate(6, ' + (i * 12 + 16) + ')';
          });

        info.selectAll('rect').style('fill', d3.select(el).style('fill'));

        var tbbox = info.select('.text').node().getBBox();
        info.select('rect')
          .attr({
            width: tbbox.width + 12,
            height: tbbox.height + 10
          });
      }, config.infoPopupDelay);
    }


    function rememberTheGroups() {
      previous.groups = layout.groups().reduce(function(sum, d) {
        sum[d.id] = d;
        return sum;
      }, {});
    }
    function rememberTheChords() {
      previous.chords = layout.chords().reduce(function(sum, d) {
        sum[d.source.id] = sum[d.source.id] || {};
        sum[d.source.id][d.target.id] = d;
        return sum;
      }, {});
    }

    function getCountryRange(id) {
      var end = data.regions[data.regions.indexOf(id) + 1];

      return {
        start: id + 1,
        end: end ? end - 1 : data.names.length - 1
      };
    }

    function inRange(id, range) {
      return id >= range.start && id <= range.end;
    }

    function inAnyRange(d, ranges) {
      return !!ranges.filter(function(range) { return inRange(d.source.id, range) || inRange(d.target.id, range); }).length;
    }

    // Transition countries to region:
    // Use first country's start angle and last countries end angle. 
    function meltPreviousGroupArc(d) {
      if (d.id !== d.region) {
        return;
      }

      var range = getCountryRange(d.id);
      var start = previous.groups[range.start];
      var end = previous.groups[range.end];

      if (!start || !end) {
        return;
      }

      return {
        angle: start.startAngle + (end.endAngle - start.startAngle) / 2,
        startAngle: start.startAngle,
        endAngle: end.endAngle
      };
    }

    // Used to set the startpoint for
    // countries -> region
    // transition, that is closing a region.
    function meltPreviousChord(d) {
      if (d.source.id !== d.source.region) {
        return;
      }
      
      var c = {
        source: {},
        target: {}
      };

      Object.keys(previous.chords).forEach(function(sourceId) {
        Object.keys(previous.chords[sourceId]).forEach(function(targetId) {
          var chord = previous.chords[sourceId][targetId];

          if (chord.source.region === d.source.id) {
            if (!c.source.startAngle || chord.source.startAngle < c.source.startAngle) {
              c.source.startAngle = chord.source.startAngle;
            }
            if (!c.source.endAngle || chord.source.endAngle > c.source.endAngle) {
              c.source.endAngle = chord.source.endAngle;
            }
          }
          
          if (chord.target.region === d.target.id) {
            if (!c.target.startAngle || chord.target.startAngle < c.target.startAngle) {
              c.target.startAngle = chord.target.startAngle;
            }
            if (!c.target.endAngle || chord.target.endAngle > c.target.endAngle) {
              c.target.endAngle = chord.target.endAngle;
            }
          }
        });
      });
      
      c.source.startAngle = c.source.startAngle || 0;
      c.source.endAngle = c.source.endAngle || aLittleBit;
      c.target.startAngle = c.target.startAngle || 0;
      c.target.endAngle = c.target.endAngle || aLittleBit;

      // transition from start
      c.source.endAngle = c.source.startAngle + aLittleBit;
      c.target.endAngle = c.target.startAngle + aLittleBit;

      return c;
    }


    // finally draw the diagram
    function draw(year, countries) {
      year = year || Object.keys(data.matrix)[0];
      countries = countries || previous.countries;
      previous.countries = countries;
      var ranges = countries.map(getCountryRange);

      rememberTheGroups();
      rememberTheChords();

      layout
        .year(year)
        .countries(countries);

      // groups
      var group = element.selectAll(".group")
        .data(layout.groups, function(d) { return d.id; });
      group.enter()
        .append("g")
        .attr("class", "group");
      group
        .on("mouseover", function(d) {
          chord.classed("fade", function(p) {
            return p.source.id !== d.id && p.target.id !== d.id;
          });
        });
      group.exit().remove();
      
      // group arc
      var groupPath = group.selectAll('.group-arc')
        .data(function(d) { return [d]; });
      groupPath.enter()
        .append('path')
        .attr("class", "group-arc")
        .attr("id", function(d, i, k) { return "group" + k; });
      groupPath
        .style("fill", arcColor)
        .on("mousemove", groupInfo)
        .transition()
        .duration(config.animationDuration)
        .attrTween("d", function(d) {
          var i = d3.interpolate(previous.groups[d.id] || previous.groups[d.region] || meltPreviousGroupArc(d) || config.initialAngle.arc, d);
          return function (t) { return arc(i(t)); };
        });
      groupPath.exit().remove();

      // open regions
      groupPath
        .filter(function(d) {
          return d.id === d.region;
        })
        .on('click', function(d) {
          if (countries.length + 1 > config.maxRegionsOpen) {
            countries.shift();
          }
          draw(year, countries.concat(d.id));
        });

      // close regions
      groupPath
        .filter(function(d) {
          return d.id !== d.region;
        })
        .on('click', function(d) {
          countries.splice(countries.indexOf(d.region), 1);
          draw(year, countries);
        });

      
      // text label group
      var groupTextGroup = element.selectAll('.label')
        .data(layout.groups, function(d) { return d.id; });
      groupTextGroup.enter()
        .append("g")
        .attr('class', 'label');
      groupTextGroup
        .filter(function(d) {return d.id !== d.region})
        .transition()
        .duration(config.animationDuration)
        .attrTween("transform", function(d) {
          var i = d3.interpolate(previous.groups[d.id] || previous.groups[d.region] || meltPreviousGroupArc(d) || { angle: 0 }, d);
          return function (t) {
            var t = labelPosition(i(t).angle);
            return 'translate(' + t.x + ' ' + t.y + ') rotate(' + t.r + ')';
          };
        });
      groupTextGroup.exit()
        .transition()
        .duration(config.animationDuration)
        .style('opacity', 0)
        .attrTween("transform", function(d) {
          // do not animate region labels
          if (d.id === d.region) {
            return;
          }

          var region = layout.groups().filter(function(g) { return g.id === d.region });
          region = region && region[0];
          var angle = region && (region.startAngle + (region.endAngle - region.startAngle) / 2);
          angle = angle || 0;
          var i = d3.interpolate(d, { angle: angle });
          return function (t) {
            var t = labelPosition(i(t).angle);
            return 'translate(' + t.x + ' ' + t.y + ') rotate(' + t.r + ')';
          };
        })
        .each('end', function() {
          d3.select(this).remove();
        });

      // labels
      var groupText = groupTextGroup.selectAll('text')
        .data(function(d) { return [d]; });
      groupText.enter()
        .append("text")
      groupText
        .classed('region', function(d) {
          return d.id === d.region;
        })
        .text(function(d) { 
          if (d.id !== d.region) {
            return data.names[d.id];
          } 
        })
        .attr('transform', function(d) {
          if (d.id !== d.region) {
            return d.angle.mod(2*π) > π ? 'translate(0, -4) rotate(180)' : 'translate(0, 4)';
          }
        })
        .attr('text-anchor', function(d) {
          return d.id === d.region ?
            'middle' :
            (d.angle.mod(2*π) > π ? 'end' : 'start');
        })
        .style('fill', function(d) {
          return d.id === d.region ? arcColor(d) : null;
        })
        .classed('fade', function(d) {
          // hide labels for countries with little migrations
          return d.value < config.layout.labelThreshold;
        });

      // path for text-on-path
      var groupTextPathPath = group
        .filter(function(d) {return d.id === d.region})
        .selectAll('.group-textpath-arc')
        .data(function(d) { return [d]; });
      groupTextPathPath.enter()
        .append('path')
        .attr("class", "group-textpath-arc")
        .attr("id", function(d, i, k) { return "group-textpath-arc" + d.id; });
      groupTextPathPath
        .style("fill", 'none')
        .transition()
        .duration(config.animationDuration)
        .attrTween("d", function(d) {
          var i = d3.interpolate(previous.groups[d.id] || previous.groups[d.region] || meltPreviousGroupArc(d) || config.initialAngle.arc, d);
          if (d.angle.mod(2*π) > π/2 && d.angle.mod(2*π) < π*3/2) {
            return function (t) {
              return textPathArc2(i(t)); 
            };
          } else {
            return function (t) {
              return textPathArc(i(t)); 
            };
          }
        });
      groupTextPathPath.exit().remove();

      // text on path
      var groupTextPath = groupText
        .filter(function(d) {return d.id === d.region})
        .selectAll('textPath')
        .data(function(d) { return [d]; });
      groupTextPath
        .enter()
        .append("textPath")
      groupTextPath
        .text(function(d) { return data.names[d.id]; })
        .attr('startOffset', function(d) {
          if (d.angle.mod(2*π) > π/2 && d.angle.mod(2*π) < π*3/2) {
            return '75%';
          } else {
            return '25%';
          }
        })
        .attr("xlink:href", function(d, i, k) { return "#group-textpath-arc" + d.id; });


      groupTextPath
        .filter(function(d, i) {
          return this.getComputedTextLength() > (d.endAngle - d.startAngle) * (config.outerRadius + 18);
        })
        .remove();



      // chords
      var chord = element.selectAll(".chord")
          .data(layout.chords, function(d) { return d.id; });
      chord.enter()
        .append("path")
        .attr("class", "chord")
        .on('mousemove', chordInfo);
      chord
        .style("fill", chordColor)
        .transition()
        .duration(config.animationDuration)
        .attrTween("d", function(d) {
          var p = previous.chords[d.source.id] && previous.chords[d.source.id][d.target.id];
          p = p || (previous.chords[d.source.region] && previous.chords[d.source.region][d.target.region]);
          p = p || meltPreviousChord(d);
          p = p || config.initialAngle.chord;
          var i = d3.interpolate(p, d);
          return function (t) {
            return chordGenerator(i(t));
          };
        });
      chord.exit()
        .transition()
        .duration(config.animationDuration)
        .style('opacity', 0)
        .attrTween("d", function(d) {
          var i = d3.interpolate(d, {
            source: {
              startAngle: d.source.endAngle - aLittleBit,
              endAngle: d.source.endAngle
            },
            target: {
              startAngle: d.target.endAngle - aLittleBit,
              endAngle: d.target.endAngle
            }
          });
          return function (t) {
            return chordGenerator(i(t));
          };
        })
        .each('end', function() {
          d3.select(this).remove();
        });


      chord.classed("unselected", ranges.length ? function(d) {
        return !inAnyRange(d, ranges);
      } : false);

      d3.select(window).on('resize.svg-resize')();
    }

    return {
      draw: draw,
      data: data
    };
  };
})(window.Globalmigration || (window.Globalmigration = {}));
