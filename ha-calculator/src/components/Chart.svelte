<script>
  import { scaleLinear, scaleSqrt, scaleOrdinal } from 'd3-scale'
  import { range } from 'd3-array'
  export let activeCountry
  export let allData
  export let contributed

  $: testRange = range(0, Math.ceil(contributed / b), 1)

  // const temp = allData.find((d) => d.country === activeCountry).funding
  const b = 1000000000

  const getChartRange = (num) => {
    // console.log(Math.ceil(contributed / b))
    // console.log(num + 1)
    if (num + 1 === Math.ceil(contributed / b)) {
      let arr = []
      for (let i of range(0, b, 200000000)) {
        console.log(contributed % b, i)
        if (contributed % b > i) {
          arr.push(arr.length + 1)
        }
        console.log(arr)
      }
      return arr
    } else {
      return [0, 1, 2, 3, 4]
    }
  }
</script>

<div>Active Country: {activeCountry}</div>
<!-- {#each } -->
<svg>
  {#each testRange as i}
    {#each getChartRange(i) as j}
      <rect width="16px" height="16px" x="{i * 20}" y="{j * 20}"></rect>
    {/each}
  {/each}
</svg>

<!-- {/each} -->
<style type="text/scss">
  svg {
    width: 1500px;
  }

  // @import './scss/components/_header.scss';
  // @import './scss/layout/_layout.scss';
</style>
