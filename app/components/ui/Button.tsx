import React, { JSX } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
};

export const Button = ({ title, onPress, disabled = false } : ButtonProps) : JSX.Element => {
    return (
        <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
     >
        <Text style={styles.buttonText}>{title}</Text>
     </TouchableOpacity>
     );
    };

    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#007AFF',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 8,
        },
        buttonDisabled: {
            backgroundColor: '#cccccc',
        },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: '600',
        },
    });