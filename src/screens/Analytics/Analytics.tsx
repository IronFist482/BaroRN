import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ContentInfo from "@screens/Analytics/components/ContentInfo";
import { useState } from "react";

const Analytics = () => {
  return (
    <ScrollView style={styles.container}>
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

export default Analytics;
