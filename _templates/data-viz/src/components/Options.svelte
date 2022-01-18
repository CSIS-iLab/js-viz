<script>
  import { select, selectAll } from 'd3-selection'

  export let selectedIndicator
  export let allData
  export let selectedFilter 
  export let selectedCountry
  export let activeDropdown

  let filterObj = [
    { label: 'G20', value: 'g20' },
    { label: 'HSR', value: 'hsr' },
  ]

  const setIndicator = (e) => {
    selectedIndicator = e
  }

  $: getDropdownOptions = () => {
    const filteredData = 
    selectedFilter.length === 0
      ? allData
      : allData.filter((a) => selectedFilter.some((b) => a[b]))
    return filteredData.sort((a, b) => a.country.localeCompare(b.country)).map((c) => c.country)
  }
</script>

<div class="interactive__options">
  <div class="interactive__indicators">
    <span class="interactive__options--label interactive__options--group"
      >Group By:
    </span>
    <button
      class:btn--active="{selectedIndicator === 'income_level'}"
      class="btn btn--select btn-income"
      on:click="{(e) => setIndicator('income_level')}">Income Level
    </button>
    <button
    class:btn--active="{selectedIndicator === 'region'}"
    class="btn btn--select btn-region"
    on:click="{(e) => setIndicator('region')}">Region
  </button>
  </div>

  <div class="interactive__filters">
    <div class="interactive__filters--checkboxes">
      <span class="interactive__options--label">Filter By: </span>
      {#each filterObj as filters}
        <label>
          <input
            type="checkbox"
            bind:group="{selectedFilter}"
            name="{selectedFilter}"
            value="{filters.value}"
          />
          {filters.label}
        </label>
      {/each}
    </div>

    <div class="interactive__filters--dropdown">
      <select
        class="input__select"
        bind:value="{selectedCountry}"
        on:change={() => activeDropdown = true}
      >
        <option class="placeholder" value="" selected disabled hidden
          >Select a Country</option
        >
        {#each getDropdownOptions() as option}
          <option value="{option}">{option}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<style type="text/scss">
  @import '../scss/components/_buttons.scss';
  @import '../scss/components/_form-elements.scss';
  @import '../scss/custom/_options.scss';
</style>
