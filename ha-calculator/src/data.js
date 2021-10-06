import * as d3Fetch from 'd3-fetch'

const stringFields = [
  'country',
]

const stringify = d => {
  for (var i in d) {
    if (!stringFields.includes(i)) {
      d[i] = +d[i]
    }
  }
  return d
}


function parseData({ src }) {
  const calcPromise = d3Fetch.csv(src.calc, stringify)
  
  let data = Promise.all([calcPromise]).then(res => {
    let [dataset] = res

    console.log(dataset)
    return {
      data: dataset.filter(d => d.country !== 'ROW'),
      row: dataset.find(d => d.country === 'ROW')
    } 
  })
  
  return data
}

export default parseData