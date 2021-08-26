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

declare interface BluetoothSerialType {
    list(success?: (foundDevices:[BluetoothDeviceType]) => void, failure?: Function),
    connect(macAddressOrUuid: string, success?: Function, failure?: (error) => void),
    disconnect(success?: Function, failure?: Function),
    write(data: string|Uint8Array, success?: Function, failure?: Function),
    subscribe(delimiter: string, success?: Function, failure?: Function),
    unsubscribe(success?: Function, failure?: Function),
    clear(success?: Function, failure?: Function),
}

declare var bluetoothSerial:BluetoothSerialType