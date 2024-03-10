import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { Feather } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp, TransactionProp } from "@/database/types";
import { convertFromCentToReal } from "../../../(tabs)";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { MaskedTextInput } from "react-native-mask-text";

export default function Transfer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string; item: string }>();
  const [benefit, setBenefit] = useState<BenefitProp>();
  const { slug, item } = params;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  if (!benefit) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <SimpleLineIcons name="arrow-left-circle" size={42} color="#3767E0" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Transferência de saldo</Text>
        </View>
      </View>
      <Text>Escolha o valor que deseja retirar deste benefício</Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          padding: 20,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: benefit.bgColor,
            borderRadius: 9999,
            marginRight: 20,
          }}
        >
          <Feather name={benefit.icon} size={24} />
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "#757575" }}>{benefit.name}</Text>
          <Text style={{ color: "#BCBCBC", fontSize: 16 }}>
            Valor atual: {convertFromCentToReal(benefit.balance)}
          </Text>
          <Text style={{ color: "#BCBCBC", fontSize: 16 }}>
            Valor fléxivel: {convertFromCentToReal(2000)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 40,
        }}
      >
        <Text style={{ fontSize: 24, marginRight: 10 }}>R$</Text>
        <MaskedTextInput
          type="currency"
          options={{
            decimalSeparator: ",",
            groupSeparator: ",",
            precision: 2,
          }}
          onChangeText={(text, rawText) => {
            setAmount(parseInt(rawText));
          }}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      <View style={{ justifyContent: "center" }}>
        <Link
          href={{
            pathname: `/benefit/${slug}/transfer/category`,
            params: {
              item: item,
              amount: amount,
            },
          }}
          style={styles.button}
        >
          <Text style={styles.text}>Continuar</Text>
        </Link>
      </View>
      <StatusBar style="dark" />
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
    alignItems: "center",
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
