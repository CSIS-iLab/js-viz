<script>
  // import RangeSlider from "svelte-range-slider-pips";
  import Slider from '@bulatdashiev/svelte-slider'
import { range } from 'd3-array';
  import { format } from 'd3-format'
import tippy from 'sveltejs-tippy'
import { onMount, afterUpdate } from 'svelte';

  export let activeCountry
  export let allData
  export let row
  export let totalReq
  export let contributed

  const formatBubble = (val) => {
    console.log(val)
    if (val < 10) {
      return '.00' + val + '%'
    } else if ( val === '100') {
      return '.010%' 
    } else {
      return '.0' + val + '%'
    }
  }

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

  const getDropdownOptions = () => {
    return allData
      .sort((a, b) => a.country.localeCompare(b.country))
      .map((c) => c.country)
  }

  $: gdp = allData.find((d) => d.country === activeCountry).gdp

  let activePercentage =
    allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000

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

  const handleChange = () => {
    const country = allData.find((d) => d.country == activeCountry)
    const convertedPercentage = activePercentage * 0.00001
    country.adjustable_gdp = convertedPercentage
    country.funding = contributed
    // console.log(allData)
  }

  const handleActiveCountry = () => {
    activePercentage =
      allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000
    // setTimeout(() => {setBubble(slider,bubble)},500) 
  }

  let slider
  let bubble

  onMount(() => {
    slider.addEventListener("input", () => {
    setBubble(slider, bubble)
    });
  }) 

  afterUpdate(() => {
    setBubble(slider,bubble)
  })

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = formatBubble(val);

  // Sorta magic numbers based on size of the native UI thumb
 bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.20}px))`;
}
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
<style type="text/scss" global>
  @import '../scss/components/_form-elements.scss';
  @import '../scss/custom/_table.scss';
  @import '../scss/custom/_slider.scss';
</style>
