import { View, StyleSheet, Text } from "react-native";

const ItemIngreso = (props: {
  id: number;
  tipo: string;
  description: string;
  amount: number;
}) => {
  return (
    <View style={styles.containerIngreso}>
      <Text>{props.tipo}</Text>
      <Text>{props.description}</Text>
      <Text>{props.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerIngreso: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
});

export default ItemIngreso;
