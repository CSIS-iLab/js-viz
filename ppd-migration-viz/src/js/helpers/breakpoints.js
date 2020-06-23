const breakpoints = {
  calculate: function () {
    return getComputedStyle(document.body).getPropertyValue('--breakpoint').replace(/\"/g, '').trim()
  },
  isMobile: function () {
    let breakpoint = this.calculate()
    if (breakpoint == 'xsmall' || breakpoint == 'small') {
      return true
    }
    return false
  }
}

export default breakpoints
