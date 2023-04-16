import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import ItemIngreso from "./ItemIngreso";

const ModalIngresos = (props: { data: any[] }) => {
  const { data } = props;
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

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
            <View style={styles.modalTitle}>
              <Text style={styles.styleTextModal}>Ingresos</Text>
            </View>
            <View style={styles.modalLine} />
            <ScrollView style={styles.containerIngresos}>
              {data.map((item: any) => (
                <ItemIngreso
                  key={item.id}
                  id={item.id}
                  tipo={item.tipo}
                  description={item.description}
                  amount={item.amount}
                />
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.containerButtonModal}
              onPress={() => setModalVisibility(false)}
            >
              <Text>Cerrar</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 30,
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: "center",
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
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginHorizontal: "10%",
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
    fontSize: 30,
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
    height: "80%",
    width: "80%",
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#2584A0",
    marginLeft: "auto",
    marginRight: "auto",
  },
  containerButtonModal: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default ModalIngresos;
