<script>
  import { format } from 'd3-format'
  import { onMount, afterUpdate } from 'svelte';

  export let activeCountry
  export let allData
  export let row
  export let totalReq
  export let contributed

  let origValues
  let slider
  let bubble

  $: gdp = allData.find((d) => d.country === activeCountry).gdp

  let activePercentage = allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000

  $: contributed = Math.floor(gdp * (activePercentage * 0.00001))

  $: remaining = Math.floor(totalReq - total)

  $: total = Math.floor(
    allData
      .filter((d) => d.country !== activeCountry)
      .reduce((acc, i) => {
        return acc + i.gdp * i.adjustable_gdp
      }, 0) +
      contributed +
      row
  )

  const formatBubble = (val) => {
    console.log(val)
    if (val < 10) {
      return '.00' + val + '%'
    } else if ( val === '100') {
      return '.10%' 
    } else {
      return '.0' + val + '%'
    }
  }

  // Helper f(n) for formatDecimalPlaces
  const formatAmount = (value) => {
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
  const formatDecimalPlaces = (value) => {
    let amt = formatAmount(format('.5s')(value))
    let numOne = format('$.5s')(value).split('.')[0]
    let numTwo = format('.5s')(value).split('.')[1].slice(0, 1)
    return numOne + '.' + numTwo + amt
  }

  const getDropdownOptions = () => {
    return allData
      .sort((a, b) => a.country.localeCompare(b.country))
      .map((c) => c.country)
  }

  const handleChange = () => {
    const country = allData.find((d) => d.country == activeCountry)
    const convertedPercentage = activePercentage * 0.00001
    country.adjustable_gdp = convertedPercentage
    country.funding = contributed
  }

  const handleActiveCountry = () => {
    activePercentage =
      allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000
  }

  const setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 0;
    const max = range.max ? range.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    console.log(newVal)
    bubble.innerHTML = formatBubble(val);

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.20}px))`;
  }

  const handleRefresh = () => {
    allData = allData.map(d => {
      const orig = origValues.find(f => f.country === d.country)
      console.log( { ...d, funding: orig.funding, adjustable_gdp: orig.adjustable_gdp })
      return { ...d, funding: orig.funding, adjustable_gdp: orig.adjustable_gdp }
    })

    activeCountry = 'US'
    activePercentage =
      allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000
  }

  onMount(() => {
    // Save original values for refresh function
    origValues = allData.map(d => {
     return { 
      country: d.country,
      gdp: d.gdp,
      adjustable_gdp: d.adjustable_gdp,
      funding: d.funding
     }})

    slider.addEventListener("input", () => {
    setBubble(slider, bubble)
    });
  }) 

  afterUpdate(() => {
    setBubble(slider,bubble)
  })
</script>

<table
  class="interactive__table interactive__table--large"
  cellpadding="0"
  cellspacing="0"
>
  <thead>
    <tr class="interactive__subheading">
      <th></th>
      <th>GDP</th>
      <th>% Contributed</th>
      <th>$ Contributed</th>
      <th>Remaining</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="interactive__subheading">
        <div class="interactive__dropdown">
          <select
            class="input__select"
            bind:value="{activeCountry}"
            on:change="{() => handleActiveCountry()}"
          >
            {#each getDropdownOptions() as option}
              <option value="{option}">{option}</option>
            {/each}
          </select>
        </div>
      </th>
      <td>
        {formatDecimalPlaces(gdp)}
      </td>
      <td>
        <div class="slider-wrap">
          <input
            id="slider"
            type="range"
            name="slider"
            bind:value="{activePercentage}"
            bind:this={slider}
            min="0"
            max="100"
            on:change="{() => handleChange()}"
          >
          <output class="slider__bubble" bind:this={bubble}></output>
      </div>
      </td>
      <td class="calc-values">
        {formatDecimalPlaces(contributed)}
      </td>
      <td class="calc-values">
        {formatDecimalPlaces(remaining)}
      </td>
    </tr>
  </tbody>
</table>

  <button class="btn btn__refresh" on:click="{() => handleRefresh()}">
   <span class="icon icon-replay"></span>
  </button>


<style type="text/scss" global>
  @import '../scss/components/_buttons.scss';
  @import '../scss/components/_form-elements.scss';
  @import '../scss/custom/_table.scss';
  @import '../scss/custom/_slider.scss';
</style>
