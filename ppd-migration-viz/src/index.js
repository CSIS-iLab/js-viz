import breakpoints from './js/helpers/breakpoints'
import { categories, categoriesSelection } from './js/categories'
import Chart from './js/chart'
import parseData from './js/data'
import { roundNumTo } from './js/helpers/helpers'
import Legend from './js/legend'
import Map from './js/map'
import Selectors from './js/selectors'
import './scss/main.scss'

const dataSrc = './data/20190411-data.csv'
const mapSrc = './data/china.geojson'

let data
let map
let breakpoint = breakpoints.calculate()
let currentCategory = 'broadband_per_1000'

function init() {
  loadDataAndSetup(dataSrc, mapSrc)
}

async function loadDataAndSetup(dataSrc, mapSrc) {
  data = await parseData(dataSrc)
  map = await Map.loadMapData(mapSrc)
  setupSelector()
  drawChart()
}

function setupSelector() {
  Selectors.setup({
    selector: '#filter-category',
    name: 'filter-category',
    data: categoriesSelection,
    current: currentCategory,
    onChange: e => {
      currentCategory = Selectors.getCurrent('#filter-category')
      drawChart()
    }
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

  if (breakpoints.isMobile()) {
    return
  }
  drawMap(lastYearValues)
}

function drawMap(lastYearValues) {
  map.features.forEach(province => {
    return (province.properties.value =
      lastYearValues[province.properties.code] || province.properties.idp_2019)
  })

  Map.init({
    data: map,
    container: '#interactive__map',
    colorDomain: lastYearValues.range,
    scaleColor: Legend.returnColorScale()
  })
}

function returnLastYearValues() {
  const endYear =
    data.years[currentCategory][data.years[currentCategory].length - 1]
  const values = data.values.reduce(
    (acc, curr) => {
      const value = curr.values
        .filter(v => v.year === endYear)
        .map(v => v[currentCategory])[0]
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

function getColorRange(values) {
  let range = []

  const groupSize = categories[currentCategory].groupSize
  const start = roundNumTo(values[0], groupSize)
  const end = roundNumTo(values[values.length - 1], groupSize)

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
