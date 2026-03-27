import { Stack } from "expo-router";
import "../global.css";
import Toast from "react-native-toast-message";

const RootLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="onboarding"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="products" />
        <Stack.Screen name="searchPage" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="about" />
      </Stack>
      <Toast />
    </>
  );
};

export default RootLayout;
