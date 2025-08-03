import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './app/components/screens/HomeScreen';
import { ScanScreen } from './app/components/screens/join-party';

export type RootStackParamList = {
    Home: undefined;
    Scan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="Scan"
                    component={ScanScreen}
                    options={{ title: 'Scan for Devices' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}