import 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

//instalar aS bibliotecas
//npm install react-native-reanimated-carousel 
//npm install react-native-reanimated

//caso não funcione 
//instalar a biblioteca expo install react-native-reanimated
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

export default function Album() {
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarImagens() {
      try {
        const response = await fetch('http://10.239.0.221/PROVA_JOAOCARLOS/listar_imagens.php');
        const data = await response.json();
        setImagens(data);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarImagens();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#360707ff" />
        <Text style={styles.loadingText}>Carregando imagens...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.header}>📷 ALBUM FOTOS DO LOCAL TURISTICO</Text>
      {imagens.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma imagem encontrada.</Text>
      ) : (
        <Carousel
          loop
          width={width}
          height={250}
          autoPlay
          data={imagens}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.imagem} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#030f01ff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ada311ff',
    textAlign: 'center',
    marginVertical: 15,
  },
  imagem: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b3636ff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000000ff',
  },
});
