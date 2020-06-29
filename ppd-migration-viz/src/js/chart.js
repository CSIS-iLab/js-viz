import breakpoints from './helpers/breakpoints'
import { categories } from './categories'
import { axisBottom } from 'd3-axis'
import { format } from 'd3-format'
import { line as d3Line, area as d3Area } from 'd3-shape'
import { scaleLinear } from 'd3-scale'
import { select, selectAll, mouse as d3Mouse } from 'd3-selection'
import { transition } from 'd3-transition'
import Grid from './grid'

const chart = drawChart()
const formatter = format('.2~s')
const t = transition().duration(750)

let el

function resize(args) {
  const sz = el.node().offsetWidth
  chart.width(sz)
  el.call(chart)
}

function drawChart() {
  const margin = { top: 10, right: 12, bottom: 40, left: 15 }

  let width = 200
  let height = 200

  let years
  let startYear
  let endYear
  let currentCategory
  let defaultPathValues
  let scaleColor

  let scaleX = scaleLinear()
  let scaleY = scaleLinear()

  function updateScales({ data }) {
    scaleX.domain([startYear, endYear]).range([0, width])

    const values = data
      .map(d => {
        return d.values
          .reduce((a, b) => a.concat(b), [])
          .map(d => d[currentCategory])
      })
      .reduce((acc, val) => acc.concat(val), [])

    const maxValue = Math.max(...values)

    scaleY
      .domain([0, maxValue])
      .range([height, 0])
      .nice()

    defaultPathValues = years.map(year => ({
      year: year,
      [currentCategory]: 0
    }))
  }

  function updateProvinces({ container, data }) {
    const provinces = container.selectAll('.province').data(data, d => d.id)

    provinces.exit().remove()

    provinces
      .enter()
      .append('figure')
      .attr('class', 'province')
      .attr('data-id', d => d.id)
      .merge(provinces)
      .style('grid-column', d => returnGridPosition(Grid[d.id].x))
      .style('grid-row', d => returnGridPosition(Grid[d.id].y))
      .attr(
        'aria-label',
        d =>
          `${d.province} had ${formatter(d.values[0][currentCategory])} total ${
            categories[currentCategory].title
          } in ${d.values[0].year} and ${formatter(
            d.values[d.values.length - 1][currentCategory]
          )} in ${d.values[d.values.length - 1].year}.`
      )
      .each(makeSmallChart)
  }

  function makeSmallChart(data, i) {
    const svgWidth = width - margin.left - margin.right
    scaleX.range([0, svgWidth])

    const area = d3Area()
      .x(d => scaleX(d.year))
      .y1(d => scaleY(d[currentCategory]))
      .y0(scaleY(0))

    const line = d3Line()
      .x(d => scaleX(d.year))
      .y(d => scaleY(d[currentCategory]))

    const svg = select(this)
      .selectAll('svg')
      .data([data])

    svg.exit().remove()

    const svgEnter = svg.enter().append('svg')

    let g = svgEnter
      .attr('class', 'chart')
      .attr('data-id', data.id)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svgEnter
      .merge(svg)
      .attr(
        'viewBox',
        `0 0 ${svgWidth + margin.left + margin.right} ${height +
          margin.top +
          margin.bottom}`
      )

    // Fixes bug in Edge where SVG requires width & height for CSS grid cell size
    if (window.navigator.userAgent.indexOf('Edge') > -1) {
      svgEnter
        .attr('width', svgWidth + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    }

    g.append('g').attr('class', 'axis axis--x')
    g.append('g').attr('class', 'axis axis--y')

    g.append('g')
      .attr('class', 'g-plot')
      .append('text')
      .attr('class', 'chart-title')
      .text(data.province)

    g.append('g').attr('class', 'g-points')

    g.append('g')
      .attr('class', 'g-clip')
      .append('rect')
      .attr('class', 'plot-area')
      .attr('width', svgWidth + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('transform', `translate(-${margin.left} -${margin.top})`)
      .on('mouseover', interactions.mouseover)
      .on('mousemove', interactions.mousemove)
      .on('mouseleave', interactions.mouseleave)

    g = svgEnter.merge(svg).select('g')
    drawAxis({ g, svgWidth })

    g.select('.chart-title').attr(
      'transform',
      `translate(${svgWidth / 2} ${height + margin.bottom - 3})`
    )

    const plot = g.select('.g-plot')

    const pathEl = plot.selectAll('.path').data([data])

    pathEl.exit().remove()

    pathEl
      .enter()
      .append('path')
      .attr('class', 'path')
      .attr('data-id', d => d.id)
      .attr('d', line(defaultPathValues))
      .merge(pathEl)
      .transition(t)
      .attr('d', d => line(d.values))
      .style('stroke', d => returnColor(d.values))

    const areaEl = plot.selectAll('.area').data([data])

    areaEl.exit().remove()

    areaEl
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('data-id', d => d.id)
      .attr('d', area(defaultPathValues))
      .merge(areaEl)
      .transition(t)
      .attr('d', d => area(d.values))
      .style('fill', d => returnColor(d.values))

    drawPoints(g, data)
  }

  function drawPoints(g, data) {
    const pointsContainer = g.select('.g-points')

    const pointCircles = pointsContainer
      .selectAll('.point-circle')
      .data(data.values, d => d.year)

    pointCircles.exit().remove()

    pointCircles
      .enter()
      .append('circle')
      .attr('class', 'point-circle point')
      .attr('r', 2)
      .attr('cx', d => scaleX(d.year))
      .attr('cy', d => scaleY(d[currentCategory]))
      .merge(pointCircles)
      .classed('is-visible', d => d.year === startYear || d.year === endYear)
      .attr('data-year', d => d.year)
      .transition(t)
      .attr('cx', d => scaleX(d.year))
      .attr('cy', d => scaleY(d[currentCategory]))

    const pointLabels = pointsContainer
      .selectAll('.point-label')
      .data(data.values, d => d.year)

    pointLabels.exit().remove()

    pointLabels
      .enter()
      .append('text')
      .attr('class', 'point-label point')
      .attr('x', d => scaleX(d.year))
      .attr('y', d => scaleY(d[currentCategory]) - 5)
      .merge(pointLabels)
      .classed('is-visible', d => d.year === startYear || d.year === endYear)
      .attr('data-year', d => d.year)
      .transition(t)
      .attr('x', d => scaleX(d.year))
      .attr('y', d => scaleY(d[currentCategory]) - 5)
      .text(d => formatter(d[currentCategory]))

    const pointYears = pointsContainer
      .selectAll('.point-year')
      .data(data.values, d => d.year)

    pointYears.exit().remove()

    pointYears
      .enter()
      .append('text')
      .attr('class', 'point-year point')
      .attr('x', d => scaleX(d.year))
      .attr('y', height + 16)
      .merge(pointYears)
      .classed('is-visible', false)
      .attr('data-year', d => d.year)
      .transition(t)
      .attr('x', d => scaleX(d.year))
      .attr('y', height + 16)
      .text(d => d.year)
  }

  function drawAxis({ g, svgWidth }) {
    const xAxis = axisBottom(scaleX)
      .tickValues([startYear, endYear])
      .tickFormat(d => {
        return `'${d.toString().slice(-2)}`
      })
    g.select('.axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
  }

  function returnGridPosition(pos) {
    return pos
  }

  function returnColor(values) {
    return scaleColor(values[values.length - 1][currentCategory])
  }

  function chart(container) {
    const data = container.datum()

    updateScales({ container, data })
    updateProvinces({ container, data })
  }

  chart.width = function(...args) {
    if (!args.length) return width
    const gridColumns = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--grid-columns')
    width = args[0] / gridColumns
    height = (width - margin.left - margin.right) / 1.33333333333
    return chart
  }

  chart.currentCategory = function(...args) {
    if (!args.length) return currentCategory
    currentCategory = args[0]
    return chart
  }

  chart.years = function(...args) {
    if (!args.length) return years
    years = args[0]
    startYear = years[0]
    endYear = years[years.length - 1]
    return chart
  }

  chart.scaleColor = function(...args) {
    if (!args.length) return scaleColor
    scaleColor = args[0]
    return chart
  }

  const interactions = {
    currentID: null,
    currentYear: null,
    mouseover(d) {
      interactions.currentID = d.id
      interactions.currentYear = interactions.getYear(this)
      interactions.highlightChart()
    },
    mouseleave() {
      interactions.resetChart()
      interactions.hidePoints()
    },
    mousemove() {
      const year = interactions.getYear(this)

      if (year != interactions.currentYear) {
        interactions.currentYear = year
        interactions.showPoints()
      }
    },
    highlightChart() {
      selectAll(
        '.chart[data-id="' +
          this.currentID +
          '"], .map-province[data-id="' +
          this.currentID +
          '"]'
      ).classed('is-highlighted', true)
      selectAll(
        '.chart:not([data-id="' +
          this.currentID +
          '"]), .map-province:not([data-id="' +
          this.currentID +
          '"])'
      ).classed('is-faded', true)
    },
    resetChart() {
      selectAll('.chart, .map-province')
        .classed('is-faded', false)
        .classed('is-highlighted', false)
    },
    showPoints() {
      const points = selectAll('.chart .point')

      points
        .filter(d => d.year === this.currentYear)
        .classed('is-visible', true)
      points
        .filter(d => d.year !== this.currentYear)
        .classed('is-visible', false)

      selectAll('.chart .axis').classed('is-hidden', true)
    },
    hidePoints() {
      selectAll('.chart .point').classed('is-visible', false)
      selectAll(
        '.chart .point-circle[data-year="' +
          endYear +
          '"], .chart .point-label[data-year="' +
          endYear +
          '"]'
      ).classed('is-visible', true)
      selectAll('.chart .axis').classed('is-hidden', false)
    },
    getYear(el) {
      return Math.round(scaleX.invert(d3Mouse(el)[0]))
    }
  }

  return chart
}

function init(args) {
  el = select(args.container)
  el.datum(args.data)
  chart.years(args.years)
  chart.currentCategory(args.currentCategory)
  chart.scaleColor(args.scaleColor)
  resize(args)
}

export default { init }
