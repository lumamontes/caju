import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";

import { View } from "./Themed";
import Benefit from "./Benefit";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp } from "@/database/types";

export default function Benefits() {
  const [benefits, setBeneficios] = useState<BenefitProp[]>([]);

  useEffect(() => {
    benefitsDatabase.listBeneficios(setBeneficios);
  }, []);

  return (
    <View>
      <Text style={styles.title}>
      BENEFÍCIOS
    </Text>
      <FlatList
        horizontal
        data={benefits}
        renderItem={({ item }) => <Benefit beneficio={item} />}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 20,
    marginLeft: 2,
    paddingHorizontal: 20,
  },
})