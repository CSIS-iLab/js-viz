<script>
  import parseData from './data.js'
  import Chart from './components/Chart.svelte'
  import Table from './components/Table.svelte'

  $: totalReq = 38536692263
  $: remaining = 0
  $: total = 0
  $: activeCountry = 'US'

  let contributed = 0

  const dataSrc = {
    calc: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2PkoQkmfyDDsUEpwiAoPwIHruCE8bucMMaHcYUstGyZehCS_5uDPPTh5wnDEp2Tsy8ZtDdwm4y0X0/pub?output=csv',
  }

  const data = loadData()

  async function loadData() {
    let res = await parseData({
      src: dataSrc,
    })

    console.log(res)
    total = res.data.reduce((acc, i) => {
      return (acc += i.funding)
    }, 0)
    remaining = totalReq - total
    console.log(total + 5815512166, '------------')
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
    <h1>HA Calculator</h1>
    <p>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores 
    </p>
  </header>

  {#await data}
    <div class="loading-container">
      <div class="loading"></div>
    </div>
  {:then allData}
    <Table
      allData="{allData.data}"
      row="{allData.row.funding}"
      bind:activeCountry
      totalReq="{totalReq}"
      bind:contributed
    />

    <Chart
      allData="{allData.data}"
      activeCountry="{activeCountry}"
      contributed="{contributed}"
    />

    <footer class="interactive__source">
      <a href="https://www.csis.org/" class="source-holder"
        ><img
          src="./images/csis-logo.png"
          target="_blank"
          alt="Center for Strategic & International Studies"
          title="Center for Strategic & International Studies"
          width="300"
          height="31"
        />
      </a>
      <div class="source-details">
        <p>
          Source:
          <a
            href="https://www.csis.org/"
            target="_blank"
            alt="source"
            >???</a
          >
        </p>
      </div>
    </footer>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style type="text/scss" global>
  @import './scss/components/_header.scss';
  @import './scss/components/_source.scss';
  @import './scss/layout/_layout.scss';
</style>
