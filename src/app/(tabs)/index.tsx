import AppText from "@/components/AppText";
import ThemedContainer from "@/components/ThemedContainer";
import TransactionPreview from "@/components/TransactionPreview";
import { Color } from "@/constants/theme";
import { IPartialUser, Transaction } from "@/types";
import {
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome6,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [totalBalance, setTotalBalance] = useState<number | null>(null);
  const [user, setUser] = useState<IPartialUser | null>(null);

  // TODO: build a login to check if the access Token is valid or invalid or expired.
  useEffect(() => {
    Alert.alert("useEffect has been called.");
    SecureStore.getItemAsync("accessToken")
      .then((res) => {
        res === null ? setIsLogin(false) : setIsLogin(true);
        // console.log(res);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Can not access accessToken");
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

  useEffect(() => {
    if (user) {
      SecureStore.getItemAsync("accessToken").then((res) => {
        if (res === null) {
          // Alert.alert("Auth Error", "Login session is expired.");
          AsyncStorage.removeItem("user");
          SecureStore.deleteItemAsync("accessToken");
          setUser(null);
          return;
        }
        fetch(`${API_URL}/users/getBalance`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${res}`,
          },
        })
          .then((res) => res.json())
          .then((data) => setTotalBalance(data.balance));
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    AsyncStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
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
    {
      theme: Color.money,
      icon: <Feather name="pie-chart" size={14} color="white" />,
      text: "Get Summary",
      action: () => Alert.alert("Get Summary"),
    },
    {
      theme: Color.budget,
      icon: <EvilIcons name="chart" size={16} color="white" />,
      text: "Set the Budget",
      action: () => Alert.alert("Set the Budget"),
    },
  ];

  // DEBUG: for static frontend only
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Food & Dining",
      merchant: "Zomato",
      amount: -320,
      date: "Today, 1:24 PM",
    },
    {
      id: "2",
      title: "Shopping",
      merchant: "Amazon",
      amount: -1499,
      date: "Today, 11:05 AM",
    },
    {
      id: "3",
      title: "Salary",
      merchant: "Company",
      amount: 25000,
      date: "Yesterday, 10:00 AM",
    },
    {
      id: "4",
      title: "Transportation",
      merchant: "Uber",
      amount: -185,
      date: "Yesterday, 8:30 PM",
    },
    {
      id: "5",
      title: "Entertainment",
      merchant: "Netflix",
      amount: -649,
      date: "15 Oct, 7:00 PM",
    },
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
            <View>
              <AppText style={{ fontSize: 25, fontWeight: 300 }}>
                Hello,
              </AppText>
              <AppText style={styles.nameHeading}>
                {user?.name || "User"}!
              </AppText>
              <AppText style={styles.subtitle}>
                Keep track of your money,
              </AppText>
              <AppText style={styles.subtitle}>build your goals.</AppText>
            </View>
            <View>
              <Pressable
                style={{
                  backgroundColor: Color.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (isLogin) {
                    handleLogout();
                  } else {
                    router.push("/login");
                  }
                }}
              >
                <AppText style={{ color: Color.secondary }}>
                  {isLogin ? "Logout" : "Login"}
                </AppText>
              </Pressable>
            </View>
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
              <AppText style={{ fontSize: 12 }}>Total Balance</AppText>
              <AppText
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: Color.money,
                }}
              >
                ₹{totalBalance ? totalBalance : "-"}
              </AppText>
            </View>
          </ThemedContainer>
          {/* Action Buttons */}
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled
            contentContainerStyle={styles.grid}
            style={{ flexGrow: 0, flexShrink: 0 }}
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
                <AppText
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </AppText>
              </ThemedContainer>
            ))}
          </ScrollView>
          {/* Recent Transactions */}
          <View style={styles.recentTranView}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                Alert.alert("View More", "More...");
              }}
            >
              <AppText
                style={{
                  fontFamily: "Inter_700Bold",
                  // fontWeight: "bold",
                  fontSize: 20,
                  color: "#232323",
                }}
              >
                Recent Transactions
              </AppText>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <AppText
                  style={{
                    color: Color.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  View More
                </AppText>
                <AntDesign name="arrow-right" size={12} color={Color.primary} />
              </View>
            </Pressable>
          </View>
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionPreview
                title={item.title}
                merchant={item.merchant}
                amount={item.amount}
                date={item.date}
              />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#F0F0F0",
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "stretch",
  },

  container: {
    width: "100%",
    flexGrow: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 15,
  },
  headingView: {
    backgroundColor: "#a000",
    marginTop: 20,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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
    maxHeight: 150,
    marginTop: 10,
  },
  recentTranView: {
    marginTop: 20,
  },
});
