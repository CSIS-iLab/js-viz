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
    <!-- data -->
    {#each data.mineralData as country}
      <circle cx="{xScale(country.x)}px" cy="{yScale(country.y)}px" r="5px"
      ></circle>
    {/each}

    <!-- y axis -->
    <g class="axis y-axis">
      {#each yTicks as tick}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x1="{padding.left}" x2="{xScale(22)}"></line>
          <text x="{padding.left - 8}" y="+4">{tick}</text>
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      {#each xTicks as tick}
        <g class="tick" transform="translate({xScale(tick)},0)">
          <line y1="{yScale(0)}" y2="{yScale(13)}"></line>
          <text y="{height - padding.bottom + 16}">{tick}</text>
        </g>
      {/each}
    </g>
  </svg>
</figure>

<style>
  figure {
    border: 1px solid orangered;
    max-width: 350px;
  }
</style>
