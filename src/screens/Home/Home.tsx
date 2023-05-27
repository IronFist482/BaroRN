import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, ScrollView } from "react-native";
import GastosRecientes from "./components/GastosRecientes";
import AgregarIngreso from "./components/AgregarIngreso";
import AgregarGasto from "./components/AgregarGasto";
import { useEffect, useState } from "react";
import ModalIngresos from "./components/ModalIngresos";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useNavigation } from "@react-navigation/native";
import { simpleFormat } from "@utils/formatNumber";

const Home = () => {
  const [section, setSection] = useState<number>(0);

  const [balance, setBalance] = useState<number>(0);

  const navigation = useNavigation();

  let token = useSelector((state: RootState) => state.user).token;
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (token == null) {
      navigation.navigate("Signin");
    }
  }, [token]);
  useEffect(() => {
    setBalance(user.dataUser.datBalance);
  }, [user]);

  const setSectionUp = (e: number) => {
    setSection(e);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerBalance}>
        <View style={styles.containerTextBalance}>
          <Text style={styles.styleTextBalance}>{`$ ${simpleFormat(
            balance
          )}`}</Text>
        </View>
        <View style={styles.lineBalance} />
        <ModalIngresos setSectionUp={setSectionUp} reload={balance} />
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.containerButton}
          onPress={() => setSection(0)}
        >
          <Fontisto name="nav-icon-list-a" size={24} color="#2584A0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSection(1)}
          style={styles.containerButton}
        >
          <MaterialCommunityIcons name="cash-minus" size={40} color="#2584A0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSection(2)}
          style={styles.containerButton}
        >
          <MaterialCommunityIcons name="cash-plus" size={40} color="#2584A0" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerLine} />
      {section === 0 && <GastosRecientes setSectionUp={setSectionUp} />}
      {section === 1 && (
        <AgregarGasto balance={balance} setSectionUp={setSectionUp} />
      )}
      {section === 2 && <AgregarIngreso />}
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2584A0",
  },
  containerBalance: {
    height: "auto",
    width: "80%",
    backgroundColor: "#5FAABF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    borderColor: "#BFD4DA",
    borderWidth: 5,
    alignSelf: "center",
    /*shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
*/
    elevation: 10,
  },
  containerTextBalance: {
    height: 60,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 20,
  },
  styleTextBalance: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  lineBalance: {
    height: 5,
    width: "80%",
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  containerButtons: {
    height: 40,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    borderRadius: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  containerButton: {
    marginLeft: 20,
    marginRight: 20,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignSelf: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 10,
  },
  containerLine: {
    height: 5,
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 40,
    borderRadius: 10,
    alignSelf: "center",
    elevation: 5,
  },
});

export default Home;
