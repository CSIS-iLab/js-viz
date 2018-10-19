import { select, selectAll } from 'd3-selection'
import { format } from 'd3-format'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { on, transition, duration } from 'd3-transition'
import { extent } from 'd3-array'
import tooltip from './tooltip'

const formatter = format('.3s')
const countries = ['canada', 'china', 'eu', 'mexico']
const margin = { top: 5, right: 5, bottom: 5, left: 5 }

const container = select('.chart')
const rows = 8
const columns = 11
const padding = 12

let chart,
  width,
  height,
  borderScale,
  fillScale,
  keyFilter = countries

function draw(data) {
  borderScale = scaleLinear()
    .domain(
      extent(data, function(d) {
        return +d.totaldollars
      })
    )
    .range(['#E5E5E5', '#5E5E5E'])

  fillScale = scaleOrdinal()
    .domain([...countries, 'other'])
    .range(['#9EB040', '#FE5000', '#0AA4CF', '#F2AF19', '#fff'])

  function drawGridMap() {
    width = drawGridMap.width()
    height = drawGridMap.width() * 0.9
    // calculate cellSize based on dimensions of svg
    let cellSize = calcCellSize(
      width - columns * padding,
      height - columns * padding,
      columns,
      rows
    )

    // generate grid data with specified number of columns and rows
    let gridData = gridGraph(columns, rows, cellSize)

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

    selectAll('input').on('click', interactions.key.click)

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
    let gridMap = gridMapNodes
      ? container.selectAll('.gridmap')
      : svg
          .append('g')
          .attr('class', 'gridmap')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          )

    let coordinates = data.map(d => {
      Object.keys(d).forEach(c => {
        if (countries.includes(c) && !keyFilter.includes(c)) {
          d = { ...d, [c]: 0 }
        }
      })
      return d
    })

    let groupNodes = document.querySelectorAll('.group').length
    let groups = groupNodes
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
        return (d.col - 1) * cellSize + padding * d.col
      })
      .attr('y', function(d) {
        return (d.row - 1) * cellSize + padding * d.row
      })

      .on('mouseover', interactions.states.mouseover)
      .on('mouseleave', interactions.states.mouseleave)

    groups.each((g, gi, nodes) => {
      let stateNode = document.querySelector(`.state.${g.code}`)
      let state = stateNode
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

      state
        .attr('stroke', function(d) {
          return borderScale(d.totaldollars)
        })
        .attr('x', function(d) {
          return (d.col - 1) * cellSize + padding * d.col
        })
        .attr('y', function(d) {
          return (d.row - 1) * cellSize + padding * d.row
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

      let percent = canada
        .concat(china)
        .concat(eu)
        .concat(mexico)

      percent = Array(100 - percent.length)
        .fill({
          state: g.code,
          country: 'other'
        })
        .concat(percent)

      let parentX = select(nodes[gi]).attr('x')
      let parentY = select(nodes[gi]).attr('y')

      let percents = select(nodes[gi]).selectAll(`.percent.${g.code}`)

      percents
        .attr('height', (cellSize - padding / 2) / 10)
        .transition(transition().duration(1200))
        .attr('height', 0)
        .remove()

      percents = select(nodes[gi])
        .selectAll(`.percent.${g.code}`)
        .data(percent, function(d, i) {
          return { ...d, i: i }
        })
        .enter()
        .append('rect')
        .attr('class', 'percent ' + g.code)

        .attr('fill', function(d) {
          return fillScale(d.country)
        })

        .attr('x', function(d, di) {
          let switchIndex = percent.findIndex(p => p.country !== 'other')

          switchIndex = switchIndex >= 0 ? switchIndex + 10 : null

          let reverse =
            Math.ceil((di + 1) / 10) * 10 <= switchIndex
              ? Math.abs(99 - di)
              : di

          let x = ((reverse % 10) * (cellSize - 2)) / 10 + parseInt(parentX, 10)
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
        .attr('height', 0)
        .attr('width', (cellSize - padding / 2) / 10)
        .transition(transition().duration(600))
        .attr('height', (cellSize - padding / 2) / 10)

      let label = select(nodes[gi]).selectAll(`.label.${g.code}`)

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
          return (d.col - 1) * cellSize + cellSize / 2 + padding * d.col
        })
        .attr('y', function(d) {
          return (d.row - 1) * cellSize + (cellSize / 2 - 3) + padding * d.row
        })
        .style('text-anchor', 'middle')
        .text(function(d) {
          return g.code
        })
    })
  }

  // function that generates a nested array for square grid
  function gridGraph(ncol, nrow, cellsize) {
    let gridData = []
    let xpos = 1 // starting xpos and ypos at 1 so the stroke will show when we make the grid below
    let ypos = 1

    // calculate width and height of the cell based on width and height of the canvas
    let cellSize = cellsize

    // iterate for rows
    for (let row = 0; row < nrow; row++) {
      gridData.push([])

      // iterate for cells/columns inside each row
      for (let col = 0; col < ncol; col++) {
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
    // leave tiny space in margins
    let gridWidth = w - 2
    let gridHeight = h - 2
    let cellSize

    // calculate size of cells in columns across
    let colWidth = Math.floor(gridWidth / ncol)
    // calculate size of cells in rows down
    let rowWidth = Math.floor(gridHeight / nrow)

    // take the smaller of the calculated cell sizes
    if (colWidth <= rowWidth) {
      cellSize = colWidth
    } else {
      cellSize = rowWidth
    }
    return cellSize
  }

  drawGridMap.width = function(...args) {
    if (!args.length) return width
    width = args[0] - margin.left - margin.right
  }

  drawGridMap.height = function(...args) {
    if (!args.length) return height
    height = args[0] - margin.top - margin.bottom
  }

  const interactions = {
    key: {
      click(d) {
        let excluded = ['legend-label', 'active', 'other', 'all']

        let classList = this.classList

        let isAll = classList.contains('all')
        let isActive = !this.checked
        let isAllSelected = select('input.all').node().checked
        let country = [...classList].find(c => !excluded.includes(c))
        let all = select('input.all').node()

        if (country && keyFilter.includes(country)) {
          keyFilter = keyFilter.filter(c => c !== country)
          all.removeAttribute('disabled')
          all.checked = false
        } else if (country) {
          keyFilter.push(country)
        }

        if (keyFilter.length !== 4) {
          all.checked = false
          all.removeAttribute('disabled')
        } else {
          select('input.all').node().checked = true
          all.disabled = true
        }

        if (isAll && !isActive) {
          keyFilter = countries
          selectAll('input').each((g, gi, nodes) => {
            nodes[gi].checked = true
          })
        } else {
          keyFilter = keyFilter
        }

        container.call(chart)
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
        let tooltipContent = `
        <p class="tooltip-heading">
          ${d.state}
        </p>
        <p class="tooltip-body">
          $${formatter(d.totaldollars).replace(/G/, 'B')} Total Trade
        </p>
        <ul class="tooltip-list">
          <li class="canada">Canada: ${d.canada ? formatter(d.canada) : 0}%</li>
          <li class="china">China: ${d.china ? formatter(d.china) : 0}%</li>
          <li class="eu">EU: ${d.eu ? formatter(d.eu) : 0}%</li>
          <li class="mexico">Mexico: ${d.mexico ? formatter(d.mexico) : 0}%</li>
        </ul>
        <p class="tooltip-footer">
          ${formatter(d.grandtotal)}% of Total Trade
        </p>
        `
        tooltip.show(tooltipContent)
      }
    }
  }
  return drawGridMap
}

function init(data) {
  container.datum(data)
  chart = draw(data)
  resize()
}

function resize() {
  const parentWidth = container.node().offsetWidth
  chart.width(parentWidth)
  chart.height(parentWidth) * 0.9
  container.call(chart)
}

export default { init, draw, resize }
