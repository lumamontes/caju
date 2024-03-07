import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Header } from "@/components/Header";
import Beneficios from "@/components/Beneficios";
import Beneficio from "@/components/Beneficio";
import { Feather } from "@expo/vector-icons";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>BENEFÍCIOS</Text>
        <Beneficios />
        <View style={styles.text_container}>
          <Text style={styles.bold}>Total em benefícios</Text>
          <Text style={styles.bold}>R$ 200,00</Text>
        </View>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={[styles.bold, styles.title]}>
          OUTROS SALDOS
        </Text>
        <TouchableOpacity style={styles.saldo_container}>
          <View style={styles.icon_container}>
            <Feather name="check-circle" size={32} color="black" />
            <Text style={styles.title}>SALDO LIVRE </Text>
          </View>
          <Text style={styles.money}>
            R$ {""}
            <Text style={styles.bold}>
              100,00
            </Text>
          </Text>
        </TouchableOpacity>
      
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  money: {
    fontSize: 14,
  },
  icon_container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
    backgroundColor: "violet",
  },
  container: {
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  text_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 20,
  },
  saldo_container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: "violet",
    borderRadius: 10,
  },
  saldo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 20,
  },
  separator: {
    height: 1,
    width: "100%",
    marginBottom: 30
  },
});
