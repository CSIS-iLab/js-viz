<script>
  export let activeCountry
  export let allData
  export let totalReq

  const getDropdownOptions = () => {
    return allData.sort((a, b) => a.country.localeCompare(b.country)).map((c) => c.country)
  }

  const getAttr = (attr) => {
    return allData.find(d => d.country === activeCountry)[attr]
  }

  let activePercentage = allData.find(d => d.country === activeCountry).adjustable_gdp * 100000
  console.log(activePercentage)

  $: contributed = parseInt(getAttr('gdp')*(activePercentage * .00001))

  $: remaining = totalReq - contributed

  // $: total = allData.filter(d => d.country !== activeCountry).reduce((acc, i) => {
  //   console.log(acc, i.funding)
  //     return acc += i.funding 
  //   }, 0) + contributed

  $: total = allData.filter(d => d.country !== activeCountry).reduce((acc, i ) => {
    return acc + i.gdp * i.adjustable_gdp
  }, 0) + contributed
 
    $: console.log(total, 'total')
  

  const handleChange = () => {
    const country = allData.find(d => d.country == activeCountry)
    const convertedPercentage = activePercentage * .00001
    country.adjustable_gdp = convertedPercentage
    country.funding = contributed
    console.log(allData)
  }

  const handleActiveCountry = () => {
    activePercentage = allData.find(d => d.country === activeCountry).adjustable_gdp * 100000
    console.log(allData)
  }

</script>

  <!-- <input bind:value={activePercentage} on:change="{() => handleChange()}" /> -->
  <!-- <div id="slider"></div> -->

<div class="interactive__options">
  <div>activeP: {activePercentage * .00001}</div>

  <div class="interactive__dropdown">
    <select
      class="input__select"
      bind:value="{activeCountry}"
      on:change={() => handleActiveCountry()}
    >
      {#each getDropdownOptions() as option}
        <option value="{option}">{option}</option>
      {/each}
    </select>
  </div>

  
</div>
<div>
  Total: {total}
  GDP: {getAttr('gdp')}
</div>
  
<input type=range bind:value={activePercentage} min=0  max=100 on:change={() => handleChange()} />
<br>
<div>Contributed:{contributed}</div>
<br>
<div>Remaining: {remaining}</div>
<style type="text/scss">
  @import '../scss/components/_buttons.scss';
  @import '../scss/components/_form-elements.scss';
  @import '../scss/custom/_options.scss';

  .rangeslider {
    width: 100%;
  }

  .ypo {
    width: 400px;
  }
</style>
