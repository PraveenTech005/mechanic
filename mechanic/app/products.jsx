import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import products from "../seed";
import { router } from "expo-router";

const Products = () => {
  const { bike, car, engine, accessories } = products;
  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="flex flex-row items-center justify-between">
        <Text className="w-full p-5 text-center text-2xl font-bold">
          Products
        </Text>
        <Ionicons
          name="chevron-back-circle-outline"
          size={40}
          className="absolute left-5"
          onPress={() => router.back()}
        />
      </View>
      <ScrollView className="flex-1">
        <View className="mb-5 flex flex-col gap-2">
          <Text className="mx-auto w-10/12 rounded-lg border bg-white p-2 text-center text-lg font-semibold">
            Bike Spares
          </Text>
          {bike.map((item, index) => (
            <View
              key={index}
              className="mx-auto flex w-11/12 flex-row justify-between rounded-lg border bg-white p-2"
            >
              <Image
                source={item.image}
                className="h-full w-2/12"
                resizeMode="contain"
              />
              <View className="flex w-9/12 flex-row justify-between">
                <View className="flex">
                  <Text className="">{item.name}</Text>
                  <Text className="text-neutral-500">
                    Category: {item.category}
                  </Text>
                  <Text className="">Price: ₹{item.price}.00</Text>
                </View>
                <TouchableOpacity className="rounded-lg bg-green-700 p-2">
                  <FontAwesome
                    name="cart-plus"
                    size={25}
                    color="white"
                    className="m-auto p-2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View className="mb-5 flex flex-col gap-2">
          <Text className="mx-auto w-10/12 rounded-lg border bg-white p-2 text-center text-lg font-semibold">
            Car Spares
          </Text>
          {car.map((item, index) => (
            <View
              key={index}
              className="mx-auto flex w-11/12 flex-row justify-between rounded-lg border bg-white p-2"
            >
              <Image
                source={item.image}
                className="h-full w-2/12"
                resizeMode="contain"
              />
              <View className="flex w-9/12 flex-row justify-between">
                <View className="flex">
                  <Text className="">{item.name}</Text>
                  <Text className="text-neutral-500">
                    Category: {item.category}
                  </Text>
                  <Text className="">Price: ₹{item.price}.00</Text>
                </View>
                <TouchableOpacity className="rounded-lg bg-green-700 p-2">
                  <FontAwesome
                    name="cart-plus"
                    size={25}
                    color="white"
                    className="m-auto p-2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View className="mb-5 flex flex-col gap-2">
          <Text className="mx-auto w-10/12 rounded-lg border bg-white p-2 text-center text-lg font-semibold">
            Engine Spares
          </Text>
          {engine.map((item, index) => (
            <View
              key={index}
              className="mx-auto flex w-11/12 flex-row justify-between rounded-lg border bg-white p-2"
            >
              <Image
                source={item.image}
                className="h-full w-2/12"
                resizeMode="contain"
              />
              <View className="flex w-9/12 flex-row justify-between">
                <View className="flex">
                  <Text className="">{item.name}</Text>
                  <Text className="text-neutral-500">
                    Category: {item.category}
                  </Text>
                  <Text className="">Price: ₹{item.price}.00</Text>
                </View>
                <TouchableOpacity className="rounded-lg bg-green-700 p-2">
                  <FontAwesome
                    name="cart-plus"
                    size={25}
                    color="white"
                    className="m-auto p-2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <View className="mb-5 flex flex-col gap-2">
          <Text className="mx-auto w-10/12 rounded-lg border bg-white p-2 text-center text-lg font-semibold">
            Accessories
          </Text>
          {accessories.map((item, index) => (
            <View
              key={index}
              className="mx-auto flex w-11/12 flex-row justify-between rounded-lg border bg-white p-2"
            >
              <Image
                source={item.image}
                className="h-full w-2/12"
                resizeMode="contain"
              />
              <View className="flex w-9/12 flex-row justify-between">
                <View className="flex">
                  <Text className="">{item.name}</Text>
                  <Text className="text-neutral-500">
                    Category: {item.category}
                  </Text>
                  <Text className="">Price: ₹{item.price}.00</Text>
                </View>
                <TouchableOpacity className="rounded-lg bg-green-700 p-2">
                  <FontAwesome
                    name="cart-plus"
                    size={25}
                    color="white"
                    className="m-auto p-2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
