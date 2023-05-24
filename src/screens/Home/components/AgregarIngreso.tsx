import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Input, Icon, ListItem } from "@rneui/themed";
import { CreateIngresoParams } from "@utils/types/Gastos/gastos-diarios";
import { simpleFormat } from "@utils/formatNumber";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { updateBalance } from "@store/user/user-slice";
import { createIngreso } from "@api/IngresosServices";

const list2 = [
  {
    name: "Salario",
  },
  {
    name: "Honorario",
  },
  {
    name: "Pensión",
  },
  {
    name: "Mesada",
  },
];

const AgregarIngreso = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [params, setParams] = useState<CreateIngresoParams>({
    ingreso: "",
    tipo: "Salario",
    desc: "",
  });

  const dispatch = useDispatch();

  const handleAgregarIngreso = useCallback(async () => {
    setDisabled(true);
    const { data, message, ok } = await createIngreso(params);
    if (!ok || !data || data == null) {
      setDisabled(false);
      return;
    }
    dispatch(updateBalance(data.newBalance));
    setParams({
      tipo: "Salario",
      desc: "",
      ingreso: "0",
    });
    setType("");
    console.log(params);
    setDisabled(false);
  }, [params]);

  const [showAlert, setShowAlert] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const showAlertHandler = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const [type, setType] = useState("");

  useEffect(() => {
    if (type == "Salario") {
      setParams({ ...params, tipo: type });
    }
    if (type == "Honorario") {
      setParams({ ...params, tipo: type });
    }
    if (type == "Pensión") {
      setParams({ ...params, tipo: type });
    }
    if (type == "Mesada") {
      setParams({ ...params, tipo: type });
    }
  }, [type]);

  return (
    <>
      <View style={styles.containerSection}>
        <View style={styles.containerTitle}>
          <Text style={styles.styleTitle}>Agregar Ingreso</Text>
        </View>
        <View style={styles.containerRecent}>
          <View style={styles.containerInputs}>
            <ListItem.Accordion
              content={
                <>
                  <Icon
                    type="feather"
                    name="bookmark"
                    size={25}
                    color="#2584A0"
                  />
                  <ListItem.Content>
                    <ListItem.Title style={styles.styleTextInput}>
                      {type === "" ? "Salario" : type}
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
              }}
              containerStyle={styles.containerTextSelect}
            >
              {list2.map((l, i) => (
                <ListItem
                  key={i}
                  onPress={(e) => setType(l.name)}
                  onPressOut={(e) => setExpanded(!expanded)}
                >
                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </ListItem.Accordion>
            <Input
              inputContainerStyle={[
                styles.containerTextInput,
                { marginTop: 30 },
              ]}
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
              onChangeText={(text) => setParams({ ...params, desc: text })}
              value={params.desc}
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
              keyboardType="numeric"
              onChangeText={(text) => setParams({ ...params, ingreso: text })}
              value={params.ingreso}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleAgregarIngreso}
            onPressOut={showAlertHandler}
            disabled={disabled}
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
              ¡Se ha agregado el ingreso con éxito!
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
    elevation: 3,
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
  containerTextSelect: {
    width: 260,
    height: 50,
    elevation: 1,
    paddingHorizontal: 15,
    fontSize: 20,
    fontWeight: "normal",
    paddingVertical: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
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
    backgroundColor: "#2584A0",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  alertText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center",
  },
});

export default AgregarIngreso;
