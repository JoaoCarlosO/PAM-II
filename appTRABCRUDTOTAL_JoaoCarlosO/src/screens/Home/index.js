import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
    StatusBar,
    Alert,
} from 'react-native';

import { styles } from './style';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../../services/api';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [dados, setDados] = useState([]);
    const [total, setTotal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function totalDadosCadastrados() {
        try {
            const res = await api.get(`appBD/listar-cards.php`);
            setTotal(res.data);
        } catch (error) {
            console.log("Erro ao buscar total: " + error);
        }
    }

    async function listarDados() {
        try {
            const res = await api.get(`appBD/buscar.php`);
            setDados(res.data.result);
        } catch (error) {
            console.log("Erro ao listar dados: " + error);
        } finally {
            setIsLoading(false);
            setRefreshing(false);
        }
    }

    async function deleteItem(id) {
        try {
            await api.get('appBD/excluir.php?id=' + id);
            listarDados();
        } catch (error) {
            Alert.alert("Erro ao excluir", "Tente novamente mais tarde.");
        }
    }

    function mensagemDelete(id) {
        Alert.alert(
            "Excluir Registro",
            "Deseja excluir este sinal?",
            [
                { text: "Não", style: "cancel" },
                { text: "Sim", onPress: () => deleteItem(id) }
            ]
        );
    }

    function getItem(id) {
        navigation.navigate("Cadastro", { id });
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

            <View style={styles.header}>
                <View style={styles.containerHeader}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <MaterialIcons name="menu" size={35} color="black" />
                    </TouchableOpacity>

                    <Image style={styles.logo} source={require('../../../assets/icon.png')} />
                </View>
            </View>

            {isLoading ? (
                <Load />
            ) : (
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.circleProgressView}>
                        <View style={styles.textProgressContainer}>
                            <Text style={styles.textProgressTitle}>Sinais de Hoje</Text>
                            <Text style={styles.textProgress}>10 de 20 cadastrados</Text>
                        </View>

                        <AnimatedCircularProgress
                            size={80}
                            width={8}
                            fill={50} // Você pode substituir por um valor calculado
                            tintColor="#00e0ff"
                            backgroundColor="#e0e0e0"
                            lineCap="round"
                        >
                            {() => (
                                <Text style={styles.numberInside}>50%</Text>
                            )}
                        </AnimatedCircularProgress>
                    </View>

                    <View style={styles.containerBox}>
                        <TouchableOpacity onPress={() => navigation.navigate("Cadastro", { id: 0 })}>
                            <View>
                                <View style={styles.box}>
                                    <MaterialIcons style={styles.iconRegistered} name="language" size={70} color="#b82d" />
                                    <View style={styles.textos}>
                                        <Text style={styles.rText}>Total de Sinais</Text>
                                        <Text style={styles.lenghtText}>{total.total_usuarios}</Text>
                                    </View>
                                </View>
                                <Text style={styles.textFooter}>Sinais Cadastrados</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {dados.map((item) => (
                        <View style={styles.griditem} key={item.id}>
                            <Text style={{ color: '#585858' }}>
                                {item.id} - {item.palavra} ({item.categoria}) - Nível: {item.nivel_dificuldade}
                            </Text>

                            <TouchableOpacity
                                style={styles.gridbotaoEditar}
                                onPress={() => getItem(item.id)}
                            >
                                <Ionicons name="create-outline" size={30} color="#50b9e1" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.gridbotaoExcluir}
                                onPress={() => mensagemDelete(item.id)}
                            >
                                <Ionicons name="trash-outline" size={30} color="#e15f50" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
