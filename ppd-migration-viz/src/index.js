import breakpoints from './js/helpers/breakpoints'
import { categories, categoriesSelection } from './js/categories'
import Chart from './js/chart'
import parseData from './js/data'
import { roundNumTo } from './js/helpers/helpers'
import Legend from './js/legend'
import Map from './js/map'
import './scss/main.scss'
import tippy from 'tippy.js'
// import 'tippy.js/dist/tippy.css'

const dataSrc = './data/2020_data.csv'
const mapSrc = './data/syria.geojson'

let data
let map
let breakpoint = breakpoints.calculate()
let currentCategory = 'idp_total'

function init() {
  loadDataAndSetup(dataSrc, mapSrc)
}

async function loadDataAndSetup(dataSrc, mapSrc) {
  data = await parseData(dataSrc)
  map = await Map.loadMapData(mapSrc)
  drawChart()

  tippy('#interactive__tooltip', {
    content:
      'Idlib has seen the greatest increase of IDPs since 2016 as Assad’s government regains control of surrounding areas.'
  })
}

function drawChart() {
  const lastYearValues = returnLastYearValues()
  Legend.colorDomain = lastYearValues.range
  Legend.setup()

  Chart.init({
    data: data.values,
    container: '#interactive__charts',
    years: data.years[currentCategory],
    currentCategory: currentCategory,
    scaleColor: Legend.returnColorScale()
  })

  drawMap(lastYearValues)
}

function drawMap(lastYearValues) {
  map.features.forEach(province => {
    return (province.properties.value = province.properties.idp_2019)
  })

  Map.init({
    data: map,
    container: '#interactive__map',
    colorDomain: lastYearValues.range,
    scaleColor: Legend.returnColorScale()
  })
}

function returnLastYearValues() {
  const endYear = data.years['idp_total'].slice(-1)[0]
  const values = data.values.slice(1).reduce(
    (acc, curr) => {
      const value = curr.values.filter(v => v.year === endYear).map(v => v)
      acc[curr.id] = value
      acc.all.push(value)
      return acc
    },
    { all: [] }
  )
  values.all.sort((a, b) => a - b)
  values.range = getColorRange(values.all)
  return values
}

function getColorRange() {
  let range = []

  const groupSize = categories['idp_total'].groupSize
  const start = 150000
  const end = 900000

  for (let i = start; i <= end; i += groupSize) {
    range.push(i)
  }

  return range
}

function resizeChart() {
  let newBreakpoint = breakpoints.calculate()
  if (breakpoint != newBreakpoint) {
    breakpoint = newBreakpoint
    drawChart()
  }
}

window.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resizeChart)
