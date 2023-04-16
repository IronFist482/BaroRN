import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native";
import GastosRecientes from "./components/GastosRecientes";
import AgregarIngreso from "./components/AgregarIngreso";
import AgregarGasto from "./components/AgregarGasto";
import { useState } from "react";
import ModalIngresos from "./components/ModalIngresos";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  const [section, setSection] = useState<number>(0);

  const [balance, setBalance] = useState<number>(0);

  const arrayGastos = [
    {
      id: 1,
      icon: <Ionicons name="school" size={30} color="#2584A0" />, // 1
      name: "Birete",
      description: "Cosa para la foto de graduación",
      amount: 100,
    },
    {
      id: 2,
      icon: <FontAwesome5 name="subway" size={30} color="#2584A0" />, // 3
      name: "Metro",
      description: "Lo tomé 2 veces",
      amount: 10,
    },
    {
      id: 3,
      icon: <FontAwesome5 name="hamburger" size={30} color="#2584A0" />, // 2
      name: "Anuario",
      description: "Café con leche",
      amount: 499.99,
    },
    {
      id: 4,
      // 4
      icon: (
        <MaterialCommunityIcons name="shopping" size={30} color="#2584A0" />
      ),
      name: "Café",
      description: "Café con leche",
      amount: 100,
    },
  ];
  const arrayIngresos = [
    {
      id: 1,
      tipo: "Salario",
      description: "Es un ingreso fijo",
      amount: 100,
    },
    {
      id: 2,
      tipo: "Honorario",
      description: "Es un ingreso considerado no formal",
      amount: 100,
    },
    {
      id: 3,
      tipo: "Pension",
      description: "Es un ingreso que se le da a una persona mayor",
      amount: 100,
    },
    {
      id: 4,
      tipo: "Mesada",
      description:
        "Es un ingreso que se le da a una persona de parte de un tercero",
      amount: 100,
    },
    {
      id: 5,
      tipo: "Otros",
      description: "Es un ingreso que no se encuentra en la lista",
      amount: 100,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerBalance}>
        <View style={styles.containerTextBalance}>
          <Text style={styles.styleTextBalance}>$ {balance}</Text>
        </View>
        <View style={styles.lineBalance} />
        <ModalIngresos data={arrayIngresos} />
      </View>
      <View style={styles.containerButtons}>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => setSection(0)}>
            <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => setSection(1)}>
            <MaterialCommunityIcons
              name="cash-minus"
              size={40}
              color="#2584A0"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity onPress={() => setSection(2)}>
            <MaterialCommunityIcons
              name="cash-plus"
              size={40}
              color="#2584A0"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerLine} />
      {section === 0 && <GastosRecientes data={arrayGastos} />}
      {section === 1 && <AgregarGasto />}
      {section === 2 && <AgregarIngreso />}
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
  containerBalance: {
    height: "auto",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 5,
    alignSelf: "center",
  },
  containerTextBalance: {
    height: 60,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  styleTextBalance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  lineBalance: {
    height: 5,
    width: "80%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  containerButtons: {
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  containerButton: {
    marginLeft: 20,
    marginRight: 20,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
  },
  containerLine: {
    height: 5,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 40,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default Home;
