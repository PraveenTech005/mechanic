import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import products from "../seed";
import { router, useLocalSearchParams } from "expo-router";

const SearchPage = () => {
  const { name, type } = useLocalSearchParams();
  const allproducts = [
    ...products.bike,
    ...products.car,
    ...products.engine,
    ...products.accessories,
  ];

  const [results, setResults] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      const matches = allproducts.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase()),
      );
      setResults(matches);
    };
    const getByCategories = () => {
      const matches = allproducts.filter(
        (item) => item.category.toLowerCase() === name.toLowerCase(),
      );
      setResults(matches);
    };

    if (type === "search") getProducts();
    if (type === "category") getByCategories();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-between">
        <Text className="w-full p-5 text-center text-xl">
          Search results for &apos;{name}&apos;
        </Text>
        <Ionicons
          name="chevron-back-circle-outline"
          size={40}
          className="absolute left-5"
          onPress={() => router.back()}
        />
      </View>
      <ScrollView className="flex-1">
        <View className="flex w-full flex-row flex-wrap justify-between gap-3 p-5">
          {results.map((item, index) => (
            <View
              key={index}
              className="flex w-[48%] flex-col justify-between rounded-lg border bg-white p-2"
            >
              <Image
                source={item.image}
                className="h-40 w-full"
                resizeMode="contain"
              />
              <View className="mx-auto flex w-full flex-col justify-between gap-y-3">
                <View className="flex gap-y-1">
                  <Text className=" text-center font-bold">{item.name}</Text>
                  <Text className="text-neutral-500">
                    Category: {item.category}
                  </Text>
                  <Text className="">Price: ₹{item.price}.00</Text>
                </View>
                <TouchableOpacity className="flex flex-row items-center justify-center gap-x-2 rounded-lg bg-green-700 p-1">
                  <FontAwesome
                    name="cart-plus"
                    size={20}
                    color="white"
                    className=" p-2"
                  />
                  <Text className=" text-white">Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchPage;
