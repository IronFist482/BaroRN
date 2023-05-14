import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
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
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Nombre"
          leftIcon={<Icon type="feather" name="user" size={20} color="black" />}
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Correo Electrónico"
          leftIcon={
            <Icon type="feather" name="at-sign" size={20} color="black" />
          }
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Contraseña"
          leftIcon={<Icon type="feather" name="lock" size={20} color="black" />}
          secureTextEntry={true}
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Confirmar contraseña"
          leftIcon={<Icon type="feather" name="lock" size={20} color="black" />}
          secureTextEntry={true}
        />
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
    marginTop: 50,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  containerTextInput: {
    width: 280,
    elevation: 1,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  styleTextInput: {
    color: "black",
    paddingHorizontal: 10,
    fontSize: 17,
    fontWeight: "normal",
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
