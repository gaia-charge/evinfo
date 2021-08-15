export interface VehicleType {
    getManufacturer(): Promise<string>,
    getModel(): Promise<string>,
    getSoC(): Promise<number>,
    getSpeed(): Promise<number>,
    getBatteryTemp(): Promise<number>,
    getAmbientTemp(): Promise<number>,
    getVMin(): Promise<number>,
    getVMax(): Promise<number>,
    getBatteryCapacity(): Promise<number>
}