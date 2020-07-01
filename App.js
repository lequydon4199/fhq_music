import React from 'react';
import AsyncStorage from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import Personal from './app/screens/Personal';
import SongList from './app/screens/SongList';
import { MenuProvider } from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import Register from './app/screens/Register';
import Login from './app/screens/Login';
import Profile from './app/screens/Profile';
import Player from './app/screens/Player';
import { Provider } from 'react-redux';
import store from './app/store/index';
import PlaylistComponent from './app/components/PlaylistComponent';
import { Image } from 'react-native';
var AppIcon = require('./app/icons/AppIcon.png');
import Search from './app/screens/Search';

const Tab = createBottomTabNavigator();
// const a =  AsyncStorage.getItem('artist')
// console.log(a)

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = 'home';
            color = focused? '#1da1f2' : 'gray';
            size = 30;
          } 
          // else if (route.name === ' ') {
          //   navigation.tabBarVisible = false;
          //   return <Image source={AppIcon} style={{ width: 40, height: 40, marginTop: 15 }} />
          // } 
          else if (route.name === 'Cá nhân') {
            iconName = 'person';
            color = focused? '#1da1f2' : 'gray';
            size = 30;
          }
          return <Icon name={iconName} size={size} color={color} />
        },
      })}
    > 
      <Tab.Screen name="Trang chủ" component={Home} />
      {/* <Tab.Screen  name =" "component={Player} options={() => ({
        tabBarVisible: false
      })} /> */}
      <Tab.Screen name="Cá nhân" component={Personal} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
    {/* <Provider> */}
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="SongList" component={SongList} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            { <Stack.Screen 
              name="Player"
              component={Player} 
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS
              }}
            /> }
            <Stack.Screen name="PlaylistComponent" component={PlaylistComponent}/>
            <Stack.Screen name="Search" component={Search}/>
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}

export default App;




