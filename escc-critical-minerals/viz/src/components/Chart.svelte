<!-- first, I am adding a script tag so that I can add in code -->
<script>
  // Import needed modules from packages
  import {onMount} from 'svelte'
  import {scaleLinear} from 'd3-scale'

  // here, I am exporting the imported data from my app.svelte file. I am logging this data so that I can see what I need to change or adjust about the structure of the data.
  export let data
  console.log(data)

  // here, I am using a figure to hold my chart – it's interesting I'm using a figure for this and I'm not sure why.
  let figure
  let width = 500
  let height = 300

  // add in padding on figure element, with one line structure
  const padding = { top: 20, right: 40, bottom: 40, left: 25 }

  // add in the x scale by including a preset domain and a physical range of the padding with width offset
  $: xScale = scaleLinear()
    .domain([0, 20])
    .range([padding.left, width - padding.right])
  
  // similar to the Y scale, changes around the scaling via range based on preset domain range
  $: yScale = scaleLinear()
    .domain([0, 12])
    .range([height - padding.bottom, padding.top])
  
  // x and y ticks are manually added – might be an issue for dynamic rendering later
  $: xTicks = [0, 4, 8, 12, 16, 20]

  $: yTicks = [0, 2, 4, 6, 8, 10, 12]

  // I don't understand what is happening here with the ; element in svelte
  const resize = () => {
    ;({ width, height } = figure.getBoundingClientRect())
  }

  onMount(resize)
</script>

<!-- I don't really understand what is happening here either – my best guess is that we are using svelt to say that whenever the window size is changed (via on:resize), we want to run the resize function which we've defined above -->
<svelte:window on:resize="{resize}" />

<!-- here, we are creating a figure element and then I guess binding it to the variable we created in the svelte tags above -->
<figure bind:this="{figure}">

  <!-- within the figure we create our first svg element -->
  <svg>

    <!-- for each datapoint in our mineralData, we create a circle -->
    <!-- data -->
    {#each data.mineralData as country}
      <circle cx="{xScale(country.x)}px" cy="{yScale(country.y)}px" r="5px"></circle>
    {/each}

    <!-- y axis -->
    <g class="axis y-axis">
      {#each yTicks as tick}
      <!-- for each element, we need to transform the line to its specified point based on the yScale -->
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <!-- I'm not really sure what this does -->
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