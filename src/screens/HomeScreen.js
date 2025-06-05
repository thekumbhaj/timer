import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';
import CategorySection from '../components/CategorySection';
import TimerModal from '../components/TimerModal';
import ThemeSwitcher from '../components/ThemeSwitcher';
import CategoryFilter from '../components/CategoryFilter';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { timers, categories, activeTimerId, setActiveTimerId, addToHistory } = useTimers();
  const { theme } = useTheme();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [completedTimer, setCompletedTimer] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const initialExpanded = {};
    categories.forEach(category => {
      initialExpanded[category] = true;
    });
    setExpandedCategories(initialExpanded);
  }, [categories]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTimerComplete = (timer) => {
    setCompletedTimer(timer);
    addToHistory(timer);
  };

  const closeModal = () => {
    setCompletedTimer(null);
  };

  const filteredCategories = selectedCategory 
    ? [selectedCategory]
    : categories;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <ThemeSwitcher />
      </View>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <ScrollView>
        {filteredCategories.map(category => (
          <CategorySection
            key={category}
            category={category}
            timers={timers.filter(t => t.category === category)}
            isExpanded={expandedCategories[category]}
            onToggle={() => toggleCategory(category)}
            onTimerComplete={handleTimerComplete}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('AddTimer')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.historyButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={styles.historyButtonText}>History</Text>
      </TouchableOpacity>

      <TimerModal 
        visible={!!completedTimer}
        timer={completedTimer}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  historyButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  historyButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;