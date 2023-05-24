import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export const Freemium = () => {
  return (
    <>
      <View style={styles.containerImage}>
        <Image
          source={require("../../../../assets/miPlanGeneral.png")}
          style={styles.styleImage}
        />
      </View>
    </>
  );
};

export default Freemium;

const styles = StyleSheet.create({
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  styleImage: {
    height: 320,
    width: 320,
  },
});
