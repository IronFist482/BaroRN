import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const AnalyticsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView style={styles.container}>
      {children}
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

export default AnalyticsContainer;
