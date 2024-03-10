import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp, TransactionProp } from "@/database/types";
import { convertFromCentToReal } from "../../../(tabs)";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Confirm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    slug: string;
    amount: string;
    item: string;
  }>();
  const [benefit, setBenefit] = useState<BenefitProp>();
  const [benefits, setBenefits] = useState<BenefitProp[]>([]);
  const { amount, slug, item } = params;

  useEffect(() => {
    benefitsDatabase.getBenefitBySlug(slug, setBenefit);
  }, []);

  useEffect(() => {
    benefitsDatabase.listBeneficios(setBenefits);
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
      <Text>
        Escolha uma categoria de benefício para transferir:{" "}
        {convertFromCentToReal(parseFloat(amount))} de {benefit.name}
      </Text>

      <FlatList 
        data={benefits}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push(`/benefit/${slug}/transfer/confirm?amount=${amount}&item=${item.slug}`);
            }}
          >
            <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
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
