import { View, StyleSheet, Text } from "react-native";

const ItemIngreso = (props: {
  id: number;
  tipo: string;
  description: string;
  amount: number;
}) => {
  return (
    <View style={styles.containerIngreso}>
      <View>
        <Text>{props.tipo}</Text>
      </View>
      <View>
        <Text>{props.description}</Text>
      </View>
      <View>
        <Text>{props.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerIngreso: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 40,
    borderRadius: 20,
    padding: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
  },
});

export default ItemIngreso;
