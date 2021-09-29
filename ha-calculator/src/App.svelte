<script>
  import parseData from './data.js'
  import { select, selectAll } from 'd3-selection'
  import {range} from 'd3-array'
  import Chart from './components/Chart.svelte'

  $: totalReq = 38536692263
  $: remaining = 0
  $: total = 0 

  $: gdp_us = 20936600000000
  $: gdp_ger = 3806060140000
  $: gdp_uk = 2707743780000
  $: gdp_eu = 15192652400000
  $: gdp_jap = 5064872880000

  $: per_us = .037
  $: per_ger = .059
  $: per_uk = .053
  $: per_eu = .009
  $: per_jap = .011

  $: testRange = range(1, 39, 1)



  const dataSrc = {
    calc:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2PkoQkmfyDDsUEpwiAoPwIHruCE8bucMMaHcYUstGyZehCS_5uDPPTh5wnDEp2Tsy8ZtDdwm4y0X0/pub?output=csv',
  }

  const data = loadData()

  async function loadData() {
    let res = await parseData({
      src: dataSrc,
    })

    console.log(res)
    total = res.reduce((acc, i) => {
      return acc += i.actual_hrp_funding 
    }, 0)
    remaining = totalReq - total
    return res
  }

  const init = () => {
    resize(mq)
  }

  let isMobile = false
  let mq = window.matchMedia('(max-width: 48em)')

  function resize(mediaQueryList) {
    if (mediaQueryList.matches) {
      isMobile = true
    } else {
      isMobile = false
    }
  }

  try {
    // Chrome & Firefox
    mq.addEventListener('change', (e) => {
      resize(e)
    })
  } catch (e1) {
    try {
      // Safari, because it doesn't support addEventListener...
      mq.addListener((e) => {
        resize(e)
      })
    } catch (e2) {
      console.error(e2)
    }
  }

  window.addEventListener('DOMContentLoaded', init)
</script>

<main class="interactive">
  <header class="interactive__header">
    <h1>Charting China’s Covid-19 Diplomacy</h1>
    <p>
      This interactive plots countries’ scores in both the Medical Diplomacy Index and Vaccine Diplomacy Index. Countries in the upper right quadrant scored highly in both indices, indicating greater Chinese influence through Covid-19 diplomacy. Bubbles are sized according to GDP. Hover over a bubble or search a country’s name to reveal details. Toggle between coloring bubbles based on geographic region or income level and use the filters to highlight various country groupings. Click here to access the data, methodology, and source information behind the indices. 
    </p>
  </header>

  {#await data}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:then allData}

    <div>
      totalReg: {totalReq}
      total: {total}
      remaining: {remaining}
    </div>
<br>
    <div>
      US: {gdp_us}
      %: <input  bind:value="{per_us}"/>
      Amount: {gdp_us * per_us}
    </div>

<br>

<div>{per_us}</div>

<!-- {#each } -->
<svg>
  {#each testRange as i}
  <rect width="16px" height="16px" x={i * 20} y={0} fill="cornflowerblue">
  </rect>
  {#each [1,2,3,4] as j}
  <rect width="16px" height="16px" x={i * 20} y={j*20}></rect>
  {/each}
  {/each}
</svg>
<!-- {/each} -->

    <!-- <Chart
    /> -->

  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style type="text/scss" >
  svg {
    width: 1500px;
  }
</style>
