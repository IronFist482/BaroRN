import React, { useState, useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Input, Icon } from "@rneui/themed";
import { SignInService } from "@api/UserServices";
import { SignInParams } from "@utils/types/User";
import { ErrorSignin } from "@utils/types/Error/ErrorSignin";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { setToken, setUser } from "@store/user/user-slice";
import { RootState } from "@store/index";
import { SecondaryRootStackParamList } from "@navigation/SecundaryNavigator";

const Signin = () => {
  const navigation = useNavigation<SecondaryRootStackParamList>();
  const dispatch = useDispatch();
  const [params, setParams] = useState<SignInParams>({
    contraseña: "",
    correo: "",
  });
  const handlePressSignup = () => {
    navigation.navigate("Signup");
  };
  const [messageError, setMessageError] = useState<ErrorSignin>({
    messageError: "",
    messageErrorEmail: "",
    messageErrorPassword: "",
  });

  let user = useSelector((state: RootState) => state.user);

  const handleSignIn = useCallback(async () => {
    console.log(params);
    const { data, message, ok } = await SignInService(params);
    console.log(message);
    setMessageError({ ...messageError, messageError: message });
    asignacionError(message);
    if (!ok || data == null) return;
    dispatch(setUser(data.user));
    dispatch(setToken(data.token));
    navigation.navigate("MainNavigator");
  }, [params]);

  useEffect(() => {
    if (user.token !== "") {
      navigation.navigate("MainNavigator");
    }
  }, []);

  const asignacionError = (m: string) => {
    setMessageError({ ...messageError, messageError: m });
    if (m == "Faltan datos") {
      setMessageError({
        ...messageError,
        messageError: "Faltan Datos",
        messageErrorEmail: "Faltan Datos",
        messageErrorPassword: "Faltan Datos",
      });
    } else if (m == "Correo o contraseña incorrectos") {
      setMessageError({
        ...messageError,
        messageError: "Correo o contraseña incorrectos",
        messageErrorEmail: "El usuario no coincide",
        messageErrorPassword: "La contraseña no coincide",
      });
    } else if (m == "") {
      setMessageError({
        ...messageError,
        messageError: "Error inesperado",
        messageErrorEmail: "Error inesperado",
        messageErrorPassword: "Error inesperado",
      });
    }
    console.log(messageError);
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
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Correo Electrónico"
          inputMode="email"
          leftIcon={
            <Icon type="feather" name="at-sign" size={20} color="black" />
          }
          onChangeText={(text) => setParams({ ...params, correo: text })}
          value={params.correo}
          autoCapitalize="none"
        />
        {messageError.messageError !== "" && (
          <View style={{ marginTop: -22, marginBottom: 20 }}>
            <Text style={{ color: "red" }}>
              {messageError.messageErrorEmail}
            </Text>
          </View>
        )}
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={(text) => setParams({ ...params, contraseña: text })}
          value={params.contraseña}
          leftIcon={<Icon type="feather" name="lock" size={20} color="black" />}
        />
        {messageError.messageError !== "" && (
          <View style={{ marginTop: -22, marginBottom: 20 }}>
            <Text style={{ color: "red" }}>
              {messageError.messageErrorPassword}
            </Text>
          </View>
        )}
        <View style={styles.containerQuestion}>
          <Text style={styles.styleQuestion}>¿Olvidaste tu contraseña?</Text>
        </View>
        <TouchableOpacity
          style={styles.containerButtonMain}
          onPress={handleSignIn}
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
    marginTop: 80,
    marginBottom: 10,
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
    height: 20,
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 0,
    marginBottom: 10,
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
