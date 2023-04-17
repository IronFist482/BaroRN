//Este navegador es solo para que al iniciar la app cambie de la animación a la pantalla principal o login

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import SplashScreen from "@screens/Splash/Splash";

const Stack = createStackNavigator();

export default function SecundaryNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
