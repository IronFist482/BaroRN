import { useCallback, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SignUpService } from "@api/UserServices";
import { SignUpParams } from "@utils/types/User";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@store/user/user-slice";
import { SignInService } from "@api/UserServices";
import { SignInParams } from "@utils/types/User";
import { ErrorSignin } from "@utils/types/Error/ErrorSignin";
import { SecondaryRootStackParamList } from "@navigation/SecundaryNavigator";

const Signup = () => {
  const navigation = useNavigation<SecondaryRootStackParamList>();
  const dispatch = useDispatch();

  const handlePressSignin = () => {
    navigation.navigate("Signin");
  };

  const [messageError, setMessageError] = useState<ErrorSignin>({
    messageError: "",
    messageErrorEmail: "",
    messageErrorPassword: "",
  });
  const [signupParams, setSignupParams] = useState<SignUpParams>({
    nombre: "",
    correo: "",
    contrasena: "",
    contrasenaConfirmada: "",
  });

  const [image, setImage] = useState();
  const [preview, setPreview] = useState<string>();

  const handlePressImage = async () => {
    if (signupParams.nombre.length < 3) {
      Alert.alert("El nombre debe tener al menos 3 caracteres");
      return;
    }
    if (signupParams.contrasena != signupParams.contrasenaConfirmada) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    if (signupParams.contrasena.length < 8) {
      Alert.alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (signupParams.contrasena != signupParams.contrasenaConfirmada) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }
    Alert.alert(signupParams.nombre);
    navigation.navigate("SelectImage", {
      params: signupParams,
    });
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
          onChangeText={(e) =>
            setSignupParams({
              ...signupParams,
              nombre: e,
            })
          }
          value={signupParams.nombre}
          leftIcon={<Icon type="feather" name="user" size={20} color="black" />}
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Correo Electrónico"
          onChangeText={(e) =>
            setSignupParams({
              ...signupParams,
              correo: e,
            })
          }
          value={signupParams.correo}
          inputMode="email"
          leftIcon={
            <Icon type="feather" name="at-sign" size={20} color="black" />
          }
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Contraseña"
          onChangeText={(e) =>
            setSignupParams({
              ...signupParams,
              contrasena: e,
            })
          }
          value={signupParams.contrasena}
          leftIcon={<Icon type="feather" name="lock" size={20} color="black" />}
          secureTextEntry={true}
        />
        <Input
          inputContainerStyle={styles.containerTextInput}
          inputStyle={styles.styleTextInput}
          placeholder="Confirmar contraseña"
          onChangeText={(e) =>
            setSignupParams({
              ...signupParams,
              contrasenaConfirmada: e,
            })
          }
          value={signupParams.contrasenaConfirmada}
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
