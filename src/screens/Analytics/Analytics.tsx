import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ContentInfo from "@screens/Analytics/components/ContentInfo";
import { useState } from "react";

const Analytics = () => {
  const weeks = [
    {
      numWeek: 1,
      infoWeek: {
        id: 1,
        name: "Semana 1",
        initialDate: "2023-04-10",
        finalyDate: "2023-04-16",
        daysAllWeek: [
          {
            monday: {
              id: 1,
              name: "Lunes",
              date: "2023-04-10",
              balance: 1320,
            },
          },
          {
            tuesday: {
              id: 2,
              name: "Martes",
              date: "2023-04-11",
              balance: 230,
            },
          },
          {
            wednesday: {
              id: 3,
              name: "Miercoles",
              date: "2023-04-12",
              balance: 310,
            },
          },
          {
            thursday: {
              id: 4,
              name: "Jueves",
              date: "2023-04-13",
              balance: 438,
            },
          },
          {
            friday: {
              id: 5,
              name: "Viernes",
              date: "2023-04-14",
              balance: 260,
            },
          },
          {
            saturday: {
              id: 6,
              name: "Sabado",
              date: "2023-04-15",
              balance: 110,
            },
          },
          {
            sunday: {
              id: 7,
              name: "Domingo",
              date: "2023-04-16",
              balance: 0,
            },
          },
        ],
      },
    },
    {
      numWeek: 2,
      infoWeek: {
        id: 1,
        name: "Semana 2",
        initialDate: "2023-04-17",
        finalyDate: "2023-04-23",
        daysAllWeek: [
          {
            monday: {
              id: 1,
              name: "Lunes",
              date: "2023-04-17",
              balance: 300,
            },
          },
          {
            tuesday: {
              id: 2,
              name: "Martes",
              date: "2023-04-18",
              balance: 300,
            },
          },
          {
            wednesday: {
              id: 3,
              name: "Miercoles",
              date: "2023-04-19",
              balance: 557.5,
            },
          },
          {
            thursday: {
              id: 4,
              name: "Jueves",
              date: "2023-04-20",
              balance: 428.0,
            },
          },
          {
            friday: {
              id: 5,
              name: "Viernes",
              date: "2023-04-21",
              balance: 553.0,
            },
          },
          {
            saturday: {
              id: 6,
              name: "Sabado",
              date: "2023-04-22",
              balance: 236.0,
            },
          },
          {
            sunday: {
              id: 7,
              name: "Domingo",
              date: "2023-04-23",
              balance: 1326.0,
            },
          },
        ],
      },
    },
    {
      numWeek: 3,
      infoWeek: {
        id: 1,
        name: "Semana 3",
        initialDate: "2023-04-24",
        finalyDate: "2023-04-30",
        daysAllWeek: [
          {
            monday: {
              id: 1,
              name: "Lunes",
              date: "2023-04-24",
              balance: 100,
            },
          },
          {
            tuesday: {
              id: 2,
              name: "Martes",
              date: "2023-04-25",
              balance: 200,
            },
          },
          {
            wednesday: {
              id: 3,
              name: "Miercoles",
              date: "2023-04-26",
              balance: 300,
            },
          },
          {
            thursday: {
              id: 4,
              name: "Jueves",
              date: "2023-04-27",
              balance: 400,
            },
          },
          {
            friday: {
              id: 5,
              name: "Viernes",
              date: "2023-04-28",
              balance: 500,
            },
          },
          {
            saturday: {
              id: 6,
              name: "Sabado",
              date: "2023-04-29",
              balance: 600,
            },
          },
          {
            sunday: {
              id: 7,
              name: "Domingo",
              date: "2023-04-30",
              balance: 1000,
            },
          },
        ],
      },
    },
    {
      numWeek: 4,
      infoWeek: {
        id: 1,
        name: "Semana 4",
        initialDate: "2023-05-01",
        finalyDate: "2023-05-07",
        daysAllWeek: [
          {
            monday: {
              id: 1,
              name: "Lunes",
              date: "2023-05-01",
              balance: 100,
            },
          },
          {
            tuesday: {
              id: 2,
              name: "Martes",
              date: "2023-05-02",
              balance: 200,
            },
          },
          {
            wednesday: {
              id: 3,
              name: "Miercoles",
              date: "2023-05-03",
              balance: 300,
            },
          },
          {
            thursday: {
              id: 4,
              name: "Jueves",
              date: "2023-05-04",
              balance: 400,
            },
          },
          {
            friday: {
              id: 5,
              name: "Viernes",
              date: "2023-05-05",
              balance: 500,
            },
          },
          {
            saturday: {
              id: 6,
              name: "Sabado",
              date: "2023-05-06",
              balance: 600,
            },
          },
          {
            sunday: {
              id: 7,
              name: "Domingo",
              date: "2023-05-07",
              balance: 1000,
            },
          },
        ],
      },
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <ContentInfo weeks={weeks} />
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
  lineBalance: {
    height: 5,
    width: "80%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default Analytics;
