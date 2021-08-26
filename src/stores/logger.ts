import { writable } from 'svelte/store'

export const logger = writable<Array<string>>([])
export const log = (message: string) => {
    logger.update((lines) => [...lines, `${message}\n`])
}
export const clear = () => {
    logger.set([])
}