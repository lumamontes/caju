import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import Beneficio from "./Beneficio";
import { Feather } from "@expo/vector-icons";

export type BeneficioProp = {
  name: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  valor: string;
  bgColor?: string;
};

const beneficios: BeneficioProp[] = [
  {
    name: "Home Office",
    icon: "home",
    valor: "150,00",
    bgColor: "#BFABE6",
  },
  {
    name: "Refeição",
    icon: "coffee",
    valor: "200,00",
    bgColor: "#F08184",
  },
  {
    name: "Alimentação",
    icon: "map",
    valor: "250,00",
    bgColor: "#FEAC66",
  },
  {
    name: "Mobilidade",
    icon: "map-pin",
    valor: "300,00",
    bgColor:  "#FEE082"
  },
  {
    name: "Cultura",
    icon: "book-open",
    valor: "350,00",
    bgColor: "#75D0EA"
  },
  {
    name: "Saúde",
    icon: "heart",
    valor: "400,00",
    bgColor: "#9AE59A",
  },
  {
    name: "Educação",
    icon: "book",
    valor: "400,00",
    bgColor: Colors.light.tint,
  },
];

export default function Beneficios() {
  return (
    <View>
      <FlatList
        horizontal
        data={beneficios}
        renderItem={({ item }) => Beneficio({ beneficio: item })}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
