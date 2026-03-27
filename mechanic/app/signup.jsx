import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
// eslint-disable-next-line import/no-unresolved
import { API_SERVER } from "@env";
import { router } from "expo-router";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateName = (name) => {
    return name.length > 3;
  };
  const validatePassword = (password) => {
    return password.length > 3;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      if (user.name === "" || user.email === "" || user.password === "")
        return Toast.show({
          type: "info",
          text1: "Invalid Data",
          text2: "Fill all the fields",
        });

      const validName = validateName(user.name);
      const validEmail = validateEmail(user.email);
      const validPassword = validatePassword(user.password);

      if (!validEmail || !validPassword || !validName)
        return Toast.show({
          type: "info",
          text1: "Invalid Data",
          text2: "Invalid Format",
        });

      const res = await axios.post(`${API_SERVER}/user/register`, user);
      Toast.show({
        type: "success",
        text1: res.data.message,
        text2: "User Registered",
      });
      setUser({
        name: "",
        email: "",
        password: "",
      });
      return router.replace("login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message || "Something went wrong",
        text2: "Something Went Wrong",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-200">
      <Toast />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View className="flex flex-1 items-center justify-center">
          <Text className="mb-10 text-2xl font-semibold text-black">
            Signup
          </Text>
          <View className="flex w-10/12 gap-y-2 rounded-xl border bg-white p-5">
            <Text>Name</Text>
            <TextInput
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              className="rounded-xl border p-2"
              maxLength={15}
            />
            <Text>Email</Text>
            <TextInput
              value={user.email}
              keyboardType="email-address"
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
              onPress={handleRegister}
            >
              <Text className="text-center text-lg text-white">Register</Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center justify-center">
              <Text>Already have an account?</Text>
              <Text
                className="p-2 pl-2 text-lg text-blue-600 underline"
                onPress={() => router.replace("login")}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
