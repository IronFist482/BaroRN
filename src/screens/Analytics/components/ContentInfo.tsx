import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ItemDay from "./ItemDay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

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

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
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
  //Esta funcion es para que cambie el dia
  const handleVisibilityDay = async (day: number) => {
    setVisibilityDay(day);
  };

  return (
    <>
      <View style={styles.containerTitle}>
        {visibilityDay == 0 ? (
          <>
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
          </>
        ) : (
          <Text style={styles.styleTitleWeek}>{dayName}</Text>
        )}
      </View>

      {visibilityDay == 0 ? (
        <View>
          <View style={styles.lineBalance} />
          <View>
            <Text style={styles.styleTextTitleDays}>Días</Text>
          </View>

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
        </View>
      ) : (
        <View>
          <View style={styles.lineBalance} />
          <View>
            <Text style={styles.styleTextTitleDays}>Regresar</Text>
          </View>
          <TouchableOpacity
            style={styles.containerTitleDays}
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
            <View style={styles.containerData}>
              <View style={styles.containerGastoComparativo}>
                <View style={styles.containerTitleGastoComparativo}>
                  <Text style={styles.styleTitleGastoComparativo}>
                    Comparación con el día anterior
                  </Text>
                </View>
                <View style={styles.containerTextGastoComparativo}>
                  {dayBeforeBalance > dayBalance ? (
                    <>
                      <Text
                        style={styles.styleTextGastoComparativo}
                      >{`${dayBeforeName}: $${dayBeforeBalance} $${dayBalance}`}</Text>
                      <Text>
                        Gastaste menos que el {`${dayBeforeName.toLowerCase()}`}
                      </Text>
                    </>
                  ) : dayBeforeBalance == dayBalance ? (
                    <>
                      <Text
                        style={styles.styleTextGastoComparativo}
                      >{`${dayBeforeName}: $${dayBeforeBalance} $${dayBalance}`}</Text>
                      <Text>
                        Gastaste igual que el {`${dayBeforeName.toLowerCase()}`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        style={styles.styleTextGastoComparativo}
                      >{`${dayBeforeName}: $${dayBeforeBalance} $${dayBalance}`}</Text>
                      <Text>
                        Gastaste más que ayer {`${dayBeforeName.toLowerCase()}`}
                      </Text>
                    </>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.containerData}></View>
            <View style={styles.containerData}></View>
          </View>
        </View>
      )}

      <View>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
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
    marginTop: 20,
    borderRadius: 10,
    alignSelf: "center",
  },
  containerTitleDays: {
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
  styleTextTitleDays: {
    fontSize: 30,
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerAllData: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "column",
  },
  containerData: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
  },
  containerGastoTotal: {
    height: 120,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "white",
    marginRight: "5%",
  },

  containerGastoComparativo: {
    height: "auto",
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginLeft: "5%",
  },
  containerTitleGastoComparativo: {
    height: "auto",
    width: "100%",
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
  containerTextGastoComparativo: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  styleTextGastoComparativo: {
    fontSize: 17,
    fontWeight: "900",
    color: "gray",
    textAlign: "center",
  },
});

export default ContentInfo;
