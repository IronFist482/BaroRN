// AQUI VA EL MAIN NAVIGATOR, AQUI METERAN REACT NAVIGATION Y LLAMARAN LOS COMPONENTES DE @screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { Text, StyleSheet } from "react-native";
// Screens
import HomeScreen from "@screens/Home/Home";
import ConfigScreen from "@screens/Config/Config";
import FrequentsScreen from "@screens/Frequents/Frequents";
import AnalyticsScreen from "@screens/Analytics/Analytics";
const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#fff",
            borderColor: "transparent",
            height: 60,
          },
          headerStyle: {
            backgroundColor: "#fff",
            height: 100,
          },
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 23,
            marginLeft: 10,
            color: "#044C7C",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
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
          component={AnalyticsScreen}
          options={{
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
          name="Config"
          component={ConfigScreen}
          options={{
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
    </NavigationContainer>
  );
}
