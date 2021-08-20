// When not running in Cordova (i.e. testing in browser), inject necessary shims
if (!window.hasOwnProperty('cordova')) {
    const log = (message) => console.log(`%c DesktopShim ${message}`, 'font-weight: bold')
    window.bluetoothSerial = {
        list: (success) => {
            log('Listed devices')
            success([
                {
                    'id': 'CC410A23-2865-F03E-FC6A-4C17E858E11E',
                    'uuid': 'CC410A23-2865-F03E-FC6A-4C17E858E11E',
                    'name': 'Biscuit',
                    'rssi': -68
                }, {
                    'id': '4C17E858-FC6A-F03E-2865-CC410A23E11E',
                    'uuid': '4C17E858-FC6A-F03E-2865-CC410A23E11E',
                    'name': 'ODB2',
                    'rssi': -35
                }, {
                    'id': 'F03E0A23-2865-CC41-FC6A-4C17E858E11E',
                    'uuid': 'F03E0A23-2865-CC41-FC6A-4C17E858E11E',
                    'name': 'Samsung TV',
                    'rssi': -23
                }, {
                    'id': '2865E858-FC6A-F03E-4C17-CC410A23E11E',
                    'uuid': '2865E858-FC6A-F03E-4C17-CC410A23E11E',
                    'name': 'Apple Watch',
                    'rssi': -98
                }
            ])
        },
        connect: (macAddressOrUuid, success) => {
            log(`Connected to ${macAddressOrUuid}`)
            success()
        },
        disconnect: (success) => {
            log('Disconnected')
            success()
        },
        write: (data, success) => {
            log(`Wrote: "${data}"`)
            success()
        },
        subscribe: (delimiter, success) => {
            log(`Subscribed to "${delimiter}"`)
            success()
        },
        unsubscribe: (success) => {
            log('Unsubscribed')
            success()
        },
        clear: (success) => {
            log('Cleared the buffer')
            success()
        },
    }
    
    setTimeout(() => document.dispatchEvent(new Event('deviceready')), 100)
}

export default {}
