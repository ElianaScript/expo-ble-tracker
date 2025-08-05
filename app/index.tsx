import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Laser Tag App!(name in the works)</Text>
      <View style={styles.button}>
        <Button title="Begin Party" onPress={() => router.push('./begin-party')} />
      </View>
      <View style={styles.button}>
        <Button title="Join Party" onPress={() => router.push('./join-party')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding:16 },
  title: { fontSize: 24, marginBottom: 40 },
  button: { marginVertical: 10, width: '60%' },
});