import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { colors } from "@utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

const ConfigSubscription = ({ section }: { section: Function }) => {
  const [numInfo, setNumInfo] = useState<number>(1);
  const infoSubscriptions = [
    {
      name: "Essentials",
      price: 4.99,
      lista: [
        "Gastos diarios ilimitados",
        "Ingresos ilimitados",
        "Gastos frecuentes ilimitados",
        "Edita tu perfil cuando quieras",
        'Acceso a "Vaciar Cuenta"',
      ],
      value: 0,
      image: require("../../../../assets/Puerco1.png"),
    },
    {
      name: "IA",
      price: 7.99,
      lista: [
        "Ventajas de Essentials",
        "Clasificacion de gastos",
        "Predicciones",
        "Plan de ahorro",
      ],
      value: 1,
      image: require("../../../../assets/Puerco3.png"),
    },
    {
      name: "Family",
      price: 9.99,
      lista: [
        "Ventajas de Essentials",
        "Vinculacion de cuentas",
        "Creacion de cuentas",
        "Creacion y gestion de cuentas Junior",
        "Acceso a datos en conjunto",
      ],
      value: 2,
      image: require("../../../../assets/Puerco4.png"),
    },
    {
      name: "Deluxe",
      price: 11.99,
      lista: ["Ventajas de Essentials", "Ventajas de IA", "Ventajas de Family"],
      value: 3,
      image: require("../../../../assets/Puerco2.png"),
    },
  ];
  const width = Dimensions.get("window").width;

  return (
    <>
      <View style={styles.containerSubscriptionComplete}>
        <View style={styles.containerTitleSubscription}>
          <Text style={[styles.styleTitleSubscription]}>Mi Suscripcion</Text>
        </View>
        <View
          style={[styles.containerImage, { backgroundColor: colors.blue_3 }]}
        >
          <View style={styles.containerTitleMySubscription}>
            <Text
              style={styles.styleTitleMySubscription}
            >{`Baro ${infoSubscriptions[numInfo].name}`}</Text>
          </View>
          <Image
            source={infoSubscriptions[numInfo].image}
            style={styles.imageSizePig}
          />

          <View>
            {infoSubscriptions[numInfo].lista.map((item, i) => (
              <View style={styles.containerMapInfoSubscriptions} key={i}>
                <FontAwesome5 name="check" size={18} color={colors.blue_1} />
                <Text style={styles.styleMapInfoSubscriptions}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View
        style={[styles.containerSubscriptionComplete, { paddingBottom: 30 }]}
      >
        <View style={styles.containerTitleSubscription}>
          <Text style={styles.styleTitleSubscription}>Otras Suscripciones</Text>
          <Carousel
            loop
            width={width * 0.7}
            height={600}
            autoPlay={true}
            data={infoSubscriptions}
            scrollAnimationDuration={3000}
            renderItem={({ index }) => (
              <View style={styles.containerImageCarrousel}>
                <View style={styles.containerTitleMySubscription}>
                  <Text
                    style={styles.styleTitleMySubscription}
                  >{`Baro ${infoSubscriptions[index].name}`}</Text>
                </View>
                <Image
                  source={infoSubscriptions[index].image}
                  style={[styles.imageSizePig, { width: "85%", height: 160 }]}
                />
                {infoSubscriptions[index].lista.map((item, i) => (
                  <View
                    style={[
                      styles.containerMapInfoSubscriptions,
                      { width: "85%" },
                    ]}
                    key={i}
                  >
                    <FontAwesome5
                      name="check"
                      size={17}
                      color={colors.blue_3}
                    />
                    <Text
                      style={[
                        styles.styleMapInfoSubscriptions,
                        { fontSize: 16 },
                      ]}
                    >
                      {item}
                    </Text>
                  </View>
                ))}
                <View style={styles.containerButtonSubscription}>
                  <TouchableOpacity
                    style={styles.buttonSubscription}
                    onPress={() => setNumInfo(index)}
                  >
                    <Text style={styles.styleButtonSubscription}>Comprar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.containerButtonRegresar}
        onPress={() => section("")}
      >
        <MaterialCommunityIcons
          name="arrow-left-circle"
          size={40}
          color={colors.blue_2}
        />
        <View>
          <Text
            style={{ color: colors.blue_2, fontSize: 24, marginHorizontal: 10 }}
          >
            Regresar
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  containerSubscriptionComplete: {
    width: "85%",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 30,
    paddingVertical: "4%",
    marginTop: "10%",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 5,
  },
  containerTitleSubscription: {
    width: "80%",
    height: "auto",
    alignItems: "center",
    marginTop: "5%",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTitleSubscription: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.blue_1,
    textAlign: "center",
  },
  containerImage: {
    width: "80%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.blue_1,
    paddingVertical: "10%",
    elevation: 10,
  },
  containerTitleMySubscription: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  styleTitleMySubscription: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.white_1,
  },
  imageSize: {
    width: 190,
    height: 180,
  },
  containerButtonRegresar: {
    width: "auto",
    height: "auto",
    backgroundColor: colors.white_1,
    borderRadius: 50,
    padding: 10,
    marginTop: "8%",
    marginBottom: "8%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  imageSizePig: {
    marginTop: "10%",
    width: 350,
    height: 200,
  },
  containerMapInfoSubscriptions: {
    width: "80%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  styleMapInfoSubscriptions: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white_1,
    marginLeft: "5%",
  },
  containerImageCarrousel: {
    width: "90%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.blue_1,
    paddingVertical: "10%",
    elevation: 10,
  },
  containerButtonSubscription: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  buttonSubscription: {
    width: "50%",
    height: 40,
    backgroundColor: colors.white_1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  styleButtonSubscription: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blue_1,
  },
});

export default ConfigSubscription;
