import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, RefreshControl, View } from "react-native";
import { useState } from "react";

const AnalyticsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      {children}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
  },
});

export default AnalyticsContainer;
