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
    const colors = [
      '#0083cb',
      '#0078ba',
      '#006da9',
      '#006298',
      '#005787',
      '#004c76',
      '#004165'
    ]
    // const colors = [
    //   '#32b6ff',
    //   '#10aaff',
    //   '#0098ed',
    //   '#0083cb',
    //   '#006da9',
    //   '#005787',
    //   '#004165'
    // ]

    let scaleColor = scaleThreshold()
      .domain(this.colorDomain)
      .range(colors)

    return scaleColor
  }
}

export default Legend
