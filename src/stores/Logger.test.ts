import { get } from 'svelte/store';
import { logger, log, clear } from './Logger'

describe('logger store', () => {
    beforeEach(() => logger.set([]))
    it('appends message', async () => {
        log('test')
        expect(get(logger)).toStrictEqual([`test\n`])
    })
    it('clears messages', async () => {
        log('test')
        log('foo')
        expect(get(logger)).toHaveLength(2)
        clear()
        expect(get(logger)).toHaveLength(0)
    })
})