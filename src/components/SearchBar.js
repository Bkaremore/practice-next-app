import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Button from './Button';
import {colors} from '../stylesheet/variables';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const onSearchHandler = () => {};
  return (
    <View style={styles.searchContainer}>
      <TextInput
        inlineImageLeft="/images/icon/search-icon.svg"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <Button title="Search" onPress={onSearchHandler} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
    height: 45,
    gap: 20,
  },
  searchInput: {
    backgroundColor: colors.white,
    width: '80%',
  },
});
