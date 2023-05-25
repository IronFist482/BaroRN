import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LogOut, UploadPhoto } from "@api/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { editPhoto, removeToken } from "@store/user/user-slice";
import { clearGastos } from "@store/gastos/gastos-slice";
import { RootState } from "@store/index";
import InjectApiPFP from "@utils/InjectApiPFP";

const Config = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const [image, setImage] = useState(InjectApiPFP(user.dataUser.datPhoto));

  const handlePressImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Se necesita permiso para acceder a la galería de imágenes.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // Aquí puedes hacer lo que quieras con la imagen seleccionada, por ejemplo, mostrarla en un Image component
      setImage(result.assets[0].uri);
    }
  };
  const handleLogOut = useCallback(async () => {
    await LogOut().then(() => {
      dispatch(removeToken());
      dispatch(clearGastos());
    });
    navigation.navigate("SplashScreen");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerOptions}>
        <TouchableOpacity
          style={styles.containerSelectorImage}
          onPress={handlePressImagePicker}
        >
          {image !== "" ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 190,
                height: 190,
                borderRadius: 90,
                borderColor: "white",
                borderWidth: 4,
              }}
            />
          ) : (
            <View style={styles.containerIcon}>
              <Ionicons name="add" size={60} color="#fff" />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.containerTextName}>
          <Text style={styles.styleTextName}>
            Bienvenido{" "}
            {user.dataUser.datName.charAt(0).toUpperCase() +
              user.dataUser.datName.slice(1)}
          </Text>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.containerButtonProfile}>
            <Text style={styles.styleButtonProfile}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerButtonAccount}>
            <Text style={styles.styleButtonAccount}>Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleLogOut}
        style={styles.containerButtonExit}
      >
        <Text style={styles.styleButtonExit}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
  containerOptions: {
    marginTop: 30,
    height: "auto",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  containerSelectorImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2584A0",
  },
  containerIcon: {
    height: 190,
    width: 190,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 95,
    borderColor: "white",
    borderWidth: 6,
    borderStyle: "dashed",
  },
  containerTextName: {
    marginTop: 20,
    height: 60,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTextName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },

  containerButtons: {
    height: 180,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  containerButtonProfile: {
    height: 50,
    width: 230,
    backgroundColor: "#2584A0",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleButtonProfile: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  containerButtonAccount: {
    height: 50,
    width: 230,
    backgroundColor: "#2584A0",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleButtonAccount: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },

  containerButtonExit: {
    height: 50,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleButtonExit: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default Config;
