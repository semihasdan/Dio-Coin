import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import List from './screens/List';
import Converter from './screens/Converter';

const Tabs = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen
          unmountOnBlur={true}
          name="List"
          children={() => <List />}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#CCCC00',
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="bitcoin"
                color="#0d0d32"
                size={51}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Converter"
          component={Converter}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#CCCC00',
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calculator-variant-outline"
                color="#0d0d32"
                size={51}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    paddingBottom: Platform.OS === 'ios' ? 5 : 2,
    paddingHorizontal: 20,
    backgroundColor: '#CCCC00',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 22,
    width: Dimensions.get('window').width * 0.6,
    left: Dimensions.get('window').width * 0.2, // Center the tabBar
  },
});

export default App;
