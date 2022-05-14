<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = ({ error, status }) => {
    return {
      props: {
        title: `${status}: ${error.message}`,
      },
    }
  }
</script>

<script lang="ts">
  export let title: string
</script>

<h1>{title}</h1>

<style>
  h1 {
    height: 100vh;
    display: grid;
    place-content: center;
    color: hsl(220 20% 98%);
  }
</style>
