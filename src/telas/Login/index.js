import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Animated,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";

export default function Login({ navigation }) {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [opac] = useState(new Animated.Value(0));
  const [nome, setNome] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opac, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/img/fundo.jpg')}
      style={styles.imgBg}
    >
      <KeyboardAvoidingView
        style={styles.background}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.logo}>
          <Image
            style={styles.logoImage}
            resizeMode="contain"
            source={require('../../../assets/img/logo.png')}
          />
        </View>

        <Animated.View style={[
          styles.formulario,
          {
            opacity: opac,
            transform: [{ translateY: offset.y }],
          }
        ]}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#888"
            onChangeText={setNome}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Home", { nome })}
          >
            <Text style={styles.textoBotao}>Entrar</Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  imgBg: {
    flex: 1,
    width: '100%',
    height: '100%',

  },

  logo: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoImage: {
    width: 100,
    height: 100,
  },

  formulario: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },

  input: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    width: '100%',
    elevation: 2,
  },

  botao: {
    backgroundColor: '#FFB5',
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
