import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/Tabs'
import { globalStyles } from './styles/global';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Navigator></Navigator>
    </View>
  );
}
