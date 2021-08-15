import type { AdapterType } from "./adapters/BaseAdapter";

export interface ConnectionManagerType {
    listDevices(): Promise<[BluetoothDeviceType]>,
    selectDevice(id: string): void,
    currentDevice?: string
}

export default class ConnectionManager implements ConnectionManagerType {
    currentDevice: string
    adapter: AdapterType

    async listDevices () {
        return new Promise<[BluetoothDeviceType]>((resolve, reject) => {
            bluetoothSerial.list((foundDevices:[BluetoothDeviceType]) => {
                resolve(foundDevices)
            }, (error) => {
                reject(error)
            })
        })
    }

    selectDevice(id: string) {
        this.currentDevice = id
    }
}