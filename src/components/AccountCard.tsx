import { Color } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import AppText from "./AppText";
import ThemedContainer from "./ThemedContainer";

type AccountCardProps = {
  acc_name: string;
  acc_desc: string;
  acc_balance: number;
};

export default function AccountCard({
  acc_name,
  acc_desc,
  acc_balance,
}: AccountCardProps) {
  return (
    <ThemedContainer theme={Color.account} style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <AppText style={{ fontFamily: "Inter_700Bold", fontSize: 20 }}>
            {acc_name}
          </AppText>
          <AppText style={{ fontSize: 14, color: "#454545" }}>
            {acc_desc}
          </AppText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignItems: "flex-end" }}>
            <AppText style={{ fontSize: 14 }}>BALANCE</AppText>
            <AppText
              style={{
                fontSize: 20,
                fontFamily: "Inter_700Bold",
                color: Color.money,
              }}
            >
              ₹{acc_balance}
            </AppText>
          </View>

          <Pressable
            style={{
              justifyContent: "center",
              marginLeft: 10,
            }}
            onPress={() => {}}
          >
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </ThemedContainer>
  );
}
