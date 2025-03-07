import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TaskForm({ onClose, existingTask, onSave }) {
  // State variables with initial values from existingTask (if provided)
  const [title, setTitle] = useState(existingTask ? existingTask.title : "");
  const [content, setContent] = useState(existingTask ? existingTask.content : "");
  const [tags, setTags] = useState(existingTask ? existingTask.tags : "");
  const [cycle, setCycle] = useState(existingTask ? existingTask.cycle : false);
  const [deadlineDate, setDeadlineDate] = useState(
    existingTask ? new Date(existingTask.deadlineDate) : new Date()
  );
  const [deadlineTime, setDeadlineTime] = useState(
    existingTask ? new Date(existingTask.deadlineTime) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Update state when existingTask changes (for editing)
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setContent(existingTask.content);
      setTags(existingTask.tags);
      setCycle(existingTask.cycle);
      setDeadlineDate(new Date(existingTask.deadlineDate));
      setDeadlineTime(new Date(existingTask.deadlineTime));
    }
  }, [existingTask]);

  // Handle saving task
  const handleSave = () => {
    const newTask = {
      id: existingTask ? existingTask.id : Date.now(), // Keep ID if editing
      title,
      content,
      tags,
      cycle,
      deadlineDate: deadlineDate.toISOString(),
      deadlineTime: deadlineTime.toISOString(),
      status: existingTask ? existingTask.status : "To-do", // Keep status if editing
    };

    onSave(newTask); // Pass task to parent
    onClose(); // Close modal
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{existingTask ? "Edit Task" : "Add New Task"}</Text>

        {/* Title Input */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Content Input */}
        <TextInput
          style={styles.input}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
        />

        {/* Tags Input */}
        <TextInput
          style={styles.input}
          placeholder="Tags (comma-separated)"
          value={tags}
          onChangeText={setTags}
        />

        {/* Cycle Switch */}
        <View style={styles.switchContainer}>
          <Text>Cycle Task</Text>
          <Switch value={cycle} onValueChange={setCycle} />
        </View>

        {/* Deadline Date Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>Pick Deadline Date: {deadlineDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={deadlineDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDeadlineDate(selectedDate);
            }}
          />
        )}

        {/* Deadline Time Picker */}
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>Pick Deadline Time: {deadlineTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={deadlineTime}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setDeadlineTime(selectedTime);
            }}
          />
        )}

        {/* Submit Button */}
        <Button title="Save Task" onPress={handleSave} />

        {/* Close Button */}
        <Button title="Cancel" color="red" onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#ddd",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
