import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { getGastosDiarios } from "@api/GastosServices";
import { setGastosDiarios } from "@store/gastos/gastos-slice";
import Item from "./Item";
import CircleCharge from "@screens/Components/CircleCharge";
import { useEffect, useState } from "react";
import colors from "@utils/colors";

const GastosRecientes = ({ setSectionUp }: { setSectionUp: Function }) => {
  const dispatch = useDispatch();
  const gastos = useSelector((state: RootState) => state.gastos.gastosDiarios);
  const inverseGastos = gastos.slice().reverse();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchGastos() {
    setLoading(true);
    const { data, ok, message } = await getGastosDiarios();
    if (!ok || !data) {
      setLoading(false);
      return console.log(message);
    }
    dispatch(setGastosDiarios(data.gastos));
    setLoading(false);
  }
  useEffect(() => {
    fetchGastos();
  }, []);
  return (
    <View style={styles.containerSection}>
      {inverseGastos.length == 0 ? (
        <View style={styles.containerTitle}>
          <Text style={styles.styleTitle}>No hay gastos recientes</Text>
        </View>
      ) : (
        <View style={styles.containerTitle}>
          <Text style={styles.styleTitle}>Gastos Recientes</Text>
        </View>
      )}

      {loading == true ? (
        <CircleCharge />
      ) : (
        <>
          {inverseGastos.length == 0 ? (
            <>
              <Image
                source={require("../../../../assets/caritaTristeGastosFrecuentes.png")}
                style={{ width: 220, height: 220, marginVertical: 20 }}
              />
              <TouchableOpacity style={styles.containerButtonToAgregarGasto}>
                <Text
                  style={styles.styleButtonToAgregarGasto}
                  onPress={() => setSectionUp(1)}
                >
                  ¡Registra ahora!
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.containerRecent}>
              {inverseGastos.map((item: any, i) => (
                <Item
                  key={i}
                  id={item.dayId}
                  icon={item.diaIcon}
                  name={item.diaName}
                  description={item.diaDescription}
                  amount={item.diaAmount}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
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
  },
  containerLoading: {
    height: "300px",
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
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
    color: colors.secColor,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default GastosRecientes;
