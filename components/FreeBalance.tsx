import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import Animated, { SlideInDown } from "react-native-reanimated";

export function FreeBalance({
  showMonetaryValue,
  balance,
}: {
  showMonetaryValue: boolean;
  balance: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
          <Feather name="check-circle" size={32} color="black" />
          <Text style={styles.title}>SALDO LIVRE</Text>
      </View>
      <Text>
        R$ {""}
        <Animated.Text entering={SlideInDown} exiting={SlideInDown}>
          {showMonetaryValue ? balance : handleHideMonetaryValue(balance)}
        </Animated.Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
        padding: 15,
    backgroundColor: "#DA83CF",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DA83CF",
  },
  title: {
    marginLeft: 10,
  }
});
