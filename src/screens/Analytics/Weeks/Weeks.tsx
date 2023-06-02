import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import CircleCharge from "@screens/Components/CircleCharge";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ItemDay from "../components/ItemDay";
import { simpleFormat } from "@utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/index";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryPie,
  VictoryLegend,
} from "victory-native";
import { getSemanas } from "@api/GastosServices";
import { setAnalytics } from "@store/gastos/gastos-slice";
import { useParams } from "react-router-dom";
import { useNavigation } from "@react-navigation/native";
import AnalyticsContainer from "../Analytics";
import { DaysArray } from "@utils/types/Days";
import { colors } from "@utils/colors";
import { ScrollView } from "react-native";

const Weeks = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const dispatch = useDispatch();
  const params = useParams() as { week?: string };
  const navigation = useNavigation();
  const [estadisticas, setEstadisticas] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const week = useSelector((s: RootState) => s.gastos.analytics);
  const analyticState = useSelector((s: RootState) => s.gastos.analytics);
  const finalDays = analyticState?.finalDays;

  const weeksInfo = {
    prevWeek: analyticState?.prevWeek,
    nextWeek: analyticState?.nextWeek,
  };

  const fetchWeeks = useCallback(async () => {
    setLoading(true);
    const { data, ok, message } = await getSemanas(params.week);
    if (!data) {
      setLoading(false);
      return setIsError("Error al obtener semanas");
    }
    console.log("data.weeks ->", data);
    dispatch(setAnalytics(data));
    setLoading(false);
  }, [week]);

  useEffect(() => {
    fetchWeeks();
  }, [params.week]);

  const handleArrows = (direction: "left" | "right") => {
    if (direction === "left") {
      if (!weeksInfo.prevWeek) return;
      navigation.navigate("Analytics", { week: weeksInfo.prevWeek });
    } else {
      if (!weeksInfo.nextWeek) return;
      navigation.navigate("Analytics", { week: weeksInfo.nextWeek });
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    });
    fetchWeeks();
  }, []);

  const dataGraphics = [
    { x: "Lun", y: finalDays[0].dayTotal },
    { x: "Mar", y: finalDays[1].dayTotal },
    { x: "Mie", y: finalDays[2].dayTotal },
    { x: "Jue", y: finalDays[3].dayTotal },
    { x: "Vie", y: finalDays[4].dayTotal },
    { x: "Sab", y: finalDays[5].dayTotal },
    { x: "Dom", y: finalDays[6].dayTotal },
  ];

  return (
    <AnalyticsContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
                      onPress={() => handleArrows("left")}
                    >
                      <FontAwesome name="arrow-left" size={30} color="white" />
                    </TouchableOpacity>
                    <View>
                      <View>
                        <Text style={styles.styleTitleWeek}>{"Semana"}</Text>
                      </View>
                      <View>
                        <Text style={styles.styleDateWeeks}>
                          {week?.actualWeek}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.viewArrows}
                      onPress={() => handleArrows("right")}
                    >
                      <FontAwesome name="arrow-right" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lineBalance} />
                <View style={styles.containerDays}>
                  {DaysArray.map((day, i) => (
                    <ItemDay
                      key={i}
                      id={finalDays[i].dayId}
                      day={day}
                      date={finalDays[i].dayDate}
                      amount={finalDays[i].dayTotal}
                    />
                  ))}
                </View>
                {estadisticas ? (
                  <>
                    <View style={styles.containerEstadisticas}>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          style={[styles.viewArrows, { marginTop: 0 }]}
                          onPress={() => setEstadisticas(!estadisticas)}
                        >
                          <FontAwesome
                            name="arrow-left"
                            size={26}
                            color="white"
                          />
                        </TouchableOpacity>
                        <View>
                          <Text style={styles.styleTitleWeek}>
                            {"Gráficas"}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.viewArrows, { marginTop: 0 }]}
                          onPress={() => setEstadisticas(!estadisticas)}
                        >
                          <FontAwesome
                            name="arrow-right"
                            size={26}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={[styles.lineBalance, { marginBottom: 10 }]}
                      />
                      <View
                        style={[
                          styles.containerAllEstadistics,
                          { paddingVertical: 10 },
                        ]}
                      >
                        <View style={styles.containerChart}>
                          <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={20}
                            width={320}
                            height={330}
                          >
                            <VictoryBar
                              barRatio={0.8}
                              style={{
                                data: {
                                  fill: ({ datum }) =>
                                    datum.y > 100 && datum.y < 200
                                      ? colors.blue_2
                                      : datum.y > 200
                                      ? colors.blue_1
                                      : colors.blue_3,
                                },
                              }}
                              data={dataGraphics}
                              labels={({ datum }) => `$${datum.y}`}
                              labelComponent={<VictoryLabel dy={-10} />}
                              cornerRadius={{ top: 3 }}
                            />
                          </VictoryChart>
                        </View>
                        <View style={styles.containerVictoryPie}>
                          <VictoryPie
                            colorScale={[
                              "#044C7C",
                              "#0B6E9C",
                              "#0F8FB8",
                              "#13A1D4",
                              "#17C0EB",
                              "#1CD9FF",
                              "#1CD9FF",
                            ]}
                            data={dataGraphics}
                            width={250}
                            height={250}
                            innerRadius={40}
                            style={{
                              labels: {
                                fontSize: 15,
                                fill: "white",
                                fontWeight: "bold",
                              },
                            }}
                          />

                          <VictoryLegend
                            orientation="horizontal"
                            data={[
                              { name: "Lun", symbol: { fill: "#044C7C" } },
                              { name: "Mar", symbol: { fill: "#0B6E9C" } },
                              {
                                name: "Mié",
                                symbol: { fill: "#0F8FB8" },
                              },
                              { name: "Jue", symbol: { fill: "#13A1D4" } },
                              { name: "Vie", symbol: { fill: "#17C0EB" } },
                              { name: "Sáb", symbol: { fill: "#1CD9FF" } },
                              { name: "Dom", symbol: { fill: "#1CD9FF" } },
                            ]}
                            colorScale={[
                              "#044C7C",
                              "#0B6E9C",
                              "#0F8FB8",
                              "#13A1D4",
                              "#17C0EB",
                              "#1CD9FF",
                              "#1CD9FF",
                            ]}
                            style={{
                              labels: {
                                fontSize: 14,
                              },
                              title: { fontSize: 20 },
                            }}
                            height={130}
                            title="Días"
                            centerTitle
                            gutter={20}
                            x={97}
                            borderPadding={{ top: 0, bottom: 0 }}
                            itemsPerRow={3}
                          />
                        </View>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.containerEstadisticas}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={[styles.viewArrows, { marginTop: 0 }]}
                        onPress={() => setEstadisticas(!estadisticas)}
                      >
                        <FontAwesome
                          name="arrow-left"
                          size={26}
                          color="white"
                        />
                      </TouchableOpacity>
                      <View>
                        <Text style={styles.styleTitleWeek}>
                          {"Estadísticas"}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[styles.viewArrows, { marginTop: 0 }]}
                        onPress={() => setEstadisticas(!estadisticas)}
                      >
                        <FontAwesome
                          name="arrow-right"
                          size={26}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={[styles.lineBalance, { marginBottom: 10 }]} />
                    <View style={styles.containerAllEstadistics}>
                      <View style={styles.containerPromedioGastoSemanal}>
                        <View style={styles.containerIconPromedioGastoSemanal}>
                          <Fontisto
                            name="bar-chart"
                            size={34}
                            color="#044C7C"
                          />
                        </View>
                        <View
                          style={styles.containerAllTextPromedioGastoSemanal}
                        >
                          <View
                            style={styles.containerTitlePromedioGastoSemanal}
                          >
                            <Text style={styles.styleTitlePromedioGastoSemanal}>
                              Promedio de gasto semanal
                            </Text>
                          </View>
                          <View
                            style={styles.containerAmountPromedioGastoSemanal}
                          >
                            <Text
                              style={styles.styleAmountPromedioGastoSemanal}
                            >
                              {`$${simpleFormat(week.stadisticInfo.avgWeek)}`}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/*Comparacion Gasto Semanal*/}

                      <View style={styles.containerComparacionGastoSemanal}>
                        <View style={styles.containerIconPromedioGastoSemanal}>
                          <Fontisto
                            name="bar-chart"
                            size={34}
                            color="#044C7C"
                          />
                        </View>
                        <View
                          style={styles.containerAllTextComparacionGastoSemanal}
                        >
                          <View
                            style={styles.containerTitleComparacionGastoSemanal}
                          >
                            <Text
                              style={styles.styleTitleComparacionGastoSemanal}
                            >
                              Comparacion con la semana anterior
                            </Text>
                          </View>
                          <View
                            style={
                              styles.containerAmountComparacionGastoSemanal
                            }
                          >
                            <Text
                              style={styles.styleAmountComparacionGastoSemanal}
                            >
                              {`$${week.stadisticInfo.vsLastWeek}`}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.containerAllEstadisticas}></View>
              </>
            )}
          </>
        )}
      </ScrollView>
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
    marginBottom: 40,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#76BCD0",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerAllEstadisticas: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
  },
  containerEstadisticas: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    flexDirection: "column",
  },
  containerTitleEstadisticas: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitleEstadisticas: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerAllEstadistics: {
    height: "auto",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#76BCD0",
    paddingVertical: 20,
  },
  containerPromedioGastoSemanal: {
    height: "auto",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: "9%",
    borderRadius: 20,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: colors.white_1,
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
    width: "auto",
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
    paddingHorizontal: 10,
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
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 20,
    paddingHorizontal: "9%",
    borderRadius: 20,
    elevation: 5,
    flexDirection: "row",
    backgroundColor: colors.white_1,
  },
  containerIconComparacionGastoSemanal: {
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
    width: "80%",
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
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#2584A0",
    paddingVertical: "5%",
    paddingHorizontal: 10,
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
    width: "85%",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: -20,
    paddingLeft: 30,
    borderRadius: 20,
    marginVertical: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
  containerVictoryPie: {
    height: "auto",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 20,
    marginVertical: 20,
    elevation: 5,
    backgroundColor: "#fff",
  },
});

export default Weeks;
