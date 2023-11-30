import {colors} from './variables';
const {StyleSheet} = require('react-native');

const globalStyles = StyleSheet.create({
  container: {
    flex: 0,
    margin: 20,
  },
  whiteBackground: {
    backgroundColor: colors.white,
  },
});
export default globalStyles;
