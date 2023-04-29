import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const Signin = () => {
  const navigation = useNavigation();

  const handlePressHome = () => {
    navigation.navigate("MainNavigator");
  };
  const handlePressSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/icon.png")}
      />
      <View style={styles.containerTitle}>
        <Text style={styles.styleTextTitle}>Iniciar Sesión</Text>
      </View>
      <View style={styles.containerInputs}>
        <TextInput
          placeholder="Correo Electrónico"
          style={styles.containerTextInput}
        ></TextInput>
        <TextInput
          placeholder="Contraseña"
          style={styles.containerTextInput}
        ></TextInput>
        <View style={styles.containerQuestion}>
          <Text style={styles.styleQuestion}>¿Olvidaste tu contraseña?</Text>
        </View>
        <TouchableOpacity
          style={styles.containerButtonMain}
          onPress={handlePressHome}
        >
          <Text style={styles.styleButtonMain}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerButtonSecondary}
          onPress={handlePressSignup}
        >
          <Text style={styles.styleButtonSecondary}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
    borderColor: "#2584A0",
    borderWidth: 1,
  },
  styleButtonSecondary: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default Signin;
