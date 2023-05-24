import { View, StyleSheet, Text, Platform } from "react-native";

const ItemIngreso = (props: {
  id: number;
  tipo: string;
  description: string;
  amount: number;
}) => {
  return (
    <View style={styles.containerIngreso}>
      <View style={styles.containerTipo}>
        <Text style={styles.styleTipo}>{props.tipo}</Text>
      </View>
      <View style={styles.containerDescription}>
        <Text style={styles.styleDescription}>{props.description}</Text>
      </View>
      <View style={styles.containerAmount}>
        <Text style={styles.styleAmount}>{`$${props.amount.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerIngreso: {
    height: "auto",
    width: "70%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: Platform.OS === "ios" ? 2 : 5, // Altura de la sombra dependiendo de la plataforma
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: Platform.OS === "android" ? 5 : 0,
  },
  containerTipo: {
    marginTop: 10,
    height: 30,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
  styleTipo: {
    fontWeight: "700",
    fontSize: 24,
    color: "#2584A0",
  },
  containerDescription: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  styleDescription: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
    color: "black",
  },
  containerAmount: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  styleAmount: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
    color: "#2584A0",
  },
});

export default ItemIngreso;
