import React, { useState, useEffect } from 'react';
import { ScrollView,Alert, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import {  useNavigation } from '@react-navigation/core';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import { showMessage, hideMessage } from "react-native-flash-message";

import api from '../../../services/api';

const CadastrarCarros = FC= () => {
   
    const [modelo, setModelo] = useState("");   
    const [marca, setMarca] = useState("");   
    const [ano, setAno] = useState("");
    const [cor, setCor] = useState("");
  
       
    const [sucess, setSucess] = useState(false);

    const [loading, setLoading] = useState(false);
   
    async function saveData() {            
        
           if (modelo == "" || marca == "" || ano == "" || cor == "") {
            showMessage({
                message: "Erro ao Salvar",
                description: 'Preencha os Campos Obrigatórios!',
                type: "warning",
            });
            return;
        }

        try {
            const obj = {
            
                modelo: modelo,
                marca: marca,
                ano: ano,
                cor: cor,               
            }

            const res = await api.post('ProvaJoaoCarlos/salvar.php', obj);

            if (res.data.sucesso === false) {
                showMessage({
                    message: "Erro ao Salvar",
                    description: res.data.mensagem,
                    type: "warning",
                    duration: 3000,
                });               
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

    if (loading === true) {
        return (
            <View style={{ flex: 1, backgroundColor: '#abd' }}>
                <ActivityIndicator style={{ marginTop: 100 }} color="#000" size="large" />
            </View>
        )
    }
    

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={styles.Header}>

                 <Image style={styles.logo} source={require('../../../assets/carro_logo.png')} />          
                           

            </View>

            <View style={styles.Title}>
                     <Ionicons name="person-add" size={35} color="#484a4d" />
                        <Text style={styles.TitleText}>CADASTRAR USUÁRIO</Text>
                    </View>


             <ScrollView>   
            <View>  

                <Text style={styles.TitleInputs}>Modelo</Text>

                <TextInput               
                    placeholder="Digite o modelo do carro"
                    onChangeText={(text) => setModelo(text)}
                    value={modelo}
                    style={styles.TextInput}
                />
            </View>


            <View>

                <Text style={styles.TitleInputs}>Marca</Text>
                <TextInput
                    placeholder="Digite a marca do carro"
                    onChangeText={(text) => setMarca(text)}
                    value={marca}
                    style={styles.TextInput}
                   
                />
            </View>

          
            <View>

                <Text style={styles.TitleInputs}>Ano</Text>

                <TextInput
                  secureTextEntry={false}
                    placeholder="Digite o ano do carro"
                    onChangeText={(text) => setAno(text)}
                    value={ano}
                    style={styles.TextInput}
                   
                />
            </View>

            <View>

                <Text style={styles.TitleInputs}>Cor</Text>

                <TextInput
                  secureTextEntry={false}
                    placeholder="Digite a cor do carro"
                    onChangeText={(text) => setCor(text)}
                    value={cor}
                    style={styles.TextInput}
                   
                />
            </View>
                       
                  
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                        setSucess(true);
                        saveData();
                        setSucess(false);
                    }}
                >
                     <Ionicons name="add-circle" size={35} color="#FFF" />
                    <Text style={styles.ButtonText}>CADASTRAR</Text>
                </TouchableOpacity>

                </ScrollView>                 

        </View>
    );
}
export default CadastrarCarros;