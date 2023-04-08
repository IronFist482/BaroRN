import React from "react";
import { View, Text, StyleSheet, TextInput, Modal } from "react-native";

const AgregarIngreso = () => {
  return (
    <View style={styles.containerSection}>
      <View style={styles.containerTitle}>
        <Text style={styles.styleTitle}>Agregar Ingreso</Text>
      </View>
      <View style={styles.containerRecent}>
        <TextInput style={styles.item} placeholder="Nombre" maxLength={20} />
        <TextInput style={styles.item} placeholder="Descripción" />
        <TextInput
          style={styles.item}
          placeholder="Monto"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSection: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  containerTitle: {
    height: "auto",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerRecent: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    color: "#044C7C",
  },
});

export default AgregarIngreso;
