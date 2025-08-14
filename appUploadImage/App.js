import React, {use, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";

export default function App() {
  const [image, setImage] = useState(null);

  async function pickImageFromGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result); // Verificar o retorno completo
      setImage(result.assets[0].uri); // Acesse o URI corretamente
    }
  }

  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result); // Verificar o retorno completo
      setImage(result.assets[0].uri); // Acesse o URI corretamente
    }
  }

  async function uploadImage() {
    if (!image) {
      Alert.alert("Nenhuma imagem selecionada", "Por favor, selecione ou tire uma foto primeiro.");
      return;
    }

    let filename = image.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('photo', { uri: image, name: filename, type });

    try {
      const response = await fetch("http://10.239.0.221/imagem/upload.php", {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Imagem enviada com sucesso!");
      } else {
        Alert.alert("Erro", "Falha ao enviar imagem.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar enviar a imagem.");
    }
  }

   return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
        <Ionicons name="image" size={20} color="white" />
        <Text style={styles.buttonText}>Escolher da Galeria</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Ionicons name="camera" size={20} color="white" />
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Ionicons name="cloud-upload" size={20} color="white" />
        <Text style={styles.buttonText}>Enviar Imagem</Text>
      </TouchableOpacity>
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

   container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
     borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    minWidth: 180,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#ccc",
  },
});
