import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

// Mock Task Data (Replace this with real data)
const tasks = [
  { date: "2024-03-01", completed: 5 },
  { date: "2024-03-02", completed: 8 },
  { date: "2024-03-03", completed: 6 },
  { date: "2024-03-04", completed: 10 },
  { date: "2024-03-05", completed: 7 },
];

const taskStatusData = [
  { name: "Completed", count: 40, color: "green", legendFontColor: "#333" },
  { name: "In Progress", count: 25, color: "orange", legendFontColor: "#333" },
  { name: "To-Do", count: 35, color: "blue", legendFontColor: "#333" },
];

export default function Analytics() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Task Analytics</Text>

      {/* Daily Completed Tasks */}
      <Text style={styles.chartTitle}>Completed Tasks Over Time</Text>
      <LineChart
        data={{
          labels: tasks.map((t) => t.date.slice(-2)), // Extract last 2 digits of the date
          datasets: [{ data: tasks.map((t) => t.completed) }],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Task Status Breakdown */}
      <Text style={styles.chartTitle}>Task Status Breakdown</Text>
      <PieChart
        data={taskStatusData}
        width={Dimensions.get("window").width - 30}
        height={220}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor="transparent"
        paddingLeft="15"
      />

      {/* Completed Tasks per Day */}
      <Text style={styles.chartTitle}>Daily Completed Tasks</Text>
      <BarChart
        data={{
          labels: tasks.map((t) => t.date.slice(-2)), // Extract day from date
          datasets: [{ data: tasks.map((t) => t.completed) }],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

// Chart Configurations
const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#dad7cd' },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center",backgroundColor: '#588157', marginBottom: 30 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
  chart: { borderRadius: 10, marginVertical: 10 },
});
