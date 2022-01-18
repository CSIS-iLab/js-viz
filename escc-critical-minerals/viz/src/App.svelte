<script>
  import parseData from './data.js'
  import { select, selectAll } from 'd3-selection'
  import Options from './components/Options.svelte'
  import Chart from './components/Chart.svelte'
  import SizeLegend from './components/sizeLegend.svelte'
  import Legend from './components/Legend.svelte'

  const dataSrc = {
    scatter:
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxzv5D7cjQIQ4Wi6wFM1v_mUIB_Fef9d1KGL42xG_-THTfg5T4e8Ez11Ou63P4IE60DUV1XnMasEa0/pub?output=csv',
  }

  const data = loadData()

  async function loadData() {
    let res = await parseData({
      src: dataSrc,
    })
    return res
  }

  const init = () => {
    resize(mq)
  }

	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>