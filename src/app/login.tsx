import IconInput from "@/components/IconInput";
import { validateEmail, validatePassword } from "@/validations";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Validate Email and Password
    if (!validateEmail(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert("Invalid Password", "Please enter a valid Password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Conten-Type": "application/json" },
        body: JSON.stringify({
          identifier: email.trim(),
          password: password,
        }),
      });

      const data = await res.json();

      // Check whether login succeeded
      if (!res.ok || !data.user || !data.accessToken) {
        setEmail("");
        setPassword("");

        Alert.alert(
          "Login Failed",
          data.message || "Invalid credentials. Please try again.",
        );
        return;
      }

      // Store the access token securely
      await SecureStore.setItemAsync("accessToken", data.accessToken);

      // Store the user's profile
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      // Clear the password after successful login
      setPassword("");

      Alert.alert("Success", "You have logged in successfully.");
    } catch (error) {
      console.error("Login error:", error);

      setEmail("");
      setPassword("");

      Alert.alert(
        "Login Failed",
        "Something went wrong. Please check your connection and try again.",
      );
    }
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
          <Pressable
            onPress={() => {
              router.back();
            }}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={24} color="#ffffff" />
          </Pressable>
          <Text style={styles.heading}>Login</Text>
          <Image
            style={styles.img}
            source={require("@/assets/images/login_image.png")}
          />

          <View style={styles.form}>
            <IconInput
              icon={<Entypo name="email" size={20} color="black" />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
            />
            <IconInput
              icon={<MaterialIcons name="password" size={24} color="black" />}
              placeholder="Password"
              isPassword={true}
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Pressable style={styles.forgotPasswordBtn}>
            <Text style={{ textDecorationLine: "underline" }}>
              Forgot Password
            </Text>
          </Pressable>
          <View style={styles.signupView}>
            <Text>Don't have an account?</Text>
            <Pressable>
              <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
  },
  container: {
    width: "80%",
    height: "90%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
  heading: {
    fontWeight: "bold",
    fontSize: 50,
    marginVertical: 30,
  },
  img: {
    alignSelf: "center",
    width: "100%",
    // backgroundColor: "green",
    height: "30%",
    resizeMode: "contain",
    marginBottom: 40,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  loginBtn: {
    backgroundColor: coral,
    height: 40,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "white",
    // fontWeight: "bold",
    fontSize: 18,
  },
  signupView: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  forgotPasswordBtn: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5,
  },
});

export default LoginScreen;
