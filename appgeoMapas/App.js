import { useState, useEffect, useRef, use } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {css} from './css/Css'

import config from './config'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import 'react-native-get-random-values';

import carro from './assets/carrore.png';

export default function App() {

  const [origin,setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const mapEl = useRef(null);


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
        ref={mapEl}
        > 


{/* MARCADOR PARA ORIGEM */}

<Marker
          //coordinate ={origin}        
          coordinate={{ latitude: -24.4945, longitude: -47.8456 }}>
          <View style={css.marcador}>
            <Image source={carro} style={css.marcadorImage} />
            <View style={css.marcadorTextBox}>
              <Text style={css.marcadorText}>Meu Local</Text>
            </View>

          </View>
        </Marker>

         {destination &&
  <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={config.googleApi}
          strokeWidth={10}
          strokeColor='#a1d'
          onReady={result=>
          {
          setDistance(result.distance);
          mapEl.current.fitToCoordinates(
             result.coordinates,{
                 edgePadding:{
                     top:50,
                     bottom:50,
                     left:50,
                     right:50
                 }                 
             }             
         );
       
        }
        
      }
      
      >
</MapViewDirections>
}        

</MapView>


{/*para segunda parte da busca e rotas acrescentamos esta view */}
<View style={css.search}>
  <GooglePlacesAutocomplete
          placeholder='Para onde vamos?'
          onPress={(data, details = null) => {
          setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
          });
      }}
      query={{
          key: config.googleApi,
          language: 'pt-br',
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
      styles={{listView:{height:100}}}
  />


</View>
{distance && 
 <Text style={css.distancia}> Distância: {distance} </Text>
}
</View>
  )};
