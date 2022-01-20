<script>
  import parseData from './data.js'
  // import { select, selectAll } from 'd3-selection'
  // import Options from './components/Options.svelte'
  import Chart from './components/Chart.svelte'
  // import SizeLegend from './components/sizeLegend.svelte'
  import Legend from './components/Legend.svelte'

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

// Mock data; Use structure above for production
  const allData2 = [
    {
      mineral: 'cobalt',
      mineralData: [
        {
          name: 'USA',
          x: 5,
          y: 4,
        },
        {
          name: 'Canda',
          x: 4,
          y: 6,
        },
        {
          name: 'Zimbabwe',
          x: 7,
          y: 8,
        },
        {
          name: ' Chile',
          x: 8,
          y: 12,
        },
        {
          name: 'Hungary',
          x: 9,
          y: 10,
        },
      ],
    },
    {
      mineral: 'talc',
      mineralData: [
        {
          name: 'USA',
          x: 5,
          y: 4,
        },
        {
          name: 'Canda',
          x: 4,
          y: 6,
        },
        {
          name: 'Zimbabwe',
          x: 7,
          y: 8,
        },
        {
          name: ' Chile',
          x: 8,
          y: 12,
        },
        {
          name: 'Hungary',
          x: 9,
          y: 10,
        },
      ],
    },
    {
      mineral: 'diamond',
      mineralData: [
        {
          name: 'USA',
          x: 5,
          y: 4,
        },
        {
          name: 'Canda',
          x: 4,
          y: 6,
        },
        {
          name: 'Zimbabwe',
          x: 7,
          y: 8,
        },
        {
          name: ' Chile',
          x: 8,
          y: 12,
        },
        {
          name: 'Hungary',
          x: 9,
          y: 10,
        },
      ],
    },
    {
      mineral: 'emerald',
      mineralData: [
        {
          name: 'USA',
          x: 5,
          y: 4,
        },
        {
          name: 'Canda',
          x: 4,
          y: 6,
        },
        {
          name: 'Zimbabwe',
          x: 7,
          y: 8,
        },
        {
          name: ' Chile',
          x: 8,
          y: 12,
        },
        {
          name: 'Hungary',
          x: 9,
          y: 10,
        },
      ],
    },
  ]

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
    <h1>Chart Title</h1>
    <p>
      Interactive header in lorem ipsum: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </header>

  {#await allData}
  <div class="loading-container">
    <div class="loading"></div>
  </div>
  {:then allData}
    <!-- <Options allData="{allData}" /> -->
  {#each allData as data}
    <Chart data="{data}" isMobile="{isMobile}" />
  {/each}

  <div class="interactive__legend-container">
    <Legend />
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
</style>