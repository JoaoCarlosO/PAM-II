import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/telas/Home';
import Usuario from './src/telas/Usuario';
import Galeria from './src/telas/Galeria';
import Login from './src/telas/Login';

import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Tabs(){
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        color= '#3d1365'
        size = 30
        if (route.name === 'Home') {
          iconName = focused
            ? 'home-outline'
            : 'home-outline';
        } else if (route.name === 'Usuario') {
          iconName = focused ? 'person-outline' : 'person-outline';
        }else if (route.name === 'Galeria') {
          iconName = focused ? 'people-outline' : 'people-outline';
        }
        
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      labelStyle: {
        fontSize: 12},
      activeTintColor: '#3d1365',
      inactiveTintColor: 'gray',      
    }}    
    >
      <Tab.Screen name= "Usuario" component={Usuario}></Tab.Screen>
      <Tab.Screen name= "Galeria" component={Galeria}></Tab.Screen>
    </Tab.Navigator>
  )
}

export default function App() {

  const Stack = createStackNavigator();
  return (
    
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>

      <Stack.Screen 
          name="Usuario" 
          component={Tabs}
          options={{
            title:'JODOKAN',
            headerStyle:{
            backgroundColor: '#3d1365',
            },
            headerTintColor: '#FFF' , 
            headerShown: true         
          }}
          >

      </Stack.Screen>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="Home" component={Home} ></Stack.Screen>      
      <Stack.Screen name="Galeria" component={Galeria} ></Stack.Screen>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
;