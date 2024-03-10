import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";

import Transaction from "@/components/Transaction";
import Loading from "@/components/Loading";
import { Button } from "@/components/Button";
import Separator from "@/components/Separator";
import BenefitTransferHeader from "@/components/BenefitTransferHeader";

import { benefitsDatabase } from "@/database/benefits";
import { database } from "@/database/transactions";
import { BenefitProp, TransactionProp } from "@/database/types";

export default function ModalScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams<{ slug: string; item: string }>();
  const [transactions, setTransactions] = useState<TransactionProp[]>([]);
  const [benefit, setBenefit] = useState<BenefitProp>();
  const { slug, item } = params;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await database.listTransactionsForBenefit(slug, setTransactions);
    } catch (err) {
      Alert.alert("Erro ao atualizar", "Tente novamente mais tarde");
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    database.listTransactionsForBenefit(slug, setTransactions);
  }, []);

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  if (!benefit || !item) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <BenefitTransferHeader benefit={benefit} item={item} />
      <View style={styles.transfersContainer}>
        <Separator />
        <SafeAreaView>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={transactions}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: transaction }) => (
              <Transaction {...transaction} />
            )}
            ListEmptyComponent={<Text style={{paddingTop: 20}}>Nenhuma transação encontrada</Text>}
          />
        </SafeAreaView>
      </View>
      <View style={styles.fixedButton}>
        <Button
          title="Transferir saldo"
          onPress={() => router.push(`/benefit/${slug}/transfer/`)}
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  transfersContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "flex-start",
    flex: 1,
    marginBottom: 120,
  },
  fixedButton: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
