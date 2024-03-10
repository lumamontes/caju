import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";
import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";

export default function FlexibleValue({ handleModal, isDisabled = false }: { handleModal: () => void, isDisabled?: boolean}) {
    const [showMonetaryValue] = useAtom(showMonetaryValueAtom)
    return (
      <View style={[styles.expandable_container]}>
        <TouchableOpacity onPress={handleModal} disabled={isDisabled}>
          <Text>
            Valor fléxivel {""}
            <Feather name="info" size={16} color="black" />
          </Text>
        </TouchableOpacity>
        <Text>
            R$ 
            {showMonetaryValue ? '100,00' : handleHideMonetaryValue('100,00')}
        </Text>
      </View>
    );

}

const styles = StyleSheet.create({
    expandable_container: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      marginBottom: 25
    },
  });
  