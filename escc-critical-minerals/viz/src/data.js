import * as d3Fetch from 'd3-fetch'

const stringFields = [
  'country',
  'region',
  'mineral',
  'production2020',
  'reserves2020'
]

function parseData({ src }) {
  // here, we are using d3Fetch.csv
  const scatterPromise = d3Fetch.csv(src.scatter)
  
  let data = Promise.all([scatterPromise]).then(res => {
    let [initialdata] = res

    console.log("initial data", initialdata);

    // correct to input number strings as ints
    let correcteddata = initialdata.map((d) => {

      const checkNaN = a => {
        if (isNaN(a)) {
          d.isNan = true;
          return 0;
        } else {
          d.isNan = false;
          return parseInt(a);
        }
      }

      d.production2020 = checkNaN(d.production2020);
      d.reserves2020 = checkNaN(d.reserves2020);
      return d
    })

    console.log("corrected data", correcteddata);

    let minerals = ['Cobalt', 'Lithium', 'Nickel', 'Rare Earths', 'Manganese', 'Graphite'];

    let dataset = [{mineral: minerals[0], mineralData: []}, {mineral: minerals[1], mineralData: []}, {mineral: minerals[2], mineralData: []}, {mineral: minerals[3], mineralData: []}, {mineral: minerals[4], mineralData: []}, {mineral: minerals[5], mineralData: []}]

    for(let x = 0; x < minerals.length; x++) {
      dataset[x].mineralData = correcteddata.filter(d => d.mineral == minerals[x]);

      dataset[x].totalProduction = 0;
      dataset[x].totalReserves = 0;

      dataset[x].mineralData.forEach(d => {
        dataset[x].totalProduction += d.production2020;
        dataset[x].totalReserves += d.reserves2020;
      })
      dataset[x].mineralData.forEach(d => {
        d.percentReserves = ((d.reserves2020 / dataset[x].totalReserves)*100);
        d.percentProduction = ((d.production2020 / dataset[x].totalProduction)*100);
      })
    }

    console.log("final data", dataset);

    return dataset
  })
  
  return data
}

export default parseData