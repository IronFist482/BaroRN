import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useState, useCallback } from "react";
import { Input, Icon } from "@rneui/themed";
import { colors } from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { EditProfile } from "@api/UserServices";
import { editProfile, removeToken, setUser } from "@store/user/user-slice";
import { useApi } from "@hooks/useApi";
import { useNavigation } from "@react-navigation/native";
import { EditProfileParams } from "@utils/types/User";
import { useDispatch } from "react-redux";

const ConfigProfile = ({ section }: { section: Function }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const [params, setParams] = useState<EditProfileParams>({
    name: user.dataUser.datName,
    newPassword: "",
    actualPassword: "",
    email: user.usuEmail,
  });

  const handleEditProfile = useCallback(async () => {
    if (
      params.name.trim() === "" ||
      params.newPassword.trim() === "" ||
      params.actualPassword.trim() === ""
    ) {
      return Alert.alert("Error", "No puedes dejar campos vacios");
    }
    console.log(params);
    const { data, message, ok } = await EditProfile(params);
    if (!ok || !data) {
      return Alert.alert("Error", message);
    }
    setParams({
      name: "",
      newPassword: "",
      actualPassword: "",
    });
    dispatch(editProfile(data.user));
    Alert.alert("Exito", message);
  }, [params]);

  return (
    <>
      <View style={styles.containerProfileComplete}>
        <View style={styles.containerTitleProfile}>
          <Text style={styles.styleTitleProfile}>Mi Perfil</Text>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={require("../../../../assets/iconBaroRN.png")}
            style={styles.imageSize}
          />
        </View>

        <View>
          <Input
            inputContainerStyle={styles.containerTextInput}
            inputStyle={styles.styleTextInput}
            placeholder="Nombre"
            inputMode="text"
            leftIcon={
              <Icon
                type="font-awesome-5"
                name="user-alt"
                size={20}
                color={colors.blue_2}
              />
            }
            onChangeText={(text) => setParams({ ...params, name: text })}
            value={params.name}
          />
          <Input
            inputContainerStyle={styles.containerTextInput}
            inputStyle={styles.styleTextInput}
            placeholder="Correo Electrónico"
            inputMode="email"
            leftIcon={
              <Icon
                type="feather"
                name="at-sign"
                size={22}
                color={colors.blue_2}
              />
            }
            onChangeText={(text) => setParams({ ...params, email: text })}
            value={params.email}
            autoCapitalize="none"
          />
          <Input
            inputContainerStyle={styles.containerTextInput}
            inputStyle={styles.styleTextInput}
            placeholder="Contraseña Actual"
            secureTextEntry={true}
            leftIcon={
              <Icon
                type="font-awesome-5"
                name="lock"
                size={22}
                color={colors.blue_2}
              />
            }
            onChangeText={(text) =>
              setParams({ ...params, actualPassword: text })
            }
            value={params.actualPassword}
            autoCapitalize="none"
          />
          {/*{messageError.messageError !== "" && (
            <View style={{ marginTop: -22, marginBottom: 20 }}>
              <Text style={{ color: "red" }}>
                {messageError.messageErrorEmail}
              </Text>
            </View>
          )}*/}
          <Input
            inputContainerStyle={styles.containerTextInput}
            inputStyle={styles.styleTextInput}
            placeholder="Nueva Contraseña"
            secureTextEntry={true}
            leftIcon={
              <Icon
                type="font-awesome-5"
                name="lock"
                size={22}
                color={colors.blue_2}
              />
            }
            onChangeText={(text) => setParams({ ...params, newPassword: text })}
            value={params.newPassword}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.styleButton}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerButton, { backgroundColor: colors.blue_1 }]}
            onPress={() =>
              setParams({
                ...params,
                name: user.dataUser.datName,
                email: user.usuEmail,
                newPassword: "",
                actualPassword: "",
              })
            }
          >
            <Text style={styles.styleButton}>Borrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.containerButtonRegresar}
        onPress={() => section("")}
      >
        <MaterialCommunityIcons
          name="arrow-left-circle"
          size={40}
          color={colors.blue_2}
        />
        <View>
          <Text
            style={{ color: colors.blue_2, fontSize: 24, marginHorizontal: 10 }}
          >
            Regresar
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  containerProfileComplete: {
    width: "85%",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 30,
    paddingVertical: "4%",
    marginTop: "10%",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 5,
  },
  containerTitleProfile: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: "5%",
    justifyContent: "center",
  },
  styleTitleProfile: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.blue_1,
  },
  containerImage: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
    marginTop: "3%",
  },
  imageSize: {
    width: 190,
    height: 180,
  },
  containerTextInput: {
    width: "90%",
    height: "auto",
    backgroundColor: colors.white_1,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: "center",
    elevation: 5,
  },
  styleTextInput: {
    fontSize: 17,
    color: colors.blue_2,
    marginLeft: 10,
  },
  containerButtons: {
    width: "90%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
    alignSelf: "center",
    marginBottom: "3%",
  },
  containerButton: {
    width: "40%",
    height: "auto",
    backgroundColor: colors.blue_2,
    borderRadius: 15,
    paddingVertical: "3%",
    alignItems: "center",
    elevation: 5,
  },
  styleButton: {
    fontSize: 20,
    fontWeight: "400",
    color: colors.white_1,
  },
  containerButtonRegresar: {
    width: "auto",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 50,
    padding: 10,
    marginTop: "8%",
    marginBottom: "8%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
});

export default ConfigProfile;
