<script>
  import { select, selectAll } from 'd3-selection'

  export let selectedIndicator

  const setIndicator = (e) => {
    selectedIndicator = e
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
</div>

<style type="text/scss">
  /* @import '../scss/components/_buttons.scss'; */
  @import '../scss/components/_form-elements.scss';
  /* @import '../scss/custom/_options.scss'; */
</style>
