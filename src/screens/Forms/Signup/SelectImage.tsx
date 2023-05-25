import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { SignUpParams } from "@utils/types/User";
import { SignUpService } from "@api/UserServices";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@store/user/user-slice";
import { MainRootStackParamList } from "@navigation/MainNavigator";
import {
  SecondaryRootStackParamList,
  SecondaryRootStackParamListProps,
} from "@navigation/SecundaryNavigator";
import { uploadWithPicture } from "@utils/services/Pictures";
import { useParams } from "react-router-dom";

const SelectImage = () => {
  const params = useRoute<SecondaryRootStackParamListProps<"SelectImage">>();
  const [signupParams, setSignupParams] = useState<SignUpParams>(
    params.params?.params ?? {
      nombre: "",
      correo: "",
      contrasena: "",
      contrasenaConfirmada: "",
    }
  );

  const navigation = useNavigation<SecondaryRootStackParamList>();
  const dispatch = useDispatch();
  const [image, setImage] = useState<Blob>();

  const [imageUri, setImageUri] = useState<string>();
  const handlePressNavigation = useCallback(async () => {
    uploadWithPicture(
      imageUri,
      signupParams,
      (data) => {
        Alert.alert(data.message);
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        navigation.navigate("MainNavigator");
      },
      (err) => {
        Alert.alert(err);
      }
    );
  }, [signupParams, imageUri]);

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
      setImageUri(result.assets[0].uri);
      setVisibilityBottom(false);
    }
  };

  const [visibiltyBottom, setVisibilityBottom] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerSelectorImage}
        onPress={handlePressImagePicker}
      >
        {image !== null ? (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: 180,
              height: 180,
              borderRadius: 30,
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
      <View style={styles.containerTextSelectorImage}>
        <Text style={styles.styleTextSelectorImage}>Selecciona una imágen</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          onPress={handlePressNavigation}
          style={[
            styles.containerButtonMain,
            visibiltyBottom && { backgroundColor: "#DCDCDC" },
          ]}
          disabled={visibiltyBottom}
        >
          <Text style={styles.styleButtonMain}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressNavigation}
          style={styles.containerButtonSecondary}
          disabled={!visibiltyBottom}
        >
          <Text style={styles.styleButtonSecondary}>Omitir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSelectorImage: {
    width: 200,
    height: 200,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2584A0",
  },
  containerTextSelectorImage: {
    marginTop: 20,
  },
  styleTextSelectorImage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
  containerIcon: {
    height: 180,
    width: 180,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    borderColor: "white",
    borderWidth: 6,
    borderStyle: "dashed",
  },

  containerButtons: {
    marginTop: 160,
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

export default SelectImage;
