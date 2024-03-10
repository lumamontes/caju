import { StyleSheet } from "react-native"

import Colors from "@/constants/Colors"

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: "100%",
    backgroundColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  text: {
    color: Colors.light.background,
    fontSize: 16,
  },
})
