import * as d3Fetch from 'd3-fetch'
import { geoPath, geoIdentity } from 'd3-geo'
import { select, selectAll } from 'd3-selection'
import breakpoints from './helpers/breakpoints'

let breakpoint = breakpoints.calculate()

const chart = drawChart()

let el

function resize() {
  el.call(chart)
}

function drawChart() {
  const margin = { top: 0, right: 5, bottom: 0, left: 5 }

  let projection = geoIdentity().reflectY(true)
  let mapPath = geoPath()

  let width = 200
  let height = 200
  let scaleColor

  function enter({ container, data }) {
    const svg = container.selectAll('svg').data([data])
    const svgEnter = svg.enter().append('svg')
    const gEnter = svgEnter.append('g')
    gEnter.append('g').attr('class', 'g-plot')
  }

  function updateDom({ container, data }) {
    projection.scale(width * 0.12).translate([-75, 230])
    mapPath.projection(projection)

    if (breakpoints.isMobile()) {
      projection.scale(width * 0.1).translate([width / 2.5, height / 2])
    }

    let svg = container
      .select('svg')
      .attr(
        'viewBox',
        '0 0 ' +
          (width + margin.left + margin.right) +
          ' ' +
          (height + margin.top + margin.bottom)
      )

    let g = svg
      .select('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let plot = g.select('.g-plot')

    const provinces = plot.selectAll('path').data(data.features)

    provinces
      .enter()
      .append('path')
      .attr('class', 'map-province')
      .attr('data-id', d => d.properties.code)
      .attr('data-name', d => d.properties.province)
      .attr('d', mapPath)
      .on('mouseover', interactions.mouseover)
      .on('mouseleave', interactions.mouseleave)
      .merge(provinces)
      .attr('fill', d => scaleColor(d.properties.value))
  }

  function chart(container) {
    const data = container.datum()

    enter({ container, data })
    updateDom({ container, data })
  }

  const interactions = {
    mouseover(d) {
      const id = d.properties.code
      selectAll(
        '.chart:not([data-id="' +
          id +
          '"]), .map-province:not([data-id="' +
          id +
          '"])'
      ).classed('is-faded', true)
      selectAll(
        '.chart[data-id="' + id + '"], .map-province[data-id="' + id + '"]'
      ).classed('is-highlighted', true)
    },
    mouseleave() {
      selectAll('.chart, .map-province')
        .classed('is-faded', false)
        .classed('is-highlighted', false)
    }
  }

  chart.width = function(...args) {
    if (!args.length) return width
    width = args[0] - margin.left - margin.right
    return chart
  }

  chart.height = function(...args) {
    if (!args.length) return height
    height = args[0] - margin.top - margin.bottom
    return chart
  }

  chart.scaleColor = function(...args) {
    if (!args.length) return scaleColor
    scaleColor = args[0]
    return chart
  }

  return chart
}

function init(args) {
  el = select(args.container)
  el.datum(args.data)
  chart.scaleColor(args.scaleColor)
  resize(args)
}

async function loadMapData(url) {
  let data = await d3Fetch.json(url, d => d).then(data => data)
  return data
}

export default { init, loadMapData }
