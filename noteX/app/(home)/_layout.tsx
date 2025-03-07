import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
      }}
    >
      
       <Tabs.Screen
        name="Analytics"  // ✅ Matches Analytics.tsx exactly
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Tasks"  // ✅ Matches Tasks.tsx exactly
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    
      <Tabs.Screen
        name="Profile"  // ✅ Matches Profile.tsx exactly
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
       
    </Tabs>
  );
}
