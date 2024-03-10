import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Header } from "@/components/Header";
import Beneficios from "@/components/Beneficios";
import { Feather } from "@expo/vector-icons";
import ExpandableContainer from "@/components/ExpandableContainer";
import { useEffect, useState } from "react";
import InfoModal from "@/components/InfoModal";
import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";
import { FreeBalance } from "@/components/FreeBalance";
import NextBenefit from "@/components/NextBenefit";
import FlexibleValue from "@/components/FlexibeValue";
import handleHideMonetaryValue from "@/utils/handleHideMonetaryValue";
import { database } from "@/database/init";
import { benefitsDatabase } from "@/database/benefits";

export const convertFromCentToReal = (value: number) => {
  return (value / 100).toFixed(2);
};

export default function TabOneScreen() {
  const [showMonetaryValue] = useAtom(showMonetaryValueAtom);
  const [showModal, setShowModal] = useState(false);
  const [totalBenefitsBalance, setTotalBenefitsBalance] = useState(0);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    database.initDB();
  }, []);

  useEffect(() => {
    benefitsDatabase.insertMockDataIfNeeded();
  }, []);

  useEffect(() => {
    benefitsDatabase.totalBenefitsBalance(setTotalBenefitsBalance);
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Header />
        <Text style={[styles.title, { paddingHorizontal: 20 }]}>
          BENEFÍCIOS
        </Text>
        <Beneficios />
        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <View style={styles.text_container}>
            <Text style={styles.bold}>Total em benefícios</Text>
            <Text style={styles.bold}>
              R$
              {showMonetaryValue
                ? convertFromCentToReal(totalBenefitsBalance)
                : handleHideMonetaryValue(
                    convertFromCentToReal(totalBenefitsBalance)
                  )}
            </Text>
          </View>
          <ExpandableContainer>
            <FlexibleValue handleModal={handleModal} />
            <NextBenefit />
          </ExpandableContainer>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={[styles.bold, styles.title]}>OUTROS SALDOS</Text>
          <FreeBalance balance="100,00" showMonetaryValue={showMonetaryValue} />

          <Text style={[styles.bold, styles.title]}>AÇÕES</Text>
          <TouchableOpacity>
            <Text>Transferir saldo entre benefícios</Text>
          </TouchableOpacity>
        </View>

        <InfoModal isVisible={showModal} onClose={handleModal}>
          <Text style={{ textAlign: "center" }}>
            A flexibidade para transferências entre beneficios é defnidia pela
            sua empresa a cada nova recarga de créditos. Caso tenha alguma
            dúvida sobre o valor flexível, recomendamos que converse diretamente
            com seu RH.
          </Text>
        </InfoModal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bold: {
    fontWeight: "bold",
  },
  text_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 40,
    paddingBottom: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 20,
    marginLeft: 2,
  },
  expandable_container: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
