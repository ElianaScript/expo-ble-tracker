import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import Button from '../components/ui/Button';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Scan: { mode: "begin" | "join" ; partyCode: string };
    JoinParty: undefined;
    BeginParty: undefined;
};

export const JoinPartyScreen = () => {
    const [code, setCode ] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleJoin = () => {
        if (code.trim() === '') {
            alert("Please enter a party code!");
            return;
        }

        navigation.navigate("Scan", { mode: "join", partyCode: code });
    };

    return ( 
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Join a Party!</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter party code"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            />
            <Button title="Join Party" onPress={handleJoin} color="#4CAF50" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "600",
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 18,
    },
});