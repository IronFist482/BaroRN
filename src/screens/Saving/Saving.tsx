import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Freemium from "./components/Freemium";
import Premium from "./components/Premium";
import { useState } from "react";
import colors from "@utils/colors";
import { color } from "@rneui/base";

const Saving = () => {
  const [typeUser, setTypeUser] = useState<number>(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setTypeUser(typeUser == 0 ? 1 : 0)}
        style={styles.containerBottom}
      >
        <Text style={styles.styleBottom}>Change View</Text>
      </TouchableOpacity>
      <View style={styles.containerSection}>
        {typeUser == 0 ? <Freemium /> : <Premium />}
      </View>
      <TouchableOpacity style={styles.containerSubscripción}>
        <Text style={styles.styleSubscription}>
          Necesitas tener la suscripción "IA"
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#2584A0",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBottom: {
    height: 50,
    width: "auto",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  styleBottom: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.blue_2,
  },
  containerSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerSubscripción: {
    marginTop: 60,
    alignSelf: "center",
    width: "71%",
  },
  styleSubscription: {
    fontSize: 30,
    fontWeight: "600",
    color: colors.white_1,
    textAlign: "center",
  },
});

export default Saving;
