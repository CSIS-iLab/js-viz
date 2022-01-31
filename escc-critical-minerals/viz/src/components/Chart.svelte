<!-- first, I am adding a script tag so that I can add in code -->
<script>
  // Import needed modules from packages
  import { onMount } from 'svelte'
  import { scaleLinear } from 'd3-scale'
  import tippy from 'sveltejs-tippy'

  // here, I am exporting the imported data from my app.svelte file. I am logging this data so that I can see what I need to change or adjust about the structure of the data.
  // we are doing this to have a workflow of pulling in data and then pass it up and down the dom tree – app is the parent compoenent and we pass the data down as a prop and then the second step is export let data
  export let data
  export let titles
  export let selectedIndicator
  console.log(data)
  console.log(selectedIndicator)

  // here, I am using a figure to hold my chart – it's interesting I'm using a figure for this and I'm not sure why. We are using it because we want to wrap the svg tag as well (bunch of small multiples, so it's easier to recognize)
  let figure
  let width = 400
  let height = 200

  let yAxisTitle = ''
  let xAxisTitle = ''

  if (titles) {
    yAxisTitle = 'Reserves (% of World Total)'
    xAxisTitle = 'Production (% of World Total)'
  }

  // add in padding on figure element, with one line structure
  const padding = { top: 25, right: 35, bottom: 45, left: 45 }

  // add in the x scale by including a preset domain and a physical range of the padding with width offset
  $: xScale = scaleLinear()
    .domain([0, 100])
    .range([padding.left, width - padding.right])

  // similar to the Y scale, changes around the scaling via range based on preset domain range
  $: yScale = scaleLinear()
    .domain([0, 100])
    .range([height - padding.bottom, padding.top])

  // x and y ticks are manually added – might be an issue for dynamic rendering later
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
    <!-- for each datapoint in our mineralData, we create a circle -->
    <!-- data -->
    {#if data}
      {#each data.mineralData as country}
        <circle
          use:tippy="{formatTooltip(country)}"
          cx="{xScale(country.percentProduction)}"
          cy="{yScale(country.percentReserves)}px"
          r="4px"
          data-color="{selectedIndicator === 'income_level'
            ? `${country.income_level}`
            : `${country.region}`}"></circle>
      {/each}

      <g class="title">
        <text x="{width / 2}" y="{15}">{data.mineral}</text>
      </g>
    {/if}

    <!-- y axis -->
    <g class="axis y-axis">
      <line
        class="axis-guideline"
        x1="{xScale(0)}"
        x2="{xScale(100)}"
        transform="translate(0,{yScale(0)})"></line>
      {#each yTicks as tick}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x1="{padding.left - 3}" x2="{padding.left}"></line>
          <!-- <line class="yGuides" x1="{padding.left}" x2="{xScale(100)}"></line> -->
          <text x="{padding.left - 5}" y="+4">{tick}</text>
        </g>
      {/each}
      <text class="yAxisTitle" x="{-height / 2}" y="{padding.left - 30}"
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
      <text class="xAxisTitle" x="{width / 2}" y="{height - 4}"
        >{xAxisTitle}</text
      >
    </g>
  </svg>
</figure>

<style type="text/scss" global>
  @import '../scss/components/_tooltips.scss';
  @import '../scss/components/_chart.scss';
</style>
