import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useAtom } from "jotai";
import { showMonetaryValueAtom } from "@/Atoms";

import { Header } from "@/components/Header";
import Benefits from "@/components/Benefits";
import ExpandableContainer from "@/components/ExpandableContainer";
import InfoModal from "@/components/InfoModal";
import OtherBalances from "@/components/OtherBalances";
import Loading from "@/components/Loading";

import { database } from "@/database/init";
import { benefitsDatabase } from "@/database/benefits";

export default function TabOneScreen() {
  const [showMonetaryValue] = useAtom(showMonetaryValueAtom);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        database.initDB(),
        benefitsDatabase.insertMockDataIfNeeded(),
      ]);
      setIsLoading(false);
    };
    init();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header />
        <Benefits />
        <ExpandableContainer onHandleModal={handleModal} />
        <OtherBalances showMonetaryValue={showMonetaryValue} />
        <InfoModal isVisible={showModal} onClose={handleModal} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  bold: {
    fontWeight: "bold",
  },
});
