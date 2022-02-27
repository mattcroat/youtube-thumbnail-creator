<script lang="ts">
	let image = 'template.png'
	let order = 1
	let rows = 1
	let size = 8

	$: backgroundImage = `background-image: url('${image}')`
	$: fontSize = `font-size: ${size}rem`

	function addRow() {
		if (rows < 3) rows += 1
	}

	function removeRow() {
		if (rows > 1) rows -= 1
	}

	function handleImage(event: Event) {
		const target = event.target as HTMLInputElement
		const file = target.files[0]

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (event) => {
			const dataUrl = event.target.result as string
			image = dataUrl
		}
	}

	async function takeScreenshot() {
		await fetch('http://localhost:3000/api/screenshot', {
			method: 'post',
			body: JSON.stringify(order)
		})
	}

	async function createThumbnail() {
		const textEls = document.querySelectorAll('.text')
		const textRows = Array.from(textEls).map(
			(text) => text.textContent
		)
		const data = {
			backgroundImage,
			order,
			textRows,
			fontSize
		}

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

<div class="container">
	<div class="thumbnail" style={backgroundImage}>
		<span class="order">{order}</span>
		<div class="title" style={fontSize}>
			{#each Array(rows) as _}
				<span
					class="text"
					contenteditable="true"
					spellcheck="false"
				>
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

		<input
			bind:value={size}
			aria-label="Font size"
			min="1"
			max="8"
			type="number"
		/>

		<button on:click={addRow} type="button">
			Add Row ⬆️
		</button>

		<button on:click={removeRow} type="button">
			Remove Row ⬇️
		</button>

		<label class="upload" for="image">
			Select Image 🖼️
		</label>
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
</div>

<style>
	.container {
		display: grid;
		place-content: center;
		padding: 1rem 0;
	}

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
		margin-top: 3.5rem;
		margin-left: 2.7rem;
		align-self: flex-start;
		font-family: 'Chivo';
		font-size: 2.4rem;
		font-weight: 700;
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

	form {
		display: flex;
		gap: 4px;
		margin-top: 1rem;
	}
</style>
