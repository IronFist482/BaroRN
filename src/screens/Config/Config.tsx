import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Config = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
});

export default Config;
