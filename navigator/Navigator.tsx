/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  View,
  Dimensions,
  BackHandler,
  Text,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';

class Navigator extends React.Component {

  static instance;

  constructor(props){  
    super(props);
    Navigator.instance = this;

    if(props.screens && props.initialScreen) {
      let initialScreen;
      for(let i = 0; i < props.screens.length; i++) {
        if (props.screens[i].name === props.initialScreen) {
          initialScreen = props.screens[i]
        }
      }
  
      Navigator.instance.state = {
        screens: props.screens,
        currentScreen: initialScreen,
        stack: [initialScreen],
        bottomTab: props.bottomTab
      }
    }    
  }  

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    Navigator.loadScreenConfig();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    Navigator.pop();
    return true;
  }

  showScreen() {
    return Navigator.instance.state.currentScreen.component();
  }

  refresh() {
    this.forceUpdate()
  }

  static navigate(screen) {
    for(let i = 0; i < Navigator.instance.state.screens.length; i++) {
      if (Navigator.instance.state.screens[i].name === screen) {
        let stack = Navigator.instance.state.stack;
        stack.push(Navigator.instance.state.screens[i]);
        Navigator.instance.setState({
          currentScreen: Navigator.instance.state.screens[i],
          stack: stack
        }, () => Navigator.loadScreenConfig());
      }
    }
  }

  static pop() {
    let stack = Navigator.instance.state.stack;
    if(stack.length > 1) {
      stack.pop();
      Navigator.instance.setState({
        currentScreen: stack[stack.length - 1],
        stack: stack,
      }, () => Navigator.loadScreenConfig());
    }
  }

  static loadScreenConfig() {
    let currentScreen = Navigator.instance.state.currentScreen;

    let hideTopTab = currentScreen.options?.hideTopTab;
    let hideBackButton = currentScreen.options?.hideBackButton;
    let topTabColor = currentScreen.options?.topTabColor;
    let darkContent = true;

    if(topTabColor && Navigator.lightOrDark(topTabColor) == 'light') {
      StatusBar.setBarStyle( 'dark-content',true)
    } else {
      StatusBar.setBarStyle( 'light-content',true);
      darkContent = false;
    }

    Navigator.instance.setState({
      hideTopTab: hideTopTab,
      hideBackButton: hideBackButton,
      topTabColor: topTabColor,
      darkContent: darkContent
    })

    StatusBar.setBackgroundColor(topTabColor ? topTabColor : 'grey');
  }

  static lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
  }

  static showBackButton() {
    if(!Navigator.instance.state.hideBackButton) {
      return (
        <TouchableOpacity onPress={() => Navigator.pop()} style={{padding: 15}}>
          <Image tintColor={!Navigator.instance.state.darkContent ? '#fff' : '#000'} style={{width: 15, height: 15}} source={require('./back.png')}></Image>
        </TouchableOpacity>
      )
    } else {
      return null;
    }
  }

  static showTopTab() {
    if(!Navigator.instance.state?.hideTopTab) {
      return (
        <View style={{
          backgroundColor: Navigator.instance.state?.topTabColor ? Navigator.instance.state?.topTabColor : 'white'  ,
          height: 50,
          flexDirection: 'row',
        }}>
          {Navigator.showBackButton()}
          <Text style={{
            padding: 15, 
            fontSize: 16, 
            paddingTop: 11,
            paddingLeft: Navigator.instance.state.hideBackButton ? 20 : -20, 
            color: Navigator.instance.state.darkContent ? 'black' : 'white', 
            fontWeight: 'bold'
            }}>
              {Navigator.instance.state.currentScreen.title}
            </Text>
        </View>
      )
    } else {
      return null;
    }
  }

  static showBottomTabItems() {
    return (
      Navigator.instance?.state?.bottomTab?.items?.map((item, key)=>(
        <TouchableOpacity key={key}
          onPress={()=>Navigator.navigate(item.screen)}
          style={{margin: 25, alignContent: 'center', alignItems: 'center'}}>
            <Image style={{marginTop: 3, width: 25, height: 25}} source={item.icon ? item.icon : undefined}></Image>
            <Text>{item.title}</Text>
        </TouchableOpacity>
      )) 
      
    )
  }

  static showBottomTab() {
    if(Navigator.instance.state?.bottomTab && !Navigator.instance.state.currentScreen.options.hideBottomTab) {
      return (
        <View style={{
          backgroundColor: 'white',
          height: 75,
          flexDirection: 'row',
          position: 'absolute',
          width: Dimensions.get("window").width,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 24
        }}>
          {Navigator.showBottomTabItems()}
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'blue',
        height: Dimensions.get("window").height
      }}>
        {Navigator.showTopTab()}
        {Navigator.instance.showScreen()}
        {Navigator.showBottomTab()}
      </View>
    );
  }
}

export default Navigator;
