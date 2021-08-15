import type { VehicleType } from "../vehicles/BaseVehicle";

export interface AdapterType {
    getName(): string,
    setId(id: string): void,
    connect(): void,
    disconnect(): void,
    connected: boolean,
    getVIN(): Promise<string>,
    vehicle?: VehicleType,
    sendMessage(): Promise<void>
}

/*
1. SendMessage(id, resId, msg)
2. On(resId) -> Off(resId) -> resolve
3. Timeout -> Off(resId) -> throw
4. AddToQueue(id, msg)
*/