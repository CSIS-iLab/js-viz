<script>
  import {onMount} from 'svelte'
  import Chart from './Chart.svelte'
  export let selectedIndicator

  let colorScale = ['#69518d', '#58a897', '#83badc', '#084d7c', '#e7ae3f', '#8cb561'];

  let regionData = [
    { x: 5, r: 7, fill: colorScale[0], text: 'Europe & North America' },
    { x: 15, r: 7, fill: colorScale[1], text: 'East Asia & Pacific' },
    { x: 20, r: 7, fill: colorScale[2], text: 'Latin America & Caribbean' },
    { x: 25, r: 7, fill: colorScale[3], text: 'Sub-Saharan Africa' },
    { x: 30, r: 7, fill: colorScale[4], text: 'Middle East & North Africa' },
    { x: 35, r: 7, fill: colorScale[5], text: 'Central & South Asia' },
  ]

  let incomeData = [
    { x: 0, r: 7, fill: colorScale[0], text: 'High' },
    { x: 20, r: 7, fill: colorScale[1], text: 'Upper Middle' },
    { x: 40, r: 7, fill: colorScale[2], text: 'Lower Middle' },
    { x: 60, r: 7, fill: colorScale[3], text: 'Low' },
  ]

  $: legendValues = selectedIndicator === 'Income' ? incomeData : regionData

  let figure
  let width = 600
  let height = 400

  const resize = () => {
    ;({ width, height } = figure.getBoundingClientRect())
  }

  onMount(resize)
</script>

<svelte:window on:resize="{resize}" />
<figure class="interactive__color-legend legend" bind:this="{figure}">
  <figcaption class="legend__title">
    Legend
  </figcaption>
  <form action="">
    <label for="colors">Select something</label>
    <select bind:value={selectedIndicator} name="colors" id="colors">
      <option value="Income">Income</option>
      <option value="Region">Region</option>
    </select>
  </form>
  <svg class="legend__color-circles">
    {#each legendValues as d, legendIndex}
      <circle
        cx="10"
        cy="{15 + 20*legendIndex + 'px'}"
        r="{d.r}"
        fill="{d.fill}"
        region="{d.region}"
        data-color="{d.text}"></circle>
      <text class="legend__labels" x="25" y="{20 + 20*legendIndex + 'px'}"
        >{d.text}</text
      >
    {/each}
  </svg>
  <Chart titles="yes" />
</figure>

<style type="text/scss" global>
  // @import '../scss/custom/_legend.scss';
</style>
