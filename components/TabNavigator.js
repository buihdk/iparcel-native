import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapContainer from './containers/MapContainer';
import ListContainer from './containers/ListContainer';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Map" component={MapContainer} />
        <Tab.Screen name="List" component={ListContainer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
