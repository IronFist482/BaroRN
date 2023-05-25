import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SecondaryRootStackParamList } from "@navigation/SecundaryNavigator";

export default function Splash() {
  const navigation = useNavigation<SecondaryRootStackParamList>();
  const [timer, setTimer] = useState(0);
  useFocusEffect(
    useCallback(() => {
      // Agrega un setTimeout para que después de 2 segundos se muestre la pantalla principal
      setTimeout(() => {
        // Navega a la pantalla principal
        navigation.navigate("Signin");
      }, 2000);

      // Devuelve una función para cancelar el temporizador si la pantalla pierde el enfoque
      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={require("../../../assets/icon.png")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2584A0",
    alignItems: "center",
    justifyContent: "center",
  },
  containerImage: {
    height: 200,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 160,
  },
});
