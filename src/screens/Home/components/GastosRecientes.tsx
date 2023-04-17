import { StyleSheet, Text, View } from "react-native";
import Item from "./Item";

const GastosRecientes = (props: { data: any[] }) => {
  const { data } = props;
  return (
    <View style={styles.containerSection}>
      <View style={styles.containerTitle}>
        <Text style={styles.styleTitle}>Gastos Recientes</Text>
      </View>
      <View style={styles.containerRecent}>
        {data.map((item: any) => (
          <Item
            key={item.id}
            id={item.id}
            icon={item.icon}
            name={item.name}
            description={item.description}
            amount={item.amount}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSection: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
    alignSelf: "center",
  },
  containerTitle: {
    height: "auto",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  containerRecent: {
    height: "auto",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "#76BCD0",
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default GastosRecientes;
