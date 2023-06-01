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
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LogOut, UploadPhoto } from "@api/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { editPhoto, removeToken } from "@store/user/user-slice";
import { clearGastos } from "@store/gastos/gastos-slice";
import { RootState } from "@store/index";
import ConfigProfile from "./components/ConfigProfile";
import ConfigAccount from "./components/ConfigAccount";
import ConfigSubscription from "./components/ConfigSubscription";
import InjectApiPFP from "@utils/InjectApiPFP";
import colors from "@utils/colors";

const Config = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [section, setSection] = useState<number>(0);
  const [visibilitySection, setVisibilitySection] = useState<string>("");

  const { user } = useSelector((state: RootState) => state.user);

  const [image, setImage] = useState(InjectApiPFP(user.dataUser.datPhoto));

  const handleChangeSection = (e: string) => {
    setVisibilitySection(e);
  };

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
    <ScrollView style={styles.container}>
      {visibilitySection === "" ? (
        <>
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
              <Text
                style={styles.styleTextName}
              >{`${user.dataUser.datName}`}</Text>
            </View>
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={styles.containerButton}
                onPress={() => handleChangeSection("Profile")}
              >
                <FontAwesome5
                  name="user-alt"
                  size={24}
                  color={colors.white_1}
                  style={styles.styleIcon}
                />
                <View style={styles.containerAlsoText}>
                  <Text style={styles.styleButton}>Perfil</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerButton}
                onPress={() => handleChangeSection("Account")}
              >
                <FontAwesome5
                  name="bars"
                  size={24}
                  color={colors.white_1}
                  style={styles.styleIcon}
                />
                <View style={styles.containerAlsoText}>
                  <Text style={styles.styleButton}>Cuenta</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.containerButton}
                onPress={() => handleChangeSection("Subscription")}
              >
                <AntDesign
                  name="star"
                  size={24}
                  color={colors.white_1}
                  style={styles.styleIcon}
                />
                <View style={styles.containerAlsoText}>
                  <Text style={styles.styleButton}>Suscripcion</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogOut}
            style={styles.containerButtonExit}
          >
            <Text style={styles.styleButtonExit}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : visibilitySection === "Profile" ? (
        <ConfigProfile section={handleChangeSection} />
      ) : visibilitySection === "Account" ? (
        <ConfigAccount section={handleChangeSection} />
      ) : visibilitySection === "Subscription" ? (
        <ConfigSubscription section={handleChangeSection} />
      ) : null}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
  containerOptions: {
    marginTop: 50,
    height: "auto",
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 10,
  },
  containerSelectorImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2584A0",
    elevation: 15,
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
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTextName: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },

  containerButtons: {
    marginVertical: 20,
    height: 180,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  containerButton: {
    height: "auto",
    width: "70%",
    backgroundColor: "#2584A0",
    borderRadius: 50,
    marginBottom: 10,
    alignItems: "center",
    alignSelf: "center",
    elevation: 5,
    flexDirection: "row",
    paddingVertical: 10,
  },
  styleIcon: {
    marginLeft: "12%",
    marginRight: "5%",
  },
  containerAlsoText: {
    width: "56%",
  },

  styleButton: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#fff",
  },

  containerButtonExit: {
    height: 50,
    width: "60%",
    backgroundColor: "#fff",
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 5,
  },
  styleButtonExit: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default Config;
