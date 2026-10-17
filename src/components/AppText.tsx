import { Text as RNText, StyleSheet, TextProps } from "react-native";

export default function AppText({ style, ...props }: TextProps) {
  return <RNText {...props} style={[styles.default, style]} />;
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "Inter_400Regular",
    color: "#1F2937",
  },
});
