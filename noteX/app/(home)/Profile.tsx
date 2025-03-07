import React, { useState } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, Animated, FlatList 
} from "react-native";
import * as ImagePicker from "expo-image-picker";

// Mock User Data
const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  role: "Project Manager",
  stats: [
    { id: "1", label: "Completed", value: 42 },
    { id: "2", label: "In Progress", value: 10 },
    { id: "3", label: "Total", value: 60 },
  ],
};

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const scrollY = new Animated.Value(0);

  // Handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage ? { uri: profileImage } : require("../assets/cat1.jpg")}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* User Details */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.role}>{user.role}</Text>

      {/* Task Stats - Vertical Scroll */}
      <Animated.FlatList
        data={user.stats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const scale = scrollY.interpolate({
            inputRange: [
              (index - 1) * 180,
              index * 180,
              (index + 1) * 180
            ],
            outputRange: [0.9, 1.1, 0.9], // Enlarging effect
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={[styles.statCard, { transform: [{ scale }] }]}>
              <Text style={styles.statNumber}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    paddingTop: 40,
    backgroundColor: "#f5f5f5",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: "#6c5ce7",
  },

  name: { fontSize: 26, fontWeight: "bold", color: "#333" },
  email: { fontSize: 18, color: "#666", marginBottom: 5 },
  role: { fontSize: 18, color: "#6c5ce7", fontWeight: "bold", marginBottom: 25 },

  statCard: {
    width: 350,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  statNumber: { fontSize: 32, fontWeight: "bold", color: "#6c5ce7" },
  statLabel: { fontSize: 18, color: "#333", marginTop: 8 },
});
