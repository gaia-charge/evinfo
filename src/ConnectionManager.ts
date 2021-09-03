import { get, writable, Writable } from 'svelte/store'
import type { AdapterType } from './adapters/BaseAdapter';
import { SettingsType, settings } from './stores/Settings';

export interface ConnectionManagerType {
    listDevices(): Promise<[BluetoothDeviceType]>,
    selectDevice(id: string): void,
    currentDevice?: string,
    state: Writable<ConnectionState>,
    adapter: AdapterType
}

export enum ConnectionState {
    Disconnected = 'disconnected',
    Connecting = 'connecting',
    Connected = 'connected'
}

export default class ConnectionManager implements ConnectionManagerType {
    currentDevice: string
    state: Writable<ConnectionState> = writable(ConnectionState.Disconnected)
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

    async selectDevice(id: string) {
        this.currentDevice = id
        settings.update((settings:SettingsType) => {
            settings.currentDevice = id
            return settings
        })
        await this.disconnect()
        await this.connect()
    }

    async connect() {
        const promise = new Promise<void>((resolve, reject) => {
            this.state.set(ConnectionState.Connecting)
            bluetoothSerial.connect(this.currentDevice, () => {
                this.state.set(ConnectionState.Connected)
                resolve()
            }, () => {
                // TODO: Log error
                this.state.set(ConnectionState.Disconnected)
                // TODO: Only reject when promise isn't fullfilled
                reject()
            })
        })
        return promise
    }

    async disconnect() {
        const promise = new Promise<void>((resolve, reject) => {
            bluetoothSerial.disconnect(() => {
                this.state.set(ConnectionState.Disconnected)
                resolve()
            }, () => {
                // TODO: Log error
                this.state.set(ConnectionState.Disconnected)
                // TODO: Only reject when promise isn't fullfilled
                reject()
            })
        })
        return promise
    }
}