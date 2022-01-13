import * as d3Fetch from 'd3-fetch'

const stringFields = [
  'iso',
  'country',
  'region',
  'income_level'
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
  const scatterPromise = d3Fetch.csv(src.scatter, stringify)
  
  let data = Promise.all([scatterPromise]).then(res => {
    let [dataset] = res

    dataset = dataset.filter(d => 
      (d.vaccine_index || d.vaccine_index === 0 ) 
      && ( d.medical_aid_index || d.medical_aid_index === 0 ) 
      && (d.total || d.total === 0) 
    ) 

    return dataset
  })
  
  return data
}

export default parseData