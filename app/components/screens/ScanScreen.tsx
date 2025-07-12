import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useState, useEffect } from 'react';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000000',
    },
    device: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
});

type MockDevice = {
    id: string;
    name: string | null;
};

export const ScanScreen = () => {
    const [devices, setDevices] = useState<MockDevice[]>([]);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDevices([
                { id: '1', name: 'Device A' },
                { id: '2', name: 'Device B' },
                { id: '3', name: null },
            ]);
            setIsScanning(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Text style={styles.title}>Scanning for BLE Devices...</Text>

            {isScanning ? (
                <ActivityIndicator size="large" color="#841584" />
            ) : (
                <FlatList
                    data={devices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={styles.device}>
                            {item.name ? item.name : 'Unnamed Device'} ({item.id})
                        </Text>
                    )}
                />
            )}
        </SafeAreaView>
    );
};
