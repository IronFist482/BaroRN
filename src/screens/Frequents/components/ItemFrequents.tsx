import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ItemFrequents = () => {
  return (
    <View style={styles.container}>
      <Text>ItemFrequents</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "80%",
    backgroundColor: "#fff",
    marginTop: 30,
    marginHorizontal: "10%",
    borderRadius: 10,
    flexDirection: "column",
  },
});

export default ItemFrequents;
