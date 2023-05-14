import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { useState } from "react";
import { rotationHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler";
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
          <View style={styles.containerInputs}>
            <Input
              inputContainerStyle={styles.containerTextInput}
              inputStyle={styles.styleTextInput}
              placeholder="Nombre"
              leftIcon={
                <Icon type="feather" name="tag" size={25} color="#2584A0" />
              }
            />
            <Input
              inputContainerStyle={styles.containerTextInput}
              inputStyle={styles.styleTextInput}
              placeholder="Descripción"
              leftIcon={
                <Icon
                  type="feather"
                  name="message-circle"
                  size={25}
                  color="#2584A0"
                />
              }
            />
            <Input
              inputContainerStyle={styles.containerTextInput}
              inputStyle={styles.styleTextInput}
              placeholder="Monto"
              leftIcon={
                <Icon
                  type="feather"
                  name="dollar-sign"
                  size={25}
                  color="#2584A0"
                />
              }
            />
          </View>

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
    backgroundColor: "#76BCD0",
    paddingTop: 10,
    paddingBottom: 10,
    elevation: 6,
  },
  containerInputs: {
    marginTop: 20,
  },
  containerTextInput: {
    width: 260,
    height: 50,
    elevation: 1,
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
  },
  styleTextInput: {
    color: "black",
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "normal",
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
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#2584A0",
    borderRadius: 5,
    padding: 10,
    width: "50%",
    elevation: 3,
  },
  textButtonStyle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    elevation: 2,
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
