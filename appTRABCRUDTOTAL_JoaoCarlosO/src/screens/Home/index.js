import React, { useEffect, useState } from 'react';
import { styles } from './style';

import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    Alert,

} from 'react-native';



import { MaterialIcons } from '@expo/vector-icons';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../../services/api';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useIsFocused } from '@react-navigation/native';

import {Ionicons} from '@expo/vector-icons';

export default function Home() {
    const navigation= useNavigation();
    const isFocused = useIsFocused();

    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    async function totalDadosCadastrados() {
        const res = await api.get(`appBD/listar-cards.php`);
        setTotal(res.data);
    }

      async function getItem(id){
                     
        navigation.navigate("Cadastro",{id:0})
    }   
     
    function mensagemDelete(id){
    
        Alert.alert(
         "Excluir Registro",
         "Deseja Excluir este Registro?",
          [
            {
              text: "Não",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Sim", onPress: () => deleteItem(id) }
          ],
          { cancelable: true }
        );  
     }


      async function deleteItem(id){
        const res = await api.get('appBD/excluir.php?id=' + id);
        listarDados();
      }

     async function listarDados() {

     try {
           
            const res = await api.get(`appBD/buscar.php`);
            setDados(res.data.result);
         

               } catch (error) {
               console.log("Erro ao Listar " + error);
           } finally {
             setIsLoading(false);
             setRefreshing(false);
         }
     }

    useEffect(() => {
        listarDados();
        totalDadosCadastrados();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listarDados();

    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>

                        <TouchableOpacity
                            style={styles.menu}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <MaterialIcons name="menu" size={35} color="black" />
                        </TouchableOpacity>

                        <Image style={styles.logo} source={require('../../../assets/logo2.png')} />

                    </View>
                </View>



                {isLoading ?
                    <Load /> :

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <View style={styles.circleProgressView}>
                            <View style={styles.textProgressContainer}>
                                <Text style={styles.textProgressTitle}>Tarefas de Hoje</Text>
                                <Text style={styles.textProgress}>10 de 20 concluídas</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={80}
                                width={8}
                                fill={50}
                                tintColor="#00e0ff"
                                backgroundColor="#e0e0e0"
                                lineCap={"round"}
                            >
                                {
                                    (fill) => (
                                        <Text style={styles.numberInside}>50%</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>


                        <View style={styles.containerBox}>

                            <TouchableOpacity onPress={() => navigation.navigate("Cadastro", { id: 0 })}>
                                <View>
                                    <View style={styles.box}>
                                        <MaterialIcons style={styles.iconRegistered} name="lock-clock" size={70} color="#b82d" />
                                        <View style={styles.textos}>
                                            <Text style={styles.rText}>Total de Registros</Text>
                                         <Text style={styles.lenghtText}>{total.total_usuarios}</Text>  
                                        </View>
                                    </View>
                                    <Text style={styles.textFooter}>Dados Cadastrados</Text>
                                    
                                </View>
                            </TouchableOpacity>

                        </View>



        {dados.map(item => (
        <View style={styles.griditem} key={item.id}><Text style={{color: '#585858'}}>{item.id} - {item.cidade} - {item.estado}</Text>
              <TouchableOpacity style={styles.gridbotaoEditar}
             onPress={() => getItem(item.id)} >
               <Ionicons name="create-outline" size={30} color="#50b9e1"></Ionicons>
        </TouchableOpacity> 
        
        <TouchableOpacity style={styles.gridbotaoExcluir}
            onPress={() => mensagemDelete(item.id)} >
              <Ionicons name="trash-outline" size={30} color="#e15f50"></Ionicons>
        </TouchableOpacity> 
      </View>
     ))}        
                       
                    </ScrollView>
                }
            </View>
        </View>



            


    )
}