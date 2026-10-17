import { Color } from "@/constants/theme";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

type ThemedContainerProps = {
  children?: React.ReactNode;
  theme?: string;
  style?: StyleProp<ViewStyle>;
  isPressable?: boolean;
  onPress?: () => void;
};

export default function ThemedContainer({
  children,
  theme,
  style,
  isPressable,
  onPress,
}: ThemedContainerProps) {
  const containerStyle = [
    {
      backgroundColor: (theme || Color.primary) + "22",
      padding: 15,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#000",
    },
    style,
  ];

  return isPressable ? (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={containerStyle}>{children}</View>
  );
}
