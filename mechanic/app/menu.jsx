import { View, Text, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const Menu = () => {
  return (
    <SafeAreaView className="flex-1">
      <TouchableOpacity
        className="flex flex-row justify-end"
        onPress={() => router.back()}
      >
        <Entypo name="cross" size={40} className="p-5" />
      </TouchableOpacity>
      <View className="flex-1 justify-center gap-5 p-5">
        <TouchableOpacity
          className="flex flex-row items-center gap-x-5 rounded-xl border bg-white p-5"
          onPress={() => router.replace("profile")}
        >
          <FontAwesome name="user" className="w-1/12 " size={25} />
          <Text className="text-lg font-semibold">Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center gap-x-5 rounded-xl border bg-white p-5"
          onPress={() => router.replace("about")}
        >
          <FontAwesome name="info" className="w-1/12 " size={25} />
          <Text className="text-lg font-semibold">About Us</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="mx-auto mb-5 flex w-5/12 flex-row items-center justify-center gap-x-2 rounded-lg bg-red-500 p-3 px-5"
        onPress={() => {
          AsyncStorage.removeItem("User");
          Toast.show({
            type: "success",
            text1: "Logged Out",
          });
          router.dismiss();
          router.replace("/onboarding");
        }}
      >
        <MaterialIcons name="logout" size={25} color="white" />
        <Text className="text-center text-xl font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Menu;
