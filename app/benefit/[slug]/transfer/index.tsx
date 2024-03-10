import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { Feather } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp, TransactionProp } from "@/database/types";
import { formatCurrency } from "@/utils/formatCurrency";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { MaskedTextInput } from "react-native-mask-text";
import BenefitTransferHeader from "@/components/BenefitTransferHeader";
import BenefitIcon from "@/components/BenefitIcon";

export default function Transfer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string; item: string }>();
  const [benefit, setBenefit] = useState<BenefitProp>();
  const { slug, item } = params;
  const [amount, setAmount] = useState(0);

  function handleContinueButton() {
    if (amount === 0) {
      Alert.alert("Valor inválido", "O valor deve ser maior que 0");
      return;
    }
    router.push(
      `/benefit/${slug}/transfer/category?item=${item}&amount=${amount}`
    );
  }

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  if (!benefit) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <SimpleLineIcons name="arrow-left-circle" size={42} color="#3767E0" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Transferência de saldo</Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
        }}
      >
        Escolha o valor que deseja retirar deste benefício:
      </Text>
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
            marginRight: 20,
          }}
        >
          <BenefitIcon benefit={benefit} />
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "#757575" }}>{benefit.name}</Text>
          <Text style={{ color: "#BCBCBC", fontSize: 16 }}>
            Valor atual: {formatCurrency(benefit.balance)}
          </Text>
          <Text style={{ color: "#BCBCBC", fontSize: 16 }}>
            Valor flexível: {formatCurrency(benefit.balance)}
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
        <Button title="Continuar" onPress={handleContinueButton} />
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
    paddingBottom: 30,
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
    padding: 18,
    backgroundColor: "#3767E0",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
