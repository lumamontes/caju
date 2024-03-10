import { ActivityIndicator } from "react-native";
import { View } from "./Themed";
export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />     
    </View>
  )
}