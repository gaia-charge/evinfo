<style lang="scss">
header {
  background-color: white;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  height: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex: none;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;
}

.connection-status {
  display: flex;
  align-items: center;
}
</style>
<script lang="ts">
    import { Headline, Dot, Button } from 'attractions'
    import { HelpCircleIcon, SettingsIcon } from 'svelte-feather-icons'
    import { ConnectionState } from '../ConnectionManager'
    import type { ConnectionManagerType } from '../ConnectionManager'

    export let connectionManager: ConnectionManagerType
    export let showHelp = () => {}
    export let showSettings = () => {}
    let { state } = connectionManager
</script>

<header>
    <Button filled small on:click={showHelp}>
        <HelpCircleIcon size="1x" />
    </Button>
    <div class="connection-status">
        {#if $state === ConnectionState.Connected}
            <Dot success class="mr" />
            <Headline>Connected</Headline>
        {:else if $state === ConnectionState.Connecting}
            <Dot attention class="mr" />
            <Headline>Connecting...</Headline>
        {:else}
            <Dot danger class="mr" />
            <Headline>Not connected</Headline>
        {/if}
    </div>
    <Button filled small on:click={showSettings}>
        <SettingsIcon size="1x" />
    </Button>
</header>