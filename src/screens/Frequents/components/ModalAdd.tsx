import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@utils/colors";
import React, { useState } from "react";
import { Input, Icon, Switch } from "@rneui/themed";
import CalendarPicker from "react-native-calendar-picker";
import { color } from "@rneui/base";
import { useDispatch } from "react-redux";
import { addGastoFrecuente } from "@store/frecuentes/frecuentes-slice";
import { createFrecuente, getFrecuentes } from "@api/FrecuentesServices";
import { useApi } from "@hooks/useApi";
import { LAPSES_TO_INT } from "@utils/types/Frecuentes";
import { useParams } from "react-router-dom";
import { simpleFormat } from "@utils/formatNumber";
import { Picker } from "@react-native-picker/picker";

interface ModalAddProps {
  amount: string;
  nombre: string;
  periodo: "Semanal" | "Quincenal" | "Mensual" | "Bimestral" | "Trimestral";
  description: string;
  date: string;
  editable: boolean;
}

const ModalAdd = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [checked, setChecked] = useState(false);
  const dateHoy = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(dateHoy);
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";

  const [createFrecuenteReq, loadingCreateFreq, errCreateFreq] =
    useApi(createFrecuente);
  const [reqGetFreq, loadingGetFreq, errGetFreq] = useApi(getFrecuentes);
  const [select, setSelect] = useState<
    "Semanal" | "Quincenal" | "Mensual" | "Bimestral" | "Trimestral"
  >("Semanal");
  const [params, setParams] = useState<ModalAddProps>({
    amount: "0",
    nombre: "",
    periodo: select,
    description: "",
    date: startDate,
    editable: checked,
  });
  const onDateChange = (date: any) => {
    console.log(date);
    const dateSplit = date.toString().split(" ");
    const monthsChangeds = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const monthNumberInitial = monthsChangeds.indexOf(dateSplit[1]) + 1;

    const dateChanged = `${dateSplit[3]}-${
      monthNumberInitial < 10 ? "0" + monthNumberInitial : monthNumberInitial
    }-${dateSplit[2]}`;
    setParams({ ...params, date: dateChanged });
  };
  const dispatch = useDispatch();

  const handleCreate = async () => {
    console.log(params);
    if (
      params.amount === "" ||
      params.amount === "0" ||
      params.nombre === "" ||
      params.date === "" ||
      params.description === ""
    )
      return Alert.alert("Llena todos los campos");

    const data = await createFrecuenteReq({
      amount: Number(params.amount),
      name: params.nombre,
      lapse: params.periodo,
      date: params.date.toString(),
      isStatic: params.editable,
      description: params.description,
    });
    if (!data) return Alert.alert("Error: " + errCreateFreq);
    Alert.alert("Gasto creado");
    dispatch(addGastoFrecuente(data.gasto));
    setParams({
      amount: "0",
      nombre: "",
      periodo: "Semanal",
      date: "",
      editable: false,
      description: "",
    });
    setChecked(false);
    setSelect("Semanal");
    setModalVisibility(false);
  };

  const handleSwitch = () => {
    setChecked(!checked);
    setParams({ ...params, editable: !checked });
    console.log(params.editable);
  };

  const handlePicker = (
    itemValue: "Semanal" | "Quincenal" | "Mensual" | "Bimestral" | "Trimestral"
  ) => {
    setSelect(itemValue);
    setParams({ ...params, periodo: itemValue });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.containerAddGastos}
        onPress={() => setModalVisibility(true)}
      >
        <MaterialIcons
          name="add-circle-outline"
          size={34}
          color={colors.blue_1}
        />
        <Text style={styles.styleAddGastos}>Agregar Gastos</Text>
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
              <Text style={styles.styleTextModal}>Formulario</Text>
            </View>
            <View style={styles.modalLine} />
            <ScrollView style={styles.containerIngresos}>
              <Input
                inputContainerStyle={[
                  styles.containerTextInput,
                  { marginTop: 20 },
                ]}
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
                onChangeText={(text) => setParams({ ...params, nombre: text })}
                value={params.nombre}
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
                placeholder="Monto"
                inputMode="numeric"
                leftIcon={
                  <Icon
                    type="feather"
                    name="dollar-sign"
                    size={23}
                    color={colors.blue_2}
                  />
                }
                onChangeText={(text) => setParams({ ...params, amount: text })}
                value={params.amount}
                autoCapitalize="none"
              />
              <Input
                inputContainerStyle={styles.containerTextInput}
                inputStyle={styles.styleTextInput}
                placeholder="Descripcion"
                inputMode="email"
                leftIcon={
                  <Icon
                    type="feather"
                    name="at-sign"
                    size={22}
                    color={colors.blue_2}
                  />
                }
                onChangeText={(text) =>
                  setParams({ ...params, description: text })
                }
                value={params.description}
              />
              <View style={styles.containerCalendar}>
                <CalendarPicker
                  onDateChange={onDateChange}
                  selectedDayColor={colors.blue_2}
                  selectedDayTextColor={colors.white_1}
                  todayBackgroundColor={colors.blue_1}
                  width={280}
                  height={280}
                  textStyle={{
                    color: colors.blue_2,
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                  previousTitle="Anterior"
                  previousTitleStyle={{ color: colors.blue_1 }}
                  nextTitle="Siguiente"
                  nextTitleStyle={{ color: colors.blue_1 }}
                  selectedStartDate={selectedStartDate}
                  minDate={dateHoy}
                  weekdays={["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"]}
                  months={[
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre",
                  ]}
                  customDayHeaderStyles={() => {
                    return {
                      textStyle: {
                        fontSize: 13,
                      },
                    };
                  }}
                  customDatesStyles={() => {
                    return {
                      textStyle: {
                        color: "black",
                        fontSize: 12,
                      },
                    };
                  }}
                />
              </View>
              <View
                style={[
                  styles.containerCalendar,
                  { height: 50, width: "60%", paddingVertical: 0 },
                ]}
              >
                <Picker
                  selectedValue={select}
                  onValueChange={(itemValue) => handlePicker(itemValue)}
                  itemStyle={{ color: colors.blue_2 }}
                  style={styles.stylePicker}
                >
                  <Picker.Item
                    label="Semanal"
                    value="Semanal"
                    color={colors.blue_2}
                    style={styles.styleItemPicker}
                  />
                  <Picker.Item
                    label="Quincenal"
                    value="Quincenal"
                    color={colors.blue_2}
                    style={styles.styleItemPicker}
                  />
                  <Picker.Item
                    label="Mensual"
                    value="Mensual"
                    color={colors.blue_2}
                    style={styles.styleItemPicker}
                  />
                  <Picker.Item
                    label="Bimestral"
                    value="Bimestral"
                    color={colors.blue_2}
                    style={styles.styleItemPicker}
                  />
                  <Picker.Item
                    label="Trimestral"
                    value="Trimestral"
                    color={colors.blue_2}
                    style={styles.styleItemPicker}
                  />
                </Picker>
              </View>
              <View style={styles.containerSwitch}>
                <Text style={styles.styleTextSwitch}>Editable</Text>
                <Switch
                  value={checked}
                  onValueChange={handleSwitch}
                  color={colors.blue_2}
                />
              </View>
              <TouchableOpacity
                style={[
                  styles.containerButtonModal,
                  { backgroundColor: colors.blue_2 },
                ]}
                onPress={handleCreate}
              >
                <Text style={styles.styleTextButton}>Agregar Gasto</Text>
              </TouchableOpacity>
            </ScrollView>
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
  containerAddGastos: {
    width: "auto",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 50,
    padding: 10,
    marginBottom: "8%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  styleAddGastos: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.blue_1,
    marginLeft: 10,
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
    fontSize: 30,
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
  containerIngresos: {
    height: "100%",
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 1,
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 20,
  },
  containerButtonModal: {
    backgroundColor: colors.blue_1,
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 45,
    borderRadius: 10,
    marginBottom: 40,
    paddingHorizontal: 20,
    alignSelf: "center",
    elevation: 5,
  },
  styleTextButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  containerTextInput: {
    width: "90%",
    height: "auto",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 10,
    paddingHorizontal: 10,
  },
  styleTextInput: {
    fontSize: 18,
    color: "#2584A0",
    marginLeft: 10,
  },
  containerCalendar: {
    width: "84%",
    height: "auto",
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 10,
    paddingHorizontal: 10,
    marginBottom: 40,
    paddingVertical: 10,
  },
  containerSwitch: {
    width: "auto",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 10,
    paddingHorizontal: 10,
    marginBottom: 50,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  styleTextSwitch: {
    fontSize: 18,
    color: "#2584A0",
    marginHorizontal: 10,
  },
  stylePicker: {
    fontSize: 18,
    color: "#2584A0",
  },
  styleItemPicker: {
    fontSize: 18,
    color: "#2584A0",
  },
});

export default ModalAdd;
