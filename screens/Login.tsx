/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Navigator from '../navigator/Navigator';

function Login(): JSX.Element {
  
  return (
    <View style={{
      backgroundColor: 'red',
      height: Dimensions.get("window").height
    }}>

      <Text style={{fontSize: 30, padding: 15}}>Login</Text>

      <TouchableOpacity style={{backgroundColor: 'green', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Home");
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Go Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor: 'yellow', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Profile");
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
