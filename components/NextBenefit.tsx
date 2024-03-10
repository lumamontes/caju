import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function NextBenefit() {
    return (
      <View style={styles.expandable_container}>
        <Text style={styles.expandable_title}>Próximo Benefício</Text>
        <Text style={styles.expandable_title}>Não agendado</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    expandable_container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    expandable_title: {
      fontWeight: "bold",
    },
  });
  