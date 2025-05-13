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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { showMessage, hideMessage } from "react-native-flash-message";

import api from "../../../services/api";

const Cadastro = (FC = ({route}) => {
    const { id } = route.params;
  const navigation = (any = useNavigation());
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [transporte, setTransporte] = useState("");
  const [sucess, setSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  function limparCampos() {
    setCidade("");
    setEstado("");
    setTransporte("");
  }

  async function buscardados() {
    const res = await api.get("appBD/buscarId.php?id=" + id);
    limparCampos();
    setCidade(res.data.cidade);
    setEstado(res.data.estado);
    setTransporte(res.data.transporte);
  }

  useEffect(() => {
    if (id) {
      buscardados();
    }
  }, [id]);

  async function editar() {
    if (cidade == "" || estado == "" || transporte == "") {
      showMessage({
        message: "Erro ao Editar",
        description: "Preencha os Campos Obrigatórios!",
        type: "warning",
      });
      return;
    }

    try {
      const obj = {
        id: id,
        cidade: cidade,
        estado: estado,
        transporte: transporte,
      };

      const res = await api.post("appBD/editar.php", obj);

      if (res.data.sucesso === false) {
        showMessage({
          message: "Erro ao Editar",
          description: res.data.mensagem,
          type: "warning",
          duration: 3000,
        });
        return;
      }

      setSucess(true);
      showMessage({
        message: "Registro alterado com Sucesso",
        description: "Registro Alterado",
        type: "success",
        duration: 800,
      });
      limparCampos();
    } catch (error) {
      Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
      setSucess(false);
    }
  }

  async function saveData() {
    if (cidade == "" || estado == "" || transporte == "") {
      showMessage({
        message: "Erro ao Salvar",
        description: "Preencha os Campos Obrigatórios!",
        type: "warning",
      });
      return;
    }

    try {
      const obj = {
        cidade: cidade,
        estado: estado,
        transporte: transporte,
      };

      const res = await api.post("appBD/salvar.php", obj);

      if (res.data.sucesso === false) {
        showMessage({
          message: "Erro ao Salvar",
          description: res.data.mensagem,
          type: "warning",
          duration: 3000,
        });
        limparCampos();
        return;
      }

      setSucess(true);
      showMessage({
        message: "Salvo com Sucesso",
        description: "Registro Salvo",
        type: "success",
        duration: 800,
      });
    } catch (error) {
      Alert.alert("Ops", "Alguma coisa deu errado, tente novamente.");
      setSucess(false);
    }
  }

  return (
    <View style={{ flex: 1, marginTop: 0, backgroundColor: "#0f4571" }}>
      <View style={styles.Header}>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo2.png")}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            style={{ marginLeft: 5, marginRight: 5 }}
            name="caret-back-outline"
            size={35}
            color="#FFF"
          ></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.Title}>
        <Ionicons name="airplane-outline" size={35} color="#ffffff" />
        <Text style={styles.TitleText}>Turismo</Text>
      </View>

      <ScrollView>
        <View>
          <Text style={styles.TitleInputs}>Cidade:</Text>

          <TextInput
            placeholder="Digite a cidade de destino"
            onChangeText={(text) => setCidade(text)}
            value={cidade}
            style={styles.TextInput}
          />
        </View>

        <View>
          <Text style={styles.TitleInputs}>Estado:</Text>
          <TextInput
            placeholder="Digite o estado"
            onChangeText={(text) => setEstado(text)}
            value={estado}
            style={styles.TextInput}
          />
        </View>

        <View>
          <Text style={styles.TitleInputs}>Transporte:</Text>

          <TextInput
            placeholder="Digite o meio de transporte"
            onChangeText={(text) => setTransporte(text)}
            value={transporte}
            style={styles.TextInput}
          />
        </View>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            //setSucess(true);
            saveData();
            // setSucess(false);
          }}
        >
          <Ionicons name="footsteps-outline" size={35} color="#FFF" />
          <Text style={styles.ButtonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            setSucess(true);
            editar();
            setSucess(false);
          }}
        >
          <Ionicons name="footsteps-outline" size={35} color="#FFF" />
          <Text style={styles.ButtonText}>Editar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
});

export default Cadastro;
