import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatCurrency } from "@/utils/formatCurrency"; // replace with your actual import
import Separator from "./Separator";
import { BenefitProp } from "@/database/types";
import BenefitIcon from "./BenefitIcon";

interface BenefitBalanceProps {
  benefit: BenefitProp;
  amount: string;
}

const BenefitBalance: React.FC<BenefitBalanceProps> = ({ benefit, amount }) => {
  return (
    <View>
      <View style={styles.container}>
        <BenefitIcon benefit={benefit} />
        <View style={{ marginLeft: 20 }}>
          <Text>{benefit.name}</Text>
          <Text
            style={{
              color: "#757575",
            }}
          >
            Saldo atual: R$ {formatCurrency(benefit.balance)}
          </Text>
          <Text
            style={{
              color: "#757575",
            }}
          >
            Saldo atualizado: R${" "}
            {formatCurrency(benefit.balance - parseFloat(amount))}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
  },
});

export default BenefitBalance;
