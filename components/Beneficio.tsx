import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";
import { Link, router } from "expo-router";
import { Header } from "./Header";
import { convertFromCentToReal } from "@/app/(tabs)";
import { BenefitProp } from "@/database/types";
import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";

export default function Beneficio({
  beneficio,
}: {
  beneficio: BenefitProp;
}) {
  const [showMonetaryValue] = useAtom(showMonetaryValueAtom);

  return (
    <Link
      asChild
      style={[styles.container, { backgroundColor: beneficio.bgColor }]}
      href={{
        pathname: `/benefit/${beneficio.slug}/`,
        params: {
          item: beneficio.name.toUpperCase()
        }
      }}
    >
      <TouchableOpacity>
        <Feather name={beneficio.icon} size={32} color="black" />
        <View>
          <Text style={{ color: "black", fontSize: 12 }}>R$</Text>

          {showMonetaryValue ? (
            <Text style={styles.beneficioValor}>
              {convertFromCentToReal(beneficio.balance)}
            </Text>
          ) : (
            <Text style={styles.beneficioValor}>
              {handleHideMonetaryValue(convertFromCentToReal(beneficio.balance))}
            </Text>
          )}
        </View>

        <Text style={styles.beneficioName}>{beneficio.name.toUpperCase()}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 180,
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  beneficioIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  beneficioName: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: "bold",
  },
  beneficioValor: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "bold",
  },
});
