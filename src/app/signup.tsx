import { StyleSheet, Text, View } from "react-native";

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SignUp Screen</Text>
    </View>
  );
};

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

export default SignUpScreen;
