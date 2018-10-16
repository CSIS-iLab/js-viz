import { selection, select, selectAll, mouse as d3Mouse } from 'd3-selection'
import { transition, duration, on } from 'd3-transition'
import { format } from 'd3-format'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { easeLinear } from 'd3-ease'
import { color as d3Color } from 'd3-color'
import tooltip from './js/tooltip'
import './scss/main.scss'

const spreadsheetID = '1qmhbztaMBKatqZkT4dQQsEm_j2Xl5d9Mp3zKmmdrqy4'
const URL = `https://spreadsheets.google.com/feeds/list/${spreadsheetID}/1/public/values?alt=json`
const formatter = format('.3s')
const chart = drawChart()
const countries = ['canada', 'china', 'eu', 'mexico']

let data,
  el,
  keyFilter = countries

function init() {
  loadData()
}

function loadData() {
  fetch(URL)
    .then(resp => resp.json())
    .then(
      json => {
        data = parseData(json.feed.entry)
      },
      reason => {
        console.log('Error: ' + reason.result.error.message)
      }
    )
    .then(() => {
      initChart({
        data: data,
        container: '.chart'
      })
    })
}

function parseData(rawData) {
  return rawData.map(r => {
    let row = r
    let stateData = {}
    Object.keys(row).forEach(c => {
      let column = c

      if (column.includes('gsx$')) {
        stateData[column.replace('gsx$', '')] = row[column]['$t']
      }
    })
    return stateData
  })
}

function resize() {
  const parentWidth = el.node().offsetWidth

  chart.width(parentWidth)
  chart.height(parentWidth)
  el.call(chart)
}
window.addEventListener('resize', resize)

function initChart(args) {
  el = select(args.container)
  el.datum(args.data)

  resize()
}

function drawChart() {
  const margin = { top: 5, right: 5, bottom: 5, left: 5 }

  let width = chart.width,
    height = 600

  let scaleX = scaleLinear()
  let scaleY = scaleLinear()

  function enter({ container }) {
    // calculate cellSize based on dimensions of svg
    var cellSize = calcCellSize(width - 132, height - 132, 11, 8)

    // generate grid data with specified number of columns and rows
    var gridData = gridData(11, 8, cellSize)

    let svgNodes = document.querySelectorAll('.map').length
    let svg = svgNodes
      ? container.selectAll('.map')
      : select('.chart').append('svg')

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('class', 'map')
      .attr(
        'viewBox',
        '0 0 ' +
          (width + margin.left + margin.right) +
          ' ' +
          (height + margin.top + margin.bottom)
      )

    selectAll('.legend-label:not(.other)').on('click', interactions.key.click)

    let gridNodes = document.querySelectorAll('.gridlines').length
    let grid = gridNodes ? container.selectAll('.gridlines') : svg.append('g')
    grid
      .attr('class', 'gridlines')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    let rowNodes = document.querySelectorAll('.row').length
    let row = rowNodes
      ? container.selectAll('.row')
      : grid
          .selectAll('.row')
          .data(gridData)
          .enter()
          .append('g')
          .attr('class', 'row')

    let gridMapNodes = document.querySelectorAll('.gridmap').length
    var gridMap = gridMapNodes
      ? container.selectAll('.gridmap')
      : svg
          .append('g')
          .attr('class', 'gridmap')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          )

    ready(data)

    function ready(data) {
      drawGridMap()

      function drawGridMap() {
        var coordinates = keyFilter.length
          ? data.map(d => {
              Object.keys(d).forEach(c => {
                if (countries.includes(c) && !keyFilter.includes(c)) {
                  d = { ...d, [c]: 0 }
                }
              })
              return d
            })
          : data

        let groupNodes = document.querySelectorAll('.group').length
        var groups = groupNodes
          ? gridMap.selectAll('.group')
          : gridMap
              .selectAll('.group')
              .data(coordinates, function(d) {
                return d.code
              })
              .enter()
              .append('g')
              .attr('class', function(d) {
                return 'group ' + d.code
              })

        groups
          .data(coordinates, function(d) {
            return d.code
          })
          .attr('x', function(d) {
            return (d.col - 1) * cellSize + 12 * d.col
          })
          .attr('y', function(d) {
            return (d.row - 1) * cellSize + 12 * d.row
          })
          .on('mouseover', interactions.states.mouseover)
          .on('mouseleave', interactions.states.mouseleave)

        groups.each((g, gi, nodes) => {
          let stateNode = document.querySelector(`.state.${g.code}`)
          var state = stateNode
            ? select(nodes[gi]).selectAll(`.state.${g.code}`)
            : select(nodes[gi])
                .selectAll('.state')
                .data([g], function(d) {
                  return d.code
                })
                .enter()
                .append('rect')
                .attr('class', function(d) {
                  return 'state ' + d.code
                })

          var borderScale = scaleLinear()
            .domain([0, 100])
            .range(['#E5E5E5', '#5E5E5E'])

          state
            .attr('stroke', function(d) {
              return borderScale(d.grandtotal)
            })
            .attr('x', function(d) {
              return (d.col - 1) * cellSize + 12 * d.col
            })
            .attr('y', function(d) {
              return (d.row - 1) * cellSize + 12 * d.row
            })
            .attr('width', cellSize + 2)
            .attr('height', cellSize + 2)

          let canada = Array(Math.round((g.canada / 100) * 100)).fill({
            state: g.code,
            country: 'canada'
          })
          let china = Array(Math.round((g.china / 100) * 100)).fill({
            state: g.code,
            country: 'china'
          })
          let eu = Array(Math.round((g.eu / 100) * 100)).fill({
            state: g.code,
            country: 'eu'
          })
          let mexico = Array(Math.round((g.mexico / 100) * 100)).fill({
            state: g.code,
            country: 'mexico'
          })

          let percent = eu
            .concat(china)
            .concat(canada)
            .concat(mexico)

          percent = Array(100 - percent.length)
            .fill({
              state: g.code,
              country: 'other'
            })
            .concat(percent)

          let parentX = select(nodes[gi]).attr('x')
          let parentY = select(nodes[gi]).attr('y')

          let percentNodes = document.querySelectorAll(`.percent.${g.code}`)
            .length
          var percents = percentNodes
            ? select(nodes[gi]).selectAll('.percent')
            : select(nodes[gi])
                .selectAll('.percent')
                .data(percent, function(d, i) {
                  return { ...d, i: i }
                })
                .enter()
                .append('rect')
                .attr('class', 'percent ' + g.code)

          var fillScale = scaleOrdinal()
            .domain([...countries, 'other'])
            .range(['#9EB040', '#FE5000', '#0AA4CF', '#F2AF19', '#fff'])

          percents.remove()
          percents
            .data(percent, function(d, i) {
              return { ...d, i: i }
            })
            .enter()
            .append('rect')
            .attr('class', 'percent ' + g.code)
            .attr('fill', function(d) {
              return fillScale(d.country)
            })
            .attr('width', (cellSize - 6) / 10)
            .attr('height', (cellSize - 6) / 10)

            .attr('x', function(d, di) {
              let x = ((di % 10) * (cellSize - 2)) / 10 + parseInt(parentX, 10)
              return x + 2
            })
            .attr('y', function(d, di) {
              let y =
                (Math.ceil((di + 1) / 10) * (cellSize - 2)) / 10 +
                parseInt(parentY, 10) -
                cellSize / 10 +
                1
              return y + 2
            })

          var label = select(nodes[gi]).selectAll(`.label.${g.code}`)

          label.remove()

          label = select(nodes[gi])
            .selectAll(`.label.${g.code}`)
            .data([g], function(d) {
              return d.code
            })
            .enter()
            .append('text')
            .attr('class', function(d) {
              return 'label ' + g.code
            })

          label
            .attr('x', function(d) {
              return (d.col - 1) * cellSize + cellSize / 2 + 12 * d.col
            })
            .attr('y', function(d) {
              return (d.row - 1) * cellSize + (cellSize / 2 - 3) + 12 * d.row
            })
            .style('text-anchor', 'middle')
            .text(function(d) {
              return g.code
            })
        })
      }
    }

    // function that generates a nested array for square grid
    function gridData(ncol, nrow, cellsize) {
      var gridData = []
      var xpos = 1 // starting xpos and ypos at 1 so the stroke will show when we make the grid below
      var ypos = 1

      // calculate width and height of the cell based on width and height of the canvas
      var cellSize = cellsize

      // iterate for rows
      for (var row = 0; row < nrow; row++) {
        gridData.push([])

        // iterate for cells/columns inside each row
        for (var col = 0; col < ncol; col++) {
          gridData[row].push({
            x: xpos,
            y: ypos,
            width: cellSize,
            height: cellSize
          })

          // increment x position (moving over by 50)
          xpos += cellSize
        }

        // reset x position after a row is complete
        xpos = 1
        // increment y position (moving down by 50)
        ypos += cellSize
      }
      return gridData
    }

    // function to calculate grid cell size based on width and height of svg
    function calcCellSize(w, h, ncol, nrow) {
      svg
      // leave tiny space in margins
      var gridWidth = w - 2
      var gridHeight = h - 2
      var cellSize

      // calculate size of cells in columns across
      var colWidth = Math.floor(gridWidth / ncol)
      // calculate size of cells in rows down
      var rowWidth = Math.floor(gridHeight / nrow)

      // take the smaller of the calculated cell sizes
      if (colWidth <= rowWidth) {
        cellSize = colWidth
      } else {
        cellSize = rowWidth
      }
      return cellSize
    }
  }

  function chart(container) {
    const d3Data = container.datum()
    enter({ container, data })
    // updateDom({ container, data })
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

  const interactions = {
    key: {
      click(d) {
        let excluded = ['legend-label', 'active', 'other', 'all']

        let classList = this.classList

        let isAll = classList.contains('all')
        let isActive = classList.contains('active')

        let country = [...classList].find(c => !excluded.includes(c))

        if (keyFilter.includes(country)) {
          keyFilter = keyFilter.filter(c => c !== country)
          classList.toggle('active')
        } else {
          keyFilter.push(country)
          classList.toggle('active')
        }

        keyFilter.length !== 4
          ? select('.all')
              .node()
              .classList.remove('active')
          : select('.all')
              .node()
              .classList.add('active')

        if (isAll && !isActive) {
          keyFilter = countries
          selectAll('.legend-label').each((g, gi, nodes) => {
            nodes[gi].classList.add('active')
          })
        } else {
          keyFilter = keyFilter
        }

        if (!isAll && !isActive) {
          el.call(chart)
        }
      }
    },

    states: {
      mouseover(d) {
        interactions.states.showTooltip(d)
      },
      mouseleave(d) {
        tooltip.hide()
      },
      click(d) {
        //
      },
      showTooltip(d) {
        // debugger
        let tooltipContent = `
        <span class="tooltip-close">x</span>
        <p class="tooltip-heading">
          ${d.state}: ${d.grandtotal}%
        </p>
        <ul>
        <li class="eu">EU: ${d.eu ? d.eu : 0}%</li>
        <li class="china">China: ${d.china ? d.china : 0}%</li>
        <li class="canada">Canada: ${d.canada ? d.canada : 0}%</li>
        <li class="mexico">Mexico: ${d.mexico ? d.mexico : 0}%</li>
        <ul>
        `
        tooltip.show(tooltipContent)
      }
    }
  }

  return chart
}

gapi.load('client', init)
