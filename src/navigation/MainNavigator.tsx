// AQUI VA EL MAIN NAVIGATOR, AQUI METERAN REACT NAVIGATION Y LLAMARAN LOS COMPONENTES DE @screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { Text } from "react-native";
// Screens
import HomeScreen from "@screens/Home/Home";
import MainScreen from "@screens/Main/Main";
import ConfigScreen from "@screens/Config/Config";
import FrequentsScreen from "@screens/Frequents/Frequents";
import AnalyticsScreen from "@screens/Analytics/Analytics";
const Tab = createBottomTabNavigator();
export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#044C7C" : "#0003" }}>
                Inicio
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="home"
                size={30}
                style={{ color: focused ? "#044C7C" : "#0003" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#044C7C" : "#0003" }}>
                Análisis
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="bar-graph"
                size={24}
                style={{ color: focused ? "#044C7C" : "#0003" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Frequents"
          component={FrequentsScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#044C7C" : "#0003" }}>
                Frecuentes
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="time"
                size={24}
                color="black"
                style={{ color: focused ? "#044C7C" : "#0003" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Config"
          component={ConfigScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#044C7C" : "#0003" }}>
                Config
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="settings"
                size={24}
                color="black"
                style={{ color: focused ? "#044C7C" : "#0003" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Signout"
          component={MainScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? "#044C7C" : "#0003" }}>
                Salir
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                name="logout"
                size={24}
                color="black"
                style={{ color: focused ? "#044C7C" : "#0003" }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
