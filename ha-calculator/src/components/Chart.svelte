<script>
  import { filter, range } from 'd3-array'
  import tippy from 'sveltejs-tippy'
  import { format } from 'd3-format'
  export let activeCountry
  export let allData
  export let contributed

  let svg
  let width = 300
  let height = 300
  const margin = { top: 5, right: 10, bottom: 10, left: 10 }
  // const temp = allData.find((d) => d.country === activeCountry).funding
  const b = 1000000000

  // Helper f(n) for formatDecimalPlaces
  function formatAmount(value) {
    if (window.innerWidth < 768) {
      return value.replace(/G/, 'B').slice(-1)[0]
    }

    if (value.includes('T')) {
      return 'T'
    } else if (value.includes('G')) {
      return 'B'
    } else {
      return 'M'
    }
  }

  /* formats values up to two decimal places while maintaining 1-3 digits left of the first comma (eg 500.00B or 1.00T) */
  function formatDecimalPlaces(value) {
    let amt = formatAmount(format('.5s')(value))
    let numOne = format('$.5s')(value).split('.')[0]
    let numTwo = format('.5s')(value).split('.')[1].slice(0, 1)
    return numOne + '.' + numTwo + amt
  }

  $: activeChartRange = range(0, Math.ceil(contributed / b), 1)

  const chartRange = (country) => {
    const val = allData.find((d) => d.country === country.country).funding
    return range(0, Math.ceil(val / b), 1)
  }

  const getActiveRemainingRow = (num) => {
    const step = 200000000
    if (num + 1 === Math.ceil(contributed / b)) {
      let arr = []
      for (let i of range(0, b, step)) {
        if (contributed % b > i) {
          arr.push(4-arr.length)
        }
      }
      return arr
    } else {
      return [0, 1, 2, 3, 4]
    }
  }

  const getRemainingRow = (num, country) => {
    const val = allData.find((d) => d.country === country.country).funding
    const step = 200000000
    if (num + 1 === Math.ceil(val / b)) {
      let arr = []
      for (let i of range(0, b, step)) {
        if (val % b > i) {
          arr.push(4-arr.length)
        }
      }
      return arr
    } else {
      return [0, 1, 2, 3, 4]
    }
  }

  const formatTooltip = (data, selector) => {
    const template = `
      <h2 class="tooltip__heading">${data.country}</h2>
      <ul class="tooltip__values" role="list">
        <li>GDP:<span> ${formatDecimalPlaces(data.gdp)}</span> </li>
        <li>Contributed:<span> ${formatDecimalPlaces(data.funding)}</span> </li>
      </ul>
    `

    return {
      content: template,
      allowHTML: true,
      placement: 'top',
      maxWidth: 175,
      triggerTarget: document.getElementById(selector),
      touch: true,
    }
  }
</script>

{#key activeCountry}
  <div class="interactive__charts-container">
    <figure
      class="interactive__charts active"
      bind:clientWidth="{width}"
      bind:clientHeight="{height}"
    >
      <svg class="green">
        <linearGradient id="gradient">
          <stop class="main-stop" offset="0%"></stop>
          <stop class="alt-stop" offset="100%"></stop>
        </linearGradient>
        <g data-attr="{activeCountry}">
          {#each activeChartRange as i}
            {#each getActiveRemainingRow(i) as j}
              <rect
                width="20px"
                height="20px"
                x="{i * 24}"
                y="{j * 24}"
                fill="url(#gradient)"
              >
              </rect>
            {/each}
          {/each}
        </g>
        <rect
          fill="none"
          stroke="#c5c5c5"
          stroke-width="1.5"
          x="0"
          y="{height - 24}"
          width="15px"
          height="1"
          id="svg_2"
        >
        </rect>
        <text x="0" y="{height - 5}">{activeCountry}</text>
      </svg>
    </figure>

    {#each allData.filter((d) => d.country !== activeCountry) as country, countryIndex}
      <!-- {#each allData as country, countryIndex} -->
      <figure
        class="interactive__charts {'inactive-' + countryIndex}"
        bind:clientWidth="{width}"
        bind:clientHeight="{height}"
        data-attr="{country.country}"
      >
        <svg>
          <defs>
            <pattern
              id="diagonalHatch"
              patternUnits="userSpaceOnUse"
              width="4"
              height="4"
              patternTransform="rotate(-45 2 2)"
            >
              <path d="M -1,2 l 6,0" stroke="#000000" stroke-width="1"></path>
            </pattern>
          </defs>
          {#if country.country !== activeCountry}
            <g data-attr="{country.country}">
              {#each chartRange(country) as i}
                {#each getRemainingRow(i, country) as j}
                  <rect
                    width="12px"
                    height="12px"
                    x="{i * 16}"
                    y="{j * 16}"
                    use:tippy="{formatTooltip(
                      country,
                      `tooltip-node-${countryIndex}`
                    )}"
                  >
                  </rect>
                {/each}
              {/each}
            </g>
            <rect
              fill="none"
              stroke="#c5c5c5"
              stroke-width="1.5"
              x="0"
              y="{height - 60}"
              width="15px"
              height="1"
              id="svg_2"></rect>
            <text x="0" y="{height - 40}">{country.country}</text>
          {/if}
        </svg>
      </figure>
    {/each}
  </div>
{/key}

<style type="text/scss" global>
  @import '../scss/custom/_chart.scss';
  @import '../scss/components/_tooltips.scss';

  .main-stop {
    stop-color: #0064a3;
  }
  .alt-stop {
    stop-color: #004165;
  }
</style>
