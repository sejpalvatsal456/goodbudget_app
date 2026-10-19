import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type TransactionPreviewProps = {
  desc: string;
  merchant: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  style?: StyleProp<ViewStyle>;
};

export default function TransactionPreview({
  desc,
  merchant,
  amount,
  date,
  type,
  style,
}: TransactionPreviewProps) {
  const isExpense = type === "expense";

  return (
    <View style={[styles.container, style]}>
      {/* Transaction details */}
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {merchant}
        </Text>

        <Text style={styles.desc} numberOfLines={1}>
          {desc}
        </Text>
      </View>

      {/* Amount and date */}
      <View style={styles.rightSection}>
        <Text
          style={[styles.amount, { color: isExpense ? "#F45B60" : "#28A875" }]}
        >
          {isExpense ? "- " : "+ "}₹{Math.abs(amount).toLocaleString("en-IN")}
        </Text>

        <Text style={styles.date} numberOfLines={1}>
          {date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 12,
    backgroundColor: "#FFFFFF",
  },

  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FDE5E6",
    justifyContent: "center",
    alignItems: "center",
  },

  details: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },

  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 15,
    color: "#18213B",
  },

  desc: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#78849D",
  },

  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
    maxWidth: "42%",
  },

  amount: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
  },

  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#78849D",
  },
});
