export interface CanResponse {
    arbitrationId: string,
    size: number,
    dataId: number,
    
}

export const vinCommands = [
    "ATSH752",      // Set header to 752
    "ATFCSH752",    // Set CAN ID to 752
    "ATCRA652",     // Set filter to 652 (-0x100)
    "22F1903"       // Send: 22 F1 90 3 -> VIN '652.{16}'
    // -> 652 {10 14 62  F1 90 56 58 4B}
    //               res       V  X  K
    // -> 652 {21 55 4B 5A 4B 58 5A 4D}
    //            U  K  Z  K  X  Z  M
    // -> 652 {25 7...
    // WMI: VXK
    // VDS: UKZKXZ
    // Year: M
    // W016005
]

export const loopCommands = [
    "ATSH6A2",   // Set header to 6A2
    "ATFCSH6A2", // Set CAN ID to 6A2
    "ATCRA682",  // Set filter to 682 (-0x20)
    "22D4021",   // Send: 22 D4 02 1 -> Speed '6820562D402.{4}'
    // -> 682 05 62 D4 02 00 00
    "22D4341",   // Send: 22 D4 34 1 -> Ambient '6820462D434.{2}'
    // -> 682 04 62 D4 34 1B
    "22D8EF1",   // Send: 22 D8 EF 1 -> Ambient '6820462D8EF.{2}'
    // -> 682 04 62 D8 EF 1D
    "ATSH6B4",   // Set header to 6B4
    "ATFCSH6B4", // Set CAN ID to 6B4
    "ATCRA694",  // Set filter to 694 (-0x20)
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

// Status: 22 -> ReadDataByIdentifier (RDBI), 62 -> Response, 7F -> SID-NR
// AID  Size  Status  PID    Data
// 694  05    62      D8 65  0A F5
// 694  07    62      D8 16  00 01 2C 00
// 682  05    62      D4 02  00 00