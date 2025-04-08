import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';

export default function PerfilJudoca() {
  const [nome, setNome] = useState('');
  const [faixa, setFaixa] = useState('');
  const [tempo, setTempo] = useState('');
  const [clube, setClube] = useState('');

  function confirmarPerfil() {
    if (nome === '' || faixa === '' || tempo === '' || clube === '') {
      alert('Preencha todos os campos!');
    } else {
      alert(
        `Perfil Confirmado\nNome: ${nome}\nFaixa: ${faixa}\nTempo de prática: ${tempo}\nClube: ${clube}`
      );
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/img/fundo.jpg')}
      style={styles.imgBg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/img/logo.png')} // coloque uma imagem de judoca na pasta
          style={styles.avatar}
        />

        <Text style={styles.titulo}>Perfil do Judoca</Text>

        <TextInput
          placeholder="Nome"
          style={styles.input}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Faixa (ex: Amarela)"
          style={styles.input}
          onChangeText={setFaixa}
        />
        <TextInput
          placeholder="Tempo de prática (ex: 2 anos)"
          style={styles.input}
          onChangeText={setTempo}
        />
        <TextInput
          placeholder="Clube / Projeto"
          style={styles.input}
          onChangeText={setClube}
        />

        <TouchableOpacity style={styles.botao} onPress={confirmarPerfil}>
          <Text style={styles.textoBotao}>Confirmar Perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#3d1365',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
  },
  imgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
});
