import React from 'react';
import {NativeModules, StyleSheet, Text, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import {colors} from '../stylesheet/variables';
import globalStyles from '../stylesheet/global';

const Home = () => {
  const env = NativeModules.RNConfig.env;
  return (
    <View>
      <Text>This is {env} env</Text>
      {/* <SearchBar /> */}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
    // backgroundColor: colors.darkViolet,
  },
});
