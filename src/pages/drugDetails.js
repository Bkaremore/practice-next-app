import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DrugDetails = ({route, navigation}) => {
  const {displayName} = route.params.url;
  return (
    <View style={styles.container}>
      <Text>Drug details {displayName}</Text>
    </View>
  );
};

export default DrugDetails;
const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
