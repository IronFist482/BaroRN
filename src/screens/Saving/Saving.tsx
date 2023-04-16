import { View, StyleSheet, Text, ScrollView } from "react-native";

const Saving = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.styleTitle}>Semanal</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
  containerTitle: {
    height: 50,
    width: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  styleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default Saving;
