import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { formatCurrency } from "@/utils/formatCurrency";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BenefitProp } from "@/database/types";
import GoBack from "./GoBack";

export default function BenefitTransferHeader({
  item,
  benefit,
}: {
  item: string;
  benefit: BenefitProp;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 20, backgroundColor: benefit.bgColor },
      ]}
    >
      <GoBack />
      <View style={{ alignItems: "center", backgroundColor: benefit.bgColor }}>
        <Text style={{ fontSize: 20 }}>
          R$ {` `}
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            {formatCurrency(benefit.balance)}
          </Text>
        </Text>
        <Text
          style={{
            letterSpacing: 2,
            fontSize: 18,
          }}
        >
          {item}
        </Text>
      </View>
      <TouchableOpacity>
        <Feather name="info" size={32} color={"black"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 50,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "90%",
  },
  input: {
    fontSize: 36,
    height: 40,
  },
  button: {
    height: 48,
    width: "100%",
    backgroundColor: "#3767E0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
