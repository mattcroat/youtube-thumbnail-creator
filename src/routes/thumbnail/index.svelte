<script lang="ts">
	type ThumbnailType = {
		image: string
		order: number
		textRows: string[]
	}

	export let thumbnail: ThumbnailType
</script>

<div class="thumbnail" style={thumbnail.image}>
	<span class="order">{thumbnail.order}</span>
	<div class="title">
		{#each thumbnail.textRows as text}
			<span class="text">{text}</span>
		{/each}
	</div>
</div>

<style>
	.thumbnail {
		width: 1280px;
		height: 720px;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(12, 1fr);
		align-items: center;
		background-image: url('template.png');
		background-repeat: no-repeat;
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
</style>
