import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import ItemDay from "./ItemDay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
} from "victory-native";

const ContentInfo = ({ weeks }: any) => {
  const numActualWeek = weeks.length - 1;
  const [week, setWeek] = useState(numActualWeek);
  const [infoCompleteBeforeWeek, setInfoCompleteBeforeWeek] = useState(
    weeks[week].infoWeek.daysAllWeek
  );
  const infoCompleteLastWeek = weeks[week].infoWeek.daysAllWeek;

  //Esta variable es para que me muestre los datos de los dias de la semana anterior
  const daysBefore = [
    infoCompleteBeforeWeek[0].monday,
    infoCompleteBeforeWeek[1].tuesday,
    infoCompleteBeforeWeek[2].wednesday,
    infoCompleteBeforeWeek[3].thursday,
    infoCompleteBeforeWeek[4].friday,
    infoCompleteBeforeWeek[5].saturday,
    infoCompleteBeforeWeek[6].sunday,
  ];

  //Esta variable es para que me muestre los datos de los dias de la semana actual
  const days = [
    infoCompleteLastWeek[0].monday,
    infoCompleteLastWeek[1].tuesday,
    infoCompleteLastWeek[2].wednesday,
    infoCompleteLastWeek[3].thursday,
    infoCompleteLastWeek[4].friday,
    infoCompleteLastWeek[5].saturday,
    infoCompleteLastWeek[6].sunday,
  ];

  //Esta variable es para que dentro de la funcion handleVisibilityDay guarde el dia
  const [visibilityDay, setVisibilityDay] = useState(0);

  //Esta variable es para que me muestre los datos de los nombres de las semanas
  const [weekName, setWeekName] = useState(weeks[week].infoWeek.name);

  //Esta variable recibe los datos del día anterior
  const [dayBeforeName, setDayBeforeName] = useState("");
  const [dayBeforeDate, setDayBeforeDate] = useState(0);
  const [dayBeforeBalance, setDayBeforeBalance] = useState(0);

  //Estas variables son para que me muestre los datos del día
  const [dayId, setDayId] = useState(days[0].id);
  const [dayName, setDayName] = useState(days[0].name);
  const [dayDate, setDayDate] = useState(days[0].date);
  const [dayBalance, setDayBalance] = useState(days[0].balance);

  //Esta funcion es para que me cambie el nombre de la semana
  useEffect(() => {
    setWeekName(weeks[week].infoWeek.name);
  }, [week]);

  //Esta funcion es para que me cambie el nombre del dia
  useEffect(() => {
    if (visibilityDay == 0) {
      setDayId(days[visibilityDay].id);
      setDayName(days[visibilityDay].name);
      setDayDate(days[visibilityDay].date);
      setDayBalance(days[visibilityDay].balance);
    } else {
      setDayId(days[visibilityDay - 1].id);
      setDayName(days[visibilityDay - 1].name);
      setDayDate(days[visibilityDay - 1].date);
      setDayBalance(days[visibilityDay - 1].balance);
      if (week > 0) {
        setInfoCompleteBeforeWeek(weeks[week - 1].infoWeek.daysAllWeek);
        if (visibilityDay == 1) {
          setDayBeforeName(daysBefore[6].name);
          setDayBeforeDate(daysBefore[6].date);
          setDayBeforeBalance(daysBefore[6].balance);
        } else {
          setDayBeforeName(days[visibilityDay - 2].name);
          setDayBeforeDate(days[visibilityDay - 2].date);
          setDayBeforeBalance(days[visibilityDay - 2].balance);
        }
      } else {
        setInfoCompleteBeforeWeek(weeks[week].infoWeek.daysAllWeek);
        setDayBeforeName("No hay datos");
        setDayBeforeDate(0);
        setDayBeforeBalance(0);
      }
    }
  }, [visibilityDay]);

  //Esta funcion es para que me cambie la semana a una anterior
  const handleChangeWeekLess = () => {
    if (week == 0) {
      setWeek(0);
    } else {
      setWeek(week - 1);
    }
  };

  //Esta funcion es para que me cambie la semana a una posterior
  const handleChangeWeekMore = () => {
    if (week == numActualWeek) {
      setWeek(numActualWeek);
    } else {
      setWeek(week + 1);
    }
  };

  const handleChangeDayLess = () => {
    if (dayId == 1) {
      setVisibilityDay(dayId);
    } else {
      setVisibilityDay(dayId - 1);
    }
  };
  const handleChangeDayMore = () => {
    if (dayId == 7) {
      setVisibilityDay(dayId);
    } else {
      setVisibilityDay(dayId + 1);
    }
  };
  //Esta funcion es para que cambie el dia
  const handleVisibilityDay = async (day: number) => {
    setVisibilityDay(day);
  };
  const [colorOperator, setColorOperator] = useState("");

  return (
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
              onPress={() => handleChangeWeekLess()}
            >
              <FontAwesome name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
            <View>
              <View>
                <Text style={styles.styleTitleWeek}>{weekName}</Text>
              </View>
              <View>
                <Text
                  style={styles.styleDateWeeks}
                >{`${weeks[week].infoWeek.initialDate} --- ${weeks[week].infoWeek.finalyDate}`}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.viewArrows}
              onPress={() => handleChangeWeekMore()}
            >
              <FontAwesome name="arrow-right" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.viewArrows, { marginRight: "10%" }]}
                onPress={() => handleChangeDayLess()}
              >
                <FontAwesome name="arrow-left" size={30} color="white" />
              </TouchableOpacity>
              <View>
                <View>
                  <Text style={styles.styleTitleWeek}>{dayName}</Text>
                </View>
                <View>
                  <Text style={styles.styleDateWeeks}>{`${dayDate}`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.viewArrows, { marginLeft: "10%" }]}
                onPress={() => handleChangeDayMore()}
              >
                <FontAwesome name="arrow-right" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <View style={styles.lineBalance} />

      {visibilityDay == 0 ? (
        <>
          <View style={styles.containerDays}>
            {days.map((item: any) => (
              <ItemDay
                key={item.id}
                id={item.id}
                name={item.name}
                date={item.date}
                balance={item.balance}
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
                  <Fontisto name="bar-chart" size={34} color="#044C7C" />
                </View>
                <View style={styles.containerAllTextPromedioGastoSemanal}>
                  <View style={styles.containerTitlePromedioGastoSemanal}>
                    <Text style={styles.styleTitlePromedioGastoSemanal}>
                      Promedio de gasto semanal
                    </Text>
                  </View>
                  <View style={styles.containerAmountPromedioGastoSemanal}>
                    <Text style={styles.styleAmountPromedioGastoSemanal}>
                      $1000000.000
                    </Text>
                  </View>
                </View>
              </View>

              {/*Comparacion Gasto Semanal*/}

              <View style={styles.containerComparacionGastoSemanal}>
                <View style={styles.containerTitleComparacionGastoSemanal}>
                  <Text style={styles.styleTitleComparacionGastoSemanal}>
                    Comparacion con la semana anterior
                  </Text>
                </View>
                <View>
                  <View style={styles.containerAllTextComparacionGastoSemanal}>
                    <View>
                      <Text>Nombre Semana</Text>
                    </View>
                    <View style={styles.containerAmountComparacionGastoSemanal}>
                      <Text style={styles.styleAmountComparacionGastoSemanal}>
                        $1000000.000
                      </Text>
                    </View>
                  </View>
                  <View
                    style={styles.containerIconComparacionGastoSemanal}
                  ></View>
                  <View style={styles.containerAllTextComparacionGastoSemanal}>
                    <Text>Nombre Semana</Text>
                    <View style={styles.containerAmountComparacionGastoSemanal}>
                      <Text style={styles.styleAmountComparacionGastoSemanal}>
                        $1000000.000
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/*<View style={styles.containerChart}>
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
                  </View>*/}
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
              <View style={[styles.containerGastoTotal, { marginRight: "4%" }]}>
                <View style={styles.containerTitleGastoTotal}>
                  <Text style={styles.styleTitleGastoTotal}>Total de Ayer</Text>
                </View>
                <View style={styles.containerAmountGastoTotal}>
                  <Text
                    style={styles.styleAmountGastoTotal}
                  >{`$${dayBeforeBalance.toFixed(2)}`}</Text>
                </View>
              </View>
              <View style={[styles.containerGastoTotal, { marginLeft: "4%" }]}>
                <View style={styles.containerTitleGastoTotal}>
                  <Text style={styles.styleTitleGastoTotal}>Total de Hoy</Text>
                </View>
                <View style={styles.containerAmountGastoTotal}>
                  <Text
                    style={styles.styleAmountGastoTotal}
                  >{`$${dayBalance.toFixed(2)}`}</Text>
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
                    >{`${dayBeforeName}`}</Text>
                  </View>
                  <View style={styles.containerAmountInfoDay}>
                    <Text
                      style={styles.styleAmountInfoDay}
                    >{`$${dayBeforeBalance.toFixed(2)}`}</Text>
                  </View>
                </View>
                <View style={styles.containerOperator}>
                  <Text
                    style={[
                      styles.styleOperator,
                      dayBalance == dayBeforeBalance
                        ? { color: "gray" }
                        : dayBeforeBalance < dayBalance
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
                    <Text style={styles.styleTitleInfoDay}>{`${dayName}`}</Text>
                  </View>
                  <View style={styles.containerAmountInfoDay}>
                    <Text
                      style={styles.styleAmountInfoDay}
                    >{`$${dayBalance.toFixed(2)}`}</Text>
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
    width: "80%",
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
    fontWeight: "600",
    textAlign: "center",
  },
  containerAmountPromedioGastoSemanal: {
    height: "auto",
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
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
    color: "#044C7C",
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
    fontWeight: "600",
    textAlign: "center",
  },
  containerAmountComparacionGastoSemanal: {
    height: "auto",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingVertical: "5%",
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  styleAmountComparacionGastoSemanal: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#044C7C",
  },
});

export default ContentInfo;
