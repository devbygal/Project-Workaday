import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/components/app-container';
import Navigator from './src/';
import { AlertProvider } from './src/components/context/AlertContext';
import { BottomSheetProvider } from './src/components/context/BottomSheetContext';

export default function App() {
  return (
    <AlertProvider>
      <BottomSheetProvider>
        <AppContainer>
          <Navigator />
        </AppContainer>
      </BottomSheetProvider>
    </AlertProvider>
  );
}
