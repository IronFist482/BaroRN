import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ItemDay from "./ItemDay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
} from "victory-native";
import {
  FinalDay,
  GetSemanasResponse,
} from "@utils/types/Gastos/gastos-diarios";
import { useNavigate, useParams } from "react-router-dom";
import { getSemanas, getDay } from "@api/GastosServices";
import { setAnalytics } from "@store/gastos/gastos-slice";
import { RootState } from "@store/index";
import { DaysArray } from "@utils/types/Days";
import CircleCharge from "../../Components/CircleCharge";
import { simpleFormat } from "@utils/formatNumber";
import { useApi } from "@hooks/useApi";
import { GetDayResponse } from "../../../utils/types/Gastos/gastos-diarios";

const ContentInfo = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [infoWeek, setInfoWeek] = useState<string | null>(null);

  const analyticState = useSelector((s: RootState) => s.gastos.analytics);

  const finalDays = analyticState?.finalDays;
  const actualWeek = analyticState?.actualWeek;
  const weeksInfo = {
    prevWeek: analyticState?.prevWeek,
    nextWeek: analyticState?.nextWeek,
  };
  const stadisticInfo = analyticState?.stadisticInfo;

  const paramsWeek = useParams() as { week?: string };

  const [isError, setIsError] = useState<string>("");

  async function fetchSemanas() {
    setLoading(true);

    const { data, ok, message } = await getSemanas(paramsWeek.week);
    if (!ok || !data) {
      setIsError(message);
      setLoading(false);
      return console.log(message);
    }
    setIsError("");
    dispatch(setAnalytics(data));

    setLoading(false);
  }

  useEffect(() => {
    fetchSemanas();
    if (err) {
      Alert.alert(err);
    }
  }, []);

  const handleVisibilityDay = (id: number) => {
    setVisibilityDay(id);
  };

  const handleArrowsWeeks = (direction: "left" | "right") => {
    if (direction === "left") {
      if (weeksInfo.prevWeek) {
        setInfoWeek(weeksInfo.prevWeek);
      }
    } else {
      if (weeksInfo.nextWeek) {
        setInfoWeek(weeksInfo.nextWeek);
      }
    }
  };

  // -------------------- Días -------------------- //
  const [request, loadin, err, dataDay] = useApi(getDay);
  console.log({ dataDay });

  const paramsDays = useParams() as { day: string };

  useEffect(() => {
    fetchDays();
    if (err) {
      Alert.alert(err);
      setVisibilityDay(0);
    }
  }, []);

  const fetchDays = useCallback(async () => {
    const res = await request(paramsDays.day);
    console.log(JSON.stringify(res, null, 2));
  }, [paramsDays]);

  const gastosByDay = useMemo(() => {
    if (!dataDay) return [];
    return [
      {
        name: "Cantidad del Gasto",
        data: dataDay.gastosDia.map((d) => d.diaAmount),
      },
    ];
  }, [dataDay]);

  const handleArrowsDays = (direction: "left" | "right") => {
    const fn = () => {
      if (!dataDay) return;

      const { lastDay, nextDay } = dataDay.days;

      if (direction === "left") {
        if (!lastDay) return;
      } else {
        if (!nextDay) return;
      }
    };
    return fn;
  };

  return (
    <>
      {loading || !dataDay ? (
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
                {visibilityDay == 0 ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.viewArrows}
                      onPress={() => handleArrowsWeeks("left")}
                    >
                      <FontAwesome name="arrow-left" size={30} color="white" />
                    </TouchableOpacity>
                    <View>
                      <View>
                        <Text style={styles.styleTitleWeek}>{"Semana"}</Text>
                      </View>
                      <View>
                        <Text style={styles.styleDateWeeks}>
                          {actualWeek.replace("/", "---")}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.viewArrows}
                      onPress={() => handleArrowsWeeks("right")}
                    >
                      <FontAwesome name="arrow-right" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={[styles.viewArrows, { marginRight: "10%" }]}
                      >
                        <FontAwesome
                          name="arrow-left"
                          size={30}
                          color="white"
                        />
                      </TouchableOpacity>
                      <View>
                        <View>
                          <Text style={styles.styleTitleWeek}>
                            {`${dataDay?.dayName}`}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={styles.styleDateWeeks}
                          >{`Fecha del día`}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[styles.viewArrows, { marginLeft: "10%" }]}
                      >
                        <FontAwesome
                          name="arrow-right"
                          size={30}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <View style={styles.lineBalance} />

              {visibilityDay == 0 ? (
                <>
                  <View style={styles.containerDays}>
                    {DaysArray.map((day, i) => (
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
                    ))}
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
                              {simpleFormat(stadisticInfo?.avgWeek)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/*Comparacion Gasto Semanal*/}

                      <View style={styles.containerComparacionGastoSemanal}>
                        <View
                          style={styles.containerTitleComparacionGastoSemanal}
                        >
                          <Text
                            style={styles.styleTitleComparacionGastoSemanal}
                          >
                            Comparacion con la semana anterior
                          </Text>
                        </View>
                        <View>
                          <View
                            style={
                              styles.containerAllTextComparacionGastoSemanal
                            }
                          >
                            <View
                              style={
                                styles.containerAmountComparacionGastoSemanal
                              }
                            >
                              <Text
                                style={
                                  styles.styleAmountComparacionGastoSemanal
                                }
                              >
                                {simpleFormat(stadisticInfo?.vsLastWeek)}
                              </Text>
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
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.containerIconBack}
                    onPress={() => setVisibilityDay(0)}
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
                          <Text style={styles.styleAmountGastoTotal}>
                            {dataDay.avgDay === undefined ? dataDay.avgDay : 0}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[
                          styles.containerGastoTotal,
                          { marginLeft: "4%" },
                        ]}
                      >
                        <View style={styles.containerTitleGastoTotal}>
                          <Text style={styles.styleTitleGastoTotal}>
                            Total de Hoy
                          </Text>
                        </View>
                        <View style={styles.containerAmountGastoTotal}>
                          <Text style={styles.styleAmountGastoTotal}>
                            {dataDay.avgDay === undefined ? dataDay.avgDay : 0}
                          </Text>
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
                            <Text
                              style={styles.styleTitleInfoDay}
                            >{`${dataDay.diffDays}`}</Text>
                          </View>
                          <View style={styles.containerAmountInfoDay}>
                            <Text style={styles.styleAmountInfoDay}>{}</Text>
                          </View>
                        </View>
                        <View style={styles.containerOperator}>
                          <Text
                            style={[
                              styles.styleOperator,
                              dataDay.diffDays == 0
                                ? { color: "gray" }
                                : dataDay.diffDays < 0
                                ? { color: "green" }
                                : { color: "red" },
                            ]}
                          >
                            {dayBalance == dayBeforeBalance
                              ? "="
                              : dayBeforeBalance < dayBalance
                              ? "<"
                              : ">"}
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
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
  styleTitleWeek: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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
  containerTitleDays: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  styleTextTitleDays: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
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

  //Conternedor de todos los datos del dia
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

  //Estilos del gasto total
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

  //Estilos del gasto comparativo
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

  //Estilos de las estadisticas
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
});

export default ContentInfo;
