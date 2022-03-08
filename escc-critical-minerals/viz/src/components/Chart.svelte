<script>
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { scaleLinear } from 'd3-scale'
  import tippy from 'sveltejs-tippy'

  export let data
  export let titles
  export let selectedIndicator

  let figure
  let width = 400
  let height = 200

  let circles = true;
  let time = 100;
  onMount(() => setTimeout(() => {
    circles = true;
  }, time));

  let yAxisTitle = ''
  let xAxisTitle = ''

  if (titles) {
    yAxisTitle = 'Reserves (% of World Total)'
    xAxisTitle = 'Production (% of World Total)'
  }

  const padding = { top: 25, right: 35, bottom: 45, left: 45 }

  $: xScale = scaleLinear()
    .domain([0, 100])
    .range([padding.left, width - padding.right])

  $: yScale = scaleLinear()
    .domain([0, 100])
    .range([height - padding.bottom, padding.top])

  $: xTicks = [0, 50, 100]

  $: yTicks = [0, 50, 100]

  const formatTooltip = (data, selector) => {
    const template = `
      <div>${data.country}</div>
      <p><span>Percent of World's Production:</span> ${parseFloat(
        data.percentProduction
      ).toFixed(2)}%</p>
      <p><span>Percent of World's Reserves:</span> ${parseFloat(
        data.percentReserves
      ).toFixed(2)}%</p>
    `

    return {
      content: template,
      allowHTML: true,
      placement: 'top',
    }
  }

  const resize = () => {
    ;({ width, height } = figure.getBoundingClientRect())
  }

  onMount(resize)
</script>

<svelte:window on:resize="{resize}" />
<figure bind:this="{figure}">
  <!-- svelte-ignore component-name-lowercase -->
  <svg class="chart">

    <!-- y axis -->
    <g class="axis y-axis">
      <line
        class="axis-guideline"
        x1="{xScale(0)}"
        x2="{xScale(100)}"
        transform="translate(0,{yScale(0)})"></line>
      {#each yTicks as tick, i}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x1="{padding.left - 3}" x2="{padding.left}"></line>
          {#if i !== 0}
          <line class="yGuides" x1="{padding.left}" x2="{xScale(100)}"></line>
          {/if}
          <text x="{padding.left - 5}" y="+4">{tick}</text>
        </g>
      {/each}
      <text class="yAxisTitle" x="{-height / 2}" y="{padding.left - 36}"
        >{yAxisTitle}</text
      >
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      <line
        class="axis-guideline"
        y1="{yScale(0)}"
        y2="{yScale(100)}"
        transform="translate({xScale(0)})"></line>
      {#each xTicks as tick}
        <g class="tick tick-{tick}" transform="translate({xScale(tick)},0)">
          <line
            y1="{height - padding.bottom + 4}"
            y2="{height - padding.bottom}"></line>
          <text y="{height - padding.bottom + 14}">{tick}</text>
        </g>
      {/each}
      <text class="xAxisTitle" x="{width / 2}" y="{height - 10}"
        >{xAxisTitle}</text
      >
    </g>

    
    <!-- check data exists, update on change to selectedIndicator -->
    {#if data}
      {#if circles}
      {#key selectedIndicator}
      {#each data.mineralData as country}
        <circle
          use:tippy="{formatTooltip(country)}"
          in:fly="{{x: (-xScale(country.percentProduction)+padding.left), duration: 400+ (600 * (country.percentProduction/10)), opacity: .5, easing: quintOut}}"
          cx="{xScale(country.percentProduction)}"
          cy="{yScale(country.percentReserves)}px"
          r="4px"
          data-color="{selectedIndicator === 'income_level'
            ? `${country.income_level}`
            : `${country.region}`}"></circle>
      {/each}
      {/key}
      {/if}

      <g class="title">
        <text x="{width / 2}" y="{15}">{data.mineral}</text>
      </g>
    {/if}
  </svg>
</figure>

<style type="text/scss" global>
  @import '../scss/components/_tooltips.scss';
  @import '../scss/components/_chart.scss';
</style>
