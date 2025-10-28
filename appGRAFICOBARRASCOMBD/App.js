import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function App() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://10.239.0.219/AULAPAM/graficosBarras/geragraficosBarras.php")
      .then((res) => res.json())
      .then((json) => {
        setDados(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff0000ff" />
      </View>
    );
  }

  const nomes = dados.map((item) => item.nome);
  const valores = dados.map((item) => parseInt(item.quantidade));

  const chartConfig = {
    backgroundGradientFrom: "#000000ff", // fundo preto
    backgroundGradientTo: "#272525ff",
    decimalPlaces: 0,
    color: (opacity = 2) => `rgba(215, 47, 46, ${opacity})`, // barras vermelhas
    labelColor: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.6,
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#ad4747ff",
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>🔥 Vendas de Camisas do Flamengo 🔴⚫</Text>
      <BarChart
        data={{
          labels: nomes,
          datasets: [{ data: valores }],
        }}
        width={Dimensions.get("window").width - 20}
        height={260}
        fromZero
        chartConfig={chartConfig}
        style={styles.grafico}
      />

      <View style={styles.legenda}>
        {dados.map((item, i) => (
          <Text key={i} style={styles.texto}>
            {item.nome}: {item.quantidade} unidades vendidas
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c2b7b7ff",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#52140fff",
  },
  grafico: {
    borderRadius: 16,
    alignSelf: "center",
  },
  legenda: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  texto: {
    fontSize: 16,
    color: "#1b0f0fff",
    marginBottom: 5,
  },
});
