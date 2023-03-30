import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Home = () => {
  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={{ flex: 1 }}
    >
      <Text style={styles.container}>Home</Text>
      {/* Aquí dentro irían los elementos que quieres que se muestren encima del fondo de gradiente */}
      <StatusBar style="auto" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
