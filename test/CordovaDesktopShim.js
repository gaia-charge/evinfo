// When not running in Cordova (i.e. testing in browser), inject necessary shims
if (!window.hasOwnProperty('cordova')) {
    window.bluetoothSerial = {
        list: (success) => {
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
        }
    }
    
    setTimeout(() => document.dispatchEvent(new Event('deviceready')), 100)
}

export default {}
