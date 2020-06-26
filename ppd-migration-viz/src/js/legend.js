import { format } from 'd3-format'
import { scaleThreshold } from 'd3-scale'
import { select, selectAll } from 'd3-selection'
import { legendColor, legendHelpers } from 'd3-svg-legend'

const Legend = {
  colorDomain: [],
  setup() {
    const svg = select('#interactive__legend')
      .attr('width', '225px')
      .attr('height', '30px')
    svg.append('g').attr('class', 'legendQuant')

    const thresholdScale = this.returnColorScale()

    var legend = legendColor()
      .labelFormat(format('.2s'))
      // .labels(legendHelpers.thresholdLabels)
      .labels(this.labelFormatter)
      .scale(thresholdScale)
      .shapeWidth(30)
      .shapeHeight(10)
      .shapePadding(1)
      .orient('horizontal')
      .labelAlign('end')
      .labelOffset(5)

    svg.select('.legendQuant').call(legend)

    svg.selectAll('text').each(function(d, i, n) {
      select(this).attr('transform', 'translate(40, 23)')
    })
  },
  labelFormatter({ i, genLength, generatedLabels, labelDelimiter }) {
    const values = generatedLabels[i].split(` ${labelDelimiter} `)
    if (i === genLength - 1) {
      return
    }
    return values[1]
  },
  returnColorScale() {
    // const colors = [
    //   '#00a3fe',
    //   '#0083cb',
    //   '#006da9',
    //   '#006298',
    //   '#005787',
    //   '#004c76',
    //   '#004165'
    // ]

    const colors = [
      '#b4cdff',
      '#86b2f0',
      '#6098d9',
      '#4d8acc',
      '#3a7dbe',
      '#2471b1',
      '#0064a3'
    ]

    let scaleColor = scaleThreshold()
      .domain(this.colorDomain)
      .range(colors)

    return scaleColor
  }
}

export default Legend
