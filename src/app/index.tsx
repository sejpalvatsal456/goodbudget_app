import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
// console.log("API_URL: " + API_URL);

export default function HomeScreen() {
  useEffect(() => {
    SecureStore.getItemAsync("accessToken").then((res) => console.log(res));
  });

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text
          style={{
            backgroundColor: "#a00a",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            color: "white",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text
          style={{
            backgroundColor: "#a00a",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            color: "white",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
