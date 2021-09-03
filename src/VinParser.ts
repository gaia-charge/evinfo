const yearCode = {
    F: 2015,
    G: 2016,
    H: 2017,
    J: 2018,
    K: 2019,
    L: 2020,
    M: 2021,
    N: 2022,
    P: 2023,
    R: 2024
}

export interface VinType {
    wmi: string,
    vds: string,
    year: number,
    serial: string
}

export const parse = (vin: string): VinType => {
    const parsedVin: VinType = {
        wmi: vin.slice(0, 3),
        vds: vin.slice(3, 9),
        year: yearCode[vin.slice(9, 10)],
        serial: vin.slice(10)
    }

    return parsedVin
}