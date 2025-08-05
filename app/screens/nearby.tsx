import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import {BleManager, Device as BleDevice } from 'react-native-ble-plx';
import { useLocalSearchParams } from 'expo-router';
import Button from '../components/ui/Button';
import DeviceCard from '../components/ui/DeviceCard'

type Device = {
    id: string;
    name: string | null;
    rssi: number | null;
};

export default function Nearby() {
    const { mode, partyCode } = useLocalSearchParams();

    const [devices, setDevices] = useState<Device[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const manager = new BleManager();

    useEffect(() => {
        startScan();

        return () => {
            manager.stopDeviceScan();
            manager.destroy();
        };
    }, []);

    const startScan = () => {
        setDevices([]);
        setIsScanning(true);

        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
                Alert.alert('Scan Error', error.message);
                setIsScanning(false);
                return;
            }

            if (scannedDevice && scannedDevice.name) {
                setDevices(prev => {
                    if (!prev.find(d => d.id === scannedDevice.id)) {
                        return[...prev, scannedDevice];
                    }
                    return prev;
                });
            }
        });

        setTimeout(() => {
            manager.stopDeviceScan();
            setIsScanning(false);
            Alert.alert('Scan Complete', 'Finished scanning for nearby devices.');
        }, 10000);
    };

const handleDevicePress = (device: Device) => {
    Alert.alert("Device Selected", `You tappe on ${device.name || 'Unknown'}`);
};

const renderItem =({ item }: {item: Device }) => (
    <DeviceCard device={item} onPress={handleDevicePress} />
)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mode: {mode}</Text>
            <Text style={styles.title}>Party Code: {partyCode}</Text>

            <Button
                title={isScanning ? "Scanning..." : "Scan Again"}
                onPress={startScan}
            />

                <FlatList
                    data={devices}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text>NO devices found yet.</Text>}
                    />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 }
});