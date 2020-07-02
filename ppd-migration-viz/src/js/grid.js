import breakpoints from './helpers/breakpoints'

let breakpoint = breakpoints.calculate()
let grid

grid = {
  HL: { x: 1, y: 3 },
  HA: { x: 2, y: 3 },
  RA: { x: 3, y: 3 },
  SU: { x: 4, y: 3 },
  DI: { x: 5, y: 3 },
  DR: { x: 1, y: 4 },
  DY: { x: 2, y: 4 },
  HM: { x: 3, y: 4 },
  HI: { x: 4, y: 4 },
  LA: { x: 1, y: 5 },
  QU: { x: 2, y: 5 },
  RD: { x: 3, y: 5 },
  TA: { x: 4, y: 5 },
  IB: { x: 4, y: 2 }
}

if (breakpoints.isMobile()) {
  grid = {
    HL: { x: 1, y: 4 },
    HA: { x: 1, y: 5 },
    RA: { x: 2, y: 5 },
    SU: { x: 3, y: 5 },
    DI: { x: 1, y: 6 },
    DR: { x: 2, y: 6 },
    DY: { x: 3, y: 6 },
    HM: { x: 1, y: 7 },
    HI: { x: 2, y: 7 },
    LA: { x: 3, y: 7 },
    QU: { x: 1, y: 8 },
    RD: { x: 2, y: 8 },
    TA: { x: 3, y: 8 },
    IB: { x: 2, y: 4 }
  }
}

export default grid
