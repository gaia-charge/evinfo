<script lang="ts">
import { onMount } from 'svelte'
import { Button, Card, H1, Label } from 'attractions'
import { RefreshCcwIcon } from 'svelte-feather-icons'
import type ConnectionManager from '../ConnectionManager'

export let connectionManager:ConnectionManager
let availableDevices = []
let currentDevice:string

$: currentDevice ? connectionManager.selectDevice(currentDevice) : ''

async function listDevices(){
    availableDevices = await connectionManager.listDevices()
}

onMount(() => {
    listDevices()
    currentDevice = connectionManager.currentDevice
})
</script>

<style lang="scss">
label {
    font-family: Nunito Sans;
    display: flex;
    margin-bottom: 0.5rem;

    input {
        margin-right: 0.5rem;
    }

    .device-id {
        font-size: 0.7em;
    }
}
</style>

<Card style="width: calc(100% - 3rem);">
    <H1 style="display: flex; justify-content: space-between;">
        Select adapter
        <Button filled small on:click={listDevices}>
            <RefreshCcwIcon size="1x" />
        </Button>
    </H1>
    {#each availableDevices as device}
        <label>
            <input type=radio bind:group={currentDevice} name="devices" value={device.id}>
            <div>
                <Label style="font-size: 1em">{device.name}</Label>
                <span class="device-id">{device.id}</span>
            </div>
        </label>
    {/each}
</Card>