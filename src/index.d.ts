declare interface BluetoothDeviceType {
    id: string,
    name: string,
    // Android only
    class?: number,
    address?: string
    // iOS only
    uuid?: string,
    rssi?: number
}

declare var bluetoothSerial: {
    list(success: (foundDevices:[BluetoothDeviceType]) => void, failure: Function)
}