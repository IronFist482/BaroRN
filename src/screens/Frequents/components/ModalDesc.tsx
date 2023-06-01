import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { colors } from "@utils/colors";

const ModalDesc = ({ freDescription }: { freDescription: string }) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.containerDiasRestantes}
        onPress={() => setModalVisibility(true)}
      >
        <Text style={styles.styleDiasRestantes}>Descripción</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(false);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            <View style={styles.modalTitle}>
              <Text style={styles.styleTextModal}>Descripción</Text>
            </View>
            <View style={styles.modalLine} />
            <View style={styles.containerDescription}>
              <Text style={styles.styleTextDescription}>{freDescription}</Text>
            </View>
            <TouchableOpacity
              style={styles.containerButtonModal}
              onPress={() => setModalVisibility(false)}
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
  containerDiasRestantes: {
    height: "auto",
    width: "45%",
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.white_1,
    borderRadius: 10,
    elevation: 3,
    marginLeft: 30,
  },
  styleDiasRestantes: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: colors.blue_1,
  },
  containerModal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentModal: {
    height: "auto",
    width: "70%",
    backgroundColor: colors.white_1,
    borderRadius: 16,
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: "7%",
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#2584A0",
  },
  modalLine: {
    height: 3,
    width: "80%",
    backgroundColor: "#2584A0",
    marginTop: 4,
    alignSelf: "center",
  },
  containerDescription: {
    height: "auto",
    marginVertical: 40,
    borderRadius: 1,
    marginHorizontal: "10%",
    backgroundColor: colors.white_1,
  },
  styleTextDescription: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2584A0",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  containerButtonModal: {
    backgroundColor: "#2584A0",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    alignSelf: "center",
    elevation: 3,
  },
  styleTextButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ModalDesc;
