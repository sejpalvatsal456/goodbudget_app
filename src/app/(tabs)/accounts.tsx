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
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Heading Starts */}
          <View style={styles.heading}>
            <View>
              <AppText style={{ fontSize: 23, fontFamily: "Inter_700Bold" }}>
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
                  borderRadius: "50%",
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
          {/* Heading Ends */}

          {/* Total balance overview Starts */}
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
                  borderRadius: "50%",
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
                  borderRadius: "50%",
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
              <AppText style={{ fontSize: 20, fontFamily: "Inter_700Bold" }}>
                4
              </AppText>
              <AppText
                style={{
                  fontSize: 12,
                  color: Color.subtitle,
                }}
              >
                Accounts
              </AppText>
            </View>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: Color.primary + "55",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
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
              <AppText style={{ fontSize: 20, fontFamily: "Inter_700Bold" }}>
                2 / 2
              </AppText>
              <AppText
                style={{
                  fontSize: 12,
                  color: Color.subtitle,
                }}
              >
                Cash / Bank
              </AppText>
            </View>
          </ThemedContainer>
          {/* Total balance overview Ends */}
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
  heading: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
