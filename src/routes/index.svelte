<script lang="ts">
	let image = 'template.png'
	let order = 1
	let rows = 1
	let size = 8
	let title = 'hsl(0 0% 98%)'
	let background = 'hsl(0 0% 6%)'
	let number = 'hsl(15 100% 49%)'

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
			fontSize,
			title,
			background,
			number
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
		<span class="order" style:color={number}>
			{order}
		</span>
		<div class="title" style:color={title} style={fontSize}>
			{#each Array(rows) as _}
				<span
					class="text"
					style:background
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

		<label class="action" for="title">
			Text 🎨
			<input
				bind:value={title}
				id="title"
				class="sr-only"
				name="title"
				type="color"
			/>
		</label>

		<label class="action" for="background">
			Background 🎨
			<input
				bind:value={background}
				id="background"
				class="sr-only"
				name="background"
				type="color"
			/>
		</label>

		<label class="action" for="number">
			Number 🎨
			<input
				bind:value={number}
				id="number"
				class="sr-only"
				name="number"
				type="color"
			/>
		</label>

		<button on:click={addRow} type="button">
			Add Row ⬆️
		</button>

		<button on:click={removeRow} type="button">
			Remove Row ⬇️
		</button>

		<label class="action" for="image">
			Select Image 🖼️
			<input
				on:change={handleImage}
				class="sr-only"
				id="image"
				name="image"
				type="file"
				accept="image/*"
			/>
		</label>
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
		font-family: 'Chivo', sans-serif;
		font-size: 2.4rem;
		font-weight: 700;
		background-color: hsl(0 0% 100%);
		border-radius: 50%;

		/* children */
		display: grid;
		place-content: center;
	}

	.title {
		font-family: 'Arsenica Trial Bold';
		text-transform: capitalize;
	}

	.text {
		display: inline-block;
		margin: 0.6rem 0;
		padding: 0 1.2rem;
		color: hsl(0 0% 98%);
		border-radius: 4px;
	}

	form {
		display: flex;
		gap: 4px;
		margin-top: 1rem;
	}
</style>
