import ThemedContainer from "@/components/ThemedContainer";
import { Color } from "@/constants/theme";
import { IPartialUser } from "@/types";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;
// console.log("API_URL: " + API_URL);

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<IPartialUser | null>(null);

  // TODO: build a login to check if the access TOken is valid or invalid or expired.
  useEffect(() => {
    SecureStore.getItemAsync("accessToken").then((res) => {
      res === null ? setIsLogin(false) : setIsLogin(true);
    });
    AsyncStorage.getItem("user").then((data) => {
      if (data !== null) {
        const parsedData = JSON.parse(data);
        const userData: IPartialUser = {
          id: parsedData.user_id,
          name: parsedData.user_name,
          email: parsedData.user_email,
          username: parsedData.user_username,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
  };

  const optionsData = [
    {
      theme: Color.primary,
      icon: <FontAwesome6 name="add" size={14} color="white" />,
      text: "Add transaction",
      action: () => Alert.alert("Add Transaction"),
    },
    {
      theme: Color.account,
      icon: <SimpleLineIcons name="wallet" size={14} color="white" />,
      text: "View Accounts",
      action: () => Alert.alert("View Accounts"),
    },
    {},
    {},
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headingView}>
            <Text style={{ fontSize: 25, fontWeight: 300 }}>Hello,</Text>
            <Text style={styles.nameHeading}>{user?.name || "User"}!</Text>
            <Text style={styles.subtitle}>Keep track of your money,</Text>
            <Text style={styles.subtitle}>build your goals.</Text>
          </View>
          <ThemedContainer
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.icon}>
              <SimpleLineIcons name="wallet" size={24} color="white" />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "baseline",
              }}
            >
              <Text style={{ fontSize: 12 }}>Total Balance</Text>
              <Text
                style={{ fontSize: 20, fontWeight: 800, color: Color.money }}
              >
                ₹12,000
              </Text>
            </View>
          </ThemedContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.grid}
          >
            {optionsData.map((item, key) => (
              <ThemedContainer
                key={key}
                theme={item.theme}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  width: 90,
                }}
                isPressable={true}
                onPress={item.action}
              >
                <View
                  style={{
                    backgroundColor: item.theme + "aa" || "#fff",
                    padding: 7,
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Text>
              </ThemedContainer>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
  },
  container: {
    width: "85%",
    height: "95%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 15,
  },
  headingView: {
    backgroundColor: "#a000",
    marginTop: 20,
    marginLeft: 10,
  },
  nameHeading: {
    fontWeight: 800,
    color: Color.heading,
    fontSize: 30,
    marginBottom: 10,
  },
  subtitle: {
    color: Color.subtitle,
    fontSize: 12,
  },
  img: {
    alignSelf: "center",
    width: "100%",
    // backgroundColor: "green",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 40,
  },
  totalBalanceView: {
    backgroundColor: Color.primary + "22",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: "50%",
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    height: 150,
    marginTop: 10,
  },
});
