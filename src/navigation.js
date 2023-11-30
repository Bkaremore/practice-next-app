import * as React from 'react';
import Home from './pages/home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrugDetails from './pages/drugDetails';
import {colors} from './stylesheet/variables';

export default function Navigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.darkViolet},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="DrugDetails"
        component={DrugDetails}
        options={({route}) => ({title: 'Drug Details'})}
      />
    </Stack.Navigator>
  );
}
