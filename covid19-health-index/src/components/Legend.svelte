<script>
  export let selectedIndicator

  let regionData = [
    { x: 5, r: 7, fill: '#69518d', text: 'Europe & North America' },
    { x: 15, r: 7, fill: '#58a897', text: 'East Asia & Pacific' },
    { x: 20, r: 7, fill: '#83badc', text: 'Latin America & Caribbean' },
    { x: 25, r: 7, fill: '#084d7c', text: 'Sub-Saharan Africa' },
    { x: 30, r: 7, fill: '#e7ae3f', text: 'Middle East & North Africa' },
    { x: 35, r: 7, fill: '#8cb561', text: 'Central & South Asia' },
  ]

  let incomeData = [
    { x: 0, r: 7, fill: '#69518d', text: 'High' },
    { x: 20, r: 7, fill: '#58a897', text: 'Upper Middle' },
    { x: 40, r: 7, fill: '#83badc', text: 'Lower Middle' },
    { x: 60, r: 7, fill: '#084d7c', text: 'Low' },
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
  @import '../scss/custom/_legend.scss';
</style>
