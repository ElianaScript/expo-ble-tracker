import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx'
import * as DeviceInfo from 'expo-device';


// global ble manager
export const bleManager = new BleManager({
    restoreStateIdentifier: 'bleManager',
    restoreStateFunction: (restoredState) => {
        console.log('Restored state:', restoredState);
    },
});

// android permissions for ble
const requestAndroid31Permissions = async (): Promise<boolean> => {
    const results = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        //PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE
    ]);

    return Object.values(results).every(
        res => res === PermissionsAndroid.RESULTS.GRANTED
    );
};

// ios cross-platform permissions
export const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    const api = DeviceInfo.platformApiLevel ?? -1;

    if (api < 31) {
        const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: "Bluetooth Low Energy requires location",
                buttonPositive: "OK",
            },
        );
        return res === PermissionsAndroid.RESULTS.GRANTED;
    }

    return requestAndroid31Permissions();
};

//react hook for both 
export function useBLE() {
    const [devices, setDevices] = useState<Device[]>([]);
    const [scanning, setScanning] = useState(false);

    const addDevice = (device: Device) =>
        setDevices(prev =>
            prev.find(d => d.id === device.id) ? prev : [...prev, device],
        );

    const startScan = async () => {
        if (scanning) return;
        const ok = await requestPermissions();
        if (!ok) return;

        setDevices([]);
        setScanning(true);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error('Scan error:', error);
                setScanning(false);
                return;
            }
            if (device?.name) addDevice(device);
        });

        setTimeout(stopScan, 10_100);
    };

    const stopScan = () => {
        bleManager.stopDeviceScan();
        setScanning(false);
    };

    useEffect(() => {
        return () => {
            bleManager.stopDeviceScan();
            // bleManager.destroy(); - uncomment if yout want full teardown
        };
    }, []);

    return { devices, scanning, startScan, stopScan };
}
