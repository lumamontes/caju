import { StyleSheet, TouchableOpacity } from "react-native";
import { FreeBalance } from "./FreeBalance";
import { Text, View } from "./Themed";

export default function OtherBalances({showMonetaryValue}: {showMonetaryValue: boolean}){
    return (
        <View style={styles.container}>
        <Text style={[styles.bold, styles.title]}>OUTROS SALDOS</Text>
        <FreeBalance balance="100,00" showMonetaryValue={showMonetaryValue} />
        <Text style={[styles.bold, styles.title]}>AÇÕES</Text>
        <TouchableOpacity>
          <Text>Transferir saldo entre benefícios</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
    },
    bold: {
      fontWeight: "bold",
    },
    title: {
      fontSize: 12,
      fontWeight: "bold",
      paddingVertical: 20,
      marginLeft: 2,
    },
  });