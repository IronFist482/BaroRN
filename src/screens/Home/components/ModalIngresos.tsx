import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useState } from "react";
import ItemIngreso from "./ItemIngreso";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { getIngresos } from "@api/IngresosServices";
import { setIngresos } from "@store/ingresos/ingresos-slice";

const ModalIngresos = ({
  setSectionUp,
  reload,
}: {
  setSectionUp: Function;
  reload: number;
}) => {
  const dispatch = useDispatch();
  const ingresos = useSelector((state: RootState) => state.ingresos.ingresos);
  const inverseIngresos = ingresos.slice().reverse();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchGastos() {
    setLoading(true);
    const { data, ok, message } = await getIngresos({});
    if (!ok || !data) {
      setMessage(message);
      console.log(ingresos);
      return console.log(message);
    }
    console.log(message);
    setMessage(message);
    dispatch(setIngresos(data.ingresos));
  }
  useEffect(() => {
    fetchGastos();
  }, [reload]);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const handlerButton = () => {
    setModalVisibility(false);
    setSectionUp(2);
  };

  return (
    <View style={styles.containerSection}>
      <TouchableOpacity
        style={styles.containerButton}
        onPress={() => setModalVisibility(true)}
      >
        <Text style={styles.styleTextModalIngreso}>Ver Ingresos</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(!modalVisibility);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.contentModal}>
            {message == "No hay ingresos aun" ? (
              <>
                <View style={styles.modalTitle}>
                  <Text style={styles.styleTextModal}>No hay Ingresos</Text>
                </View>
                <View style={styles.modalLine} />
                <View
                  style={[
                    styles.containerIngresos,
                    { justifyContent: "center" },
                  ]}
                >
                  <Image
                    source={require("../../../../assets/addIngresos.png")}
                    style={{ width: 300, height: 300, alignSelf: "center" }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.containerButtonModal}
                  onPress={() => handlerButton()}
                >
                  <Text style={styles.styleTextButton}>¡Registra uno!</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.modalTitle}>
                  <Text style={styles.styleTextModal}>Ingresos</Text>
                </View>
                <View style={styles.modalLine} />
                <ScrollView style={styles.containerIngresos}>
                  {inverseIngresos.map((item, i) => (
                    <ItemIngreso
                      key={i}
                      id={item.ingId}
                      tipo={item.ingType}
                      description={item.ingDescription}
                      amount={item.ingAmount}
                    />
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.containerButtonModal}
                  onPress={() => setModalVisibility(false)}
                >
                  <Text style={styles.styleTextButton}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSection: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    backgroundColor: "#9CC7D3",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  styleTextModalIngreso: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  containerModal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  contentModal: {
    minHeight: "auto",
    maxHeight: "80%",
    width: "86%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: "7%",
    marginVertical: "20%",
  },
  modalTitle: {
    height: "auto",
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTextModal: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2584A0",
  },
  modalLine: {
    height: 3,
    width: "80%",
    backgroundColor: "#2584A0",
    marginTop: 4,
    alignSelf: "center",
  },
  containerIngresos: {
    height: "70%",
    width: "100%",
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerButtonModal: {
    backgroundColor: "#2584A0",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 45,
    borderRadius: 10,
    marginBottom: 40,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  styleTextButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ModalIngresos;
