//Este navegador es solo para que al iniciar la app cambie de la animación a la pantalla principal o login

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./MainNavigator";
import SplashScreen from "@screens/Splash/Splash";
import SigninScreen from "@screens/Forms/Signin/Signin";
import SignupScreen from "@screens/Forms/Signup/Signup";
import ProfilesScreen from "@screens/Forms/Signup/Profiles";
import SelectImageScreen from "@screens/Forms/Signup/SelectImage";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const Stack = createStackNavigator();

import { persistor, store } from "@store/index";

export default function SecundaryNavigator() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SelectImage" component={SelectImageScreen} />
            <Stack.Screen name="Profiles" component={ProfilesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
