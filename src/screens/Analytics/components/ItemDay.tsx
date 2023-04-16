import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ItemDay = ({
  id,
  name,
  date,
  balance,
  setVisibilityDay,
}: {
  id: number;
  name: string;
  date: string;
  balance: number;
  setVisibilityDay: Function;
}) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => setVisibilityDay(id)}>
      <View style={styles.containerName}>
        <Text style={styles.styleText}>{name}</Text>
      </View>
      <View style={styles.containerDate}>
        <Text style={styles.styleText}>{date}</Text>
      </View>
      <View style={styles.containerBalance}>
        <Text style={styles.styleText}>{`$ ${balance.toFixed(2)}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  containerName: {
    height: 50,
    width: "32%",
    justifyContent: "center",
    paddingLeft: 10,
  },
  containerDate: {
    height: 50,
    width: "38%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerBalance: {
    height: 50,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  styleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default ItemDay;
