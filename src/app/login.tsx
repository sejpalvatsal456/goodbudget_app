import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Pressable style={styles.closeBtn}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
};

const coral = "#fe696e";

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: coral,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  container: {
    width: "80%",
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
  },
  closeBtn: {
    backgroundColor: coral,
    width: 30,
    borderRadius: "50%",
    aspectRatio: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

export default LoginScreen;
