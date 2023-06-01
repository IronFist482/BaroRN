import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { simpleFormat } from "@utils/formatNumber";
import { useCallback, useState, useEffect } from "react";

const ItemFrequents = ({
  title,
  numRest,
  amount,
  date,
  lapse,
  color,
}: {
  title: string;
  numRest: number;
  amount: number;
  date: string;
  lapse: string;
  color: string;
}) => {
  const colorElection = (value: string) => {
    if (value == "Light") {
      return colors.blue_3;
    } else if (value == "Hard") {
      return colors.blue_1;
    } else {
      return colors.blue_2;
    }
  };
  const [colorItem, setColorItem] = useState(colorElection(color));

  useEffect(() => {
    console.log("useEffect");
    colorElection(color);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[styles.containetBarVertical, { backgroundColor: colorItem }]}
      />
      <View style={styles.containerAllInfo}>
        <View style={styles.containerHeaderItem}>
          <View style={styles.containerNameItem}>
            <Text style={styles.styleNameItem}>{title}</Text>
          </View>
          <View style={styles.containerDiasRestantes}>
            <Text style={styles.styleDiasRestantes}>
              {numRest} {numRest == 1 ? "día" : "días"} restantes
            </Text>
          </View>
        </View>
        <View style={styles.containerDataGastos}>
          <View style={styles.containerAllAmount}>
            <View style={styles.containerTitleAmount}>
              <Text style={styles.styleTitleAmount}>Monto:</Text>
            </View>
            <View style={styles.containerDataAmount}>
              <Text style={styles.styleDataAmount}>{`$${simpleFormat(
                amount
              )}`}</Text>
            </View>
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
                Fecha:
              </Text>
              <Text style={styles.styleDate}> {date}</Text>
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
            <TouchableOpacity style={styles.containerAlarm}>
              <MaterialCommunityIcons
                name="alarm"
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
    backgroundColor: colors.white_1,
    marginTop: 30,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: 10,
    elevation: 5,
  },
  containetBarVertical: {
    alignSelf: "center",
    marginHorizontal: "3%",
    height: "92%",
    borderRadius: 10,
    width: "2%",
    backgroundColor: colors.blue_1,
    elevation: 3,
  },
  containerAllInfo: {
    height: "auto",
    width: "90%",
    flexDirection: "column",
    justifyContent: "center",
  },
  containerHeaderItem: {
    height: "auto",
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
  },
  containerNameItem: {
    marginLeft: "3%",
    height: "auto",
    width: "46%",
    flexDirection: "row",
  },
  styleNameItem: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.blue_1,
  },
  containerDiasRestantes: {
    height: "auto",
    width: "45%",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: colors.white_1,
    borderWidth: 2,
    borderColor: colors.blue_1,
    borderRadius: 10,
    elevation: 3,
  },
  styleDiasRestantes: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.blue_1,
  },
  containerDataGastos: {
    height: "auto",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: "3%",
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
    paddingVertical: 10,
  },
  containerDate: {
    height: "auto",
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: "2%",
  },
  styleDate: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
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

export default ItemFrequents;
