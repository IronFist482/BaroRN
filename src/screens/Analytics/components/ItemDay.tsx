import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface Expday {
  id: number | null;
  day: string | null;
  date: string | null | undefined;
  amount: number | undefined;
  setVisibilityDay: Function;
}

const ItemDay = ({ id, day, date, amount, setVisibilityDay }: Expday) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => setVisibilityDay(id)}>
      <View style={styles.containerName}>
        <Text style={styles.styleText}>{day}</Text>
      </View>
      <View>
        <Text style={styles.styleSeparator}>|</Text>
      </View>
      <View style={styles.containerDate}>
        <Text style={styles.styleText}>{date}</Text>
      </View>
      <View>
        <Text style={styles.styleSeparator}>|</Text>
      </View>
      <View style={styles.containerBalance}>
        <Text style={styles.styleText}>{`$ ${Number(amount)}`}</Text>
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
    elevation: 6,
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
  styleSeparator: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2584A0",
  },
});

export default ItemDay;
