/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

import Navigator from './navigator/Navigator';

import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App(): JSX.Element {

  useEffect(() => {

  }, []);
  
  return (
    <Navigator
      screens={[{
        component: Login,
        name: 'Login',
        title: 'Login',
        options: {
          hideTopTab: true   
        }
      },
      {
        component: Home,
        name: 'Home',
        title: 'Home Screen',
        options: {
          topTabColor: '#fff'
        }
      },
      {
        component: Profile,
        name: 'Profile',
        title: 'Profile screenie, my dude',
        options: {
          topTabColor: '#000'
        }
      }]}
      initialScreen={'Login'}
      bottomTab={{
        items:[{
          title: 'Login',
          icon: require('./assets/user.png'),
          screen: 'Login'
        },{
          title: 'Home',
          icon: require('./assets/home.png'),
          screen: 'Home'
        },{
          title: 'Profile',
          icon: require('./assets/setting.png'),
          screen: 'Profile'
        }]}}
    ></Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
