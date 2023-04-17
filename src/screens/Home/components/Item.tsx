import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const Item = (props: {
  id: number;
  icon: JSX.Element;
  name: string;
  description: string;
  amount: number;
}) => {
  const [icon, name, description, amount] = [
    props.icon,
    props.name,
    props.description,
    props.amount,
  ];
  const [iconEdit, setIconEdit] = useState<JSX.Element>(icon);
  const [nameEdit, setNameEdit] = useState<string>(name);
  const [descriptionEdit, setDescriptionEdit] = useState<string>(description);
  const [amountEdit, setAmountEdit] = useState<number>(amount);

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        style={styles.item}
        onPress={() => setModalVisibility(true)}
      >
        <View style={styles.containerIconItem}>{icon}</View>
        <View style={styles.containerTextItem}>
          <Text style={styles.styleText}>{name}</Text>
        </View>
        <View style={styles.containerAmountItem}>
          <Text style={styles.styleAmount}>$ {amount.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(!modalVisibility);
        }}
      >
        <ScrollView style={styles.containerModal}>
          <View style={styles.contentModal}>
            <View style={styles.modalTitle}>
              <TextInput
                style={styles.styleTextModal}
                value={nameEdit}
                onChangeText={(newText: string) => setNameEdit(newText)}
              />
            </View>
            <View style={styles.modalLine} />
            <View style={styles.containerTitleDescription}>
              <Text style={styles.styleTextModalDescription}>Descripción:</Text>
            </View>
            <View style={styles.containerDescription}>
              <TextInput
                style={styles.textContentDescription}
                value={descriptionEdit}
                onChangeText={(newText: string) => setDescriptionEdit(newText)}
                multiline={true}
              />
            </View>
            <View style={styles.containerTitleDescription}>
              <Text style={styles.styleTextModalDescription}>Monto:</Text>
            </View>
            <View style={styles.containerAmount}>
              <TextInput
                style={styles.textContentAmount}
                value={`$ ${amountEdit.toFixed(2)}`}
                keyboardType="numeric"
                onChangeText={(newText: string) => {
                  const numericValue = newText.replace(/[^0-9]/g, ""); // Elimina cualquier caracter que no sea un número
                  setAmountEdit(parseInt(numericValue));
                }}
              />
            </View>
            <View style={styles.containerTitleDescription}>
              <Text style={styles.styleTextModalDescription}>Icono:</Text>
            </View>
            <View style={styles.containerIcon}></View>
            <View>
              <TouchableOpacity onPress={() => setModalVisibility(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    elevation: 4,
  },
  containerIconItem: {
    height: 50,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTextItem: {
    height: 50,
    width: "40%",
    justifyContent: "center",
    paddingLeft: 10,
  },
  containerAmountItem: {
    height: 50,
    width: "36%",
    alignItems: "center",
    justifyContent: "center",
  },
  styleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "#2584A0",
  },
  styleAmount: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#2584A0",
  },
  containerModal: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  contentModal: {
    height: "80%",
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    alignSelf: "center",
    alignItems: "center",
    marginTop: "30%",
    marginBottom: "30%",
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
  },
  containerTitleDescription: {
    marginTop: 30,
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  styleTextModalDescription: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2584A0",
  },
  containerDescription: {
    marginTop: 10,
    minHeight: "10%",
    maxHeight: "18%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  textContentDescription: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#2584A0",
    width: "90%",
    height: "90%",
  },
  containerAmount: {
    marginTop: 10,
    minHeight: "10%",
    maxHeight: "14%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    padding: 10,
  },
  textContentAmount: {
    fontSize: 18,
    fontWeight: "normal",
    textAlign: "center",
    color: "#2584A0",
    width: "90%",
    height: "90%",
  },
  containerIcon: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textContentIcon: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    width: "90%",
    height: "90%",
  },
});

export default Item;
