import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../stylesheet/variables';

const Button = ({title, onPress, customStyles}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={(customStyles && customStyles, styles.buttonContainer)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.darkPink,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
