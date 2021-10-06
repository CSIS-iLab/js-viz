<script>
  import RangeSlider from "svelte-range-slider-pips";

  export let activeCountry
  export let allData
  export let totalReq
  export let contributed

  const row = allData.find((d) => d.country === 'ROW').funding

  const getDropdownOptions = () => {
    return allData
      .sort((a, b) => a.country.localeCompare(b.country))
      .map((c) => c.country)
  }

  const getAttr = (attr) => {
    return allData.find((d) => d.country === activeCountry)[attr]
  }

  let activePercentage =
    allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000
  console.log(activePercentage)

  $: contributed = Math.floor(getAttr('gdp') * (activePercentage * 0.00001))

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

  $: console.log(total, 'total')

  const handleChange = () => {
    const country = allData.find((d) => d.country == activeCountry)
    const convertedPercentage = activePercentage * 0.00001
    country.adjustable_gdp = convertedPercentage
    country.funding = contributed
    console.log(allData)
  }

  const handleActiveCountry = () => {
    activePercentage =
      allData.find((d) => d.country === activeCountry).adjustable_gdp * 100000
    console.log(allData)
  }
</script>

<!-- <input bind:value={activePercentage} on:change="{() => handleChange()}" /> -->
<!-- <div id="slider"></div> -->
<table class="interactive__table interactive__table--large" cellpadding="0" cellspacing="0">
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
      <td>GDP:{getAttr('gdp')}</td>
      <td>
        <RangeSlider  id="slider" on:change="{() => handleChange()}" bind:values="{activePercentage}"/>
        <!-- <input
          type="range"
          bind:value="{activePercentage}"
          min="0"
          max="100"
          on:change="{() => handleChange()}"
        /> -->
      </td>
      <td>
        Contributed:{contributed}
      </td>
      <td>Remaining: {remaining} </td>
    </tr>
  </tbody>
</table>
<div class="interactive__options">
  <div>activeP: {activePercentage * 0.00001}</div>

  
</div>
<div>
  Total: {total}
</div>


<style type="text/scss" global>
  @import '../scss/components/_form-elements.scss';
  @import "../scss/custom/_table.scss";
  @import "../scss/custom/_slider.scss";
</style>
