import type { VehicleType } from "../vehicles/BaseVehicle";

export interface AdapterType {
    getName(): string,
    setId(id: string): void,
    connect(): void,
    disconnect(): void,
    connected: boolean,
    getVIN(): Promise<string>, // TODO: move to GenericVehicle?
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
    "ATSH752",      // Set header to 752
    "ATFCSH752",    // Set CAN ID to 752
    "ATCRA652",     // Set filter to 652
    "22F1903"       // Send: 22 F1 90 3 -> VIN '652.{16}'
    // -> 652 10 14 62 F1 90 56 58 4B
]

export const loopCommands = [
    "ATRV",      // Read input voltage
    // -> 12.2V
    "ATSH6A2",   // Set header to 6A2
    "ATFCSH6A2", // Set CAN ID to 6A2
    "ATCRA682",  // Set filter to 682
    "22D4021",   // Send: 22 D4 02 1 -> Speed '6820562D402.{4}'
    // -> 682 05 62 D4 02 0000
    "22D4341",   // Send: 22 D4 34 1 -> Ambient '6820462D434.{2}'
    // -> 682 04 62 D4 34 1B
    "22D8EF1",   // Send: 22 D8 EF 1 -> Ambient '6820462D8EF.{2}'
    // -> 682 04 62 D8 EF 1D
    "ATSH6B4",   // Set header to 6B4
    "ATFCSH6B4", // Set CAN ID to 6B4
    "ATCRA694",  // Set filter to 694
    "22D4101",   // Send: 22 D4 10 1 -> SoC calibrated '6940562D410.{4}'
    // -> 694 05 62 D4 10 B9 D1
    "22D8651",   // Send: 22 D8 65 1 -> Energy '6940562D865.{4}'
    // -> 694 05 62 D8 65 0A F5
    "22D8601",   // Send: 22 D8 60 1 -> SoH    '6940662D860.{6}'
    // -> 694 06 62 D8 60 01 06 40
    "22D8161",   // Send: 22 D8 16 1 -> Volt   '6940762D816.{8}'
    // -> 694 07 62 D8 16 00 01 2C 00
    "22D8151",   // Send: 22 D8 15 1 -> Volt   '6940562D815.{4}'
    // -> 694 05 62 D8 15 1B 80
    "22D8101",   // Send: 22 D8 10 1 -> SoC HR '6940562D810.{4}'
    // -> 694 05 62 D8 10 B9 D1
    "22D86F1",   // Send: 22 D8 6F 1 -> Vmin   '6940562D86F.{4}'
    // -> 694 05 62 D8 6F 0F E4
    "22D8701"    // Send: 22 D8 70 1 -> Vmax   '6940562D870.{4}'
    // -> 694 05 62 D8 70 0F EF
]