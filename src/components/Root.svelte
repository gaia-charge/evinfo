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
let connected = !false
let currentDevice = !undefined
let showLog = false
let devices = []
let logger = []

const connectionCommands = [
    "ATWS",         // Reset
    "ATWS",         // Reset
    "ATE0",         // Echo off
    "ATI",          // Get product id
    "AT@1",         // Display device description
    "ATSP6",        // Set protocol. ISO 15765-4 CAN (11 bit ID, 500 kbaud)
    "ATAT1",        // Adaptive timing enabled
    "ATH1",         // Show response headers
    "ATL0",         // Send lf after cr
    "ATS0",         // Don't insert spaces
    "ATCAF1",       // Format CAN messages
    "ATSH79B",      // Set header to 79B
    "ATFCSH79B",    // Set CAN ID to 79B
    "ATFCSD300000", // Set control message to 30 00 00
    "ATFCSM1",      // User defined responses
    "ATSH752",      // Set header to 752
    "ATFCSH752",    // Set CAN ID to 752
    "ATCRA652",     // Set filter to 652
    "22F1903"       // Send: 22 F1 90 3 -> VIN '652.{16}'
    // -> 652 10 14 62 F1 90 56 58 4B
]

const loop1 = [
    "ATRV",      // Read input voltage
    // -> 12.2V
    "ATSH6A2",   // Set header to 6A2
    "ATFCSH6A2", // Set CAN ID to 6A2
    "ATCRA682",  // Set filter to 682
    "22D4021",   // Send: 22 D4 02 1 -> Speed '6820562D402.{4}'
    // -> 682 05 62 D4 02 0000
    "22D4341",   // Send: 22 D4 34 1 -> Ambient '6820462D434.{2}'
    // -> 682 04 62 D4 34 1B
    "22D8EF1",   // Send: 22 D8 EF 1 -> Ambient '6820462D8EF.{2}'
    // -> 682 04 62 D8 EF 1D
    "ATSH6B4",   // Set header to 6B4
    "ATFCSH6B4", // Set CAN ID to 6B4
    "ATCRA694",  // Set filter to 694
    "22D4101",   // Send: 22 D4 10 1 -> SoC calibrated '6940562D410.{4}'
    // -> 694 05 62 D4 10 B9 D1
    "22D8651",   // Send: 22 D8 65 1 -> Energy '6940562D865.{4}'
    // -> 694 05 62 D8 65 0A F5
    "22D8601",   // Send: 22 D8 60 1 -> SoH    '6940662D860.{6}'
    // -> 694 06 62 D8 60 01 06 40
    "22D8161",   // Send: 22 D8 16 1 -> Volt   '6940762D816.{8}'
    // -> 694 07 62 D8 16 00 01 2C 00
    "22D8151",   // Send: 22 D8 15 1 -> Volt   '6940562D815.{4}'
    // -> 694 05 62 D8 15 1B 80
    "22D8101",   // Send: 22 D8 10 1 -> SoC HR '6940562D810.{4}'
    // -> 694 05 62 D8 10 B9 D1
    "22D86F1",   // Send: 22 D8 6F 1 -> Vmin   '6940562D86F.{4}'
    // -> 694 05 62 D8 6F 0F E4
    "22D8701"    // Send: 22 D8 70 1 -> Vmax   '6940562D870.{4}'
    // -> 694 05 62 D8 70 0F EF
];

$: changeCurrentDevice(currentDevice)

function msg(message) {
    logger = [...logger, `${message}\n`]
}

function connectionSuccess() {
    msg(`Connected to ${currentDevice}`)
    connected = true
    bluetoothSerial.unsubscribe()
    bluetoothSerial.clear()
    bluetoothSerial.subscribe('>', (data) => {
        if (data != '') {
            msg(`In: ${data}`)
            bluetoothSerial.clear()
        }
    })
}

function changeCurrentDevice() {
    return;
    bluetoothSerial.disconnect()
    if (currentDevice) {
        msg(`Connecting to ${currentDevice}`)
        bluetoothSerial.connect(currentDevice, connectionSuccess, (error) => {
            msg(`Connect error: ${error.toString()}`)
            connected = false
        })
    }
}

function searchDevices() {
    // msg('Searching for devices')
    devices = []
    bluetoothSerial.list((foundDevices) => {
        msg(`Found ${devices.length} devices`)
        foundDevices.forEach((device) => {
            devices = [...devices, device]
        })
    }, (error) => {
        msg(`Failed to list: ${error}`)
    })
}

function disconnect() {
    bluetoothSerial.disconnect()
    connected = false
}

function writeData(dataString){
    dataString += "\r"
    const data = new Uint8Array(dataString.length)
    for (var i = 0; i < data.length; i++) {
        data[i] = dataString.charCodeAt(i)
    }
    bluetoothSerial.write(data)
}

function sendInit() {
    connectionCommands.forEach((command) => {
        writeData(command)
    })
}

function sendLoop() {
    loop1.forEach((command) => {
        writeData(command)
    })
}

// searchDevices();
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
        {#if !currentDevice}
            <h2>
                Choose the device
                <button on:click={searchDevices}>Search</button>
            </h2>
            {#each devices as device}
                <label>
                    <input type=radio bind:group={currentDevice} name="devices" value={device.id}>
                    {device.name} [{device.id}]
                </label>
            {/each}
        {/if}
        
        <!-- {#if connected}
            <button on:click={sendInit}>Send init</button>
            <button on:click={sendLoop}>Send loop</button>
        {/if} -->

        <BatteryInfo percent={69} range={123} />

        <BatteryGraph />

        <DataPanels />
    {/if}
    
    {#if showLog}
        <code>
            <pre>
                {#each logger as logline}
                    {logline}
                {/each}
            </pre>
        </code>
    {/if}
</div>