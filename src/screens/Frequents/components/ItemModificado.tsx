import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { colors } from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { simpleFormat } from "@utils/formatNumber";
import { useCallback, useState } from "react";
import ModalEdit from "./ModalEdit";
import ModalConsult from "./ModalConsult";
import ModalDesc from "./ModalDesc";
import { useDispatch } from "react-redux";
import { deleteFreq } from "@store/frecuentes/frecuentes-slice";
import { deleteFrecuente } from "@api/FrecuentesServices";

const ItemModificado = ({
  id,
  title,
  amount,
  lapse,
  description,
  initialDate,
  estatico,
}: {
  id: number;
  title: string;
  amount: number;
  lapse: string;
  description: string;
  initialDate: string;
  estatico: boolean;
}) => {
  const [showView, setShowView] = useState(false);
  const dispatch = useDispatch();
  const [deleteBoolean, setDeleteBoolean] = useState(false);
  const onDelete = useCallback(async () => {
    Alert.alert("Eliminar", "¿Estás seguro de eliminar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => functionDelete(),
      },
    ]);
  }, []);

  const functionDelete = async () => {
    const { data } = await deleteFrecuente(id);
    if (!data || !data.ok) return console.log("Error al eliminar");
    dispatch(deleteFreq(id));
  };

  const onEdit = (s: boolean) => {
    setShowView(showView);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerAllInfo}>
        <View style={styles.containerHeaderItem}>
          <View style={styles.containerNameItem}>
            <Text style={styles.styleNameItem}>{title}</Text>
          </View>
          <ModalDesc freDescription={description} />
        </View>
        <View style={styles.containerDataGastos}>
          <View style={styles.containerAllAmount}>
            <View style={styles.containerTitleAmount}>
              <Text style={styles.styleTitleAmount}>Monto:</Text>
            </View>
            {estatico ? (
              <View style={styles.containerDataAmount}>
                <Text style={styles.styleDataAmount}>{`$${simpleFormat(
                  amount
                )}`}</Text>
              </View>
            ) : (
              <View style={styles.containerDataAmount}>
                <Text style={styles.styleDataAmount}>{`$${simpleFormat(
                  amount
                )}`}</Text>
              </View>
            )}
          </View>
          <View style={styles.containerBarSeparator} />
          <View style={styles.containerDataDate}>
            <View style={styles.containerDate}>
              <Text
                style={[
                  styles.styleDate,
                  { color: colors.blue_1, fontWeight: "bold" },
                ]}
              >
                Registro:
              </Text>
              <Text style={styles.styleDate}>{initialDate}</Text>
            </View>
            <View style={styles.containerDate}>
              <Text
                style={[
                  styles.styleDate,
                  { color: colors.blue_1, fontWeight: "bold" },
                ]}
              >
                Periodo:
              </Text>
              <Text style={styles.styleDate}> {lapse}</Text>
            </View>
          </View>
          <View style={styles.containerBarSeparator} />
          <View style={styles.containerIcons}>
            <ModalEdit
              title={title}
              amount={amount}
              lapse={lapse}
              description={description}
              initialDate={initialDate}
              estatico={estatico}
            />
            <ModalConsult />
            <TouchableOpacity style={styles.containerAlarm} onPress={onDelete}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={colors.blue_1}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "90%",
    backgroundColor: colors.blue_1,
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    elevation: 5,
    paddingVertical: 10,
    justifyContent: "center",
  },
  containerAllInfo: {
    height: "auto",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeaderItem: {
    height: "auto",
    paddingVertical: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  containerNameItem: {
    height: "auto",
    width: "46%",
    flexDirection: "row",
  },
  styleNameItem: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.white_1,
  },

  containerDataGastos: {
    height: "auto",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,

    borderRadius: 10,
    backgroundColor: colors.white_1,
    elevation: 5,
  },
  containerAllAmount: {
    height: "auto",
    width: "30%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  containerTitleAmount: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  styleTitleAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.blue_1,
  },
  containerDataAmount: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  styleDataAmount: {
    fontSize: 16,
    fontWeight: "500",
  },
  containerBarSeparator: {
    height: "80%",
    width: "1%",
    backgroundColor: colors.blue_1,
    borderRadius: 10,
    elevation: 2,
  },
  containerDataDate: {
    height: "auto",
    width: "40%",
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "2%",
  },
  containerDate: {
    height: "auto",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: "2%",
    marginTop: 10,
  },
  styleDate: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  containerIcons: {
    height: "auto",
    width: "24%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  containerAlarm: {
    height: 37,
    width: 37,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    marginRight: "2%",
    borderRadius: 50,
    backgroundColor: colors.white_1,
    elevation: 5,
  },
});

export default ItemModificado;
