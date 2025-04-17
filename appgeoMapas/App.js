import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { css } from './css/Css';

export default function App() {

  const [origin, setOrigin] = useState(null);

  
useEffect(()=>{
  (async function(){      
    let { status } = await Location.requestForegroundPermissionsAsync(); 
      if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
          setOrigin({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
          })
      } else {
          throw new Error('Location permission not granted');
      }
  })();
},[]);

  return (
    <View style={css.container}>
      <MapView
        style={css.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
      >
      </MapView>
      {origin && (
        <Text style={{ position: 'absolute', bottom: 10, left: 10 }}>
          Latitude: {origin.latitude}, Longitude: {origin.longitude}
        </Text>
      )}
    </View>
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
