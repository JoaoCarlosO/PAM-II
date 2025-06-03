import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { showMessage } from "react-native-flash-message";
import api from "../../../services/api";

const Cadastro = ({ route }) => {
  const { id } = route?.params || {};
  const navigation = useNavigation();

  const [palavra, setPalavra] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");

  function limparCampos() {
    setPalavra("");
    setDescricao("");
    setCategoria("");
    setNivel("");
  }

  async function buscarDados() {
    try {
      const res = await api.get("appBD/buscarId.php?id=" + id);
      limparCampos();
      setPalavra(res.data.palavra);
      setDescricao(res.data.descricao);
      setCategoria(res.data.categoria);
      setNivel(res.data.nivel_dificuldade);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar os dados.");
    }
  }

  useEffect(() => {
    if (id) buscarDados();
  }, [id]);

  async function salvarOuEditar() {
    if (!palavra || !descricao || !categoria) {
      showMessage({
        message: id ? "Erro ao Editar" : "Erro ao Salvar",
        description: "Preencha os campos obrigatórios!",
        type: "warning",
      });
      return;
    }

    try {
      const obj = {
        ...(id && { id }),
        palavra,
        descricao,
        categoria,
        nivel_dificuldade: nivel,
      };

      const endpoint = id ? "appBD/editar.php" : "appBD/salvar.php";
      const res = await api.post(endpoint, obj);

      if (res.data.sucesso === false) {
        showMessage({
          message: id ? "Erro ao Editar" : "Erro ao Salvar",
          description: res.data.mensagem,
          type: "warning",
        });
        return;
      }

      showMessage({
        message: id ? "Registro atualizado com sucesso" : "Registro salvo com sucesso",
        type: "success",
      });
      limparCampos();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível processar a solicitação.");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0f4571" }}>
      <View style={styles.Header}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="caret-back-outline" size={35} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.Title}>
        <Ionicons name="hand-left-outline" size={35} color="#ffffff" />
        <Text style={styles.TitleText}>Cadastro de Sinais</Text>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.TitleInputs}>Palavra:</Text>
        <TextInput
          placeholder="Ex: Comer"
          value={palavra}
          onChangeText={setPalavra}
          style={styles.TextInput}
        />

        <Text style={styles.TitleInputs}>Descrição:</Text>
        <TextInput
          placeholder="Explique o sinal"
          value={descricao}
          onChangeText={setDescricao}
          style={styles.TextInput}
        />

        <Text style={styles.TitleInputs}>Categoria:</Text>
        <TextInput
          placeholder="Ex: Ações, Alimentos..."
          value={categoria}
          onChangeText={setCategoria}
          style={styles.TextInput}
        />

        <Text style={styles.TitleInputs}>Nível de Dificuldade:</Text>
        <TextInput
          placeholder="Básico / Intermediário / Avançado"
          value={nivel}
          onChangeText={setNivel}
          style={styles.TextInput}
        />

        <TouchableOpacity style={styles.Button} onPress={salvarOuEditar}>
          <Ionicons
            name={id ? "create-outline" : "save-outline"}
            size={35}
            color="#FFF"
          />
          <Text style={styles.ButtonText}>
            {id ? "Editar" : "Salvar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Cadastro;
