import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import { useRef, useEffect, useState } from "react";
import Switch from "./components/Switch";
import ItemFrequents from "./components/ItemFrequents";

const Frequents = () => {
  const [value, setValue] = useState(true);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <ScrollView style={styles.container}>
      {value == true ? (
        <>
          <View style={styles.containerTitleGastosFrecuentes}>
            <Text style={styles.styleTitleGastosFrecuentes}>
              Gastos Frecuentes
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.containerTitleModificarGastos}>
          <Text style={styles.styleTitleModificarGastos}>Modificar Gastos</Text>
        </View>
      )}
      <Switch value={value} onValueChange={setValue} />
      {value == true ? (
        <>
          <ItemFrequents />
          <ItemFrequents />
          <ItemFrequents />
          <ItemFrequents />
        </>
      ) : (
        <>
          <ItemFrequents />
          <ItemFrequents />
          <ItemFrequents />
          <ItemFrequents />
        </>
      )}
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2584A0",
  },
  containerTitleGastosFrecuentes: {
    height: 50,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  containerTitleModificarGastos: {
    height: 50,
    width: 250,
    backgroundColor: "#044C7C",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  styleTitleGastosFrecuentes: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
  styleTitleModificarGastos: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default Frequents;
