<script lang="ts">
    import { Button, Card, Label } from 'attractions'
    import { RefreshCcwIcon } from 'svelte-feather-icons'
    import type ConnectionManager from '../ConnectionManager'

    export let connectionManager:ConnectionManager
    let availableDevices = []
    let currentDevice:string

    async function listDevices(){
        availableDevices = await connectionManager.listDevices()
    }
</script>

<Card style="width: calc(100% - 3rem);">
    <Label>
        Select adapter
        <Button filled small on:click={listDevices}>
            <RefreshCcwIcon size="1x" />
        </Button>
    </Label>
    {#each availableDevices as device}
        <label>
            <input type=radio bind:group={currentDevice} name="devices" value={device.id}>
            {device.name} [{device.id}]
        </label>
    {/each}
</Card>