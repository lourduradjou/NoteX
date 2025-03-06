import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import taskData from './data/data.json';

export default function TaskManager() {
  const [filter, setFilter] = useState('All');

  const filteredTasks = filter === 'All' ? taskData : taskData.filter(task => task.status === filter);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {['All', 'To-do', 'In Progress', 'Completed'].map(status => (
          <TouchableOpacity key={status} onPress={() => setFilter(status)} style={[styles.tab, filter === status && styles.activeTab]}>
            <Text style={[styles.tabText, filter === status && styles.activeTabText]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text style={[styles.status, styles[item.status.replace(' ', '').toLowerCase()]]}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { padding: 10, borderRadius: 10, backgroundColor: '#ddd' },
  activeTab: { backgroundColor: '#6c5ce7' },
  tabText: { color: '#333' },
  activeTabText: { color: '#fff' },
  taskCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskTime: { color: '#666', marginTop: 5 },
  status: { marginTop: 5, fontWeight: 'bold' },
  todo: { color: 'blue' },
  inprogress: { color: 'orange' },
  completed: { color: 'green' }
});
