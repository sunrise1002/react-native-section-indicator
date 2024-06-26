import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import SectionListScrollIndicator from 'react-native-section-indicator';

export default function App() {
  return (
    <View style={styles.container}>
      <SectionListScrollIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
