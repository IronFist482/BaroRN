import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import { Input, Icon, ListItem } from "@rneui/themed";
import { ReactComponentElement, useState } from "react";
import { rotationHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/RotationGestureHandler";
import { useDispatch } from "react-redux";
import { updateBalance } from "@store/user/user-slice";
import { createGastoDiario } from "@api/GastosServices";
import { GastoDiarioParams } from "@utils/types/Gastos/gastos-diarios";
import { useCallback } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated } from "react-native";
import colors from "@utils/colors";
import { useNavigation } from "@react-navigation/native";

const Iconos = [
  {
    icon: <FontAwesome5 name="graduation-cap" size={24} color="#2584A0" />,
    id: 0,
  },
  {
    icon: <FontAwesome5 name="hamburger" size={24} color="#2584A0" />,
    id: 1,
  },
  {
    icon: <FontAwesome5 name="subway" size={24} color="#2584A0" />,
    id: 2,
  },
  {
    icon: <FontAwesome5 name="shopping-bag" size={24} color="#2584A0" />,
    id: 3,
  },
  {
    icon: <FontAwesome5 name="heartbeat" size={24} color="#2584A0" />,
    id: 4,
  },
  {
    icon: <FontAwesome5 name="candy-cane" size={24} color="#2584A0" />,
    id: 5,
  },
  {
    icon: <FontAwesome5 name="film" size={24} color="#2584A0" />,
    id: 6,
  },
  {
    icon: <FontAwesome5 name="coffee" size={24} color="#2584A0" />,
    id: 7,
  },
  {
    icon: <FontAwesome5 name="phone" size={24} color="#2584A0" />,
    id: 8,
  },
  {
    icon: <MaterialIcons name="backpack" size={24} color="#2584A0" />,
    id: 9,
  },
  {
    icon: <FontAwesome5 name="clipboard" size={24} color="#2584A0" />,
    id: 10,
  },
];

const AgregarGasto = ({
  balance,
  setSectionUp,
}: {
  balance: number;
  setSectionUp: Function;
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [disabled, setDisabled] = useState(false);

  const [params, setParams] = useState<GastoDiarioParams>({
    nombre: "",
    desc: "",
    monto: "0",
    icono: 0,
  });

  const handleAgregarGasto = useCallback(async () => {
    setDisabled(true);
    const { data, message, ok } = await createGastoDiario(params);
    if (!ok || !data) {
      Alert.alert(message);
      setDisabled(false);
      return;
    }
    dispatch(updateBalance(data.newBalance));
    setParams({
      desc: "",
      monto: "0",
      nombre: "",
      icono: 0,
    });
    setType(0);
    showAlertHandler();
    setDisabled(false);
  }, [params]);

  const [showAlert, setShowAlert] = useState(false);
  const showAlertHandler = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

  const [expanded, setExpanded] = useState(false);
  const [type, setType] = useState(0);

  const handleChangeIcon = (l: any) => {
    setType(l.id);
    setExpanded(!expanded);
    setParams({
      ...params,
      icono: l.id,
    });
  };

  return (
    <>
      <View style={styles.containerSection}>
        {balance == 0 ? (
          <>
            <View style={styles.containerTitle}>
              <Text style={styles.styleTitle}>Ingresos insuficientes</Text>
            </View>
            <Image
              source={require("../../../../assets/404GastosRecientesBack.png")}
              style={{ width: 300, height: 300 }}
            />
            <TouchableOpacity style={styles.containerButtonToAgregarGasto}>
              <Text
                style={styles.styleButtonToAgregarGasto}
                onPress={() => setSectionUp(2)}
              >
                ¡Agrega un Ingreso!
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
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
                  onChangeText={(text) =>
                    setParams({ ...params, nombre: text })
                  }
                  value={params.nombre}
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
                  onChangeText={(text) => setParams({ ...params, monto: text })}
                  value={params.monto}
                  keyboardType="numeric"
                />
                <ListItem.Accordion
                  content={
                    <>
                      <ListItem.Content>
                        <ListItem.Title
                          style={[
                            styles.styleTextInput,
                            { textAlign: "center", fontSize: 20 },
                          ]}
                        >
                          {type === 0 ? Iconos[0].icon : Iconos[type].icon}
                        </ListItem.Title>
                      </ListItem.Content>
                    </>
                  }
                  isExpanded={expanded}
                  onPress={() => {
                    setExpanded(!expanded);
                  }}
                  containerStyle={[
                    styles.containerTextSelect,
                    expanded == false && {
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      marginBottom: 10,
                    },
                  ]}
                  animation={{ type: "timing", duration: 500 }}
                  bottomDivider={true}
                  topDivider={true}
                >
                  {Iconos.map((l, i) => (
                    <ListItem
                      key={i}
                      onPress={(e) => handleChangeIcon(l)}
                      containerStyle={[
                        styles.containerTextSelect,
                        {
                          borderRadius: 0,
                          elevation: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                        },
                        l.icon == Iconos[10].icon && {
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          marginBottom: 10,
                        },
                      ]}
                    >
                      <ListItem.Content>
                        <ListItem.Title
                          style={[
                            styles.styleTextInput,
                            { color: "#2584A0", fontSize: 20 },
                          ]}
                        >
                          {l.icon}
                        </ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  ))}
                </ListItem.Accordion>
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleAgregarGasto}
                disabled={disabled}
              >
                <Text style={styles.textButtonStyle}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    width: "70%",
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
  containerTextSelect: {
    width: 100,
    height: 50,
    elevation: 1,
    paddingHorizontal: "2%",
    fontSize: 20,
    fontWeight: "normal",
    paddingVertical: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
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
  containerButtonToAgregarGasto: {
    height: 50,
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  styleButtonToAgregarGasto: {
    color: colors.blue_2,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default AgregarGasto;
