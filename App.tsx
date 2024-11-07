import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Navigation from '@navigation/navigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Navigation />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
