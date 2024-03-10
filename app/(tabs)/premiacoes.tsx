import { SafeAreaView, StyleSheet } from "react-native";
import { database } from "@/database/init";
import { benefitsDatabase } from "@/database/benefits";
import { Button } from "@/components/Button";

export default function TabPremiacoesScreen() {
  function handleReset() {
    database.dropDB();
    console.log("database reset");
  }
  function handleInit() {
    database.initDB();
    console.log("database init");
  }
  function handleMock() {
    benefitsDatabase.insertMockDataIfNeeded();
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={handleReset} title="Reset database data" />
      <Button onPress={handleInit} title="Init database" />
      <Button onPress={handleMock} title="Insert mock data" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    gap: 20,
  },
});
