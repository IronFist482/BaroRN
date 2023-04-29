import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Profiles = () => {
  const navigation = useNavigation();
  const handlerPress = () => {
    navigation.navigate("MainNavigator");
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.styleTitle}> Elige tu Perfil </Text>
      </View>

      <ScrollView style={{ width: "100%", marginBottom: 40, marginTop: 20 }}>
        <TouchableOpacity
          onPress={handlerPress}
          style={styles.containerProfile}
        >
          <View style={styles.containerIcon}>
            <FontAwesome name="university" size={80} color="white" />
          </View>
          <View style={styles.containerTextGeneralProfile}>
            <View style={styles.containerTitleProfile}>
              <Text style={styles.styleTitleProfile}>Estudiante</Text>
            </View>
            <View style={styles.containerDescriptionProfile}>
              <Text style={styles.styleDescriptionProfile}>
                En este perfil encontrarás gastos como transporte, telefonía y
                alimentos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlerPress}
          style={styles.containerProfile}
        >
          <View style={styles.containerIcon}>
            <FontAwesome name="briefcase" size={80} color="white" />
          </View>
          <View style={styles.containerTextGeneralProfile}>
            <View style={styles.containerTitleProfile}>
              <Text style={styles.styleTitleProfile}>Trabajador</Text>
            </View>
            <View style={styles.containerDescriptionProfile}>
              <Text style={styles.styleDescriptionProfile}>
                En este perfil encontrarás gastos como renta y alimentos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlerPress}
          style={styles.containerProfile}
        >
          <View style={styles.containerIcon}>
            <MaterialCommunityIcons name="home-city" size={80} color="white" />
          </View>
          <View style={styles.containerTextGeneralProfile}>
            <View style={styles.containerTitleProfile}>
              <Text style={[styles.styleTitleProfile, { marginTop: -15 }]}>
                Administrador Doméstico
              </Text>
            </View>
            <View style={styles.containerDescriptionProfile}>
              <Text style={styles.styleDescriptionProfile}>
                En este perfil encontrarás gastos como despensa, luz y agua
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlerPress}
          style={styles.containerProfile}
        >
          <View style={styles.containerIcon}>
            <FontAwesome5 name="user-edit" size={80} color="white" />
          </View>
          <View style={styles.containerTextGeneralProfile}>
            <View style={styles.containerTitleProfile}>
              <Text style={styles.styleTitleProfile}>Personalizado</Text>
            </View>
            <View style={styles.containerDescriptionProfile}>
              <Text style={styles.styleDescriptionProfile}>
                En este perfil no encontrarás gastos predefinidos
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerTitle: {
    paddingTop: 40,
    height: 110,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2584A0",
  },
  styleTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  containerTextSecundary: {
    marginTop: 50,
    width: 400,
  },
  styleTextSecundary: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  containerProfile: {
    marginTop: 30,
    width: 350,
    height: 180,
    backgroundColor: "#2584A0",
    borderRadius: 22,
    flexDirection: "row",
    alignSelf: "center",
  },
  containerIcon: {
    height: 110,
    width: 110,
    marginLeft: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
  },
  containerTextGeneralProfile: {
    marginLeft: 5,
    width: 200,
    height: 180,
    alignItems: "center",
  },
  containerTitleProfile: {
    width: "auto",
    marginTop: 30,
  },
  styleTitleProfile: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  containerDescriptionProfile: {
    marginVertical: 20,
    width: "90%",
    height: "auto",
  },
  styleDescriptionProfile: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "justify",
    color: "#fff",
  },
});

export default Profiles;
