import { categoriesList } from './categories'
import * as d3Fetch from 'd3-fetch'
import { groupBy } from './helpers/helpers'

const stringFields = ['id', 'province']

async function parseData(url) {
  let data = await d3Fetch
    .csv(url, d => {
      for (var i in d) {
        if (!stringFields.includes(i)) {
          d[i] = +d[i]
        }
      }
      return d
    })
    .then(data => {
      let dataset = {}

      dataset.years = {}
      categoriesList.forEach(category => {
        dataset.years[category] = Array.from(
          new Set(data.filter(d => d[category] !== 0).map(d => d.year))
        ).sort()
      })

      dataset.values = groupBy({
        objectArray: data,
        key: 'province',
        sortBy: 'year'
      }).sort((a, b) => a.province.localeCompare(b.province))

      // const avg = dataset.values.filter(d => d.id === 'AV')[0]
      // dataset.values = dataset.values.filter(d => d.id !== 'AV')
      // dataset.values.unshift(avg)
      return dataset
    })
  console.log(data)
  return data
}

export default parseData
