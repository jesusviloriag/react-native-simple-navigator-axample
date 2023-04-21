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

function Home(): JSX.Element {
  
  return (
    <View style={{
      backgroundColor: 'green',
      height: Dimensions.get("window").height
    }}>
      <Text style={{fontSize: 30, padding: 15}}>Home</Text>
      <TouchableOpacity style={{backgroundColor: 'yellow', padding: 15, borderRadius: 5}}
        onPress={() => {
          Navigator.navigate("Profile");
        }}>
        <Text style={{color: 'black', fontSize: 16}}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
