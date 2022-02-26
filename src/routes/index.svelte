<script lang="ts">
	let image: string
	let order = 1
	let rows = 1

	function addRow() {
		if (rows < 3) rows += 1
	}

	function removeRow() {
		if (rows > 1) rows -= 1
	}

	function handleImage(event: Event) {
		let target = event.target as HTMLInputElement
		let file = target.files[0]

		let reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (event) => {
			let dataUrl = event.target.result as string
			image = `background-image: url('${dataUrl}')`
		}
	}

	async function takeScreenshot() {
		await fetch('http://localhost:3000/api/screenshot')
	}

	async function createThumbnail() {
		const textEls = document.querySelectorAll('.text')
		const textRows = Array.from(textEls).map(
			(text) => text.textContent
		)
		const data = { image, order, textRows }

		await fetch('/thumbnail', {
			method: 'post',
			body: JSON.stringify(data)
		})
	}

	async function handleSubmit() {
		createThumbnail()
		takeScreenshot()
	}
</script>

<div class="thumbnail" style={image}>
	<span class="order">{order}</span>
	<div class="title">
		{#each Array(rows) as _}
			<span class="text" contenteditable="true">
				Template
			</span>
		{/each}
	</div>
</div>

<form on:submit|preventDefault={handleSubmit}>
	<input
		bind:value={order}
		aria-label="Order"
		min="1"
		max="20"
		type="number"
	/>

	<button
		on:click={addRow}
		aria-label="Add row"
		type="button"
	>
		+
	</button>

	<button
		on:click={removeRow}
		aria-label="Remove row"
		type="button"
	>
		-
	</button>

	<label class="upload" for="image">Select image</label>
	<input
		on:change={handleImage}
		class="sr-only"
		id="image"
		name="image"
		type="file"
		accept="image/*"
	/>
	<button type="submit">Screenshot 📷️</button>
</form>

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

	form {
		padding: 1rem;
		display: flex;
		gap: 4px;
	}
</style>
