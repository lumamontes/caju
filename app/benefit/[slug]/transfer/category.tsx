import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp } from "@/database/types";
import Loading from "@/components/Loading";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BenefitIcon from "@/components/BenefitIcon";
import { formatCurrency } from "@/utils/formatCurrency";

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
      <Text style={{ marginVertical: 20 }}>
        Escolha uma categoria de benefício para transferir:{" "}
        <Text style={{ fontWeight: "bold" }}>
          {formatCurrency(parseFloat(amount))} de {benefit.name}
        </Text>
      </Text>

      <FlatList
        data={benefits.filter((b) => b.slug !== slug)}
        keyExtractor={(item) => item.slug}
        renderItem={({ item, index }) =>
            <TouchableOpacity
              onPress={() => {
                router.push(
                  `/benefit/${slug}/transfer/confirm?amount=${amount}&item=${item.slug}`
                );
              }}
              style={styles.benefitItem}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BenefitIcon benefit={item} key={index} />
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ color: "#757575" }}>
                    R$ {formatCurrency(item.balance)}
                  </Text>
                </View>
              </View>

              <Feather name="chevron-right" size={24} color="#3767E0" />
            </TouchableOpacity>
        }
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
  benefitItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
});
