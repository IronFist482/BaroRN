// AQUI VA EL MAIN NAVIGATOR, AQUI METERAN REACT NAVIGATION Y LLAMARAN LOS COMPONENTES DE @screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "@screens/Home/Home";
import ConfigScreen from "@screens/Config/Config";
import FrequentsScreen from "@screens/Frequents/Frequents";
import WeekScreen from "@screens/Analytics/Weeks/Weeks";
import SavingScreen from "@screens/Saving/Saving";
const Stack = createStackNavigator();

type RootStackParamListPriv = {
  Home: undefined;
  Analytics: {
    week?: string;
  };
  AnalyticsDay: {
    day?: string;
  };
  Frequents: undefined;
  Saving: undefined;
  Configuration: undefined;
};
export type MainRootStackParamList = NavigationProp<RootStackParamListPriv>;

const Tab = createBottomTabNavigator<RootStackParamListPriv>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          borderColor: "transparent",
          height: Platform.OS === "android" ? 60 : 100,
          elevation: 10,
        },
        headerStyle: {
          backgroundColor: "#fff",
          height: Platform.OS === "android" ? 100 : 100,
          elevation: 10,
        },
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 28,
          marginLeft: 10,
          color: "#044C7C",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={30}
              style={{ color: focused ? "#044C7C" : "#0008" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={WeekScreen}
        options={{
          title: "Análisis",
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="bar-graph"
              size={24}
              style={{ color: focused ? "#044C7C" : "#0008" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Frequents"
        component={FrequentsScreen}
        options={{
          title: "Frecuentes",
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="time"
              size={24}
              color="black"
              style={{ color: focused ? "#044C7C" : "#0008" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saving"
        component={SavingScreen}
        options={{
          title: "Plan de ahorro",
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="wallet"
              size={24}
              color="black"
              style={{ color: focused ? "#044C7C" : "#0008" }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Configuration"
        component={ConfigScreen}
        options={{
          title: "Configuración",
          tabBarLabel: () => <></>,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings"
              size={24}
              color="black"
              style={{ color: focused ? "#044C7C" : "#0008" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
