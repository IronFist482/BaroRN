import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CircleCharge from "@screens/Components/CircleCharge";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ItemDay from "../components/ItemDay";
import { simpleFormat } from "@utils/formatNumber";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useEffect } from "react";
import AnalyticsContainer from "../Analytics";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";

const Weeks = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  return (
    <AnalyticsContainer>
      <>
        {loading == true ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              paddingVertical: "50%",
            }}
          >
            <View>
              <Text style={[styles.styleTitleWeek, { fontSize: 28 }]}>
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
                    {isError === "Error al obtener semanas" ? (
                      <Text style={[styles.styleTitleWeek, { fontSize: 28 }]}>
                        {isError}
                      </Text>
                    ) : (
                      <Text style={[styles.styleTitleWeek, { fontSize: 28 }]}>
                        Preparando los datos para la siguiente semana
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
                    {isError === "Error al obtener semanas" ? (
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
                      style={styles.viewArrows}
                      //onPress={() => handleArrowsWeeks("left")}
                    >
                      <FontAwesome name="arrow-left" size={30} color="white" />
                    </TouchableOpacity>
                    <View>
                      <View>
                        <Text style={styles.styleTitleWeek}>{"Semana"}</Text>
                      </View>
                      <View>
                        <Text style={styles.styleDateWeeks}>
                          {"actual week"}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.viewArrows}
                      //onPress={() => handleArrowsWeeks("right")}
                    >
                      <FontAwesome name="arrow-right" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lineBalance} />
                <View style={styles.containerDays}>
                  {/*{DaysArray.map((day, i) => (
                  <ItemDay
                    key={i}
                    id={i}
                    day={day}
                    date={
                      finalDays &&
                      finalDays[i] &&
                      finalDays[i] !== null &&
                      finalDays[i]?.dayDate
                        ? finalDays[i]?.dayDate
                        : null
                    }
                    amount={
                      finalDays &&
                      finalDays[i] &&
                      finalDays[i] !== null &&
                      finalDays[i]?.dayTotal
                        ? finalDays[i]?.dayTotal
                        : 0
                    }
                  setVisibilityDay={handleVisibilityDay}
                  />
                ))}*/}
                </View>
                <View style={styles.containerAllEstadisticas}>
                  <View style={styles.containerEstadisticas}>
                    <View style={styles.containerTitleEstadisticas}>
                      <Text style={styles.styleTitleEstadisticas}>
                        Estadísticas de la semana
                      </Text>
                    </View>
                    <View style={styles.containerPromedioGastoSemanal}>
                      <View style={styles.containerIconPromedioGastoSemanal}>
                        <Fontisto name="bar-chart" size={34} color="#044C7C" />
                      </View>
                      <View style={styles.containerAllTextPromedioGastoSemanal}>
                        <View style={styles.containerTitlePromedioGastoSemanal}>
                          <Text style={styles.styleTitlePromedioGastoSemanal}>
                            Promedio de gasto semanal
                          </Text>
                        </View>
                        <View
                          style={styles.containerAmountPromedioGastoSemanal}
                        >
                          <Text
                            style={styles.styleAmountPromedioGastoSemanal}
                          ></Text>
                        </View>
                      </View>
                    </View>

                    {/*Comparacion Gasto Semanal*/}

                    <View style={styles.containerComparacionGastoSemanal}>
                      <View
                        style={styles.containerTitleComparacionGastoSemanal}
                      >
                        <Text style={styles.styleTitleComparacionGastoSemanal}>
                          Comparacion con la semana anterior
                        </Text>
                      </View>
                      <View>
                        <View
                          style={styles.containerAllTextComparacionGastoSemanal}
                        >
                          <View
                            style={
                              styles.containerAmountComparacionGastoSemanal
                            }
                          >
                            <Text
                              style={styles.styleAmountComparacionGastoSemanal}
                            ></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={styles.containerChart}>
                      <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        width={350}
                        height={350}
                      >
                        <VictoryBar
                          style={{ data: { fill: "#044C7C" } }}
                          data={[
                            { x: "Lunes", y: 1320 },
                            { x: "Martes", y: 230 },
                            { x: "Miercoles", y: 310 },
                            { x: "Jueves", y: 438 },
                            { x: "Viernes", y: 260 },
                            { x: "Sabado", y: 0 },
                            { x: "Domingo", y: 0 },
                          ]}
                          labels={({ datum }) => `$${datum.y}`}
                          labelComponent={<VictoryLabel dy={-10} />}
                        />
                      </VictoryChart>
                    </View>
                  </View>
                </View>
              </>
            )}
          </>
        )}
      </>
    </AnalyticsContainer>
  );
};

const styles = StyleSheet.create({
  styleTitleWeek: {
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
  styleDateWeeks: {
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
  containerDays: {
    height: "auto",
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#76BCD0",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerAllEstadisticas: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerEstadisticas: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
  },
  containerTitleEstadisticas: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 40,
  },
  styleTitleEstadisticas: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerPromedioGastoSemanal: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: "10%",
    paddingHorizontal: "9%",
    borderRadius: 20,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  containerIconPromedioGastoSemanal: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 5,
    padding: "5%",
    borderRadius: 10,
  },
  containerAllTextPromedioGastoSemanal: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  containerTitlePromedioGastoSemanal: {
    height: "auto",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  styleTitlePromedioGastoSemanal: {
    fontSize: 18,
    color: "#044C7C",
    fontWeight: "600",
    textAlign: "center",
  },
  containerAmountPromedioGastoSemanal: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#2584A0",
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  styleAmountPromedioGastoSemanal: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  containerComparacionGastoSemanal: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: "10%",
    paddingHorizontal: "9%",
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
  containerIconComparacionGastoSemanal: {
    height: "auto",
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
  },
  containerAllTextComparacionGastoSemanal: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "column",
  },
  containerTitleComparacionGastoSemanal: {
    height: "auto",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitleComparacionGastoSemanal: {
    fontSize: 18,
    color: "#044C7C",
    fontWeight: "600",
    textAlign: "center",
  },
  containerAmountComparacionGastoSemanal: {
    height: "auto",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#2584A0",
    paddingVertical: "5%",
    paddingHorizontal: "7%",
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  styleAmountComparacionGastoSemanal: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  containerChart: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: "10%",
    paddingHorizontal: "9%",
    borderRadius: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
});

export default Weeks;
