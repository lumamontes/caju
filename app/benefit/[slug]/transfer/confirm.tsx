import { StatusBar } from "expo-status-bar";
import { Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp, TransactionProp } from "@/database/types";
import { formatCurrency } from "@/utils/formatCurrency";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BenefitIcon from "@/components/BenefitIcon";
import Separator from "@/components/Separator";
import { Button } from "@/components/Button";
import { database } from "@/database/transactions";
import BenefitBalance from "@/components/BenefitBalance";

export default function Confirm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    slug: string;
    amount: string;
    item: string;
  }>();
  const [benefit, setBenefit] = useState<BenefitProp>();
  const [nextBenefit, setNextBenefit] = useState<BenefitProp>();
  const [benefits, setBenefits] = useState<BenefitProp[]>([]);
  const [loading, setLoading] = useState(false);
  const { amount, slug, item } = params;

  async function handleTransaction({
    next,
    current,
    value,
  }: {
    next: BenefitProp;
    current: BenefitProp;
    value: string;
  }) {
    setLoading(true);
    try {
      const newamount = parseFloat(value);
      await database.addTransaction({
        title: "Transferência de saldo",
        value: newamount,
        prevBenefit: slug,
        benefit: item,
        date: new Date().toISOString(),
        type: "income",
      });
      await database.addTransaction({
        title: "Transferência de saldo",
        value: newamount,
        prevBenefit: item,
        benefit: slug,
        date: new Date().toISOString(),
        type: "outcome",
      });

      setLoading(false);
      Alert.alert("Sucesso", "Saldo transferido com sucesso");
      router.push(`/(tabs)/`);
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Ocorreu um erro ao transferir o saldo");
    }
  }

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(item, setNextBenefit);
  }, []);

  useEffect(() => {
    benefitsDatabase.listBeneficios(setBenefits);
  }, []);

  if (!benefit || !nextBenefit) {
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
      <Text style={{ marginVertical: 20 }}>Confirme a transação:</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          gap: 15,
          paddingBottom: 20,
        }}
      >
        <BenefitIcon benefit={benefit} />
        <Feather name="chevron-right" size={24} color="black" />
        <BenefitIcon benefit={nextBenefit} />
      </View>
      <View style={{ marginBottom: 20, marginTop: 10, gap: 5 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#757575" }}>
            Retirar de:
            <Text> {benefit.name}</Text>
          </Text>
          <Text>- R$ {formatCurrency(parseFloat(amount))}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#757575" }}>
            Depositar em:
            <Text> {nextBenefit.name}</Text>
          </Text>
          <Text>+ R$ {formatCurrency(parseFloat(amount))}</Text>
        </View>
      </View>

      <Separator />
      <View style={{ paddingVertical: 20 }}>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 10,
          }}
        >
          Como ficarão seus saldos:
        </Text>
        <BenefitBalance benefit={benefit} amount={amount} />
        <Separator />
        <BenefitBalance benefit={nextBenefit} amount={amount} />
      </View>
      <Button
        title="Confirmar transferência"
        onPress={() =>
          handleTransaction({
            next: nextBenefit,
            current: benefit,
            value: amount,
          })
        }
        isLoading={loading}
      />
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
    paddingBottom: 10,
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
});
