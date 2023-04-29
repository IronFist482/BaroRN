import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();

  const handlePressSignin = () => {
    navigation.navigate("Signin");
  };
  const handlePressImage = () => {
    navigation.navigate("SelectImage");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/icon.png")}
      />
      <View style={styles.containerTitle}>
        <Text style={styles.styleTextTitle}>Registro</Text>
      </View>
      <View style={styles.containerInputs}>
        <TextInput
          placeholder="Nombre"
          style={styles.containerTextInput}
        ></TextInput>
        <TextInput
          placeholder="Correo Electrónico"
          style={styles.containerTextInput}
        ></TextInput>
        <TextInput
          placeholder="Contraseña"
          style={styles.containerTextInput}
        ></TextInput>
        <TextInput
          placeholder="Confirmar Contraseña"
          style={styles.containerTextInput}
        ></TextInput>
        <TouchableOpacity
          style={styles.containerButtonMain}
          onPress={handlePressImage}
        >
          <Text style={styles.styleButtonMain}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerButtonSecondary}
          onPress={handlePressSignin}
        >
          <Text style={styles.styleButtonSecondary}>Ya tengo una cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 120,
    height: 160,
  },
  containerTitle: {
    marginTop: 20,
    height: 50,
    width: "auto",
    backgroundColor: "#fff",
  },
  styleTextTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
  containerInputs: {
    height: "auto",
    width: 300,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  containerTextInput: {
    height: 50,
    width: 280,
    backgroundColor: "#DCDCDC",
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    fontSize: 15,
  },
  containerQuestion: {
    height: 50,
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  styleQuestion: {
    fontSize: 14,
    textAlign: "center",
    color: "#2584A0",
    textDecorationLine: "underline",
  },
  containerButtonMain: {
    backgroundColor: "#2584A0",
    height: 50,
    width: 280,
    borderRadius: 30,
    marginTop: 50,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  styleButtonMain: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#fff",
  },
  containerButtonSecondary: {
    backgroundColor: "#fff",
    height: 50,
    width: 280,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  styleButtonSecondary: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
    color: "#7A7A7A",
    textDecorationLine: "underline",
  },
});

export default Signup;
