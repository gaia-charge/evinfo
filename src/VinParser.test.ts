import { parse } from './VinParser'

describe('VIN parser', () => {
    it('parses the VIN', () => {
        const parsedVin = parse('VXKUKZKXZMW016005')
        expect(parsedVin.wmi).toEqual('VXK')
        expect(parsedVin.vds).toEqual('UKZKXZ')
        expect(parsedVin.year).toEqual(2021)
        expect(parsedVin.serial).toEqual('W016005')
    })
})