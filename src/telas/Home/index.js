import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Home({ route, navigation }) {
  const nome = route.params?.nome;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/img/fundo.jpg")}
        style={styles.imgBg}
      >
        <View style={styles.overlay}>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require("../../../assets/img/logo.png")}
            />
          </View>

          <Text style={styles.texto}>Bem-vindo{nome ? `, ${nome}` : ""}!</Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate("Usuario")}
          >
            <Text style={styles.textoBotao}>Entrar no App</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imgBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Leve escurecimento do fundo
    paddingHorizontal: 20,
  },

  logo: {
    marginBottom: 20,
    alignItems: 'center',
  },

  logoImage: {
    width: 100,
    height: 100,
    marginTop: 100
  },

  texto: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },

  botao: {
    backgroundColor: '#FFB5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
