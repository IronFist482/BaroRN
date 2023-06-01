import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import Switch from "./components/Switch";
import ItemFrequents from "./components/ItemFrequents";
import ItemModificado from "./components/ItemModificado";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@utils/colors";
import { createFrecuente, getFrecuentes } from "@api/FrecuentesServices";
import {
  addGastoFrecuente,
  setGastosFrecuentes,
  setGastosProximos,
} from "@store/frecuentes/frecuentes-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useApi } from "@hooks/useApi";
import CircleCharge from "../Components/CircleCharge";
import ModalAdd from "./components/ModalAdd";

const Frequents = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onValueChange = (val: boolean) => {
    setValue(val);
  };
  useEffect(() => {
    if (!value) fetchProximos();
    else fetchFrecuentes();
  }, [value]);

  const frecuentes = useSelector(
    (s: RootState) => s.frecuentes.gastosFrecuentes
  );
  const proximos = useSelector((s: RootState) => s.frecuentes.gastosProximos);

  const [reqGetFreq, loadingGetFreq, errGetFreq] = useApi(getFrecuentes);

  const fetchFrecuentes = useCallback(async () => {
    setLoading(true);
    const data = await reqGetFreq();
    if (!data) {
      dispatch(setGastosFrecuentes([]));
      setLoading(false);
      setError(true);
      return Alert.alert("Error: " + errGetFreq);
    }
    console.log("data.frecuentes ->", data.frecuentes);
    dispatch(setGastosFrecuentes(data.frecuentes));
    setError(false);
    setLoading(false);
  }, [frecuentes]);

  const fetchProximos = useCallback(async () => {
    setLoading(true);
    const data = await reqGetFreq();
    if (!data) {
      dispatch(setGastosProximos([]));
      setLoading(false);
      setError(true);
      return Alert.alert("Error: " + errGetFreq);
    }
    console.log("data.proximos ->", data.proximos);
    dispatch(setGastosProximos(data.proximos));
    setError(false);
    setLoading(false);
  }, [proximos]);

  return (
    <ScrollView style={styles.container}>
      {loading == true ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "50%",
          }}
        >
          <Text
            style={[
              styles.styleTitleGastosFrecuentes,
              { color: colors.white_1, fontSize: 30 },
            ]}
          >
            Cargando
          </Text>
          <CircleCharge />
        </View>
      ) : (
        <>
          {value == false ? (
            <>
              <View style={styles.containerTitleGastosFrecuentes}>
                <Text style={styles.styleTitleGastosFrecuentes}>
                  Gastos Frecuentes
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.containerTitleModificarGastos}>
              <Text style={styles.styleTitleModificarGastos}>
                Modificar Gastos
              </Text>
            </View>
          )}
          <Switch value={value} onValueChange={setValue} />
          {value == false ? (
            <View style={styles.containerItemsFrequents}>
              {error === false ? (
                proximos.map((item, index: number) => (
                  <ItemFrequents
                    key={index}
                    title={item.freName}
                    numRest={item.daysTillNextCob}
                    amount={item.freAmount}
                    date={item.day.dayDate}
                    lapse={item.freLapse}
                    color={item.priorityColor}
                  />
                ))
              ) : (
                <Text>{error}</Text>
              )}
            </View>
          ) : (
            <View>
              <View style={styles.containerItemsFrequents}>
                {error === false ? (
                  frecuentes.map((item, index: number) => (
                    <ItemModificado
                      key={index}
                      id={item.freId}
                      title={item.freName}
                      amount={item.freAmount}
                      lapse={item.freLapse}
                      description={item.freDescription}
                      initialDate={item.day.dayDate}
                      estatico={item.freIsStatic}
                    />
                  ))
                ) : (
                  <Text>{error}</Text>
                )}
              </View>
              <ModalAdd />
            </View>
          )}
        </>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2584A0",
  },
  containerTitleGastosFrecuentes: {
    height: 50,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  containerTitleModificarGastos: {
    height: 50,
    width: 250,
    backgroundColor: "#044C7C",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  styleTitleGastosFrecuentes: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
  styleTitleModificarGastos: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  containerItemsFrequents: {
    height: "auto",
    width: "auto",
    marginTop: 30,
    paddingBottom: 30,
  },
});

export default Frequents;
