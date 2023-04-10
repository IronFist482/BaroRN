import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native";
import GastosRecientes from "./components/GastosRecientes";
import AgregarIngreso from "./components/AgregarIngreso";
import AgregarGasto from "./components/AgregarGasto";
import { useState } from "react";

const Home = () => {
  const [section, setSection] = useState<number>(0);

  const arrayDatos = [
    {
      id: 1,
      icon: <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />,
      name: "Café",
      description: "Café con leche",
      amount: 100,
    },
    {
      id: 2,
      icon: <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />,
      name: "Metro",
      description: "Lo tomé 2 veces",
      amount: 10,
    },
    {
      id: 3,
      icon: <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />,
      name: "Anuario",
      description: "Café con leche",
      amount: 499.99,
    },
    {
      id: 4,
      icon: <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />,
      name: "Café",
      description: "Café con leche",
      amount: 100,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerBalance}>
        <View></View>
        <Text>0</Text>
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
      {section === 0 && <GastosRecientes data={arrayDatos} />}
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
    height: 150,
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
