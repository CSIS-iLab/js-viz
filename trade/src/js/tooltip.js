import { select, event } from 'd3-selection'
import { transition, duration, on } from 'd3-transition'
const tooltipEl = select('.tooltip')

export default {
  show: function(content) {
    let yPos = event.pageY
    let xPos = event.pageX
    if (xPos + 10 > document.body.clientWidth - 215) {
      xPos = document.body.clientWidth + 5 - 215
    }

    tooltipEl
      .transition()
      .duration(200)
      .style('opacity', 0.9)
      .on('end', function() {
        tooltipEl.classed('isActive', true)
        // tooltipEl.select('.tooltip-close').on('click', this.hide)
        tooltipEl.on('click', this.hide)
      })
    tooltipEl
      .html(content)
      .style('visibility', 'visible')
      .style('left', xPos + 'px')
      .style('top', yPos + 'px')
  },
  hide: function() {
    tooltipEl
      .transition()
      .duration(500)
      .style('opacity', 0)
  },
  formatContent: function(component) {
    let content = '<ul class="tooltip-list">'
    component.forEach(function(item, index) {
      let cssClass = null
      if (item.class) {
        cssClass = item.class
      }
      let label = Object.keys(item)[0]
      content += `<li class="${cssClass}"><span class="tooltip-label">${label}:</span> ${
        item[label]
      }</li>`
    })
    content += '</ul>'
    return content
  }
}
