import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useState } from "react";
const AgregarGasto = () => {
  const [showAlert, setShowAlert] = useState(false);
  const showAlertHandler = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  return (
    <>
      <View style={styles.containerSection}>
        <View style={styles.containerTitle}>
          <Text style={styles.styleTitle}>Agregar Gasto</Text>
        </View>
        <View style={styles.containerRecent}>
          <TextInput style={styles.item} placeholder="Nombre" maxLength={20} />
          <TextInput style={styles.item} placeholder="Descripción" />
          <TextInput
            style={styles.item}
            placeholder="Monto"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={showAlertHandler}
          >
            <Text style={styles.textButtonStyle}>Agregar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showAlert}
        onRequestClose={() => {
          setShowAlert(!showAlert);
        }}
      >
        <View style={styles.alertContainer}>
          <View style={styles.alertContainerContent}>
            <Text style={styles.alertText}>
              ¡Se ha agregado el gasto con éxito!
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  containerSection: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  containerTitle: {
    height: "auto",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerRecent: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    color: "#044C7C",
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#2584A0",
    borderRadius: 5,
    padding: 10,
    width: "50%",
  },
  textButtonStyle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  alertContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainerContent: {
    height: 100,
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2584A0",
    borderWidth: 5,
    padding: 10,
  },
  alertText: {
    color: "#2584A0",
    fontSize: 20,
    textAlign: "center",
  },
});

export default AgregarGasto;
