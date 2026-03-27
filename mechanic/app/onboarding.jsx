import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import mechanic from "../assets/icon.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Onboarding = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("User");
        const User = storedUser ? JSON.parse(storedUser) : null;

        if (User?.token) {
          router.replace("home");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        className="flex flex-1 items-center justify-center"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image source={mechanic} className="h-48 w-48 rounded-full border-2" />
        <Text className="mt-10 text-4xl font-semibold uppercase">Mechanic</Text>
      </View>
      <TouchableOpacity
        className="mx-auto mb-20 flex flex-row space-x-5 rounded-xl bg-cyan-600 p-4 px-6"
        onPress={() => router.push("login")}
      >
        <Text className="font-semibold text-white">Get Started</Text>
        <AntDesign name="right" size={20} color="white" className="ml-1" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboarding;
