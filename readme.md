# react-native-simple-navigator-example
A React Native App with 3 screens and a simple navigator

Run in Android
```
npx react-native run-android
```

Run in iOS
```
npx react-native run-ios
```

Usage:
```
import Navigator from './navigator/Navigator';

import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';

function App(): JSX.Element {
 
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
```
Modal Window:
```
Navigator.openModal({
  title: "Modal title",  //title of the window
  text: "This is a test text, it can be very long, but try to be brief :)", //text inside of the window
  component: <Image style={{width: 300, height: 300}} source={uri: 'https://i.imgur.com/29x54Bf.jpg' }></Image>,  //component to render inside of the window
  buttons: [  //buttons at the bottom of the window 
    {
      text: "Cancel"   //Cancel button always closes the window
    },
    {
      text: "OK",  //text inside the button
      onPress: () => alert("OK pressed")  //onPress function inside of the button
    }
  ]
})
```
![alt text](https://i.imgur.com/1u7W2WD.png)
![alt text](https://i.imgur.com/kNYVXXM.png)
![alt text](https://i.imgur.com/yF887tm.png)
