import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          !selectedCategory && { backgroundColor: theme.primary }
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text style={[styles.categoryText, !selectedCategory && styles.selectedText]}>
          All
        </Text>
      </TouchableOpacity>
      
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && { backgroundColor: theme.primary }
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.selectedText
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
});

export default CategoryFilter; 