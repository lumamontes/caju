import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BeneficioProp } from "./Beneficios";

export default function Beneficio({ beneficio }: { beneficio: BeneficioProp }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: beneficio.bgColor }]}
    >
      <Feather name={beneficio.icon} size={32} color="black" />
      <View>
        <Text style={{ color: "black", fontSize: 12 }}>
          R$
        </Text>
        <Text style={styles.beneficioValor}>{beneficio.valor}</Text>
      </View>

      <Text style={styles.beneficioName}>{beneficio.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  beneficioIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  beneficioName: {
    marginTop: 10,
    fontSize: 12,
  },
  beneficioValor: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
});
