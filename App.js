import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, Platform, StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import List from './screens/List';
import Converter from './screens/Converter';
import Logo from './assets/logo.png';
import NetInfo from '@react-native-community/netinfo';

const Tabs = createBottomTabNavigator();

function LoadingScreen() {
  return (
    <View style={styles.loadingContainer}>
      <Image source={Logo} style={styles.logo} />
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}

function NoConnectionWarning() {
  return (
    <View style={styles.noConnectionContainer}>
      <Text style={styles.noConnectionText}>No internet connection</Text>
    </View>
  );
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      {!isConnected && <NoConnectionWarning />}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2f3d49',
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noConnectionContainer: {
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex: 1,
  },
  noConnectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
