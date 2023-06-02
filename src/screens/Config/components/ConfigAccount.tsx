import React, { Component, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { colors } from "@utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { CleanAccount, DeleteAccount, EditProfile } from "@api/UserServices";

const ConfigAccount = ({ section }: { section: Function }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [numberInfoModal, setNumberInfoModal] = useState<number>(0);
  const infoModals = [
    {
      title: "Limpiar Cuenta",
      description:
        "Esta opción permite poder drenar los datos de tu cuenta, por lo que esta se vacia en los gastos que tengas registrados, sin embargo los registros permanecen. Esta opción es ideal cuando quieres organizar o reacomodar el registro de tus gastos previamente colocados",
    },
    {
      title: "Eliminar Cuenta",
      description:
        "Esta acción no es reversible, una vez realizada no se podrá revertir, ya que tu cuenta sera completamente eliminada de Baro. ",
    },
  ];

  const setModalVisibility = (visible: boolean) => {
    setModal(visible);
  };
  const setModalVisibility2 = (visible: boolean, numberInfo: number) => {
    setModal2(visible);
    setNumberInfoModal(numberInfo);
  };

  const handleClearAccount = useCallback(async () => {
    Alert.alert(
      "Limpiar Cuenta",
      "¿Estas seguro de querer limpiar tu cuenta? Esta acción no es reversible",
      [
        {
          text: "Cancelar",
          onPress: () => Alert.alert("Cancelado", "La acción fue cancelada"),
          style: "cancel",
        },
        {
          text: "Limpiar",
          style: "destructive",
        },
      ]
    );

    const { data, message, ok } = await CleanAccount();
    if (!ok || !data) {
      return Alert.alert("Error", message);
    }
    Alert.alert("Exito", message);
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    Alert.alert(
      "Eliminar Cuenta",
      "¿Estas seguro de querer eliminar tu cuenta? Esta acción no es reversible",
      [
        {
          text: "Cancelar",
          onPress: () => Alert.alert("Cancelado", "La acción fue cancelada"),
          style: "cancel",
        },
        {
          text: "Limpiar",
          style: "destructive",
        },
      ]
    );

    const { data, message, ok } = await CleanAccount();
    if (!ok || !data) {
      return Alert.alert("Error", message);
    }
    Alert.alert("Exito", message);
  }, []);

  return (
    <>
      <View style={styles.containerProfileComplete}>
        <View style={styles.containerTitleAccount}>
          <Text style={styles.styleTitleAccount}>Gestion de Cuenta</Text>
        </View>
        <View style={styles.containerImage}>
          <Image
            source={require("../../../../assets/iconBaroRN.png")}
            style={styles.imageSize}
          />
        </View>
        <View style={styles.containerTitleMyAccount}>
          <Text style={styles.styleTitleMyAccount}>Cambio de Perfil</Text>
        </View>
        <TouchableOpacity
          style={styles.containerProfile}
          onPress={() => setModalVisibility(!modal)}
        >
          <View style={styles.containerIcon}>
            <FontAwesome name="university" size={45} color={colors.white_1} />
          </View>
          <View style={styles.containerTitleProfile}>
            <Text style={styles.styleTitleProfile}>Estudiante</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.containerButtons, { marginTop: 50 }]}>
          <TouchableOpacity
            style={styles.containerButton}
            onPress={handleClearAccount}
          >
            <Text style={styles.styleButton}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerButton, { backgroundColor: colors.blue_1 }]}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.styleButton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.containerButtons, { marginTop: 10 }]}>
          <TouchableOpacity
            style={styles.containerInfoIcon}
            onPress={() => setModalVisibility2(!modal2, 0)}
          >
            <FontAwesome5 name="info" size={20} color={colors.white_1} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.containerInfoIcon}
            onPress={() => setModalVisibility2(!modal2, 1)}
          >
            <FontAwesome5 name="info" size={20} color={colors.white_1} />
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

      {/* Modal de cambio de perfil */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModalVisibility(!modal);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            <View style={styles.modalTitle}>
              <Text style={styles.styleTextModal}>Elige un Perfil</Text>
            </View>
            <View style={styles.modalLine} />

            <TouchableOpacity
              style={styles.containerProfileModal}
              onPress={() => setModalVisibility(!modal)}
            >
              <View style={styles.containerIconModal}>
                <FontAwesome
                  name="university"
                  size={45}
                  color={colors.white_1}
                />
              </View>
              <View style={styles.containerTitleProfileModal}>
                <Text style={styles.styleTitleProfileModal}>Trabajador</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerProfileModal}
              onPress={() => setModalVisibility(!modal)}
            >
              <View style={styles.containerIconModal}>
                <FontAwesome
                  name="university"
                  size={45}
                  color={colors.white_1}
                />
              </View>
              <View style={styles.containerTitleProfileModal}>
                <Text style={styles.styleTitleProfileModal}>
                  Administrador Domestico
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerProfileModal}
              onPress={() => setModalVisibility(!modal)}
            >
              <View style={styles.containerIconModal}>
                <FontAwesome
                  name="university"
                  size={45}
                  color={colors.white_1}
                />
              </View>
              <View style={styles.containerTitleProfileModal}>
                <Text style={styles.styleTitleProfileModal}>Personalizado</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerButtonModal}
              onPress={() => setModalVisibility(false)}
            >
              <Text style={styles.styleTextButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de informacion */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal2}
        onRequestClose={() => {
          setModalVisibility(!modal2);
        }}
      >
        <View style={styles.containerModal}>
          <View
            style={[
              styles.contentModal,
              [
                numberInfoModal == 0
                  ? { marginVertical: "30%" }
                  : { marginVertical: "50%" },
              ],
            ]}
          >
            <View style={styles.modalTitle}>
              <Text style={styles.styleTextModal}>Informacion</Text>
            </View>
            <View style={styles.modalLine} />
            <ScrollView>
              <View style={styles.containerTitleClean}>
                <Text style={styles.styleTitleClean}>
                  {infoModals[numberInfoModal].title}
                </Text>
              </View>
              <View style={styles.containerInfoClean}>
                <Text style={styles.styleInfoClean}>
                  {infoModals[numberInfoModal].description}
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.containerButtonModal}
              onPress={() => setModal2(false)}
            >
              <Text style={styles.styleTextButton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  containerProfileComplete: {
    width: "85%",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 30,
    paddingVertical: 40,
    marginTop: "10%",
    alignSelf: "center",
    elevation: 5,
  },
  containerTitleAccount: {
    width: "80%",
    height: "auto",
    alignSelf: "center",
  },
  styleTitleAccount: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.blue_1,
    textAlign: "center",
  },
  containerImage: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "3%",
  },
  imageSize: {
    width: 190,
    height: 180,
  },
  containerTitleMyAccount: {
    width: "80%",
    height: "auto",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "3%",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitleMyAccount: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.blue_1,
    textAlign: "center",
  },
  containerProfile: {
    marginVertical: "5%",
    width: "70%",
    height: 100,
    backgroundColor: "#2584A0",
    borderRadius: 22,
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignSelf: "center",
    elevation: 5,
  },
  containerIcon: {
    height: "100%",
    width: "25%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitleProfile: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: "7%",
  },
  styleTitleProfile: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },
  containerInfoIcon: {
    width: 35,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "2%",
    borderRadius: 50,
    backgroundColor: colors.blue_3,
    elevation: 5,
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
  containerModal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  contentModal: {
    minHeight: "auto",
    maxHeight: "80%",
    width: "86%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignSelf: "center",
    marginHorizontal: "7%",
    marginVertical: "20%",
  },
  modalTitle: {
    height: "auto",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTextModal: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2584A0",
  },
  modalLine: {
    height: 3,
    width: "80%",
    backgroundColor: "#2584A0",
    marginTop: 4,
    alignSelf: "center",
    marginBottom: 30,
  },

  //Container Botones
  containerButtons: {
    width: "90%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    alignSelf: "center",
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
  containerButtonModal: {
    backgroundColor: "#2584A0",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
    elevation: 5,
  },
  styleTextButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  //Item Perfil Modal
  containerProfileModal: {
    marginVertical: "3%",
    width: "85%",
    height: 100,
    backgroundColor: "#2584A0",
    borderRadius: 22,
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignSelf: "center",
    elevation: 5,
  },
  containerIconModal: {
    height: "100%",
    width: "25%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitleProfileModal: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginHorizontal: "7%",
  },
  styleTitleProfileModal: {
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },

  //Modal 2
  containerTitleClean: {
    width: "80%",
    height: "auto",
    alignSelf: "center",
  },
  styleTitleClean: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.blue_1,
    textAlign: "center",
  },
  containerInfoClean: {
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  styleInfoClean: {
    fontSize: 20,
    textAlign: "justify",
  },

  containerTitleDelete: {
    width: "80%",
    height: "auto",
    alignSelf: "center",
    marginTop: "10%",
  },
  styleTitleDelete: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.blue_3,
    textAlign: "center",
  },
  containerInfoDelete: {
    width: "80%",
    alignSelf: "center",
    marginTop: "10%",
  },
  styleInfoDelete: {
    fontSize: 20,
    textAlign: "justify",
  },
});

export default ConfigAccount;
