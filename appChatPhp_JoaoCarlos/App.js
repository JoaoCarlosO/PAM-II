import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

const API_URL = "http://10.239.0.221/chatConsultorio";

const EMOJIS_POSSIVEIS = ["🦷", "😁", "🪥", "👩‍⚕️", "👨‍⚕️", "💬", "👍", "✨"];
const EMOJI_PADRAO = "🦷";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [nomeConfirmado, setNomeConfirmado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [userEmojis, setUserEmojis] = useState({});
  const flatListRef = useRef();

  useEffect(() => {
    if (nomeConfirmado) {
      carregarMensagens();
      marcarComoLido();
      const interval = setInterval(() => {
        carregarMensagens();
        marcarComoLido();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [nomeConfirmado]);

  const marcarComoLido = async () => {
    try {
      await axios.post(`${API_URL}/marcar_lido.php`, { usuario });
      carregarMensagens();
    } catch (err) {
      console.log("Erro ao marcar como lido", err);
    }
  };

  const carregarMensagens = async () => {
    try {
      const res = await axios.get(`${API_URL}/listar.php`);
      const msgs = res.data.reverse();
      setMensagens(msgs);

      setUserEmojis((prev) => {
        const novoMapa = { ...prev };
        msgs.forEach((msg) => {
          if (!novoMapa[msg.usuario]) {
            const emoji =
              EMOJIS_POSSIVEIS[
                Math.floor(Math.random() * EMOJIS_POSSIVEIS.length)
              ];
            novoMapa[msg.usuario] = emoji;
          }
        });
        return novoMapa;
      });
    } catch (err) {
      console.log("Erro ao buscar mensagens", err);
    }
  };

  const enviarMensagem = async () => {
    if (mensagem.trim() === "") return;
    try {
      await axios.post(`${API_URL}/enviar.php`, { usuario, mensagem });
      setMensagem("");
      carregarMensagens();
    } catch (err) {
      console.log("Erro ao enviar mensagem", err);
    }
  };

  const formatarHora = (dataHora) => {
    if (!dataHora) return "";
    const date = new Date(dataHora);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStatus = (status) => {
    if (status === "entregue") return "✅✅";
    if (status === "lido") return "✅👌";
    return "";
  };

  // ---------------- LOGIN ----------------
  if (!nomeConfirmado) {
    return (
      <ImageBackground
        source={require("./assets/fundo_login.jpg")}
        style={styles.loginFundo}
        resizeMode="cover"
      >
        <View style={styles.loginContainer}>
          <Image
            source={require("./assets/logo.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titulo}>Consultório JC dos Dentes</Text>
          <Text style={styles.subtitulo}>Digite o nome do paciente</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={usuario}
            onChangeText={setUsuario}
          />

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => usuario.trim() !== "" && setNomeConfirmado(true)}
          >
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  // ---------------- CHAT ----------------
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.header}>💬 Chat do Consultório 💬</Text>

      <ImageBackground
        source={require("./assets/fundo_chat.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <FlatList
          ref={flatListRef}
          data={mensagens}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isMe = item.usuario === usuario;
            return (
              <View
                style={[styles.msg, isMe ? styles.msgMinha : styles.msgOutro]}
              >
                {!isMe && (
                  <Text style={styles.usuario}>
                    {userEmojis[item.usuario] || EMOJI_PADRAO} {item.usuario}
                  </Text>
                )}
                <Text style={styles.texto}>{item.mensagem}</Text>

                <View style={styles.linhaHora}>
                  <Text style={styles.hora}>{formatarHora(item.data_hora)}</Text>
                  {isMe && (
                    <Text
                      style={[
                        styles.status,
                        item.status === "lido" && styles.statusLido,
                      ]}
                    >
                      {renderStatus(item.status)}
                    </Text>
                  )}
                </View>
              </View>
            );
          }}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          onLayout={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
      </ImageBackground>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputMensagem}
          placeholder="Digite sua mensagem..."
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoTexto}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // LOGIN
  loginFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "85%",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2d6cdf",
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderColor: "#4a90e2",
    borderRadius: 10,
    borderWidth: 2,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  botaoEntrar: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // CHAT
  container: {
    flex: 1,
    backgroundColor: "#e6ebf2",
    paddingTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  msg: {
    maxWidth: "75%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
  },
  msgMinha: {
    backgroundColor: "#4a90e2",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  msgOutro: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  usuario: {
    fontWeight: "bold",
    marginBottom: 3,
    color: "#444",
  },
  texto: {
    color: "#000",
    fontSize: 15,
  },
  linhaHora: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 3,
  },
  hora: {
    fontSize: 11,
    color: "#666",
    marginRight: 5,
  },
  status: {
    fontSize: 12,
    color: "#666",
  },
  statusLido: {
    color: "#1e90ff",
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    elevation: 3,
  },
  inputMensagem: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  botaoEnviar: {
    backgroundColor: "#4a90e2",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
