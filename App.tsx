/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {
  return (
    <NavigationContainer independent={true}>
      <Navigation />
    </NavigationContainer>
  );
}

export default App;
