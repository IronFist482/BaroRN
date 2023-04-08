import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Analytics = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2584A0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Analytics;
