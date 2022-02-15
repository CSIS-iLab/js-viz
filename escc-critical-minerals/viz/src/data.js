import * as d3Fetch from 'd3-fetch'

function parseData({ src }) {

  const scatterPromise = d3Fetch.csv(src.scatter)
  
  let data = Promise.all([scatterPromise]).then(res => {
    let [initialdata] = res;
    let allMinerals = initialdata.map(d => d.mineral);
    let minerals = [...new Set(allMinerals)];
    const average = (inputArray, target) => inputArray.reduce((acc, country) => acc + country[target], 0)/inputArray.length;
    let table = [];

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

// ----------------- code below this line was for creating the average line --------------

      // debugger;
      // table[x] = dataset[x].mineralData.map(function (country){
      //   let col1 = country.percentProduction - average(dataset[x].mineralData, "percentProduction");
      //   let col2 = country.percentReserves - average(dataset[x].mineralData, "percentReserves");
      //   let col3 = col1 * col2;
      //   let col4 = col1 * col1;
      //   return ([col1, col2, col3, col4])
      // })
    }

    // const trendline = (mineral, i) => {
    //   console.log(mineral);
    //   console.log(i);
    //   let element1 = table[i];
    //   console.log(element1);
    //   let totalX = table[i].reduce((acc, nextEl) => acc + nextEl[2], 0);
    //   let totalY = table[i].reduce((acc, nextEl) => acc + nextEl[3], 0);
    //   let slope = totalX/totalY;
    //   console.log(slope);
    //   let averageX = average(mineral.mineralData, "percentProduction");
    //   let averageY = average(mineral.mineralData, "percentReserves");
    //   mineral.slope = slope;
    //   mineral.intercept = []
    //   // let dats2 = table[i].reduce((acc, table[i][3]) => acc + table[i][3], 0);
    //   // return x
    // }
    // // debugger;
    // dataset.map((mineral, index) => trendline(mineral, index))

    // console.log("final data", dataset);

    // ----------------------- end creating average line code -----------------

    return dataset
  })
  
  return data
}

export default parseData