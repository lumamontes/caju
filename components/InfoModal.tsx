import { View, Text, StyleSheet, Modal } from "react-native";
import { Button } from "./Button";

export default function InfoModal({ isVisible, children, onClose }: any) {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Valor flexível</Text>
          <View>
          <Text style={{ textAlign: "center" }}>
            A flexibidade para transferências entre benefícios é definida pela
            sua empresa a cada nova recarga de créditos. Caso tenha alguma
            dúvida sobre o valor flexível, recomendamos que converse diretamente
            com seu RH.
          </Text>
          </View>
          <Button title="Entendi" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    width: "85%", // adjust as needed
    height: "35%", // adjust as needed
  },

  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
