// App.js

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importando telas
import PontosTuristicos from './src/telas/PontosTuristicos';
import Album from './src/telas/Album';
import Descricao from './src/telas/Descricao';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Descrição') {
            iconName = 'map-outline';
          } else if (route.name === 'Pontos Turísticos') {
            iconName = 'location-outline';
          } else if (route.name === 'Álbum Fotos') {
            iconName = 'camera-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e4cf11ff',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: '#041402ff',
          paddingBottom: 5,
          height: 70,
        },
      })}
    >
      <Tab.Screen name="Descrição" component={Descricao} />
      <Tab.Screen name="Pontos Turísticos" component={PontosTuristicos} />
      <Tab.Screen name="Álbum Fotos" component={Album} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: 'Turismo no Rio de Janeiro',
            headerStyle: {
              backgroundColor: '#041402ff',
            },
            headerTintColor: '#f5f5f5',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#cab70cff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 18,
    color: '#333',
    lineHeight: 28,
    marginBottom: 20,
    textAlign: 'justify',
    paddingHorizontal: 10,
    fontFamily: 'Arial',
  },
});
