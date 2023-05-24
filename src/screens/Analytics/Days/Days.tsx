import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import CircleCharge from "@screens/Components/CircleCharge";
import {
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { VictoryPie, VictoryTheme } from "victory-native";

const Days = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            paddingVertical: "50%",
          }}
        >
          <View>
            <Text style={[styles.styleTitleDay, { fontSize: 28 }]}>
              Cargando
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircleCharge />
          </View>
        </View>
      ) : (
        <>
          {isError !== "" ? (
            <>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  paddingVertical: "20%",
                }}
              >
                <View style={{ paddingHorizontal: "10%" }}>
                  {isError === "Error al obtener día" ? (
                    <Text style={[styles.styleTitleDay, { fontSize: 28 }]}>
                      {isError}
                    </Text>
                  ) : (
                    <Text style={[styles.styleTitleDay, { fontSize: 28 }]}>
                      No se pudo obtener el día
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20%",
                  }}
                >
                  {isError === "Error al obtener días" ? (
                    <Image
                      source={require("../../../../assets/errorSemanas.png")}
                      style={{ width: 300, height: 300 }}
                    />
                  ) : (
                    <Image
                      source={require("../../../../assets/noSemanas.png")}
                      style={{ width: 300, height: 300 }}
                    />
                  )}
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={[
                  styles.containerTitle,
                  { marginBottom: 0, flexDirection: "column" },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.viewArrows, { marginRight: "10%" }]}
                  >
                    <FontAwesome name="arrow-left" size={30} color="white" />
                  </TouchableOpacity>
                  <View>
                    <View>
                      <Text style={styles.styleTitleDay}></Text>
                    </View>
                    <View>
                      <Text
                        style={styles.styleDateDays}
                      >{`Fecha del día`}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.viewArrows, { marginLeft: "10%" }]}
                  >
                    <FontAwesome name="arrow-right" size={30} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.lineBalance} />

              <View>
                <TouchableOpacity
                  style={styles.containerIconBack}
                  //onPress={() => setVisibilityDay(0)}
                >
                  {
                    <MaterialCommunityIcons
                      name="calendar-week"
                      size={56}
                      color="#2584A0"
                    />
                  }
                </TouchableOpacity>
                <View style={styles.containerAllData}>
                  <View style={styles.containerGastosTotales}>
                    <View
                      style={[
                        styles.containerGastoTotal,
                        { marginRight: "4%" },
                      ]}
                    >
                      <View style={styles.containerTitleGastoTotal}>
                        <Text style={styles.styleTitleGastoTotal}>
                          Total de Ayer
                        </Text>
                      </View>
                      <View style={styles.containerAmountGastoTotal}>
                        <Text style={styles.styleAmountGastoTotal}></Text>
                      </View>
                    </View>
                    <View
                      style={[styles.containerGastoTotal, { marginLeft: "4%" }]}
                    >
                      <View style={styles.containerTitleGastoTotal}>
                        <Text style={styles.styleTitleGastoTotal}>
                          Total de Hoy
                        </Text>
                      </View>
                      <View style={styles.containerAmountGastoTotal}>
                        <Text style={styles.styleAmountGastoTotal}></Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerGastoComparativo}>
                    <View style={styles.containerTitleGastoComparativo}>
                      <Text style={styles.styleTitleGastoComparativo}>
                        Comparación con el día anterior
                      </Text>
                    </View>
                    <View style={styles.containerInfoGastoComparativo}>
                      <View style={styles.containerInfoDayGastoComparativo}>
                        <View style={styles.containerTitleInfoDay}>
                          <Text style={styles.styleTitleInfoDay}></Text>
                        </View>
                        <View style={styles.containerAmountInfoDay}>
                          <Text style={styles.styleAmountInfoDay}>{}</Text>
                        </View>
                      </View>
                      <View style={styles.containerOperator}>
                        <Text
                          style={[
                            styles.styleOperator,
                            {
                              /*dataDay.diffDays == 0
                              ? { color: "gray" }
                              : dataDay.diffDays < 0
                              ? { color: "green" }
                          : { color: "red" },*/
                            },
                          ]}
                        >
                          {/*{dayBalance == dayBeforeBalance
                            ? "="
                            : dayBeforeBalance < dayBalance
                            ? "<"
                          : ">"}*/}
                        </Text>
                      </View>
                      <View style={styles.containerInfoDayGastoComparativo}>
                        <View style={styles.containerTitleInfoDay}>
                          <Text style={styles.styleTitleInfoDay}>{}</Text>
                        </View>
                        <View style={styles.containerAmountInfoDay}>
                          <Text style={styles.styleAmountInfoDay}>{}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.containerBarPay}>
                    <View style={styles.containerTitleGraph}>
                      <Text style={styles.styleTitleGraph}>
                        Gastos según el monto
                      </Text>
                    </View>
                    <VictoryPie
                      theme={VictoryTheme.material}
                      width={300}
                      height={300}
                      padding={20}
                      animate={{
                        duration: 2000,
                      }}
                      colorScale={["#044C7C", "#2584a0", "#4CADCA"]}
                      data={[
                        { x: "Birete", y: 35 },
                        { x: "Metro", y: 40 },
                        { x: "Anuario", y: 55 },
                      ]}
                      style={{
                        labels: {
                          fontSize: 18,
                          fill: "#ffffff",
                          fontWeight: "bold",
                          padding: -100,
                        },
                      }}
                      labelPosition="centroid"
                      labelPlacement="parallel"
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  styleTitleDay: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerTitle: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  viewArrows: {
    height: "auto",
    width: "17%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  styleDateDays: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  lineBalance: {
    height: 5,
    width: "80%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  containerIconBack: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
  },
  containerAllData: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
    marginTop: 20,
  },
  containerGastosTotales: {
    width: "80%",
    flexDirection: "row",
  },
  containerGastoTotal: {
    height: "auto",
    width: "46%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "center",
    paddingVertical: "5%",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  containerTitleGastoTotal: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "15%",
  },
  styleTitleGastoTotal: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2584A0",
    textAlign: "center",
  },
  containerAmountGastoTotal: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: "10%",
    elevation: 5,
  },
  styleAmountGastoTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#044C7C",
    textAlign: "center",
  },
  containerGastoComparativo: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginTop: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  containerTitleGastoComparativo: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  styleTitleGastoComparativo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2584A0",
    textAlign: "center",
  },
  containerInfoGastoComparativo: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  containerInfoDayGastoComparativo: {
    height: "auto",
    width: "38%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  containerTitleInfoDay: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: "5%",
  },
  styleTitleInfoDay: {
    fontSize: 17,
    fontWeight: "600",
    color: "gray",
    textAlign: "center",
  },

  containerAmountInfoDay: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    paddingVertical: "10%",
    borderRadius: 10,
    elevation: 5,
  },
  styleAmountInfoDay: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#044C7C",
  },
  containerOperator: {
    height: "auto",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleOperator: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  styleTextGastoComparativo: {
    fontSize: 17,
    fontWeight: "900",
    color: "gray",
    textAlign: "center",
  },
  containerBarPay: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "white",
    marginTop: 30,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  containerMainBarPay: {
    width: "auto",
    height: "10%",
  },
  containerTitleGraph: {
    width: "auto",
  },
  styleTitleGraph: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2584A0",
  },
});

export default Days;
