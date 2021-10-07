<script>
  import { filter, range } from 'd3-array'
  import tippy from "sveltejs-tippy";
  export let activeCountry
  export let allData
  export let contributed


  let svg
	let width = 300
	let height = 300
  const margin = { top: 5, right: 10, bottom: 10, left: 10 }
  // const temp = allData.find((d) => d.country === activeCountry).funding
  const b = 1000000000

  $: activeChartRange = range(0, Math.ceil(contributed / b), 1)

  const chartRange = (country) => {
    const val = allData.find(d => d.country === country.country).funding
    return range(0, Math.ceil(val / b), 1)
  }

  const getActiveRemainingRow = (num) => {
    const step = 200000000
    if (num + 1 === Math.ceil(contributed / b)) {
      let arr = []
      for (let i of range(0, b, step)) {
        if (contributed % b > i) {
          arr.push(arr.length)
        }
      }
      return arr
    } else {
      return [0, 1, 2, 3, 4]
    }
  }


  const getRemainingRow = (num, country) => {
    const val = allData.find(d => d.country === country.country).funding
    const step = 200000000
    if (num + 1 === Math.ceil(val / b)) {
      let arr = []
      for (let i of range(0, b, step)) {
        if (val % b > i) {
          arr.push(arr.length)
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
      <ul class="port-values" role="list">
        <li><div>GDP:${data.gdp}</div> </li>
        <li><div>Contributed: ${data.funding}</div> </li>
      </ul>
    `;

    return {
      content: template,
      allowHTML: true,
      placement: "top",
      maxWidth: 175,
      triggerTarget: document.getElementById(selector),
      touch: false,
    };
  };
</script>

<div>Active Country: {activeCountry}</div>
{#key activeCountry}
<div class="yo">
  
  <figure class="interactive__charts active" bind:clientWidth={width} bind:clientHeight={height} >
    <svg>
        <g data-attr={activeCountry}>
        {#each activeChartRange as i}
          {#each getActiveRemainingRow(i) as j}
            <rect width="16px" height="16px" x="{i * 20}" y="{j * 20}"></rect>
          {/each}
        {/each}
        </g>
    </svg>
  </figure>
 

  {#each allData.filter(d => d.country !== activeCountry) as country, countryIndex}
    <figure class="interactive__charts {'inactive-' + countryIndex}" bind:clientWidth={width} bind:clientHeight={height} >
      <svg >
          <g data-attr={country.country} >
            {#each chartRange(country) as i}
              {#each getRemainingRow(i, country) as j}
                <rect width="16px" height="16px" x="{i * 20}" y="{j * 20}" use:tippy={formatTooltip(country, `tooltip-node-${countryIndex}`)}></rect>
                <!-- <text>{country.country}</text> -->
              {/each}
            {/each}
          </g>
  
      </svg>
    </figure>
  {/each}
</div>
{/key}
<style type="text/scss" global>
  @import "../scss/custom/_chart.scss";
  // @import './scss/components/_header.scss';
  // @import './scss/layout/_layout.scss';
</style>
