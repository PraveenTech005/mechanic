import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// eslint-disable-next-line import/no-unresolved
import { API_SERVER } from "@env";
import { router } from "expo-router";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validatePassword = (password) => {
    return password.length > 3;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      if (user.email === "" || user.password === "")
        return Toast.show({
          type: "info",
          text1: "Invalid Data",
          text2: "Fill all the fields",
        });

      const validEmail = validateEmail(user.email);
      const validPassword = validatePassword(user.password);

      if (!validEmail || !validPassword)
        return Toast.show({
          type: "info",
          text1: "Invalid Data",
          text2: "Invalid Format",
        });

      const res = await axios.post(`${API_SERVER}/user/login`, user);
      Toast.show({
        type: "success",
        text1: res.data.message,
      });
      setUser({
        email: "",
        password: "",
      });
      await AsyncStorage.setItem("User", JSON.stringify(res.data.user));
      router.dismiss();
      return router.replace("/home");
    } catch (error) {
      console.log(error);
      return Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
        text2: "Something Went Wrong",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View className="flex flex-1 items-center justify-center">
          <Text className="mb-10 text-2xl font-semibold text-black">Login</Text>
          <View className="flex w-10/12 gap-y-2 rounded-xl border bg-white p-5">
            <Text>Email</Text>
            <TextInput
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              className="rounded-xl border p-2"
            />
            <Text>Password</Text>
            <TextInput
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
              className="rounded-xl border p-2"
            />
            <TouchableOpacity
              className="mx-auto mt-3 flex w-6/12 rounded-lg bg-blue-700 p-2"
              onPress={handleLogin}
            >
              <Text className="text-center text-lg text-white">Login</Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center justify-center">
              <Text>Don&apos;t have an account?</Text>
              <Text
                className="p-2 pl-2 text-lg text-blue-600 underline"
                onPress={() => router.replace("/signup")}
              >
                Signup
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
