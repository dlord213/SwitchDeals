/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import Homepage from './pages/Homepage';
import SplashPage from './pages/SplashPage';
import HottestDealPage from './pages/HottestDealsPage';
import GameInfo from './pages/GameInfo';
import {ToastProvider, useToast} from 'react-native-toast-notifications';

const Stack = createNativeStackNavigator();

const StackNavigator = parentProps => {
  const navigationRef = createNavigationContainerRef();
  const [theme, setTheme] = useState('light');
  const toast = useToast();

  useEffect(() => {
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigationRef.navigate('Home');
      }
      toast.show?.('Fetching data...', {
        duration: 2500,
        animationType: 'slide-in',
      });
    }, 3500);
  }, [navigationRef]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Solash">
        <Stack.Screen
          name="Splash"
          component={SplashPage}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <Homepage {...props} homeTheme={theme} />}
        </Stack.Screen>
        <Stack.Screen
          name="Hottest-Deals"
          component={HottestDealPage}
          options={{
            headerShown: true,
            headerTitle: 'HOTTEST DEALS',
            headerShadowVisible: false,
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="Game-Info"
          component={GameInfo}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function App(): JSX.Element {
  return (
    <ToastProvider>
      <StackNavigator />
    </ToastProvider>
  );
}

export default App;
