import * as d3Fetch from 'd3-fetch'

function parseData({ src }) {

  const scatterPromise = d3Fetch.csv(src.scatter)
  
  let data = Promise.all([scatterPromise]).then(res => {
    let [initialdata] = res;
    let allMinerals = initialdata.map(d => d.mineral);
    // get all unique minerals
    let minerals = [...new Set(allMinerals)];

    // correct to input number strings as ints, then filter to remove nan values
    let correcteddata = initialdata.map((d) => {
      const checkNaN = a => {
        if (isNaN(a)) {
          d.isNan = true;
          return false;
        } else {
          d.isNan = false;
          return parseInt(a);
        }
      }

      d.production2020 = checkNaN(d.production2020);
      d.reserves2020 = checkNaN(d.reserves2020);
      return d;
    }).filter((d) => !d.isNan);



    let dataset = minerals.map((mineral) => ({
      mineral: mineral, 
      mineralData: correcteddata.filter(d => d.mineral === mineral),
      totalProduction: 0,
      totalReserves: 0
    }));

    for(let x = 0; x < minerals.length; x++) {
      dataset[x].mineralData.forEach(d => {
        dataset[x].totalProduction += d.production2020;
        dataset[x].totalReserves += d.reserves2020;
      })
      dataset[x].mineralData.forEach(d => {
        d.percentReserves = ((d.reserves2020 / dataset[x].totalReserves)*100);
        d.percentProduction = ((d.production2020 / dataset[x].totalProduction)*100);
      })
    }
    return dataset
  })
  
  return data
}

export default parseData