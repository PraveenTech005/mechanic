import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import products from "../seed";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Home = () => {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const featured = [
    products.bike[0],
    products.car[0],
    products.engine[0],
    products.accessories[0],
  ];
  const whychooseus = [
    {
      logo: "✅",
      head: "Genuine Products",
      desc: "100% original spare parts",
    },
    {
      logo: "🛒",
      head: "Easy Shopping",
      desc: "Smooth & Simple UI",
    },
    {
      logo: "🔐",
      head: "Secure Login",
      desc: "Safe Authentication",
    },
    {
      logo: "⏱️",
      head: "Time Saving",
      desc: "Fast & Easy Orders",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("User");
        const User = storedUser ? JSON.parse(storedUser) : null;

        if (!User?.token) {
          router.replace("/onboarding");
        }

        setUser(User);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="flex flex-row items-center justify-between p-5">
        <View>
          <Text className="text-xl">Welcome Back,</Text>
          <Text className="text-2xl font-bold">{user?.name} 👋</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/menu")}>
          <Entypo name="menu" size={40} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-evenly p-2 px-4">
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          keyboardType="web-search"
          className="w-10/12 rounded-xl border bg-white px-2"
          placeholder="Search for Spares"
        />
        <TouchableOpacity
          className="rounded-lg bg-green-700 p-2"
          onPress={() => {
            if (search) {
              setSearch("");
              router.push({
                pathname: "/searchPage",
                params: { name: search, type: "search" },
              });
            }
          }}
        >
          <Feather name="search" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView className="py-1">
        <View className="mx-auto mt-5 w-10/12 gap-y-5 rounded-xl bg-white p-5">
          <Text className="mx-auto w-10/12 text-center text-xl font-bold">
            Buy Genuine Mechanic Tools & Spare Parts
          </Text>
          <Text className="text-center text-neutral-700">
            Quality products for bikes, cars, and workshops
          </Text>
          <TouchableOpacity
            className="mx-auto w-6/12 rounded-lg bg-green-700 p-3"
            onPress={() => router.push("/products")}
          >
            <Text className="text-center font-bold text-white">Shop Now</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-auto mt-5 w-10/12 rounded-xl bg-white">
          <Text className="p-5 text-center text-xl font-bold">Categories</Text>
          <View className="flex flex-row flex-wrap justify-between px-4">
            {["Bike Parts", "Car Parts", "Engine Tools", "Accessories"].map(
              (label, index) => (
                <TouchableOpacity
                  key={index}
                  className="mb-4 w-[48%] rounded-md bg-green-200 p-3"
                  onPress={() =>
                    router.push({
                      pathname: "/searchPage",
                      params: {
                        name: label.split(" ")[0],
                        type: "category",
                      },
                    })
                  }
                >
                  <Text className="text-center font-bold">{label}</Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
        <View className="mx-auto mt-5 w-10/12 rounded-xl bg-white">
          <Text className="p-5 text-center text-xl font-bold">
            Featured Products
          </Text>
          <View className="mb-5 flex w-full flex-col gap-5">
            {featured.map((item, index) => (
              <View
                key={index}
                className="mx-auto flex w-10/12 gap-3 rounded-lg border p-5"
              >
                <Image
                  source={item.image}
                  className="h-48 w-full"
                  resizeMode="contain"
                />
                <Text className="text-center text-lg font-semibold">
                  {item.name}
                </Text>
                <Text className="text-neutral-500">
                  Category: {item.category}
                </Text>
                <Text className="text-lg font-bold">
                  Price: ₹{item.price}.00
                </Text>
                <TouchableOpacity className="rounded-lg bg-green-700 p-3">
                  <Text className="text-center font-bold text-white ">
                    Add to Cart
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity
            className="mx-auto mb-5 w-6/12 rounded-lg border p-3"
            onPress={() => router.push("/products")}
          >
            <Text className="text-center font-bold">Show More</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-auto mb-5 mt-5 w-10/12 rounded-xl bg-white">
          <Text className="p-5 text-center text-xl font-bold">
            Why Choose MechPro?
          </Text>
          <View className="mx-auto mb-3 w-10/12 gap-3">
            {whychooseus.map((item, index) => (
              <View
                key={index}
                className="flex flex-row items-center justify-evenly rounded-lg bg-green-200 p-3"
              >
                <Text className="w-3/12 text-center text-3xl">{item.logo}</Text>
                <View className="w-8/12 gap-3">
                  <Text>{item.head}</Text>
                  <Text>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
