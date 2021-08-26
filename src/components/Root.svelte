<script lang="ts">
import Header from './Header.svelte'
import BatteryInfo from './BatteryInfo.svelte'
import BatteryGraph from './BatteryGraph.svelte'
import Background from './Background.svelte'
import DataPanels from './DataPanels.svelte'
import Settings from './Settings.svelte'
import ConnectionManager from '../ConnectionManager'

const connectionManager = new ConnectionManager()

let showSettings = !false

function connectionSuccess() {
    bluetoothSerial.unsubscribe()
    bluetoothSerial.clear()
    bluetoothSerial.subscribe('>', (data: string) => {
        if (data != '') {
            // msg(`In: ${data}`)
            bluetoothSerial.clear()
        }
    })
}

function writeData(dataString: string){
    dataString += "\r"
    const data = new Uint8Array(dataString.length)
    for (var i = 0; i < data.length; i++) {
        data[i] = dataString.charCodeAt(i)
    }
    bluetoothSerial.write(data)
}
</script>

<style lang="scss">
:global(.headline) {
  color: #011625 !important;
  font-family: Inter !important;
  font-weight: 800 !important;
  margin-bottom: 0 !important;
}

:global(.button) {
    font-weight: 600;
}

:global(.dot) {
    margin-right: 0.5rem !important;
}

:global(h1) {
    font-family: Inter;
    font-weight: 700 !important;
    font-size: 1.5em !important;
    margin: 0;
    color: #011625 !important;
}

:global(.label, label .content) {
    font-family: Inter !important;
    font-style: normal;
    font-weight: 800 !important;
    font-size: 14px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.content {
    background: linear-gradient(0deg, #DAF9F9, #DAF9F9), #FFFFFF;
    padding: 1.25rem;
    height: calc(100% - 4rem - 2.5rem);
}

</style>

<Header connectionManager={connectionManager} showSettings={() => showSettings = !showSettings} />

<div class="content">
    <Background />

    {#if showSettings}
        <Settings connectionManager={connectionManager} />
    {:else}
        <BatteryInfo percent={69} range={123} />
        <BatteryGraph />
        <DataPanels />
    {/if}
</div>