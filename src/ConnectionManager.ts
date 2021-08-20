import { get } from 'svelte/store'
import type { AdapterType } from './adapters/BaseAdapter';
import { SettingsType, settings } from './stores';

export interface ConnectionManagerType {
    listDevices(): Promise<[BluetoothDeviceType]>,
    selectDevice(id: string): void,
    currentDevice?: string
}

export default class ConnectionManager implements ConnectionManagerType {
    currentDevice: string
    adapter: AdapterType

    constructor () {
        const initialSettings:SettingsType = get(settings)
        this.currentDevice = initialSettings.currentDevice
    }

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
        settings.update((settings:SettingsType) => {
            settings.currentDevice = id
            return settings
        })
    }
}