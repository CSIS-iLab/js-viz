<script>
  import { onMount } from 'svelte'
  import { scaleLinear } from 'd3-scale'

  export let data
  console.log(data)

  let figure
  let width = 500
  let height = 300

  const padding = { top: 20, right: 40, bottom: 40, left: 25 }

  $: xScale = scaleLinear()
    .domain([0, 20])
    .range([padding.left, width - padding.right])

  $: yScale = scaleLinear()
    .domain([0, 12])
    .range([height - padding.bottom, padding.top])

  $: xTicks = [0, 4, 8, 12, 16, 20]

  $: yTicks = [0, 2, 4, 6, 8, 10, 12]

  const resize = () => {
    ;({ width, height } = figure.getBoundingClientRect())
  }

  onMount(resize)
</script>

<svelte:window on:resize="{resize}" />

<figure bind:this="{figure}">
  <svg>
    {#each data.mineralData as country}
      <circle cx="{xScale(country.x)}px" cy="{yScale(country.y)}px" r="5px"
      ></circle>
    {/each}
  </svg>
</figure>

<style>
  figure {
    border: 1px solid orangered;
  }
</style>
