import React from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBar from '../components/SearchBar';
import {colors} from '../stylesheet/variables';

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <SearchBar />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
    height: '100%',
    width: '100%',
    backgroundColor: colors.darkViolet,
  },
});
