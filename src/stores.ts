import { writable } from 'svelte-local-storage-store'

export interface SettingsType {
    currentDevice?: string
}

export const initialSettings:SettingsType = {
    currentDevice: undefined
}

export const settings = writable('settings', initialSettings)
