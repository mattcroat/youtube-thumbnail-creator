<script lang="ts">
  let textSize = 7
  let textColor = 'hsl(0 0% 100%)'
  let textBgColor = 'hsl(0 0% 6%)'
  let showPart = true

  $: thumbnail = `url('thumbnail.png')`

  function selectThumbnail(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files[0]
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const dataUrl = event.target.result as string
      thumbnail = `url(${dataUrl})`
    }
  }

  async function openBrowser() {
    await fetch('/api/browser')
  }

  async function saveThumbnail() {
    await fetch('/api/screenshot')
  }
</script>

<div class="thumbnail" style:background-image={thumbnail}>
  {#if showPart}
    <div
      class="part"
      style:color={textColor}
      style:background={textBgColor}
      contenteditable="true"
    >
      1
    </div>
  {/if}

  <div class="title">
    <span
      style:color={textColor}
      style:background={textBgColor}
      style:font-size="{textSize}rem"
      spellcheck="false"
      contenteditable="true"
    >
      Placeholder
    </span>
  </div>
</div>

<div class="controls">
  <form
    on:submit|preventDefault={openBrowser}
    action="/api/browser"
    method="get"
  >
    <button type="submit">Open Browser</button>
  </form>

  <form
    on:submit|preventDefault={saveThumbnail}
    action="/api/screenshot"
    method="get"
  >
    <button type="submit">+ Save Thumbnail</button>
  </form>

  <form class="options">
    <label class="action" for="image">
      <span>👉️ Select Thumbnail</span>
      <input
        on:change={selectThumbnail}
        class="sr-only"
        id="image"
        name="image"
        type="file"
        accept="image/*"
      />
    </label>

    <label class="action" for="title">
      <span>🧑‍🎨 Text Color</span>
      <input
        bind:value={textColor}
        id="title"
        class="sr-only"
        name="title"
        type="color"
      />
    </label>

    <label class="action" for="background">
      <span>🧑‍🎨 Background Color</span>
      <input
        bind:value={textBgColor}
        id="background"
        class="sr-only"
        name="background"
        type="color"
      />
    </label>

    <label for="size">
      <span class="sr-only">Text size</span>
      <input
        bind:value={textSize}
        aria-label="Text size"
        id="size"
        name="size"
        min="1"
        max="8"
        type="number"
      />
    </label>

    <label class="action" for="part">
      <span>Toggle Part</span>
      <input
        bind:checked={showPart}
        class="sr-only"
        id="part"
        name="part"
        type="checkbox"
      />
    </label>
  </form>
</div>

<style>
  .controls {
    display: flex;
    gap: 0.4rem;
    margin: 1rem;
  }

  .options {
    display: flex;
    gap: 0.4rem;
  }

  .thumbnail {
    width: 1280px;
    height: 720px;
    position: relative;
    color: hsl(0 0% 98%);
    background-image: url('thumbnail.png');
  }

  .thumbnail .part {
    height: 128px;
    width: 128px;
    display: grid;
    place-content: center;
    position: absolute;
    top: 32px;
    right: 32px;
    font-size: 4rem;
    font-weight: 700;
    background-color: hsl(0 0% 6%);
    border-radius: 50%;
  }

  .thumbnail .title {
    max-width: 700px;
    position: absolute;
    top: 50%;
    left: 128px;
    transform: translateY(-50%);
    font-family: 'Arsenica';
    font-weight: 700;
    font-size: 7rem;
  }

  .thumbnail .title span {
    padding: 1.2rem;
    line-height: 1.4;
    background-color: hsl(0 0% 6%);
    border-radius: 20px;
    text-transform: capitalize;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
</style>
