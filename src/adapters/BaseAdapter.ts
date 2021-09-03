import type { VehicleType } from "../vehicles/BaseVehicle";

export interface AdapterType {
    getName(): string,
    setId(id: string): void,
    connect(): void,
    disconnect(): void,
    connected: boolean,
    vehicle?: VehicleType,
    sendMessage(): Promise<void>
}

/*
1. SendMessage(id, resId, msg)
2. On(resId) -> Off(resId) -> resolve
3. Timeout -> Off(resId) -> throw
4. AddToQueue(id, msg)
*/

export const connectionCommands = [
    "ATWS",         // Reset
    "ATWS",         // Reset
    "ATE0",         // Echo off
    "ATI",          // Get product id
    "AT@1",         // Display device description
    "ATSP6",        // Set protocol. ISO 15765-4 CAN (11 bit ID, 500 kbaud)
    "ATAT1",        // Adaptive timing enabled
    "ATH1",         // Show response headers
    "ATL0",         // Send lf after cr
    "ATS0",         // Don't insert spaces
    "ATCAF1",       // Format CAN messages
    "ATSH79B",      // Set header to 79B
    "ATFCSH79B",    // Set CAN ID to 79B
    "ATFCSD300000", // Set control message to 30 00 00
    "ATFCSM1",      // User defined responses
]

export const loopCommands = [
    "ATRV",      // Read input voltage
    // -> 12.2V
]
