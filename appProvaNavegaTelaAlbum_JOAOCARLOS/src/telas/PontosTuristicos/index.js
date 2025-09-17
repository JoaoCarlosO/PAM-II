import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

export default function PontosTuristicos() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Pontos Turísticos do Rio</Text>

      <View style={styles.card}>
        <Image source={require('../../../assets/cristo_redentor.png')} style={styles.image}/>
        <Text style={styles.title}>Cristo Redentor</Text>
        <Text style={styles.description}>
          Uma das sete maravilhas do mundo moderno, o Cristo Redentor é o símbolo mais icônico do Rio de Janeiro. Localizado no topo do Morro do Corcovado, oferece uma vista espetacular da cidade.
        </Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../../../assets/pao_acucar.png')} style={styles.image}/>
        <Text style={styles.title}>Pão de Açúcar</Text>
        <Text style={styles.description}>
          Um dos cartões-postais do Rio, o Pão de Açúcar proporciona um passeio de bondinho inesquecível com uma vista panorâmica deslumbrante da Baía de Guanabara.
        </Text>
      </View>

      <View style={styles.card}>
        <Image source={require('../../../assets/praia_copacabana.png')} style={styles.image}/>
        <Text style={styles.title}>Praia de Copacabana</Text>
        <Text style={styles.description}>
          Famosa mundialmente, Copacabana é um dos destinos mais procurados do Brasil. A orla movimentada, os quiosques e o calçadão icônico fazem dela um ponto obrigatório.
        </Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // azul claro tropical
    padding: 15,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#cab70cff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    textAlign: 'justify',
  },
});
