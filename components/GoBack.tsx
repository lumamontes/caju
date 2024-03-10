import { SimpleLineIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function GoBack() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <SimpleLineIcons name="arrow-left-circle" size={42} color="black" />
    </TouchableOpacity>
  );
}
