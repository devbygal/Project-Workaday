import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import theme from '../theme';
import AsyncStorage from "@react-native-async-storage/async-storage";

const colorModeManager = {
    get: async () => {
        try {
            let val = await AsyncStorage.getItem('ColorMode');
            return val === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    },
    set: async (value) => {
        try {
            await AsyncStorage.setItem('ColorMode', value);
        } catch (e) {
            console.log(e);
        }
    },
};

export default function AppContainer({children}) {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>{children}</NativeBaseProvider>
        </NavigationContainer>
    );
}