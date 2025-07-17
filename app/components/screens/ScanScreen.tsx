import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, ActivityIndicator, Pressable } from 'react-native';
import { Device } from 'react-native-ble-plx';
import { useBLE } from './.././../hooks/useBLE';

export const ScanScreen = () => {
    const { devices, scanning, startScan, stopScan } = useBLE();

    const handleRescan = () => {
        if (!scanning) startScan();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Text style={styles.title}>
                {scanning ? 'Scanning for BLE devices...' : 'Scan Complete'}
            </Text>

            {scanning ? (
                <ActivityIndicator size="large" color="#841584" />
            ) : (
                <>
                    <FlatList 
                        data={devices}
                        keyExtractor={(item: Device) => item.id}
                        renderItem={({ item }) => (
                            <Text style={styles.device}>
                                {item.name ?? 'Unnamed Device'} ({item.id})
                            </Text>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.device}>No devies found.</Text>
                        }
                    />
                    <Pressable onPress={handleRescan} style={styles.button}>
                        <Text style={styles.buttonText}>Scan Again</Text>
                    </Pressable>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#0000000',
    },
    device: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
        color: '#333333',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        width: 300,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#841584',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600'
    },
});







