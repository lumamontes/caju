import { TransactionProp } from "@/database/types";
import { Text, View } from "./Themed";
import { formatCurrency } from "@/utils/formatCurrency";
import { StyleSheet } from "react-native";

export default function Transaction(item: TransactionProp) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 16 }}>
          {item.title}
          {"\n"}
          <Text style={{ fontSize: 12, color: "#757575" }}>
            {new Date(item.date).toLocaleDateString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "America/Sao_Paulo",
            })}
          </Text>
        </Text>
      </View>
      <Text style={styles.title}>
        {item.type === "income" ? `+` : `-`}
        R$ {formatCurrency(item.value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    color: "#3767E0",
    fontWeight: "bold",
    fontSize: 16,
  },
});
