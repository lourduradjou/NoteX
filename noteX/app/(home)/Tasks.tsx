import React, { useState } from "react";
import {View,  Text,  FlatList,  TouchableOpacity,  StyleSheet,  Modal, ScrollView,} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import taskData from "../data/data.json";
import moment from "moment";
import { useFonts } from "expo-font";

import TaskForm from "../components/TasksForm"; // Import the form component

export default function Tasks() {
  const [filter, setFilter] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Store selected task for editing
  const [tasks, setTasks] = useState(taskData);
  const [fontsLoaded] = useFonts({
    'DancingScript-SemiBold': require('../assets/fonts/DancingScript-SemiBold.ttf'),
  });

  // Extract unique tags from data
  const allTags = [
    "All",
    ...new Set(taskData.flatMap((task) => task.tags.split(", "))),
  ];

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Open modal for editing with the selected task's details
  const editTask = (task) => {
    setSelectedTask(task); // Store selected task
    setModalVisible(true); // Open modal
  };
  const getDeadlineColor = (deadlineDate, deadlineTime) => {
    // Parse the deadline properly
    const deadline = moment(`${deadlineDate} ${deadlineTime}`, "YYYY-MM-DD hh:mm A"); // Assuming the time might be in 12-hour format
  
    if (!deadline.isValid()) {
      console.warn("Invalid deadline format:", deadlineDate, deadlineTime);
      return "black"; // Default color in case of an error
    }
  
    const now = moment();
    const diffMinutes = deadline.diff(now, "minutes"); // Get the difference in minutes
  
    console.log(`Deadline: ${deadline.format()}, Now: ${now.format()}, Diff: ${diffMinutes} min`);
  
    if (diffMinutes <= 10) return "red";      // Less than 10 mins left → RED
    if (diffMinutes <= 20) return "orange";   // 10-20 mins left → YELLOW
    return "green";                           // More than 20 mins left → GREEN
  };

  // Save or update task
  const saveTask = (updatedTask) => {
    if (updatedTask.id) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } else {
      // Add new task
      setTasks([...tasks, { ...updatedTask, id: tasks.length + 1 }]);
    }
    setModalVisible(false);
    setSelectedTask(null);
  };

  // Filter tasks based on selected tag
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.tags.includes(filter));

  return (
    <View style={styles.container}>
      
      <Text style={styles.header}>My Tasks</Text>
      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <Text style={styles.sectionTitle}>Filter by Tags</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {allTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => setFilter(tag)}
              style={[styles.tab, filter === tag && styles.activeTab]}
            >
              <Text
                style={[styles.tabText, filter === tag && styles.activeTabText]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
  </ScrollView>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
              <View>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskContent}>{item.content}</Text>

                <View style={styles.tagsContainer}>
  {item.tags.split(", ").map((tag, index) => (
    <View key={index} style={styles.tag}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  ))}
</View>

                
<Text
  style={[
    styles.taskTime,
    { color: getDeadlineColor(item.deadlineDate, item.deadlineTime) },
  ]}
>
  📅 {item.deadlineDate} | ⏰ {item.deadlineTime}
</Text>
                <Text style={styles.taskCycle}>
                  🔄 {item.cycle ? "Recurring Task" : "One-time Task"}
                </Text>
                <Text style={[styles.status, styles[item.status.toLowerCase()]]}>
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Edit & Delete Buttons */}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => editTask(item)}>
                <Feather name="edit" size={22} color="#6c5ce7" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <AntDesign name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setSelectedTask(null); // Clear selected task for new entry
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for Task Form */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TaskForm
          onClose={() => setModalVisible(false)}
          onSave={saveTask}
          existingTask={selectedTask} // Pass selected task for editing
        />
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#344e41',
  },
  header: {
    fontFamily: "DancingScript-SemiBold", // Using the custom font
    fontSize: 26,
    textAlign: "center",
    color: "#ffff",
    marginBottom: 20,
  },
  

  // Filter Section
  filterContainer: {
    
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    
  },

  // Tabs
  tabs: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    paddingHorizontal: 5,
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },

  activeTab: {
    backgroundColor: '#588157',
  },

  tabText: {
    color: "#333",
    fontSize: 16,
    
  },

  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },

  // Task Cards
 // Task Cards
 taskCard: {
  backgroundColor:'#dad7cd' ,
  padding: 15,
  borderRadius: 10,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 3,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
},

taskInfo: {
  flex: 1,
},

flatListContent: {
  paddingBottom: 80,
  width: '100%',
},

taskTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#3a5a40',
},

taskContent: {
  color: '#588157',
  marginTop: 5,
},

tagsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 5,
  marginTop: 5,
},

tag: {
  borderWidth: 1,
  borderColor: '#344e41',
  borderRadius: 8,
  paddingVertical: 2,
  paddingHorizontal: 10,
},

tagText: {
  color: '#588157',
  fontSize: 14,
  fontWeight: '600',
},

taskTime: {
  color: '#666',
  marginTop: 5,
},

taskCycle: {
  color: '#333',
  marginTop: 5,
  fontWeight: '600',
},

status: {
  marginTop: 5,
  fontWeight: 'bold',
},

// Status Colors
completed: {
  color: 'green',
},
inprogress: {
  color: 'orange',
},
todo: {
  color: 'blue',
},

// Edit & Delete Icon Container
iconContainer: {
  flexDirection: 'row',
  gap: 15,
},

// Floating Button
addButton: {
  position: 'absolute',
  right: 30,
  bottom: 50,
  backgroundColor: '#344e41',
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.5,
},

addButtonText: {
  color: '#fff',
  fontSize: 30,
  fontWeight: 'bold',
},
});


// Removed the local declaration of useFonts to resolve the conflict with the import

