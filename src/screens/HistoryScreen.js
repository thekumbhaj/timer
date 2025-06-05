import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Share, Alert } from 'react-native';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const HistoryScreen = () => {
  const { history, clearHistory } = useTimers();
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.category === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const exportHistory = async () => {
    try {
      const historyJson = JSON.stringify(filteredHistory, null, 2);
      await Share.share({
        title: 'Timer History Export',
        message: historyJson,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export history');
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.historyItem, { backgroundColor: theme.cardBackground }]}>
      <View style={styles.historyHeader}>
        <Text style={[styles.timerName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.category, { color: theme.secondaryText }]}>{item.category}</Text>
      </View>
      <View style={styles.historyDetails}>
        <Text style={[styles.duration, { color: theme.text }]}>{formatDuration(item.duration)}</Text>
        <Text style={[styles.completedAt, { color: theme.secondaryText }]}>{formatDate(item.completedAt)}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        {Array.from(new Set(history.map(item => item.category))).map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.filterButton, filter === category && styles.activeFilter]}
            onPress={() => setFilter(category)}
          >
            <Text style={styles.filterButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredHistory.length > 0 ? (
        <>
          <FlatList
            data={filteredHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.primary }]} 
              onPress={exportHistory}
            >
              <Text style={styles.actionButtonText}>Export History</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.error }]} 
              onPress={clearHistory}
            >
              <Text style={styles.actionButtonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>No timer history yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  filterButton: {
    padding: 8,
    margin: 4,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#3F51B5',
  },
  filterButtonText: {
    color: '#212121',
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 14,
  },
  completedAt: {
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});

export default HistoryScreen;