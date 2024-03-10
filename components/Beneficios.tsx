import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import Beneficio from "./Beneficio";
import { Feather } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";
import { benefitsDatabase } from "@/database/benefits";
import { BenefitProp } from "@/database/types";

export default function Beneficios() {
  const [showMonetaryValue] = useAtom(showMonetaryValueAtom);
  const [beneficios, setBeneficios] = useState<BenefitProp[]>([]);

  useEffect(() => {
    benefitsDatabase.listBeneficios(setBeneficios);
  }, []);

  return (
    <View>
      <FlatList
        horizontal
        data={beneficios}
        renderItem={({ item }) => (
          <Beneficio beneficio={item} showMonetaryValue={showMonetaryValue} />
        )}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
