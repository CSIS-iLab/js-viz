<script>
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

  $: legendValues = selectedIndicator === 'region' ? regionData : incomeData
</script>

<figure class="interactive__color-legend legend">
  <figcaption class="legend__title">
    {selectedIndicator === 'region' ? 'Region' : 'Income Level'}
  </figcaption>
  <svg class="legend__color-circles">
    {#each legendValues as d, legendIndex}
      <circle
        cx="5%"
        cy="{10 + legendIndex * 25 + 'px'}"
        r="{d.r}"
        fill="{d.fill}"
        region="{d.region}"
        data-color="{d.text}"></circle>
      <text class="legend__labels" x="10%" y="{14 + legendIndex * 25 + 'px'}"
        >{d.text}</text
      >
    {/each}
  </svg>
</figure>

<style type="text/scss" global>
  // @import '../scss/custom/_legend.scss';
</style>
