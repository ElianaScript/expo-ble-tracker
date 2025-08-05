import React from 'react';
import { View, Text, Pressable } from 'react-native';

type Device = {
    id: string;
    name: string | null;
    rssi: number | null;
};

type Props = {
    device: Device;
    onPress: (device: Device) => void;
};

const DeviceCard = ({ device, onPress }: Props) => {
    return (
        <Pressable 
            onPress={() => onPress(device)}
            className="bg-white rounded-xl shadow-md p-4m-2 border border-gray-200"
            >
                <Text className="text-lg font-semibold text-gray-800">
                    {device.name || 'Unnamed Device'}
                </Text>
                <Text className= "text-sm text-gray-600">ID: {device.id}</Text>
                {device.rssi !== null && (
                    <Text className="text-sm text-gray-600">RSSI: {device.rssi}</Text>
                )}
            </Pressable>
    );
};

export default DeviceCard;