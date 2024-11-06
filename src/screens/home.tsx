import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home: FC = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});