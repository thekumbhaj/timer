import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TimerCard from './TimerCard';

const CategorySection = ({ category, timers, isExpanded, onToggle, onTimerComplete }) => {
  const handleBulkAction = (action) => {
    // In a real app, you would implement bulk actions here
    alert(`Bulk ${action} for ${category} timers`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.header}>
        <Text style={styles.categoryName}>{category}</Text>
        <Text style={styles.toggleIcon}>{isExpanded ? '−' : '+'}</Text>
      </TouchableOpacity>
      
      {isExpanded && (
        <>
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => handleBulkAction('start')}
            >
              <Text style={styles.bulkButtonText}>Start All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => handleBulkAction('pause')}
            >
              <Text style={styles.bulkButtonText}>Pause All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton} 
              onPress={() => handleBulkAction('reset')}
            >
              <Text style={styles.bulkButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          
          {timers.map(timer => (
            <TimerCard 
              key={timer.id} 
              timer={timer} 
              onComplete={onTimerComplete}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
  },
  categoryName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  bulkButton: {
    backgroundColor: '#6aa8ff',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  bulkButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CategorySection;