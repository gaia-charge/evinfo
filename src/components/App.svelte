<script lang="ts">
	import Main from './Main.svelte'
	let ready = false

	document.addEventListener('deviceready', () => {
		ready = true
	})
</script>

{#if ready}
	<Main />
{:else}
	<h2>Waiting for device to be ready</h2>
{/if}