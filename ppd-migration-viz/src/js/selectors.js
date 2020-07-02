import { selection, select, selectAll } from 'd3-selection'

const selectors = {
  setup: function({ selector, name, data, current, onChange }) {
    let selectEl = select(selector)
      .attr('name', name)
      .on('change', onChange)

    let options = selectEl.selectAll('option').data(data)

    options
      .enter()
      .append('option')
      .text(d => d.label)
      .property('value', d => d.value)
      .property('selected', d => d.value == current)
      .property('disabled', d => d.disabled)
  },
  getCurrent: function(selector) {
    return document.querySelector(selector).value
  }
}

export default selectors
