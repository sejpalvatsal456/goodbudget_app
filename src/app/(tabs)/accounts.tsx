import AccountCard from "@/components/AccountCard";
import AppText from "@/components/AppText";
import ThemedContainer from "@/components/ThemedContainer";
import { Color } from "@/constants/theme";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function TransactionsScreen() {
  const handleAddAccount = () => {
    Alert.alert("Add Account");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.body}
    >
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={(item) => String(item)}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.container}>
            {/* Heading */}
            <View style={styles.heading}>
              <View>
                <AppText
                  style={{
                    fontSize: 23,
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  My Accounts
                </AppText>

                <AppText style={{ color: Color.subtitle, fontSize: 12 }}>
                  Manage your money in one place.
                </AppText>
              </View>

              <View style={{ alignItems: "center" }}>
                <Pressable
                  style={{
                    backgroundColor: Color.primary,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleAddAccount}
                >
                  <FontAwesome6 name="add" size={14} color="white" />
                </Pressable>

                <AppText
                  style={{
                    fontSize: 12,
                    color: Color.primary,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  Add Account
                </AppText>
              </View>
            </View>

            {/* Total balance overview */}
            <ThemedContainer
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 5 }}>
                <View
                  style={{
                    backgroundColor: Color.primary,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SimpleLineIcons name="wallet" size={24} color="white" />
                </View>

                <AppText style={{ fontSize: 10 }}>TOTAL BALANCE</AppText>

                <AppText
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                    color: Color.money,
                  }}
                >
                  ₹10,000
                </AppText>
              </View>

              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: Color.primary + "55",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-outline"
                    size={26}
                    color={Color.primary}
                  />
                </View>

                <AppText
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  4
                </AppText>

                <AppText style={{ fontSize: 12, color: Color.subtitle }}>
                  Accounts
                </AppText>
              </View>

              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: Color.primary + "55",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="bank-outline"
                    size={26}
                    color={Color.primary}
                  />
                </View>

                <AppText
                  style={{
                    fontSize: 20,
                    fontFamily: "Inter_700Bold",
                  }}
                >
                  2 / 2
                </AppText>

                <AppText style={{ fontSize: 12, color: Color.subtitle }}>
                  Cash / Bank
                </AppText>
              </View>
            </ThemedContainer>

            {/* Accounts section heading */}
            <View style={{ marginTop: 20, marginBottom: 12 }}>
              <AppText
                style={{
                  fontSize: 24,
                  fontFamily: "Inter_600SemiBold",
                }}
              >
                Your Accounts
              </AppText>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 20 }}>
            <AccountCard
              acc_name="Cash"
              acc_desc="Account Description"
              acc_balance={100}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
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
  heading: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
