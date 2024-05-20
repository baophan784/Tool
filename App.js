
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { AppRegistry } from 'react-native';
import Navigation from './src/Component/Navigator';
import { AuthProvider } from './src/Context/AuthContext';


AppRegistry.registerComponent('Tool_Slot_Vip2024', () => App);
export default function App() {
  return (
    <AuthProvider>
        <Navigation/>
    </AuthProvider>
  );
}