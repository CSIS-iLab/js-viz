<script>
  import { onMount } from 'svelte'
  import Chart from './Chart.svelte'
  export let selectedIndicator

  let colorScale = [
    '#1A6CC4',
    '#00B2E3',
    '#F4BE43',
    '#D84B29',
    '#45B166',
    '#C5C5C5'
  ]

  let regionData = [
    { x: 5, r: 5, fill: colorScale[0], text: 'Americas' },
    { x: 15, r: 5, fill: colorScale[1], text: 'Africa' },
    { x: 20, r: 5, fill: colorScale[2], text: 'Europe' },
    { x: 25, r: 5, fill: colorScale[3], text: 'Asia' },
    { x: 30, r: 5, fill: colorScale[4], text: 'Oceania' },
    { x: 35, r: 5, fill: colorScale[5], text: 'N/A' }
  ]

  let incomeData = [
    { x: 0, r: 7, fill: colorScale[0], text: 'High' },
    { x: 20, r: 7, fill: colorScale[1], text: 'Upper Middle' },
    { x: 40, r: 7, fill: colorScale[2], text: 'Lower Middle' },
    { x: 60, r: 7, fill: colorScale[3], text: 'Low' },
  ]

  $: legendValues =
    selectedIndicator === 'income_level' ? incomeData : regionData

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
  <!-- <figcaption class="legend__title">
    Legend
  </figcaption> -->
  <!-- <form action="">
    <label for="colors">Select something</label>
    <select bind:value={selectedIndicator} name="colors" id="colors">
      <option value="Income">Income</option>
      <option value="Region">Region</option>
    </select>
  </form> -->
  <svg class="legend__color-circles">
    {#each legendValues as d, legendIndex}
      <circle
        cx="10"
        cy="{15 + 20 * legendIndex + 'px'}"
        r="{d.r}"
        fill="{d.fill}"
        region="{d.region}"
        data-color="{d.text}"></circle>
      <text class="legend__labels" x="25" y="{20 + 20 * legendIndex + 'px'}"
        >{d.text}</text
      >
    {/each}
  </svg>
  <!-- <Chart titles="yes" /> -->
</figure>

<style type="text/scss" global>
  // @import '../scss/custom/_legend.scss';
</style>
