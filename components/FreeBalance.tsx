import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import Animated, { SlideInDown } from "react-native-reanimated";

export function FreeBalance({
  showMonetaryValue,
  balance,
}: {
  showMonetaryValue: boolean;
  balance: string;
}) {

  return (
    <TouchableOpacity style={styles.saldo_container}>
        <Text>
        <Feather name="check-circle" size={32} color="black" />
        <Text style={styles.title}>SALDO LIVRE</Text>
      </Text>

      <Text style={styles.money}>
        R$ {""}
        <Animated.Text entering={SlideInDown} exiting={SlideInDown}>
          {showMonetaryValue ? balance : handleHideMonetaryValue(balance)}
        </Animated.Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  money: {
    fontSize: 14,
},
  bold: {
    fontWeight: "bold",
  },
  saldo_container: {
    padding: 15,
    backgroundColor: "#DA83CF",
    borderRadius: 10,
    paddingVertical: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
