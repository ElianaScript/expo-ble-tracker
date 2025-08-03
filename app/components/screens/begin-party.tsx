import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, Clipboard, Alert } from 'react-native';
import { useRouter } from 'expo-router';

function generatePartyCode(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result= '';
    for (let i=0; i<length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default function BeginParty() {
    const [partyCode, setPartyCode] = useState('');
    const router = useRouter();

    useEffect(() => {
        const code = generatePartyCode();
        setPartyCode(code);
    }, []);

    const copyToClipboard = () => {
        Clipboard.setString(partyCode);
        Alert.alert('Copied!', `Part code ${partyCode} copied to clipboard.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Your Party Code</Text>
            <Text style={styles.code}>{partyCode}</Text>
            <View style={styles.button}>
                <Button title="Copy Code" onPress={copyToClipboard} />
            </View>
            <View style={styles.button}>
                <Button title="Start Party" onPress={() => router.push('/nearby')} />
            </View>
            <View style={styles.button}>
                <Button title="Back to Home" onPress={() => router.push('/')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
    title: {fontSize: 24, marginBottom: 20 },
    code: { fontSize: 40, fontWeight: "bold", marginBottom: 30, letterSpacing: 6 },
    button: {marginVertical: 10, width: "60%" },
});