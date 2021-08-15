window.bluetoothSerial = {
    list: (success, failure) => {
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
            }
        ])
    }
}

export default bluetoothSerial
