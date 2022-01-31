<script>
  import parseData from './data.js'
  // import { select, selectAll } from 'd3-selection'
  import Options from './components/Options.svelte'
  import Chart from './components/Chart.svelte'
  // import SizeLegend from './components/sizeLegend.svelte'
  import Legend from './components/Legend.svelte'

  let selectedIndicator = 'region'

  const dataSrc = {
    scatter:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxzv5D7cjQIQ4Wi6wFM1v_mUIB_Fef9d1KGL42xG_-THTfg5T4e8Ez11Ou63P4IE60DUV1XnMasEa0/pub?output=csv',
  }

  const allData = loadData()

  async function loadData() {
    let res = await parseData({
      src: dataSrc,
    })
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
    <h1>Critical Mineral</h1>
    <p>
      Hover over a bubble to reveal details about each mineral. Toggle between
      coloring bubbles based on geographic region or income level.
    </p>
  </header>

  {#await allData}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:then allData}
    <div class="main-container">
      <div class="charts-container">
        {#each allData as data}
          {#if data.mineral === 'Cobalt' || data.mineral === 'Rare Earths'}
            <Chart
              data="{data}"
              titles="yes"
              selectedIndicator="{selectedIndicator}"
              isMobile="{isMobile}"
            />
          {:else}
            <Chart
              data="{data}"
              selectedIndicator="{selectedIndicator}"
              isMobile="{isMobile}"
            />
          {/if}
        {/each}
      </div>
      <div class="interactive__legend-container">
        <Options bind:selectedIndicator allData="{allData}" />
        <Legend selectedIndicator="{selectedIndicator}" />
      </div>
    </div>

    <!-- <footer class="interactive__source">
      <a href="https://loremipsum.csis.org" class="source-holder"
        ><img
          src="./images/logo.svg"
          target="_blank"
          alt="Project Title"
          title="Project Title"
          width="300"
          height="31"
        /></a
      >
    </footer> -->
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style type="text/scss" global>
  @import './scss/components/_utilities.scss';
  @import './scss/layout/_base.scss';
  @import './scss/layout/_layout.scss';
  @import './scss/components/_header.scss';
  @import './scss/components/_chart.scss';
  @import './scss/components/_loading.scss';
  @import './scss/components/_wrapper.scss';
</style>
