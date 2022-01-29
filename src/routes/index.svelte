<script lang="ts">
	import '$root/styles/global.css'

	async function takeScreenshot() {
		await fetch('http://localhost:3000/screenshot')
	}
</script>

<div class="thumbnail">
	<span class="order">1</span>
	<div class="title">
		<span class="text">what is</span>
		<span class="text">svelte?</span>
	</div>
</div>

<button on:click={takeScreenshot} class="screenshot">Screenshot 📷️</button>

<style>
	.thumbnail {
		width: 1280px;
		height: 720px;
		background-image: url('svelte-for-beginners.png');

		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(12, 1fr);
		align-items: center;
	}

	.order {
		width: 68px;
		height: 68px;
		margin: 2rem;
		font-family: sans-serif;
		font-size: 2.4rem;
		font-weight: bold;
		color: hsl(15 100% 49%);
		background-color: hsl(0 0% 100%);
		border-radius: 50%;

		/* children */
		display: grid;
		place-content: center;
	}

	.title {
		grid-column: 6 / -1;
		grid-row: 1 / -1;
		font-family: 'Arsenica Trial Bold';
		font-size: 8.2rem;
		text-transform: capitalize;
		color: hsl(0 0% 100%);
	}

	.text {
		display: inline-block;
		margin: 0.6rem 0;
		padding: 0 1.2rem;
		background-color: hsl(0 0% 6%);
		border-radius: 4px;
	}

	.screenshot {
		padding: 1rem;
		font-size: inherit;
	}
</style>
