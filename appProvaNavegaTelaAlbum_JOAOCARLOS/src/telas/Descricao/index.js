import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Descricao() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rio de Janeiro</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>População:</Text>
        <Text style={styles.value}>6.775.561 habitantes (IBGE, 2022)</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Área Territorial:</Text>
        <Text style={styles.value}>1.200 km²</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>Rio de Janeiro (RJ)</Text>
      </View>

      <Text style={styles.description}>
        O Rio de Janeiro é uma das cidades mais conhecidas do Brasil e do mundo, famosa por suas paisagens naturais, praias paradisíacas e vida cultural agitada. Sede do Cristo Redentor e do Pão de Açúcar, a cidade também é marcada por sua história, arquitetura colonial e diversidade cultural. Um destino imperdível para quem deseja conhecer a essência do Brasil.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e4cf11ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'justify',
    color: '#333',
    lineHeight: 24,
  },
});
