import React from 'react';
import { View, Text, StyleSheet, Button, StatusBar,SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Scan: undefined;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    text: {
        fontSize: 20,
        color: '#000000',
    },
});

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
            <Text style={styles.text}>WELCOME TO BLE TRACKER TEST</Text>
            <View style={{ marginTop: 20 }}>
                <Button
                    title="Start Scanning"
                    onPress={() => navigation.navigate('Scan')}
                    color="#841584"
                />
            </View>
        </SafeAreaView>
    )
}