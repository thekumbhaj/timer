import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTimers } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const TimerCard = ({ timer }) => {
  const { updateTimer, addToHistory, setActiveTimerId, activeTimerId } = useTimers();
  const { theme } = useTheme();
  const [remainingTime, setRemainingTime] = useState(timer.remainingTime || timer.duration);
  const [isRunning, setIsRunning] = useState(false);
  const progressAnim = useState(new Animated.Value(0))[0];

  // Calculate percentage
  const percentage = Math.round((1 - (remainingTime / timer.duration)) * 100);

  // Update progress animation
  useEffect(() => {
    const progress = 1 - (remainingTime / timer.duration);
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [remainingTime]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            setIsRunning(false);
            addToHistory({ ...timer, remainingTime: 0 });
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  const handleStart = () => {
    setActiveTimerId(timer.id);
    if (remainingTime <= 0) setRemainingTime(timer.duration);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setRemainingTime(timer.duration);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressColor = progressAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#4CAF50', '#FFC107', '#F44336']
  });

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.cardBackground },
      activeTimerId === timer.id && styles.activeContainer
    ]}>
      <Text style={[styles.name, { color: theme.text }]}>{timer.name}</Text>
      <Text style={[styles.time, { color: theme.text }]}>{formatTime(remainingTime)}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[
            styles.progressBar,
            { 
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
              backgroundColor: progressColor
            }
          ]} />
        </View>
        <Text style={[styles.percentage, { color: theme.text }]}>{percentage}%</Text>
      </View>

      <View style={styles.controls}>
        {!isRunning ? (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]} 
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.primary }]} 
            onPress={handlePause}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.secondary }]} 
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  activeContainer: {
    borderWidth: 2,
    borderColor: '#3F51B5'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 8,
  },
  progressBar: {
    height: '100%',
  },
  percentage: {
    width: 50,
    textAlign: 'right',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerCard;