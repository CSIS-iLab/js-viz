<!-- first, I am adding a script tag so that I can add in code -->
<script>
  // Import needed modules from packages
  import {onMount} from 'svelte'
  import {scaleLinear} from 'd3-scale'

  // here, I am exporting the imported data from my app.svelte file. I am logging this data so that I can see what I need to change or adjust about the structure of the data.
  // we are doing this to have a workflow of pulling in data and then pass it up and down the dom tree – app is the parent compoenent and we pass the data down as a prop and then the second step is export let data
  export let data
  console.log(data)

  // here, I am using a figure to hold my chart – it's interesting I'm using a figure for this and I'm not sure why. We are using it because we want to wrap the svg tag as well (bunch of small multiples, so it's easier to recognize)
  let figure
  let width = 600
  let height = 400

  let yAxisTitle = "Reserves, % of World Total";
  let xAxisTitle = "Production, % of World Total";

  // add in padding on figure element, with one line structure
  const padding = { top: 25, right: 35, bottom: 35, left: 45 }

  // add in the x scale by including a preset domain and a physical range of the padding with width offset
  $: xScale = scaleLinear()
    .domain([0, 75])
    .range([padding.left, width - padding.right])
  
  // similar to the Y scale, changes around the scaling via range based on preset domain range
  $: yScale = scaleLinear()
    .domain([0, 100])
    .range([height - padding.bottom, padding.top])
  
  // x and y ticks are manually added – might be an issue for dynamic rendering later
  $: xTicks = [0, 25, 50, 75]

  $: yTicks = [0, 25, 50, 75, 100]

  // I don't understand what is happening here with the ; element in svelte
  // lines 36 to 45 are a code family!
  const resize = () => {
    ;({ width, height } = figure.getBoundingClientRect())
  }

  onMount(resize)
</script>

<!-- I don't really understand what is happening here either – my best guess is that we are using svelt to say that whenever the window size is changed (via on:resize), we want to run the resize function which we've defined above -->
<svelte:window on:resize="{resize}" />

<p>{data.mineral}</p>

<!-- here, we are creating a figure element and then I guess binding it to the variable we created in the svelte tags above -->
<figure bind:this="{figure}">

  <!-- within the figure we create our first svg element -->
  <svg class="chart">

    <!-- for each datapoint in our mineralData, we create a circle -->
    <!-- data -->
    {#each data.mineralData as country}

    <!-- here I need to process the data, or I could do it earlier in the dev process. Need to process it somewhere though because there are datapoints without a number going into the cx and cy sttributes of the circle -->
      <circle cx="{xScale(country.percentProduction)}px" cy="{yScale(country.percentReserves)}px" r="3px"></circle>
    {/each}

    <!-- y axis -->
    <g class="axis y-axis">
      <line class="axis-guideline" x1="{xScale(0)}" x2="{xScale(100)}" transform='translate(0,{yScale(0)})'></line>
      {#each yTicks as tick}
      <!-- for each element, we need to transform the line to its specified point based on the yScale -->
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <!-- I'm not really sure what this does -->
          <line x1="{padding.left - 3}" x2="{padding.left}"></line>
          <text x="{padding.left - 4}" y="+4">{tick}</text>
        </g>
      {/each}
      <text class='yAxisTitle' x="{-height/2}" y="{padding.left-30}">{yAxisTitle}</text>
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      <line class="axis-guideline" y1="{yScale(0)}" y2="{yScale(100)}" transform='translate({xScale(0)})'></line>
      {#each xTicks as tick}
        <g class="tick tick-{tick}" transform="translate({xScale(tick)},0)">
          <line y1="{height - padding.bottom + 4}" y2="{height - padding.bottom}"></line>
          <text y="{height - padding.bottom + 16}">{tick}</text>
        </g>
      {/each}
      <text class='xAxisTitle' x="{width/2}" y="{height - 4}">{xAxisTitle}</text>
    </g>
  </svg>
</figure>

<style>
  @import './scss/components/_chart.scss';
</style>