<script lang="ts">
import { Loading } from 'attractions'
import Background from './Background.svelte'
import Root from './Root.svelte'
let ready = false

document.addEventListener('deviceready', () => {
    ready = true
})
</script>

<style lang="scss">
:global(html) {
    height: 100%;
}

:global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    background: linear-gradient(0deg, #daf9f9, #daf9f9), #ffffff;
}

:global(.spinner) {
    height: 50% !important;
}

:global(.spinner > div) {
    width: 2rem !important;
    height: 2rem !important;
}
</style>

{#if ready}
    <Root />
{:else}
    <Background />
    <Loading />
{/if}