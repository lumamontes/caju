import { SafeAreaView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Header } from '@/components/Header';

export default function TabPremiacoesScreen() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
      <Header />
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
