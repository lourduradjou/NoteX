import { Stack } from 'expo-router';

export default function authLayout() {
  return (
    <Stack screenOptions={{
        headerShown:false
       }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="Register" />

    </Stack>
  );
}