import * as d3Fetch from 'd3-fetch'

const stringFields = [
  'country',
  'region',
  'mineral',
  'production2020',
  'reserves2020'
]

// I don't think that I really need to include this code
// const stringify = d => {
//   for (var i in d) {
//     console.log(d)
//     if (!stringFields.includes(i)) {
//       d[i] = +d[i]
//     }
//   }
//   return d
// }

function parseData({ src }) {
  // here, we are using d3Fetch.csv
  const scatterPromise = d3Fetch.csv(src.scatter)
  
  let data = Promise.all([scatterPromise]).then(res => {
    let [initialdata] = res

    console.log("initial data", initialdata);

    let dataset = [{mineral: 'Cobalt', mineralData: []}, {mineral: 'Lithium', mineralData: []}, {mineral: 'Nickle', mineralData: []}, {mineral: 'Rare Earths', mineralData: []}, {mineral: 'Manganese', mineralData: []}, {mineral: 'Graphite', mineralData: []}]

    // I'm not entirely sure what this is doing either
    dataset[0].data = initialdata.filter(d => d.mineral == 'Cobalt');
    dataset[1].data = initialdata.filter(d => d.mineral == 'Lithium');
    dataset[2].data = initialdata.filter(d => d.mineral == 'Nickel');
    dataset[3].data = initialdata.filter(d => d.mineral == 'Rare Earths');
    dataset[4].data = initialdata.filter(d => d.mineral == 'Manganese');
    dataset[5].data = initialdata.filter(d => d.mineral == 'Graphite');

    console.log("final data", dataset);

    return dataset
  })
  
  return data
}

export default parseData