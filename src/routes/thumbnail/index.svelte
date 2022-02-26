<script lang="ts">
	type ThumbnailType = {
		backgroundImage: string
		order: number
		textRows: string[]
		fontSize: string
	}

	export let thumbnail: ThumbnailType
</script>

<div class="thumbnail" style={thumbnail.backgroundImage}>
	<span class="order">{thumbnail.order}</span>
	<div class="title" style={thumbnail.fontSize}>
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
		grid-template-columns: 1fr 1fr;
		align-items: center;
		background-repeat: no-repeat;
	}

	.order {
		width: 68px;
		height: 68px;
		margin: 2rem;
		align-self: flex-start;
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
		font-family: 'Arsenica Trial Bold';
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
