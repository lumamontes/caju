import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { database } from "@/database/transactions";
import { BenefitProp, TransactionProp } from "@/database/types";
import Transaction from "@/components/Transaction";
import { convertFromCentToReal } from "../../(tabs)";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import ExpandableContainer from "@/components/ExpandableContainer";
import FlexibleValue from "@/components/FlexibeValue";
import NextBenefit from "@/components/NextBenefit";
import { Button } from "@/components/Button";

export default function ModalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ slug: string; item: string }>();
  const [transactions, setTransactions] = useState<TransactionProp[]>([]);
  const [benefit, setBenefit] = useState<BenefitProp>();
  const { slug, item } = params;

  useEffect(() => {
    database.listTransactionsForBenefit(slug, setTransactions);
  }, []);

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  if (!benefit) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 20, backgroundColor: benefit.bgColor },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <SimpleLineIcons name="arrow-left-circle" size={42} color="black" />
        </TouchableOpacity>
        <View
          style={{ alignItems: "center", backgroundColor: benefit.bgColor }}
        >
          <Text style={{ fontSize: 20 }}>
            R$ {` `}
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>
              {convertFromCentToReal(benefit.balance)}
            </Text>
          </Text>
          <Text
            style={{
              letterSpacing: 2,
              fontSize: 18,
            }}
          >
            {item}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name="info" size={32} color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, justifyContent: "center" }}>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <FlatList
          data={transactions}
          renderItem={({ item }) => <Transaction {...item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Nenhuma transação encontrada</Text>}
        />
      </View>
      {/* Botão fixo na parte inferior  */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          left: 20,
          right: 20,
        }}
      >
        <Button title="Transferir saldo" onPress={() => router.push(`/benefit/${slug}/transfer/`)} />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "90%",
  },
});
