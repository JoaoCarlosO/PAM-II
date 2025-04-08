import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';

const imagens = [
  require('../../../assets/img/img01.jpg'),
  require('../../../assets/img/img02.jpg'),
  require('../../../assets/img/img03.jpg'),
  require('../../../assets/img/img04.jpg'),
  require('../../../assets/img/img05.jpg'),
  require('../../../assets/img/img06.jpg'),
  require('../../../assets/img/img07.jpg'),
  require('../../../assets/img/img08.jpg'),
  require('../../../assets/img/img09.jpg'),
  require('../../../assets/img/img10.jpg'),
];

const numColumns = 2;
const { width } = Dimensions.get('window');
const imageSize = width / numColumns - 30;

export default function GaleriaJudo() {
  return (
    <ImageBackground
      source={require('../../../assets/img/fundo.jpg')}
      style={styles.imgBg}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Galeria do Judô</Text>

        <FlatList
          data={imagens}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.galeria}
          renderItem={({ item }) => (
            <Image source={item} style={styles.imagem} />
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: -25,
    backgroundColor: '#3d1365'
  },
  galeria: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  imagem: {
    width: imageSize,
    height: imageSize,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
