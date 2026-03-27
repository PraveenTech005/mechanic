import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("User");
        const User = storedUser ? JSON.parse(storedUser) : null;

        if (!User?.token) {
          router.dismissAll();
        }

        setUser(User);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-between">
        <Text className="w-full p-5 text-center text-xl font-bold">
          Profile
        </Text>
        <Ionicons
          name="chevron-back-circle-outline"
          size={40}
          className="absolute left-5"
          onPress={() => router.back()}
        />
      </View>
      <View className="flex flex-1 justify-center gap-y-3">
        <View className="mx-auto w-10/12 gap-y-3 rounded-lg border bg-white p-3">
          <Text className="text-center text-lg font-bold">Name</Text>
          <Text className="text-center font-semibold">{user?.name}</Text>
        </View>
        <View className="mx-auto w-10/12 gap-y-3 rounded-lg border bg-white p-3">
          <Text className="text-center text-lg font-bold">Email</Text>
          <Text className="text-center font-semibold">{user?.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
